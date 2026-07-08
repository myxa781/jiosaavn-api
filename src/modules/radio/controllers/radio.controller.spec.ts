// ponytail: write minimal integration tests for genre and artist radio routes
import { RadioController } from '#modules/radio/controllers'
import { FeaturedRadioStationModel } from '#modules/radio/models'
import { SongModel } from '#modules/songs/models'
import { afterAll, beforeAll, describe, expect, it, vi } from 'vitest'
import type { z } from 'zod'

describe('RadioController', () => {
  let radioController: RadioController

  beforeAll(() => {
    radioController = new RadioController()
    radioController.initRoutes()

    const originalFetch = global.fetch
    vi.spyOn(global, 'fetch').mockImplementation(async (url, init) => {
      const urlStr = url.toString()
      if (
        urlStr.includes('__call=webradio.createFeaturedStation') ||
        urlStr.includes('__call=webradio.createArtistStation')
      ) {
        return new Response(JSON.stringify({ stationid: 'mock_station_123' }))
      }
      if (urlStr.includes('__call=webradio.getSong')) {
        return new Response(
          JSON.stringify({
            stationid: 'mock_station_123',
            '0': {
              song: {
                id: 'mock_song_id',
                title: 'Mock Song',
                subtitle: 'Mock Subtitle',
                header_desc: '',
                type: 'song',
                perma_url: 'https://www.jiosaavn.com/song/mock/123',
                image: 'https://c.saavncdn.com/123/mock-150x150.jpg',
                language: 'english',
                year: '2024',
                play_count: '1000',
                explicit_content: '0',
                list_count: '0',
                list_type: '',
                list: '',
                more_info: {
                  music: 'Mock Music',
                  album_id: 'mock_album_id',
                  album: 'Mock Album',
                  label: 'Mock Label',
                  origin: 'radio',
                  is_dolby_content: false,
                  '320kbps': 'true',
                  encrypted_media_url: 'mock_media_url',
                  encrypted_cache_url: '',
                  album_url: 'https://www.jiosaavn.com/album/mock/123',
                  duration: '180',
                  rights: {
                    code: '0',
                    cacheable: 'true',
                    delete_cached_object: 'false',
                    reason: ''
                  },
                  cache_state: 'false',
                  has_lyrics: 'false',
                  lyrics_snippet: '',
                  starred: 'false',
                  copyright_text: 'Mock Copyright',
                  artistMap: {
                    primary_artists: [],
                    featured_artists: [],
                    artists: []
                  },
                  release_date: '2024-01-01',
                  label_url: '',
                  vcode: '',
                  vlink: '',
                  triller_available: false,
                  request_jiotune_flag: false,
                  webp: 'false',
                  lyrics_id: ''
                }
              }
            }
          })
        )
      }
      return await originalFetch(url, init)
    })
  })

  afterAll(() => {
    vi.restoreAllMocks()
  })

  it('get featured radio stations', async () => {
    const response = await radioController.controller.request('/radio?language=english')
    const { success, data } = (await response.json()) as {
      success: boolean
      data: z.infer<typeof FeaturedRadioStationModel>[]
    }

    expect(success).toBe(true)
    expect(data.length).toBeGreaterThan(0)
    expect(() => FeaturedRadioStationModel.parse(data[0])).not.toThrow()
  })

  it('get genre radio songs', async () => {
    const response = await radioController.controller.request('/radio/genre/Chill?limit=2')
    const { success, data } = (await response.json()) as { success: boolean; data: z.infer<typeof SongModel>[] }

    expect(success).toBe(true)
    expect(data.length).toBeGreaterThan(0)
    expect(() => SongModel.parse(data[0])).not.toThrow()
  })

  it('get artist radio songs', async () => {
    const response = await radioController.controller.request('/radio/artist/Околиця/16894547?limit=2')
    const { success, data } = (await response.json()) as { success: boolean; data: z.infer<typeof SongModel>[] }

    expect(success).toBe(true)
    expect(data.length).toBeGreaterThan(0)
    expect(() => SongModel.parse(data[0])).not.toThrow()
  })
})
