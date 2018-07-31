import express from 'express'
import BaseData from '../../../baseData'
import goodsService from '../../../service/goodsService'
import { checkPage, handleErr } from '../../../lib/utils'
import ErrorData from '../../../baseData/ErrorData'
import { check } from 'express-validator/check'

const router = express.Router()

const checkComboId = [check('comboId', 'comboId格式不正确').isInt(), handleErr]
router.post('/list', [checkPage, handleErr], (req, res, next) => {
  let user = req.body
  goodsService.comboListAll(user).then((data) => {
    res.json(new BaseData({data: data.rows, total: data.count}))
  }).catch((error) => {
    res.json(new ErrorData(error))
  })
})
router.post('/all', (req, res, next) => {
  goodsService.comboListAllNoLimit().then((data) => {
    res.json(new BaseData(data))
  }).catch((error) => {
    res.json(new ErrorData(error))
  })
})
router.post('/info', checkComboId, (req, res, next) => {
  let {comboId} = req.body
  goodsService.getCombo({comboId}).then((data) => {
    res.json(new BaseData(data))
  }).catch((error) => {
    res.json(new ErrorData(error))
  })
})
router.post('/set', checkComboId, (req, res, next) => {
  let combo = req.body
  goodsService.setCombo(combo).then((data) => {
    res.json(new BaseData(data))
  }).catch((error) => {
    res.json(new ErrorData(error))
  })
})
router.post('/add', (req, res, next) => {
  let combo = req.body
  goodsService.addCombo(combo).then((data) => {
    res.json(new BaseData(data))
  }).catch((error) => {
    res.json(new ErrorData(error))
  })
})

export default router
