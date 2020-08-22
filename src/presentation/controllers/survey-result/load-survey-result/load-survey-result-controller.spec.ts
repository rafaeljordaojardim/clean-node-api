import { mockLoadSurveyById } from '@/presentation/test'
import { HttpRequest } from '../../login/login/login-controller-protocols'
import { LoadSurveyResultController } from './load-survey-result-controller'

const makeFakeRequest = (): HttpRequest => ({
  params: {
    surveyId: 'any_id'
  }
})

describe('LoadSurveyResul Controller', () => {
  test('Should call LoadSurveyById with correct value', async () => {
    const loadSurveyByIdStub = mockLoadSurveyById()
    const loadByIdSpy = jest.spyOn(loadSurveyByIdStub, 'loadById')
    const sut = new LoadSurveyResultController(loadSurveyByIdStub)
    await sut.handle(makeFakeRequest())
    expect(loadByIdSpy).toHaveBeenCalledWith('any_id')
  })
})
