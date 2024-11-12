import dotenv from 'dotenv'
import { appReq, config } from '../../agregator'

dotenv.config()

const { baseFeedbackUrl, path } = config()

let requests
let response

describe('Проверка эндпоинта GET profile/likes', () => {
  beforeAll(async () => {
    requests = new appReq(baseFeedbackUrl, null, path)
    response = await requests.likes(global.accessToken)
  })

  it('Проверка списка избранных рецептов', async () => {
    expect(response.status).toBe(200)
    expect(response.body).toHaveProperty('type', expect.any(String))
    expect(response.body).toHaveProperty('hash', expect.any(String))
    expect(response.body).toHaveProperty('totalItems', expect.any(Number))
    expect(response.body).toHaveProperty('lastModifiedAt', expect.any(String))
    expect(response.body).toHaveProperty('response', expect.any(Array))
  })
})
