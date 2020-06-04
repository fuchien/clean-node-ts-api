import { makeLoginValidation } from './login-validation-factory'
import { makeDbAuthentication } from '@/main/factories/usecases/authentication/db-authentication-factory'
import { makeLogControllerDecorator } from '@/main/factories/decorators/log-controller-decorator-factory'
import { Controller } from '@/presentation/protocols'
import { LoginController } from '@/presentation/controllers/login/login/login-controller'

export const makeLoginController = (): Controller => {
  const dbAuthentication = makeDbAuthentication()
  const loginValidation = makeLoginValidation()
  const loginController = new LoginController(dbAuthentication, loginValidation)
  return makeLogControllerDecorator(loginController)
}
