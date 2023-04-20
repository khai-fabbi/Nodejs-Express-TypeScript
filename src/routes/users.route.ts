import express, { Request, Response } from 'express'

const router = express.Router()

router.get('/', (req: Request, res: Response) => {
  res.send({ data: 'User Home Page' })
})
router.post('/create', (req: Request, res: Response) => {
  // console.log('🚀 ~ file: users.route.ts:9 ~ router.post ~ req:', req.body)

  res.send('Create User')
})

export default router
