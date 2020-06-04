import { makeDbLoadAccountByToken } from '../../usecases/account/load-account-by-token/db-load-account-by-token-factory copy'
import { Middleware } from '@/presentation/protocols'
import { AuthMiddleware } from '@/presentation/middlewares/authentication/auth-middleware'

export const makeAuthMiddleware = (role?: string): Middleware => {
  const dbLoadAccountByToken = makeDbLoadAccountByToken()
  return new AuthMiddleware(dbLoadAccountByToken, role)
}
