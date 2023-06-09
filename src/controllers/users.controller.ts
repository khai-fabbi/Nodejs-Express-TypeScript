import userService from '@/services/user.service'
import { Request, Response } from 'express'

export const loginController = (req: Request, res: Response) => {
  return res.status(200).json({
    data: 'Hello word !!! '
  })
}

export const registerController = async (req: Request, res: Response) => {
  const { email, password } = req.body
  const rs = await userService.register({ email, password })
  console.log(rs)

  return res.status(200).json({
    data: 'Register Succcess !!!'
  })
}
