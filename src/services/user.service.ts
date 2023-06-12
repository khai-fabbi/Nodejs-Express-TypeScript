import bcrypt from 'bcryptjs'
import databaseService from './database.service'
import User from '@/models/schemas/User.schema'
import { IRegisterReqBody } from '@/models/requests/User.requests'
const salt = bcrypt.genSaltSync(10)

const getHashPassword = (password: string) => {
  return bcrypt.hashSync(password, salt)
}

class UserService {
  async register(payload: IRegisterReqBody) {
    const result = await databaseService.users.insertOne(
      new User({
        ...payload,
        password: getHashPassword(payload.password),
        date_of_birth: new Date(payload.date_of_birth)
      })
    )
    return result
  }
  async checkEmailExist(email: string) {
    const rs = await databaseService.users.findOne({ email })
    return !!rs
  }
}
const userService = new UserService()
export default userService
