import { HttpCode } from '@/constants/enum'
import { NextFunction, Request, Response } from 'express'
import { omit } from 'lodash'

export const defaultErrorHandler = (err: any, req: Request, res: Response, _: NextFunction) => {
  res.status(err.status || HttpCode.INTERNAL_SERVER_ERROR).json(omit(err, ['status']))
}
