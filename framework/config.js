module.exports = (env = null) => {
  const realEnv = env || process.env.TEST_ENV || 'stage'
  const config = {
    stage: {
      baseFeedbackUrl: 'https://api-gateway.stage.tbhub.ru',
      baseAuthUrl: 'https://auth-stage.bork.ru',
      path: '/api/v1/recipe',
    },
  }
  return config[realEnv] || config.stage
}
