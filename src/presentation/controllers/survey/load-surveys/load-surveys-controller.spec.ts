import { LoadSurveysController } from './load-surveys-controller'
import { LoadSurveys } from './load-surveys-controller-protocols'
import { noContent, ok, serverError } from '../../../helpers/http/http-helper'
import MockDate from 'mockdate'
import { mockLoadSurveys } from '@/presentation/test'
import { mockSurveyModels } from '@/domain/test'
import { HttpRequest } from '../../login/login/login-controller-protocols'
type SutTypes = {
  sut: LoadSurveysController
  loadSurveysStub: LoadSurveys
}
const mockRequest = (): HttpRequest => ({
  accountId: 'any_id'
})

const makeSut = (): SutTypes => {
  const loadSurveysStub = mockLoadSurveys()
  const sut = new LoadSurveysController(loadSurveysStub)
  return {
    sut,
    loadSurveysStub
  }
}
describe('LoadSurveys Controller', () => {
  beforeEach(() => {
    MockDate.set(new Date())
  })

  afterAll(() => {
    MockDate.reset()
  })
  test('Should call LoadSurveys with correct value', async () => {
    const { sut, loadSurveysStub } = makeSut()
    const loadSpy = jest.spyOn(loadSurveysStub, 'load')
    const httpRequest = mockRequest()
    await sut.handle(mockRequest())
    expect(loadSpy).toHaveBeenCalledWith(httpRequest.accountId)
  })

  test('Should return 200 on success', async () => {
    const { sut } = makeSut()
    const httpResponse = await sut.handle(mockRequest())
    expect(httpResponse).toEqual(ok(mockSurveyModels()))
  })

  test('Should return 204 if LOadSurveys returns empty', async () => {
    const { sut, loadSurveysStub } = makeSut()
    jest.spyOn(loadSurveysStub, 'load').mockReturnValueOnce(Promise.resolve([]))
    const httpResponse = await sut.handle(mockRequest())
    expect(httpResponse).toEqual(noContent())
  })

  test('Should return 500 if AddSurvey throws', async () => {
    const { sut, loadSurveysStub } = makeSut()
    jest.spyOn(loadSurveysStub, 'load').mockReturnValueOnce(Promise.reject(new Error()))
    const httpResponse = await sut.handle(mockRequest())
    expect(httpResponse).toEqual(serverError(new Error()))
  })
})
