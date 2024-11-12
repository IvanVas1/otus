import dotenv from 'dotenv'
import { appReq, config, randomRecipe } from '../../agregator'

dotenv.config()

const { baseFeedbackUrl, path } = config()

let requests
let randomRecipeId

describe('Проверка неавторизованных запросов для feedback-service', () => {
  beforeAll(async () => {
    requests = new appReq(baseFeedbackUrl, null, path)
    const recipeList = await requests.getRecipesList(global.accessToken)
    randomRecipeId = randomRecipe(recipeList.body.response)
  })

  it('Unauthorized  POST /feedback', async () => {
    const response = await requests.feedback(null, '')

    expect(response.status).toBe(401)
    expect(response.body).toHaveProperty('type', expect.any(String))
    expect(response.body).toHaveProperty('title', expect.any(String))
    expect(response.body).toHaveProperty('detail', expect.any(String))
  })

  it('Unauthorized  GET /profile/wishlist', async () => {
    const response = await requests.profileWishlist(null)

    expect(response.status).toBe(401)
    expect(response.body).toHaveProperty('type', expect.any(String))
    expect(response.body).toHaveProperty('title', expect.any(String))
    expect(response.body).toHaveProperty('detail', expect.any(String))
  })

  it('Unauthorized  PUT /profile/{id/}wishlist', async () => {
    const response = await requests.putRecipesWish(null, randomRecipeId)

    expect(response.status).toBe(401)
    expect(response.body).toHaveProperty('type', expect.any(String))
    expect(response.body).toHaveProperty('title', expect.any(String))
    expect(response.body).toHaveProperty('detail', expect.any(String))
  })

  it('Unauthorized  delete /profile/{id/}wishlist', async () => {
    const response = await requests.deleteRecipesWish(null, randomRecipeId)

    expect(response.status).toBe(401)
    expect(response.body).toHaveProperty('type', expect.any(String))
    expect(response.body).toHaveProperty('title', expect.any(String))
    expect(response.body).toHaveProperty('detail', expect.any(String))
  })

  it('Unauthorized  GET /profile/likes', async () => {
    const response = await requests.likes(null)

    expect(response.status).toBe(401)
    expect(response.body).toHaveProperty('type', expect.any(String))
    expect(response.body).toHaveProperty('title', expect.any(String))
    expect(response.body).toHaveProperty('detail', expect.any(String))
  })

  it('Unauthorized  PUT /profile/{id/}likes', async () => {
    const response = await requests.putRecipesLike(null, randomRecipeId)

    expect(response.status).toBe(401)
    expect(response.body).toHaveProperty('type', expect.any(String))
    expect(response.body).toHaveProperty('title', expect.any(String))
    expect(response.body).toHaveProperty('detail', expect.any(String))
  })

  it('Unauthorized  delete /profile/{id/}likes', async () => {
    const response = await requests.deleteRecipesLike(null, randomRecipeId)

    expect(response.status).toBe(401)
    expect(response.body).toHaveProperty('type', expect.any(String))
    expect(response.body).toHaveProperty('title', expect.any(String))
    expect(response.body).toHaveProperty('detail', expect.any(String))
  })

  it('Unauthorized  GET /feedback-package', async () => {
    const response = await requests.likes(null)

    expect(response.status).toBe(401)
    expect(response.body).toHaveProperty('type', expect.any(String))
    expect(response.body).toHaveProperty('title', expect.any(String))
    expect(response.body).toHaveProperty('detail', expect.any(String))
  })
})
