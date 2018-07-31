import * as Model from '../store/AuthorModel'
import { setPageAndSize } from '../lib/utils'

const goodsService = {}
goodsService.catalogsListAll = (catalogs) => new Promise((resolve, reject) => {
  let {page, size} = catalogs
  setPageAndSize(page, size, (err, pageAndSize) => {
    if (err) {
      reject(err)
      return
    }
    let [offset, limit] = pageAndSize
    return Model.Catalogs.findAndCountAll({
      offset,
      limit
    }).then((data) => {
      resolve(data)
    }).catch((error) => {
      reject(error)
    })
  })

})
goodsService.catalogsListAllNoLimit = (where = {}) => Model.Catalogs.findAll({where})
goodsService.catalogsListAllNoLimitJoinGoods = (where = {}) => Model.Catalogs.findAll({
  where,
  include: [
    {model: Model.Goods, attributes: ['goodsId', 'name', 'price']}
  ]
})
goodsService.addCatalogs = (catalogs) => Model.Catalogs.create(catalogs)
goodsService.setCatalogs = (catalogs) => {
  let {catalogsId, ...other} = catalogs
  return Model.Catalogs.update(other, {
    where: {catalogsId}
  })
}
goodsService.getCatalogs = (where) => Model.Catalogs.findOne({where})
goodsService.goodsListAll = (goods) => new Promise((resolve, reject) => {
  let {page, size} = goods
  setPageAndSize(page, size, (err, pageAndSize) => {
    if (err) {
      reject(err)
      return
    }
    let [offset, limit] = pageAndSize
    return Model.Goods.findAndCountAll({
      offset,
      limit
    }).then((data) => {
      resolve(data)
    }).catch((error) => {
      reject(error)
    })
  })
})
goodsService.goodsListAllNoLimit = (where = {}) => Model.Goods.findAll({where})
goodsService.addGoods = (goods) => Model.Goods.create(goods)
goodsService.setGoods = (goods) => {
  let {goodsId, ...other} = goods
  return Model.Goods.update(other, {
    where: {
      goodsId
    }
  })
}
goodsService.getGoods = (where) => Model.Goods.findOne({where})

goodsService.comboListAll = (combo) => new Promise((resolve, reject) => {
  let {page, size} = combo
  setPageAndSize(page, size, (err, pageAndSize) => {
    if (err) {
      reject(err)
      return
    }
    let [offset, limit] = pageAndSize
    return Model.Combo.findAndCountAll({
      offset,
      limit
    }).then((data) => {
      resolve(data)
    }).catch((error) => {
      reject(error)
    })
  })

})
goodsService.comboListAllNoLimit = (where = {}) => Model.Combo.findAll({where})
const createCombo = (combo) => Model.Combo.create(combo)
const createComboGoods = (goods, comboId) => {
  let combo2goods = goods.map((goodsId) => ({goodsId, comboId}))
  return Model.Combo2Goods.bulkCreate(combo2goods)
}
goodsService.addCombo = (combo) => {
  let {goods, ...other} = combo
  return createCombo(other).then((comboInfo) => createComboGoods(goods, comboInfo.comboId))
}
goodsService.setCombo = (combo) => {
  let {comboId, goods, ...other} = combo
  const updateCombo = () => Model.Combo.update(other, {
    where: {
      comboId
    }
  })
  const removeCombo2Goods = () => Model.Combo2Goods.destroy({
    where: {comboId}
  })
  return removeCombo2Goods().then(() => Promise.all([updateCombo(), createComboGoods(goods, comboId)]))
}
goodsService.getCombo = (where) => Model.Combo.findOne({
  where,
  include: [{
    model: Model.Goods,
    attributes: ['goodsId'],
    through: {
      attributes: []
    }
  }]
})
export default goodsService
