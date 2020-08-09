export type SurveyModel = {
  id: string
  question: string
  answers: SurveyAnswerModel[]
  date: Date
  didAnswer?: Boolean
}

type SurveyAnswerModel = {
  image?: string
  answer: string
}
