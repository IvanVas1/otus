import dotenv from 'dotenv'
import { appReq, config, randomRecipe } from '../../agregator'
import { faker } from '@faker-js/faker'

dotenv.config()

const { baseFeedbackUrl, path } = config()

let requests
let randomRecipeId

describe('Проверка эндпоинта POST feedback', () => {
  beforeAll(async () => {
    requests = new appReq(baseFeedbackUrl, null, path)
    const recipeList = await requests.getRecipesList(global.accessToken)
    randomRecipeId = randomRecipe(recipeList.body.response)
  })

  it('Проверка запроса на отправку отзыва о рецепте', async () => {
    let reqBody = {
      stars: faker.number.int({ min: 1, max: 5 }),
      complaintComment: faker.lorem.sentence(),
      recipe: randomRecipeId,
    }
    const response = await requests.feedback(global.accessToken, reqBody)
    expect(response.status).toBe(204)
  })
})
