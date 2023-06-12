import userService from '@/services/user.service'
import { validate } from '@/utils/validation'
import { NextFunction, Request, Response } from 'express'
import { checkSchema } from 'express-validator'

export const validatorSignIn = (req: Request, res: Response, next: NextFunction) => {
  const { email, password } = req.body
  if (!email || !password)
    return res.status(401).json({
      error: 'email or password invalid'
    })
  next()
}
export const registerValidator = validate(
  checkSchema({
    name: {
      notEmpty: true,
      isString: true,
      isLength: {
        options: {
          min: 1,
          max: 100
        }
      },
      trim: true
    },
    email: {
      notEmpty: true,
      isEmail: true,
      trim: true,
      custom: {
        options: async (value) => {
          const isExistEmail = await userService.checkEmailExist(value)
          if (isExistEmail) throw new Error('Email da ton tai')
          return true
        }
      }
    },
    password: {
      errorMessage: 'Mật khẩu phải lớn hơn 6 và nhỏ hơn 20 kí tự !',
      notEmpty: true,
      isString: true,
      isLength: {
        options: {
          min: 6,
          max: 20
        }
      },
      isStrongPassword: {
        errorMessage: 'Mật khẩu phải strong',
        options: {
          minLength: 6,
          minLowercase: 1,
          minUppercase: 1,
          minNumbers: 1,
          minSymbols: 1
        }
      }
    },
    confirm_password: {
      notEmpty: true,
      isString: true,
      isLength: {
        options: {
          min: 6,
          max: 20
        }
      },
      isStrongPassword: {
        errorMessage: 'Mật khẩu phải strong',
        options: {
          minLength: 6,
          minLowercase: 1,
          minUppercase: 1,
          minNumbers: 1,
          minSymbols: 1
        }
      },
      custom: {
        options: (value, { req }) => {
          if (value !== req.body.password) {
            throw new Error('Mật khẩu không khớp !')
          }
          return true
        }
      }
    },
    date_of_birth: {
      isISO8601: {
        options: {
          strict: true,
          strictSeparator: true
        }
      }
    }
  })
)
