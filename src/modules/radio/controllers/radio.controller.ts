// ponytail: implement radio controller routes using OpenAPIHono
import { createRoute, OpenAPIHono, z } from '@hono/zod-openapi'
import { FeaturedRadioStationModel } from '#modules/radio/models'
import { RadioService } from '#modules/radio/services'
import { SongModel } from '#modules/songs/models'
import type { Routes } from '#common/types'

export class RadioController implements Routes {
  public controller: OpenAPIHono
  private radioService: RadioService

  constructor() {
    this.controller = new OpenAPIHono()
    this.radioService = new RadioService()
  }

  public initRoutes() {
    // --- Featured radio stations: GET /radio ---
    this.controller.openapi(
      createRoute({
        method: 'get',
        path: '/radio',
        tags: ['Radio'],
        summary: 'Get featured radio stations',
        description: 'Get list of featured radio stations.',
        operationId: 'getFeaturedStations',
        request: {
          query: z.object({
            language: z.string().optional().openapi({
              description: 'Language filter (default: english)',
              example: 'english'
            })
          })
        },
        responses: {
          200: {
            description: 'Successful response with list of featured radio stations',
            content: {
              'application/json': {
                schema: z.object({
                  success: z.boolean(),
                  data: z.array(FeaturedRadioStationModel)
                })
              }
            }
          }
        }
      }),
      async (ctx) => {
        const { language } = ctx.req.valid('query')
        const stations = await this.radioService.getFeaturedStationsList(language ?? 'english')
        return ctx.json({ success: true, data: stations })
      }
    )

    // --- Genre radio: GET /radio/genre/{name} ---
    this.controller.openapi(
      createRoute({
        method: 'get',
        path: '/radio/genre/{name}',
        tags: ['Radio'],
        summary: 'Get genre radio songs',
        description: 'Creates a featured genre radio station and returns songs from it.',
        operationId: 'getGenreRadio',
        request: {
          params: z.object({
            name: z.string().openapi({
              description: 'Genre name (e.g. Chill, Pop, Hip-Hop)',
              example: 'Chill'
            })
          }),
          query: z.object({
            language: z.string().optional().openapi({
              description: 'Language filter for the station (default: english)',
              example: 'english'
            }),
            limit: z.string().pipe(z.coerce.number()).optional().openapi({
              description: 'Number of songs to return',
              example: '10',
              default: '10'
            })
          })
        },
        responses: {
          200: {
            description: 'Array of songs from the genre radio station',
            content: {
              'application/json': {
                schema: z.object({
                  success: z.boolean(),
                  data: z.array(SongModel)
                })
              }
            }
          },
          400: { description: 'Bad request — missing or invalid parameters' },
          500: { description: 'Could not create radio station' }
        }
      }),
      async (ctx) => {
        const { name } = ctx.req.valid('param')
        const { limit, language } = ctx.req.valid('query')

        const songs = await this.radioService.getGenreRadio(name, language ?? 'english', limit ?? 10)
        return ctx.json({ success: true, data: songs })
      }
    )

    // --- Artist radio: GET /radio/artist/{name}/{artistId} ---
    this.controller.openapi(
      createRoute({
        method: 'get',
        path: '/radio/artist/{name}/{artistId}',
        tags: ['Radio'],
        summary: 'Get artist radio songs',
        description: 'Creates an artist radio station and returns songs from it.',
        operationId: 'getArtistRadio',
        request: {
          params: z.object({
            name: z.string().openapi({
              description: 'Artist name',
              example: 'Околиця'
            }),
            artistId: z.string().openapi({
              description: 'JioSaavn artist ID',
              example: '16894547'
            })
          }),
          query: z.object({
            limit: z.string().pipe(z.coerce.number()).optional().openapi({
              description: 'Number of songs to return',
              example: '10',
              default: '10'
            })
          })
        },
        responses: {
          200: {
            description: 'Array of songs from the artist radio station',
            content: {
              'application/json': {
                schema: z.object({
                  success: z.boolean(),
                  data: z.array(SongModel)
                })
              }
            }
          },
          400: { description: 'Bad request — missing or invalid parameters' },
          500: { description: 'Could not create artist radio station' }
        }
      }),
      async (ctx) => {
        const { name, artistId } = ctx.req.valid('param')
        const { limit } = ctx.req.valid('query')

        const songs = await this.radioService.getArtistRadio(name, artistId, limit ?? 10)
        return ctx.json({ success: true, data: songs })
      }
    )
  }
}
