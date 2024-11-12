const request = require('supertest')

class Requests {
  constructor(baseFeedbackUrl, baseAuthUrl, path) {
    this.feedbackRequests = request(baseFeedbackUrl)
    this.authRequests = request(baseAuthUrl)
    this.path = path
  }

  //Записать Feedback по рецепту
  async feedback(token, reqBody) {
    return await this.feedbackRequests
      .post(`${this.path}/feedback`)
      .set('accept', '*/*')
      .set('Authorization', `Bearer ${token}`)
      .send(reqBody)
  }

  //Получение списка избранных рецептов
  async profileWishlist(token) {
    return await this.feedbackRequests
      .get(`${this.path}/profile/wishlist`)
      .set('accept', 'text/plain')
      .set('Authorization', `Bearer ${token}`)
  }

  //Добавление рецептов в избранное
  async putRecipesWish(token, recipeId) {
    return await this.feedbackRequests
      .put(`${this.path}/recipes/${recipeId}/wish`)
      .set('accept', 'text/plain')
      .set('Authorization', `Bearer ${token}`)
  }

  //Удаление рецептов из избранного
  async deleteRecipesWish(token, recipeId) {
    return await this.feedbackRequests
      .delete(`${this.path}/recipes/${recipeId}/wish`)
      .set('accept', 'text/plain')
      .set('Authorization', `Bearer ${token}`)
  }

  //Получение списка лайков
  async likes(token) {
    return await this.feedbackRequests
      .get(`${this.path}/profile/likes`)
      .set('accept', 'text/plain')
      .set('Authorization', `Bearer ${token}`)
  }

  //Добавление лайка рецепту
  async putRecipesLike(token, recipeId) {
    return await this.feedbackRequests
      .put(`${this.path}/recipes/${recipeId}/like`)
      .set('accept', 'text/plain')
      .set('Authorization', `Bearer ${token}`)
  }

  //Удаление лайка с рецепта
  async deleteRecipesLike(token, recipeId) {
    return await this.feedbackRequests
      .delete(`${this.path}/recipes/${recipeId}/like`)
      .set('accept', 'text/plain')
      .set('Authorization', `Bearer ${token}`)
  }

  //Рефреш токена
  async getRefreshToken(refreshToken) {
    return this.authRequests.post('/refresh').send({
      refresh_token: refreshToken,
    })
  }
  //Получение списка рецептов
  async getRecipesList(token) {
    return this.feedbackRequests
      .get(`${this.path}/recipes`)
      .set('Authorization', `Bearer ${token}`)
  }
}

module.exports = Requests
