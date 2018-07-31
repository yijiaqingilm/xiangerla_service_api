import * as Model from '../store/AuthorModel'
import { setPageAndSize } from '../lib/utils'
import { PAGESIZE } from '../const/const'
import Sequelize from 'sequelize'

const Op = Sequelize.Op
const userService = {}
userService.userListAll = (user) => new Promise((resolve, reject) => {
  let {page, size = PAGESIZE} = user
  setPageAndSize(page, size, (err, pageAndSize) => {
    if (err) {
      reject(new Error('参数异常'))
      return
    }
    let [offset, limit] = pageAndSize
    return Model.Users.findAndCountAll({
      offset,
      limit,
    }).then((data) => {
      resolve(data)
    }).catch((error) => {
      reject(error)
    })
  })
})
userService.searchUser = (key) => Model.Users.findAll({
  where: {
    [Op.or]: {
      name: {
        [Op.like]: `${key}%`
      },
      mobile: {
        [Op.like]: `${key}%`
      },
      cardId: {
        [Op.like]: `${key}%`
      }
    }
  }
})
userService.addUser = (user) => Model.Users.create(user)
userService.getUser = (where) => Model.Users.findOne({where})
userService.setUser = (user) => {
  let {userId, ...other} = user
  return Model.Users.update(other, {
    where: {userId}
  })
}
export default userService
