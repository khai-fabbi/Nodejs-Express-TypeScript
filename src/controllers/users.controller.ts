import { IRegisterReqBody } from '@/models/requests/User.requests'
import userService from '@/services/user.service'
import { Request, Response } from 'express'
import { ParamsDictionary } from 'express-serve-static-core'
export const loginController = (req: Request, res: Response) => {
  return res.status(200).json({
    data: 'Hello word !!!'
  })
}

export const registerController = async (req: Request<ParamsDictionary, any, IRegisterReqBody>, res: Response) => {
  const rs = await userService.register(req.body)
  console.log(rs)

  return res.status(200).json({
    data: 'Register Succcess !!!'
  })
}
