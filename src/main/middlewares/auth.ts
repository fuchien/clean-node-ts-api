import { adaptMiddleware } from '../adapters/express/express-middleware-adapter'
import { makeAuthMiddleware } from '../factories/middlewares/authentication/auth-middleware-factory'

export const auth = adaptMiddleware(makeAuthMiddleware())
