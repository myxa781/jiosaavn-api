// ponytail: create genre station with default language english
import { Endpoints } from '#common/constants'
import { ApiContextEnum } from '#common/enums'
import { useFetch } from '#common/helpers'
import { HTTPException } from 'hono/http-exception'
import type { IUseCase } from '#common/types'

export interface CreateGenreStationArgs {
  name: string
  language?: string
}

export class CreateGenreStationUseCase implements IUseCase<CreateGenreStationArgs, string> {
  async execute({ name, language = 'english' }: CreateGenreStationArgs): Promise<string> {
    const { data, ok } = await useFetch<{ stationid: string }>({
      endpoint: Endpoints.radio.featured,
      params: { name, language },
      context: ApiContextEnum.ANDROID
    })

    if (!data?.stationid || !ok) {
      throw new HTTPException(500, { message: 'could not create genre station' })
    }

    return data.stationid
  }
}
