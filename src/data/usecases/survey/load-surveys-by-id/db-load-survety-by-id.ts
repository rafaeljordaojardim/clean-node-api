import { LoadSurveyByIdRepository, SurveyModel, LoadSurveyById } from './db-load-survety-by-id-protocols'

export class DbLoadSurveyById implements LoadSurveyById {
  constructor (private readonly loadSurveyById: LoadSurveyByIdRepository) {}
  async loadById (id: string): Promise<SurveyModel> {
    const survey = await this.loadSurveyById.loadById(id)
    return survey
  }
}
