// ponytail: schemas for radio station responses
import { DownloadLinkModel } from '#common/models'
import { z } from 'zod'

export const RadioStationAPIResponseModel = z.object({
  stationid: z.string()
})

export const FeaturedRadioStationAPIResponseModel = z.object({
  id: z.string(),
  title: z.string(),
  subtitle: z.string(),
  type: z.string(),
  image: z.string(),
  perma_url: z.string(),
  more_info: z.object({
    description: z.string(),
    featured_station_type: z.string(),
    query: z.string(),
    color: z.string(),
    language: z.string(),
    station_display_text: z.string()
  }),
  explicit_content: z.string(),
  mini_obj: z.boolean().optional()
})

export const FeaturedRadioStationModel = z.object({
  id: z.string(),
  name: z.string(),
  subtitle: z.string().nullable(),
  type: z.string(),
  image: z.array(DownloadLinkModel),
  url: z.string(),
  description: z.string().nullable(),
  language: z.string().nullable()
})
