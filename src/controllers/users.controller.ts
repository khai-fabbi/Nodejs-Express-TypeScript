import { Request, Response } from 'express'

export const loginController = (req: Request, res: Response) => {
  return res.status(200).json({
    data: 'Hello word !!! '
  })
}
