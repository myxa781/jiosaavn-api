// ponytail: fetch songs for the station and map them to standard song payload
import { Endpoints } from '#common/constants'
import { ApiContextEnum } from '#common/enums'
import { useFetch } from '#common/helpers'
import { createSongPayload } from '#modules/songs/helpers'
import { HTTPException } from 'hono/http-exception'
import type { IUseCase } from '#common/types'
import type { RadioSongsAPIResponseModel } from '#modules/radio/models'
import type { SongModel } from '#modules/songs/models'
import type { z } from 'zod'

export interface GetRadioSongsArgs {
  stationId: string
  limit?: number
}

export class GetRadioSongsUseCase implements IUseCase<GetRadioSongsArgs, z.infer<typeof SongModel>[]> {
  async execute({ stationId, limit = 10 }: GetRadioSongsArgs) {
    const { data, ok } = await useFetch<z.infer<typeof RadioSongsAPIResponseModel>>({
      endpoint: Endpoints.radio.songs,
      params: {
        stationid: stationId,
        k: limit,
        next: 1
      },
      context: ApiContextEnum.ANDROID
    })

    if (!data || !ok) {
      throw new HTTPException(404, { message: 'no songs found for this radio station' })
    }

    const { stationid, ...entries } = data

    // ponytail: map raw songs to SongModel, filter out potential nulls
    return Object.values(entries)
      .map((entry) => entry?.song && createSongPayload(entry.song))
      .filter(Boolean)
      .slice(0, limit)
  }
}
