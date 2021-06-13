// This is an example of to protect an API route
import { getSession } from 'next-auth/client'
import jwt from 'next-auth/jwt'
const secret = process.env.SECRET_KEY

export default async (req, res) => {
  const session = await getSession({ req })
  
  const token = await jwt.getToken({ req, secret })
  // if (token) {
  //   /// do something here after authentication
  // }
  // else {
  //   //
  // }

  if (session) {
    res.send({ content: 'This is protected content. You can access this content because you are signed in.' })
  } else {
    res.send({ error: 'You must be sign in to view the protected content on this page.' })
  }
}