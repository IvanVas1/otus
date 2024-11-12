module.exports = (env = null) => {
  const realEnv = env || process.env.TEST_ENV || 'stage'
  const config = {
    stage: {
      baseFeedbackUrl: 'https://api-gateway.stage.tbhub.ru',
      baseAuthUrl: 'https://auth-stage.bork.ru',
      path: '/api/v1/recipe',
      mobilePhone: '79999999993',
      mobilePhone2: '79999999999',
      recipeId: '3a136eff-5344-4ae5-2c73-0ba5ffd0c468',
      deviceId: '3a118afd-5009-7243-377e-5dc9d24933ce',
    },
  }
  return config[realEnv] || config.stage
}
