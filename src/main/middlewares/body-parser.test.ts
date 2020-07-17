import request from 'supertest'
import app from '../config/app'

describe('Body Parser Middleware', () => {
  test('sould parse body as json', async () => {
    app.post('/test_body_parser', (req, res) => {
      res.send(req.body)
    })
    await request(app)
      .post('/test_body_parser')
      .send({ name: 'rafael' })
      .expect({ name: 'rafael' })
  })
})
