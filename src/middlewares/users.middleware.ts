import { NextFunction, Request, Response } from 'express'

export const validatorSignIn = (req: Request, res: Response, next: NextFunction) => {
  const { email, password } = req.body
  if (!email || !password)
    return res.status(401).json({
      error: 'email or password invalid'
    })
  next()
}
