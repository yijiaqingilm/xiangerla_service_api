import config from '../../config'
import Wechat from 'wechat-enterprise'
import redisClient from './redisConnect'

const {corpid, corpkey, corpagent} = config.wechat
const wechatApi = new Wechat.API(corpid, corpkey, corpagent, function (callback) {
  // 传入一个获取全局token的方法
  redisClient.get('wechat:corp', (err, result) => {
    if (err) {
      return callback(err)
    }
    if (!result) {
      return callback(null, null)
    } else {
      return callback(null, JSON.parse(result))
    }
  })

}, function (token, callback) {
  console.log('成功获取微信访问TOKEN并保存到缓存')
  redisClient.setex('wechat:corp', 7200, JSON.stringify(token))
  callback(null, token)
})
export default wechatApi
