import { Controller } from '../../../../presentation/protocols'
import { LoginControler } from '../../../../presentation/controllers/login/login/login-controller'
import { makeLoginValidation } from './login-validation-factory'
import { makeDbAuthentication } from '../../usecases/authentication/db-authentication-factory'
import { makeLogControllerDecorator } from '../../decorators/log-controller-decorator-factory'

export const makeLoginController = (): Controller => {
  const dbAuthentication = makeDbAuthentication()
  const validator = makeLoginValidation()
  return makeLogControllerDecorator(new LoginControler(dbAuthentication, validator))
}
