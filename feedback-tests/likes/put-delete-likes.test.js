import dotenv from 'dotenv'
import { appReq, config, getRandomRecipes } from '../../agregator'

dotenv.config()

const { baseFeedbackUrl, path } = config()

let requests
let singleRecipeId

describe('Проверка эндпоинта profile/likes', () => {
  beforeAll(async () => {
    requests = new appReq(baseFeedbackUrl, null, path)
    const recipeList = await requests.getRecipesList(global.accessToken)
    singleRecipeId = getRandomRecipes(recipeList.body.response)
  })

  it('Проверка метода добавления в понравившиеся', async () => {
    const response = await requests.putRecipesLike(
      global.accessToken,
      singleRecipeId,
    )

    expect(response.status).toBe(200)
    expect(response.body).toHaveProperty('type', expect.any(String))
    expect(response.body).toHaveProperty('hash', expect.any(String))
    expect(response.body).toHaveProperty('lastModifiedAt', expect.any(String))
    expect(response.body.response).toHaveProperty('id', singleRecipeId)
    expect(response.body.response.likesCount).toBeGreaterThan(0)
  })

  it('Проверка что рецепт в списке понравившихся', async () => {
    const response = await requests.likes(global.accessToken)
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
      expect(recipes.recipe).toHaveProperty('id', singleRecipeId)
      expect(recipes.recipe).toHaveProperty('inWishlist', expect.any(Boolean))
      expect(recipes.recipe).toHaveProperty('liked', true)
      expect(recipes.recipe).toHaveProperty('michelin', expect.any(Boolean))
      expect(recipes.recipe).toHaveProperty('isLuckyGroup', expect.any(Boolean))
      expect(recipes.recipe).toHaveProperty('noisy', expect.any(Boolean))
      expect(recipes.recipe).toHaveProperty('image', expect.any(Object))
      expect(recipes.recipe).toHaveProperty('updatedAt', expect.any(String))
    })
  })

  it('Проверка метода удаления из списка понравившихся', async () => {
    const response = await requests.deleteRecipesLike(
      global.accessToken,
      singleRecipeId,
    )

    expect(response.status).toBe(204)
  })

  it('Проверка что после удаления рецепта нет в списке понравившихся', async () => {
    const response = await requests.likes(global.accessToken)

    const respRecipeList = response.body.response
    expect(respRecipeList.length).toBe(0)
  })
})

describe('Проверка эндпоинта profile/likes - несколько рецептов', () => {
  let threeRandomIds
  let response

  beforeAll(async () => {
    requests = new appReq(baseFeedbackUrl, null, path)
    const recipeList = await requests.getRecipesList(global.accessToken)
    threeRandomIds = getRandomRecipes(recipeList.body.response, 3)
  })

  it('Проверка метода добавления в понравившиеся  - несколько рецептов', async () => {
    for (const recipeId of threeRandomIds) {
      response = await requests.putRecipesLike(global.accessToken, recipeId)
    }

    expect(response.status).toBe(200)
    expect(response.body).toHaveProperty('type', expect.any(String))
    expect(response.body).toHaveProperty('hash', expect.any(String))
    expect(response.body).toHaveProperty('lastModifiedAt', expect.any(String))
    expect(response.body.response.likesCount).toBeGreaterThan(0)
  })

  it('Проверка что рецепты в списке понравившихся  - несколько рецептов', async () => {
    response = await requests.likes(global.accessToken)
    expect(response.status).toBe(200)
    const respRecipeList = response.body.response
    expect(respRecipeList.length).toBeGreaterThanOrEqual(threeRandomIds.length)
    threeRandomIds.forEach(id => {
      const foundRecipe = respRecipeList.find(recipe => recipe.recipe.id === id)
      expect(foundRecipe).toBeDefined()
      expect(foundRecipe.recipe.liked).toBe(true)
    })
  })

  it('Проверка метода удаления из списка понравившихся  - несколько рецептов', async () => {
    for (const recipeId of threeRandomIds) {
      response = await requests.deleteRecipesLike(global.accessToken, recipeId)
    }
    expect(response.status).toBe(204)
  })

  it('Проверка что после удаления рецептов нет в списке понравившихся  - несколько рецептов', async () => {
    const response = await requests.likes(global.accessToken)

    const respRecipeList = response.body.response
    expect(respRecipeList.length).toBe(0)
  })
})
