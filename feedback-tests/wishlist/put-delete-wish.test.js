import dotenv from 'dotenv'
import { appReq, config, randomRecipe } from '../../agregator'

dotenv.config()

const { baseFeedbackUrl, path, recipeId } = config()

let requests
let randomRecipeId

describe('Проверка эндпоинта GET profile/wishlist', () => {
  beforeAll(async () => {
    requests = new appReq(baseFeedbackUrl, null, path)

    const recipeList = await requests.getRecipesList(global.accessToken)
    randomRecipeId = randomRecipe(recipeList.body.response)
  })

  it('Проверка метода добавления в избранное', async () => {
    const response = await requests.putRecipesWish(
      global.accessToken,
      randomRecipeId,
    )
    expect(response.status).toBe(204)
  })

  it('Проверка что рецепт в списке избранных', async () => {
    const response = await requests.profileWishlist(global.accessToken)

    expect(response.status).toBe(200)

    const respRecipeList = response.body.response
    respRecipeList.forEach(recipes => {
      expect(recipes.recipe).toHaveProperty(
        'defaultPortionsCount',
        expect.any(Number),
      )
      expect(recipes.recipe).toHaveProperty('likesCount', expect.any(Number))
      expect(recipes.recipe).toHaveProperty('name', expect.any(String))
      expect(recipes.recipe).toHaveProperty('complexity', expect.any(Object))
      expect(recipes.recipe).toHaveProperty('id', randomRecipeId)
      expect(recipes.recipe).toHaveProperty('inWishlist', true)
      expect(recipes.recipe).toHaveProperty('liked', expect.any(Boolean))
      expect(recipes.recipe).toHaveProperty('michelin', expect.any(Boolean))
      expect(recipes.recipe).toHaveProperty('isLuckyGroup', expect.any(Boolean))
      expect(recipes.recipe).toHaveProperty('noisy', expect.any(Boolean))
      // expect(recipes.recipe).toHaveProperty('image', expect.any(Object))
      expect(recipes.recipe).toHaveProperty('updatedAt', expect.any(String))
    })
  })

  it('Проверка метода удаления из избранных', async () => {
    const response = await requests.deleteRecipesWish(
      global.accessToken,
      randomRecipeId,
    )
    expect(response.status).toBe(204)
  })

  it('Проверка что после удаления рецепта нет в списке избранных', async () => {
    const response = await requests.profileWishlist(global.accessToken)
    const respRecipeList = response.body.response
    expect(respRecipeList.length).toBe(0)
  })
})
