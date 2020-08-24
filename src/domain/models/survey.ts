export interface SurveyModel {
  id: string
  question: string
  answers: SurveyAnswer[]
  date: Date
  didAnswer?: boolean
}

export interface SurveyAnswer {
  image?: string
  answer: string
}
