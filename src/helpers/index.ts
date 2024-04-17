import crypto from 'crypto'

export const randomUser = () => {
  return process.env.SECRET
}

export const random = () => crypto.randomBytes(128).toString('base64')

export const getHashedPassword = (salt: string, password: string) => {
  if (!process.env.SECRET) {
    throw new Error('Missing environment variable: SECRET')
  }

  return crypto.createHmac('sha256', [salt, password].join('/')).update(process.env.SECRET).digest('hex')
}
