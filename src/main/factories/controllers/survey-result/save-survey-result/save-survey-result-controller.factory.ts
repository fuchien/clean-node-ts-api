import { makeLogControllerDecorator } from '@/main/factories/decorators/log-controller-decorator-factory'
import { Controller } from '@/presentation/protocols'
import { SaveSurveyResultController } from '@/presentation/controllers/survey-result/save-survey-result-controller/save-survey-result-controller'
import { makeDbLoadSurveyById } from '@/main/factories/usecases/surveys/load-survey-by-id/db-load-survey-by-id-factory'
import { makeSaveSurveyResult } from '@/main/factories/usecases/survey-result/save-survey-result/save-survey-result-factory'

export const makeSaveSurveyResultController = (): Controller => {
  const addSurveyController = new SaveSurveyResultController(makeDbLoadSurveyById(), makeSaveSurveyResult())
  return makeLogControllerDecorator(addSurveyController)
}
