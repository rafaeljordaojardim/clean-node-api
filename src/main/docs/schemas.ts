import { accountSchema, errorSchema, loginParamsSchema, surveyAnswerSchema, surveySchema, surveysSchema, signupParamsSchema, addSurveyParamsSchema, saveSurveyParamsSchema, surveyResultSchema, surveyResultAnswerSchema } from './schemas/'

export default {
  account: accountSchema,
  loginParams: loginParamsSchema,
  signUpParams: signupParamsSchema,
  error: errorSchema,
  surveys: surveysSchema,
  survey: surveySchema,
  surveyAnswer: surveyAnswerSchema,
  addSurveyParams: addSurveyParamsSchema,
  saveSurveyParams: saveSurveyParamsSchema,
  surveyResult: surveyResultSchema,
  surveyResultAnswer: surveyResultAnswerSchema
}
