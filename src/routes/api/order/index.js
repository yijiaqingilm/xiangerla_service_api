import express from 'express'
import BaseData from '../../../baseData'
import orderService from '../../../service/orderService'
import { checkPage, handleErr, encodeOrderNo, decodeOrderNo } from '../../../lib/utils'
import ErrorData from '../../../baseData/ErrorData'
import { check } from 'express-validator/check'

const router = express.Router()

const checkOrderId = [check('orderId', 'orderId格式不正确').isLength({min: 14}), handleErr]
router.post('/list', [checkPage, handleErr], (req, res, next) => {
  let user = req.body
  orderService.orderListAll(user).then((data) => {
    res.json(new BaseData({data: data.rows, total: data.count}))
  }).catch((error) => {
    res.json(new ErrorData(error))
  })
})
router.post('/info', checkOrderId, (req, res, next) => {
  let {orderId} = req.body
  orderService.getOrder({orderId: decodeOrderNo(orderId)}).then((data) => {
    res.json(new BaseData(data))
  }).catch((error) => {
    res.json(new ErrorData(error))
  })
})
router.post('/set', checkOrderId, (req, res, next) => {
  let order = req.body
  orderService.setOrder(order).then((data) => {
    res.json(new BaseData(data))
  }).catch((error) => {
    res.json(new ErrorData(error))
  })
})
router.post('/add', (req, res, next) => {
  let order = req.body
  orderService.addOrder(order).then((data) => {
    res.json(new BaseData(data))
  }).catch((error) => {
    res.json(new ErrorData(error))
  })
})
router.post('/offlinePay', checkOrderId, (req, res, next) => {
  let {orderId} = req.body
  orderService.offlinePay(orderId).then((data) => {
    res.json(new BaseData(data))
  }).catch((error) => {
    res.json(new ErrorData(error))
  })
})

export default router
