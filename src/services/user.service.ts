import bcrypt from 'bcryptjs'
const salt = bcrypt.genSaltSync(10)

const getHashPassword = (password: string) => {
  return bcrypt.hashSync(password, salt)
}
