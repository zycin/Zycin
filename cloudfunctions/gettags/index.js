// 云函数模板
// 部署：在 cloud-functions/login 文件夹右击选择 “上传并部署”

const cloud = require('wx-server-sdk')

// 初始化 cloud
cloud.init()

// 云函数入口函数
exports.main = async(event, context) => {
  const db = cloud.database();
  // 查询指定分类的数据信息
  const where = event.id ? { "_id": event.id} : {}
  const res = await db.collection('tags').where(where).get()
  // 等待所有
  return res
}