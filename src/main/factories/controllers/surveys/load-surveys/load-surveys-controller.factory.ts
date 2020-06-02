import { Controller } from '../../../../../presentation/protocols'
import { makeLogControllerDecorator } from '../../../decorators/log-controller-decorator-factory'
import { LoadSurveysController } from '../../../../../presentation/controllers/survey/load-survey/load-surveys-controller'
import { makeDbLoadSurveys } from '../../../usecases/surveys/load-surveys/db-load-surveys-factory'

export const makeLoadSurveysController = (): Controller => {
  const dbLoadSurveys = makeDbLoadSurveys()
  const addSurveyController = new LoadSurveysController(dbLoadSurveys)
  return makeLogControllerDecorator(addSurveyController)
}
