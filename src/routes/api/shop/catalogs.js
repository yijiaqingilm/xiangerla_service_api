import express from 'express'
import BaseData from '../../../baseData'
import goodsService from '../../../service/goodsService'
import { checkPage, handleErr } from '../../../lib/utils'
import ErrorData from '../../../baseData/ErrorData'
import { check } from 'express-validator/check'


const router = express.Router()

const checkCatalogsId = [check('catalogsId', 'catalogsId格式不正确').isInt(), handleErr]
router.post('/list', [checkPage, handleErr], (req, res, next) => {
  let user = req.body
  goodsService.catalogsListAll(user).then((data) => {
    res.json(new BaseData({data: data.rows, total: data.count}))
  }).catch((error) => {
    res.json(new ErrorData(error))
  })
})
router.post('/all', (req, res, next) => {
  goodsService.catalogsListAllNoLimit().then((data) => {
    res.json(new BaseData(data))
  }).catch((error) => {
    res.json(new ErrorData(error))
  })
})
router.post('/allJoinGoods', (req, res, next) => {
  goodsService.catalogsListAllNoLimitJoinGoods().then((data) => {
    res.json(new BaseData(data))
  }).catch((error) => {
    res.json(new ErrorData(error))
  })
})

router.post('/info', checkCatalogsId, (req, res, next) => {
  let {catalogsId} = req.body
  console.log(catalogsId, 'catalogsId')
  goodsService.getCatalogs({catalogsId}).then((data) => {
    res.json(new BaseData(data))
  }).catch((error) => {
    res.json(new ErrorData(error))
  })
})
router.post('/set', checkCatalogsId, (req, res, next) => {
  let catalogs = req.body
  goodsService.setCatalogs(catalogs).then((data) => {
    res.json(new BaseData(data))
  }).catch((error) => {
    res.json(new ErrorData(error))
  })
})
router.post('/add', (req, res, next) => {
  let catalogs = req.body
  goodsService.addCatalogs(catalogs).then((data) => {
    res.json(new BaseData(data))
  }).catch((error) => {
    res.json(new ErrorData(error))
  })
})

export default router
