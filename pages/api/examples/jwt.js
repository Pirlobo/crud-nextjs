// This is an example of how to read a JSON Web Token from an API route
import jwt from 'next-auth/jwt'

const secret = 'd0a10c344d37037f992291d538836d5a'

export default async (req, res) => {
  const token = await jwt.getToken({ req, secret })
  const json = JSON.stringify(token, null, 2)
  res.send(json)
}
