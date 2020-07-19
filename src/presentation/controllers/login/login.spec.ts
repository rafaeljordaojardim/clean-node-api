import { MissingParamError } from '../../errors'
import { badRequest } from '../../helpers/http-helper'
import { LoginControler } from './login'

describe('Login Controller', () => {
  test('Sould return 400 if no email is provide', async () => {
    const sut = new LoginControler()
    const httpRequest = {
      body: {
        password: 'any_password'
      }
    }
    const httpResponse = await sut.handle(httpRequest)
    expect(httpResponse).toEqual(badRequest(new MissingParamError('email')))
  })

  test('Sould return 400 if no password is provide', async () => {
    const sut = new LoginControler()
    const httpRequest = {
      body: {
        email: 'any_email@mail.com'
      }
    }
    const httpResponse = await sut.handle(httpRequest)
    expect(httpResponse).toEqual(badRequest(new MissingParamError('password')))
  })
})
