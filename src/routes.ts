import { Express, Request, Response } from 'express'
import { createUserHandler } from './controller/user.controller'

function routes(app: Express) {
  app.get('/healthcheck', (req: Request, res: Response) => {
    res.status(200).send('OK')
  })

  app.post('/users', createUserHandler)
}

export default routes
