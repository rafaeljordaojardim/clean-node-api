import { MissingParamError } from '../../../errors'
import { badRequest, serverError, unauthorized, ok } from '../../../helpers/http/http-helper'
import { HttpRequest, Authentication, Validation } from './login-controller-protocols'
import { LoginControler } from './login-controller'
import { mockAuthentication } from '@/presentation/test'
import { mockValidation } from '@/validation/test'

type SutTypes = {
  sut: LoginControler
  validationStub: Validation
  authenticationStub: Authentication
}
const makeSut = (): SutTypes => {
  const validationStub = mockValidation()
  const authenticationStub = mockAuthentication()
  const sut = new LoginControler(authenticationStub, validationStub)
  return {
    sut,
    validationStub,
    authenticationStub
  }
}

const mockRequest = (): HttpRequest => ({
  body: {
    email: 'any_email@mail.com',
    password: 'any_password'
  }
})

describe('Login Controller', () => {
  test('Sould call Authentication with correct values', async () => {
    const { sut, authenticationStub } = makeSut()
    const authSpy = jest.spyOn(authenticationStub, 'auth')
    const httpRequest = mockRequest()
    await sut.handle(httpRequest)
    expect(authSpy).toHaveBeenCalledWith({ email: 'any_email@mail.com', password: 'any_password' })
  })

  test('Sould return 401 if invalid credentials are provided', async () => {
    const { sut, authenticationStub } = makeSut()
    jest.spyOn(authenticationStub, 'auth').mockResolvedValueOnce(null)
    const httpRequest = mockRequest()
    const httpResponse = await sut.handle(httpRequest)
    expect(httpResponse).toEqual(unauthorized())
  })

  test('Sould return 500 if Authentication throws', async () => {
    const { sut, authenticationStub } = makeSut()
    jest.spyOn(authenticationStub, 'auth').mockImplementationOnce(() => {
      throw new Error()
    })
    const httpRequest = mockRequest()
    const httpResponse = await sut.handle(httpRequest)
    expect(httpResponse).toEqual(serverError(new Error()))
  })

  test('Sould return 200 if valid credentials are provided', async () => {
    const { sut } = makeSut()
    const httpRequest = mockRequest()
    const httpResponse = await sut.handle(httpRequest)
    expect(httpResponse).toEqual(ok({
      accessToken: 'any_token',
      name: 'any_name'
    }))
  })

  test('Should call Validation with correct values', async () => {
    const { sut, validationStub } = makeSut()
    const validateSpy = jest.spyOn(validationStub, 'validate')
    const httpRequest = mockRequest()
    await sut.handle(httpRequest)
    expect(validateSpy).toHaveBeenCalledWith(httpRequest.body)
  })

  test('Should return 400 if Validation returns an error', async () => {
    const { sut, validationStub } = makeSut()
    jest.spyOn(validationStub, 'validate').mockReturnValueOnce(new MissingParamError('any_field'))
    const httpRequest = mockRequest()
    const httpResponse = await sut.handle(httpRequest)
    expect(httpResponse).toEqual(badRequest(new MissingParamError('any_field')))
  })
})
