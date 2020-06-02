import { Router } from 'express'
import { adaptRoute } from '../adapters/express/express-route-adapter'

// ROUTES FACTORIES
import { makeAddSurveyController } from '../factories/controllers/surveys/add-survey/add-survey-controller.factory'
import { makeLoadSurveysController } from '../factories/controllers/surveys/load-surveys/load-surveys-controller.factory'
import { adminAuth } from '../middlewares/admin-auth'
import { auth } from '../middlewares/auth'

export default (router: Router): void => {
  router.post('/surveys', adminAuth, adaptRoute(makeAddSurveyController()))
  router.get('/surveys', auth, adaptRoute(makeLoadSurveysController()))
}
