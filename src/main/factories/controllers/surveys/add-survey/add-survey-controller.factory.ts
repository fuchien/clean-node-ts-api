import { Controller } from '../../../../../presentation/protocols'
import { makeAddSurveyValidation } from './add-survey-validation-factory'
import { makeLogControllerDecorator } from '../../../decorators/log-controller-decorator-factory'
import { AddSurveyController } from '../../../../../presentation/controllers/survey/add-survey/add-survey-controller'
import { makeDbAddSurvey } from '../../../usecases/surveys/add-survey/db-add-survey-factory'

export const makeAddSurveyController = (): Controller => {
  const dbAddSurvey = makeDbAddSurvey()
  const addSurveyValidation = makeAddSurveyValidation()
  const addSurveyController = new AddSurveyController(addSurveyValidation, dbAddSurvey)
  return makeLogControllerDecorator(addSurveyController)
}
