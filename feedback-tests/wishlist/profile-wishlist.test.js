import dotenv from 'dotenv'
import { appReq, config } from '../../agregator'

dotenv.config()

const { baseFeedbackUrl, path } = config()

let requests
let response

describe('Проверка эндпоинта GET profile/wishlist', () => {
  beforeAll(async () => {
    requests = new appReq(baseFeedbackUrl, null, path)
  })

  it('Проверка списка избранных рецептов', async () => {
    response = await requests.profileWishlist(global.accessToken)

    expect(response.status).toBe(200)
    expect(response.body).toHaveProperty('type', expect.any(String))
    expect(response.body).toHaveProperty('hash', expect.any(String))
    expect(response.body).toHaveProperty('totalItems', expect.any(Number))
    expect(response.body).toHaveProperty('response', expect.any(Array))
  })
})
