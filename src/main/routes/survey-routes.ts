import { Router } from 'express'
import { adaptRoute } from '../adapters/express/express-route-adapter'

// ROUTES FACTORIES
import { makeAddSurveyController } from '../factories/controllers/surveys/add-survey/add-survey-controller.factory'
import { makeAuthMiddleware } from '../factories/middlewares/authentication/auth-middleware-factory'
import { adaptMiddleware } from '../adapters/express/express-middleware-adapter'
import { makeLoadSurveysController } from '../factories/controllers/surveys/load-surveys/load-surveys-controller.factory'

export default (router: Router): void => {
  const adminAuth = adaptMiddleware(makeAuthMiddleware('admin'))
  const auth = adaptMiddleware(makeAuthMiddleware())
  router.post('/surveys', adminAuth, adaptRoute(makeAddSurveyController()))
  router.get('/surveys', auth, adaptRoute(makeLoadSurveysController()))
}
