import { loginController, registerController } from '@/controllers/users.controller'
import { validatorSignIn } from '@/middlewares/users.middleware'
import { Request, Response, Router } from 'express'

const router = Router()

router.get('/', (req: Request, res: Response) => {
  res.send({ data: 'User Home Page' })
})
router.post('/login', validatorSignIn, loginController)
router.post('/register', validatorSignIn, registerController)

export default router
