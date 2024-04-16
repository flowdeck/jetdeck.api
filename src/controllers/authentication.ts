import express from 'express'

import { getUserByUsername, createUser } from '../db/users'
import { authentication, random } from '../helpers'

export const register = async (req: express.Request, res: express.Response) => {
  try {
    const { email, password, username } = req.body

    if (!email || !password || !username) {
      return res.sendStatus(400)
    }

    const existingUser = await getUserByUsername(username)

    if (existingUser) {
      return res.sendStatus(400)
    }

    const salt = random()

    const user = await createUser({
      username,
      authentication: {
        salt,
        password: authentication(salt, password),
      },
    })

    return res.status(200).json(user)
  } catch (error) {
    console.log(error)
    return res.sendStatus(400)
  }
}
