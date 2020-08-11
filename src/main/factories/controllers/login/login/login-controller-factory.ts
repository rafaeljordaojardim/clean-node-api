import { Controller } from '@/presentation/protocols'
import { makeDbAuthentication } from '@/main/factories/usecases/account/authentication/db-authentication-factory'
import { makeLogControllerDecorator } from '@/main/factories/decorators/log-controller-decorator-factory'
import { LoginControler } from '@/presentation/controllers/login/login/login-controller'
import { makeLoginValidation } from './login-validation-factory'

export const makeLoginController = (): Controller => {
  const dbAuthentication = makeDbAuthentication()
  const validator = makeLoginValidation()
  return makeLogControllerDecorator(new LoginControler(dbAuthentication, validator))
}
