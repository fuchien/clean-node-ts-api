import { SignUpController } from '../../../../../presentation/controllers/login/signup/signup-controller'
import { Controller } from '../../../../../presentation/protocols'
import { makeSignUpValidation } from './signup-validation-factory'
import { makeDbAuthentication } from '../../../usecases/authentication/db-authentication-factory'
import { makeDbAddAccount } from '../../../usecases/account/add-account/db-add-account-factory'
import { makeLogControllerDecorator } from '../../../decorators/log-controller-decorator-factory'

export const makeSignUpController = (): Controller => {
  const dbAddAccount = makeDbAddAccount()
  const dbAuthentication = makeDbAuthentication()
  const signUpValidation = makeSignUpValidation()
  const signUpController = new SignUpController(dbAddAccount, signUpValidation, dbAuthentication)
  return makeLogControllerDecorator(signUpController)
}
