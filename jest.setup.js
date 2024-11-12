import { getToken } from './agregator'

beforeAll(async () => {
  global.accessToken = await getToken()
})
