// ponytail: fetch featured radio stations and map to standard model
import { Endpoints } from '#common/constants'
import { ApiContextEnum } from '#common/enums'
import { createImageLinks, useFetch } from '#common/helpers'
import { HTTPException } from 'hono/http-exception'
import type { IUseCase } from '#common/types'
import type { FeaturedRadioStationAPIResponseModel, FeaturedRadioStationModel } from '#modules/radio/models'
import type { z } from 'zod'

export interface GetFeaturedStationsArgs {
  language?: string
}

export class GetFeaturedStationsUseCase implements IUseCase<
  GetFeaturedStationsArgs,
  z.infer<typeof FeaturedRadioStationModel>[]
> {
  async execute({ language = 'english' }: GetFeaturedStationsArgs) {
    const { data, ok } = await useFetch<z.infer<typeof FeaturedRadioStationAPIResponseModel>[]>({
      endpoint: Endpoints.radio.featuredStations,
      params: {
        languages: language // ponytail: JioSaavn expects 'languages' key
      },
      context: ApiContextEnum.WEB6DOT0
    })

    if (!data || !ok) {
      throw new HTTPException(404, { message: 'no featured stations found' })
    }

    // ponytail: map API response to standardized client schema
    return data.map((station) => ({
      id: station.id,
      name: station.title,
      subtitle: station.subtitle || null,
      type: station.type,
      image: createImageLinks(station.image),
      url: station.perma_url,
      description: station.more_info?.description || null,
      language: station.more_info?.language || null
    }))
  }
}
