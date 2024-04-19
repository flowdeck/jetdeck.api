import { Request, Response, NextFunction, query } from 'express'
import { AnyZodObject } from 'zod'

const validate = (schema) => (req: Request, res: Response, next: NextFunction) {
  try {
    schema.parse({
      body: req.body,
      query: req.query,
      params: req.params,
    })
    // next()
  } catch (error: any) {
    res.status(400).json({ error: error.errors })
  }
}

export default validate
