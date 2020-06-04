import { adaptRoute } from '@/main/adapters/express/express-route-adapter'

// ROUTES FACTORIES
import { makeAddSurveyController } from '@/main/factories/controllers/surveys/add-survey/add-survey-controller.factory'
import { makeLoadSurveysController } from '@/main/factories/controllers/surveys/load-surveys/load-surveys-controller.factory'
import { adminAuth } from '@/main/middlewares/admin-auth'
import { auth } from '@/main/middlewares/auth'
import { Router } from 'express'

export default (router: Router): void => {
  router.post('/surveys', adminAuth, adaptRoute(makeAddSurveyController()))
  router.get('/surveys', auth, adaptRoute(makeLoadSurveysController()))
}
