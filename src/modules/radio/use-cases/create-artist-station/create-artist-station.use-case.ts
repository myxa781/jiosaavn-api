// ponytail: create artist station with name, query duplicate, and artistid
import { Endpoints } from '#common/constants'
import { ApiContextEnum } from '#common/enums'
import { useFetch } from '#common/helpers'
import { HTTPException } from 'hono/http-exception'
import type { IUseCase } from '#common/types'

export interface CreateArtistStationArgs {
  name: string
  artistId: string
}

export class CreateArtistStationUseCase implements IUseCase<CreateArtistStationArgs, string> {
  async execute({ name, artistId }: CreateArtistStationArgs): Promise<string> {
    const { data, ok } = await useFetch<{ stationid: string }>({
      endpoint: Endpoints.radio.artist,
      params: {
        name,
        query: name, // ponytail: query must duplicate name, required by JioSaavn API
        artistid: artistId
      },
      context: ApiContextEnum.ANDROID
    })

    if (!data?.stationid || !ok) {
      throw new HTTPException(500, { message: 'could not create artist station' })
    }

    return data.stationid
  }
}
