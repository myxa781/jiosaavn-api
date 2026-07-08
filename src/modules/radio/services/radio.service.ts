// ponytail: orchestrate create station and get songs
import {
  CreateArtistStationUseCase,
  CreateGenreStationUseCase,
  GetFeaturedStationsUseCase,
  GetRadioSongsUseCase
} from '#modules/radio/use-cases'

export class RadioService {
  private readonly createGenreStation: CreateGenreStationUseCase
  private readonly createArtistStation: CreateArtistStationUseCase
  private readonly getRadioSongs: GetRadioSongsUseCase
  private readonly getFeaturedStations: GetFeaturedStationsUseCase

  constructor() {
    this.createGenreStation = new CreateGenreStationUseCase()
    this.createArtistStation = new CreateArtistStationUseCase()
    this.getRadioSongs = new GetRadioSongsUseCase()
    this.getFeaturedStations = new GetFeaturedStationsUseCase()
  }

  getFeaturedStationsList = async (language?: string) => {
    return await this.getFeaturedStations.execute({ language })
  }

  getGenreRadio = async (name: string, language: string, limit?: number) => {
    const stationId = await this.createGenreStation.execute({ name, language })
    return this.getRadioSongs.execute({ stationId, limit })
  }

  getArtistRadio = async (name: string, artistId: string, limit?: number) => {
    const stationId = await this.createArtistStation.execute({ name, artistId })
    return this.getRadioSongs.execute({ stationId, limit })
  }
}
