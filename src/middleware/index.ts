import express from 'express'
import { get, identity, merge } from 'lodash'
import { getUserBySessionToken } from '../db/users'

export const isAuthenticated = async (req: express.Request, res: express.Response, next: express.NextFunction) => {
  // const sessionToken = get(req, 'cookies.sessionToken')
  const sessionToken = req.cookies['jetdeck-auth']

  if (!sessionToken) {
    return res.status(401).json({ message: 'Unauthorized' })
  }

  const user = await getUserBySessionToken(sessionToken)

  if (!user) {
    return res.status(401).json({ message: 'Unauthorized' })
  }

  //* Attach the user to the request object
  merge(req, { identity: user })

  return next()
}
