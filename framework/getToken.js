import dotenv from 'dotenv'
import { appReq, config } from '../agregator'
dotenv.config()
const { path, baseAuthUrl } = config()

export default async function getToken() {
  const requests = new appReq(null, baseAuthUrl, path)
  const authResp = await requests.getRefreshToken(process.env.REFRESH_TOKEN)
  return authResp.body.access_token
}
