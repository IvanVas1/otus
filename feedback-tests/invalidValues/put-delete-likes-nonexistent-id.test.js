import dotenv from 'dotenv'
import { appReq, config, randomRecipe } from '../../agregator'

dotenv.config()

const { baseFeedbackUrl, path } = config()

let requests
const nonexistentId = '3a136efe-dcea-c7c9-8c9d-3b33bb985000'

describe('Проверка эндпоинтов /like с некорректным recipeId', () => {
  beforeAll(async () => {
    requests = new appReq(baseFeedbackUrl, null, path)
  })

  it('Проверка метода добавления в понравившиеся c несуществующим recipeId', async () => {
    const response = await requests.putRecipesLike(
      global.accessToken,
      nonexistentId,
    )

    expect(response.status).toBe(404)
    expect(response.body).toHaveProperty('type', expect.any(String))
    expect(response.body).toHaveProperty('title', expect.any(String))
    expect(response.body).toHaveProperty('status', 404)
    expect(response.body).toHaveProperty('traceId', expect.any(String))
  })

  it('Проверка метода удаления из списка понравившихся c несуществующим recipeId', async () => {
    const response = await requests.deleteRecipesLike(
      global.accessToken,
      nonexistentId,
    )

    expect(response.status).toBe(404)
    expect(response.body).toHaveProperty('type', expect.any(String))
    expect(response.body).toHaveProperty('title', expect.any(String))
    expect(response.body).toHaveProperty('status', 404)
    expect(response.body).toHaveProperty('traceId', expect.any(String))
  })
})
