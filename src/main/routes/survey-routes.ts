import { Router } from 'express'
import { adaptRoute } from '../adapters/express/express-route-adapter'

// ROUTES FACTORIES
import { makeAddSurveyController } from '../factories/controllers/surveys/add-survey/add-survey-controller.factory'
import { makeAuthMiddleware } from '../factories/middlewares/authentication/auth-middleware-factory'
import { adaptMiddleware } from '../adapters/express/express-middleware-adapter'

export default (router: Router): void => {
  const adminAuth = adaptMiddleware(makeAuthMiddleware('admin'))
  router.post('/surveys', adminAuth, adaptRoute(makeAddSurveyController()))
}
