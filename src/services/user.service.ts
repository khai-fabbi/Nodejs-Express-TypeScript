import bcrypt from 'bcryptjs'
import databaseService from './database.service'
import User from '@/models/schemas/User.schema'
const salt = bcrypt.genSaltSync(10)

const getHashPassword = (password: string) => {
  return bcrypt.hashSync(password, salt)
}

class UserService {
  async register(payload: { email: string; password: string }) {
    const { email, password } = payload
    const result = await databaseService.users.insertOne(new User({ email, password: getHashPassword(password) }))
    return result
  }
}
const userService = new UserService()
export default userService
