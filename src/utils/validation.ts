import { HttpCode } from '@/constants/enum'
import { EntityError, ErrorWithStatus } from '@/models/Errors'
import express from 'express'
import { validationResult, ValidationChain } from 'express-validator'
import { RunnableValidationChains } from 'express-validator/src/middlewares/schema'

// sequential processing, stops running validations chain if the previous one fails.
export const validate = (validation: RunnableValidationChains<ValidationChain>) => {
  return async (req: express.Request, res: express.Response, next: express.NextFunction) => {
    await validation.run(req)
    const errors = validationResult(req)
    if (errors.isEmpty()) {
      return next()
    }
    const errorsObj = errors.mapped()
    const entityError = new EntityError({ error: {} })
    for (const key in errorsObj) {
      const { msg } = errorsObj[key]
      if (msg instanceof ErrorWithStatus && msg.status !== HttpCode.UNPROCESSABLE_ENTITY) {
        return next(msg)
      }
      entityError.errors[key] = errorsObj[key]
    }

    next(entityError)
  }
}
