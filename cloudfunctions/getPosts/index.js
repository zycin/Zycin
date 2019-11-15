// 云函数模板
// 部署：在 cloud-functions/login 文件夹右击选择 “上传并部署”

const cloud = require('wx-server-sdk')

// 初始化 cloud
cloud.init()

// 云函数入口函数
exports.main = async(event, context) => {
  const db = cloud.database();
  const _ = db.command;
  const where = event.tagid ? {
    tags: _.all([event.tagid]),
    "_id": _.neq("about")
  } : { "_id": _.neq("about")};
  // 查询指定分类的数据信息
  const res = await db.collection('posts').where(where)
    // orderBy 排序
    // limit分页
    .skip(event.nowpage) // 跳过结果集中的前 10 条，从第 11 条开始返回
    .orderBy('date', 'desc').limit(4).get()
  // 等待所有
  return res
}