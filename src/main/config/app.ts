import express from 'express'
import setupMddlewares from './middlewares'

const app = express()
setupMddlewares(app)

export default app
