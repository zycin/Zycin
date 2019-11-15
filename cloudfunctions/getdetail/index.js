// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()

// 云函数入口函数
// 云函数入口函数
exports.main = async(event, context) => {
  const db = cloud.database();
  // 查询指定分类的数据信息
  const res = await db.collection('posts').where({
      "_id": event.id
    })
    .get()
  const fileList = [res.data[0].file]
  const result = await cloud.getTempFileURL({
    fileList: fileList,
  })
  
  return result.fileList.concat(res.data)

}