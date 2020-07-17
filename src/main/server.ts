import { MongoHelper } from '../infra/db/mongodb/helpers/mongo-helper'
import env from './config/env'

MongoHelper.connect(env.mongoUrl)
  .then(async () => {
    (await import('./config/app'))
      .default.listen(env.port, () => console.log(`server Running at http://localhost:${env.port}`))
  })
  .catch(console.error)
