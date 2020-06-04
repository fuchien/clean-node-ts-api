import { makeLogControllerDecorator } from '@/main/factories/decorators/log-controller-decorator-factory'
import { makeDbLoadSurveys } from '@/main/factories/usecases/surveys/load-surveys/db-load-surveys-factory'
import { Controller } from '@/presentation/protocols'
import { LoadSurveysController } from '@/presentation/controllers/survey/load-survey/load-surveys-controller'

export const makeLoadSurveysController = (): Controller => {
  const dbLoadSurveys = makeDbLoadSurveys()
  const addSurveyController = new LoadSurveysController(dbLoadSurveys)
  return makeLogControllerDecorator(addSurveyController)
}
