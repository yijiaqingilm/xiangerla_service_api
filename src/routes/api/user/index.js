import express from 'express'
import BaseData from '../../../baseData'
import userService from '../../../service/userService'
import { checkPage, handleErr } from '../../../lib/utils'
import ErrorData from '../../../baseData/ErrorData'
import { check } from 'express-validator/check'

const router = express.Router()

const checkUserId = [check('userId', 'userId格式不正确').isInt(), handleErr]
router.post('/list', [checkPage, handleErr], (req, res, next) => {
  let user = req.body
  userService.userListAll(user).then((data) => {
    res.json(new BaseData({data: data.rows, total: data.count}))
  }).catch((error) => {
    res.json(new ErrorData(error))
  })
})
router.post('/search', (req, res, next) => {
  let {key = ''} = req.body
  userService.searchUser(key).then((data) => {
    res.json(new BaseData(data))
  }).catch((error) => {
    res.json(new ErrorData(error))
  })
})

router.post('/info', checkUserId, (req, res, next) => {
  let {userId} = req.body
  console.log(userId, 'userId')
  userService.getUser({userId}).then((data) => {
    res.json(new BaseData(data))
  }).catch((error) => {
    res.json(new ErrorData(error))
  })
})
router.post('/set', checkUserId, (req, res, next) => {
  let user = req.body
  userService.setUser(user).then((data) => {
    res.json(new BaseData(data))
  }).catch((error) => {
    res.json(new ErrorData(error))
  })
})
router.post('/add', (req, res, next) => {
  let user = req.body
  userService.addUser(user).then((data) => {
    res.json(new BaseData(data))
  }).catch((error) => {
    res.json(new ErrorData(error))
  })
})
export default router
