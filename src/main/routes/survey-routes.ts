import { Router } from 'express'
import { adaptRoute } from '../adapters/express/express-route-adapter'

// ROUTES FACTORIES
import { makeAddSurveyController } from '../factories/controllers/surveys/add-survey/add-survey-controller.factory'

export default (router: Router): void => {
  router.post('/surveys', adaptRoute(makeAddSurveyController()))
}
