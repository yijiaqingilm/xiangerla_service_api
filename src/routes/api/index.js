import express from 'express'
import userRouter from './user'
import orderRouter from './order'
import shopRouter from './shop'
import companyRouter from './company'
import expressJwt from 'express-jwt'
import config from '../../../config'

const router = express.Router()
if (!config.debug) {
  router.use(expressJwt({
    secret: config.secret,
    requestProperty: 'user'
  }).unless({
    method: 'OPTIONS'
  }))
}

router.use('/user', userRouter)
router.use('/order', orderRouter)
router.use('/shop', shopRouter)
router.use('/company', companyRouter)
export default router
