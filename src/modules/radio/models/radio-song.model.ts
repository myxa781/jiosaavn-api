import { SongAPIResponseModel } from '#modules/songs/models'
// ponytail: minimal zod schema for radio getSong response
import { z } from 'zod'

const RadioSongEntryModel = z.object({
  song: SongAPIResponseModel
})

export const RadioSongsAPIResponseModel = z
  .object({
    stationid: z.string()
  })
  .and(z.record(z.string(), RadioSongEntryModel))
