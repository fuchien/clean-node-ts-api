import { makeAddSurveyValidation } from './add-survey-validation-factory'
import { makeLogControllerDecorator } from '@/main/factories/decorators/log-controller-decorator-factory'
import { makeDbAddSurvey } from '@/main/factories/usecases/surveys/add-survey/db-add-survey-factory'
import { Controller } from '@/presentation/protocols'
import { AddSurveyController } from '@/presentation/controllers/survey/add-survey/add-survey-controller'

export const makeAddSurveyController = (): Controller => {
  const dbAddSurvey = makeDbAddSurvey()
  const addSurveyValidation = makeAddSurveyValidation()
  const addSurveyController = new AddSurveyController(addSurveyValidation, dbAddSurvey)
  return makeLogControllerDecorator(addSurveyController)
}
