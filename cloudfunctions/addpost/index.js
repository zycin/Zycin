const cloud = require('wx-server-sdk')
cloud.init({
  env: cloud.DYNAMIC_CURRENT_ENV
})
const db = cloud.database()
exports.main = async(event, context) => {
  try {
    return await db.collection('posts').add({
      // data 字段表示需新增的 JSON 数据
      data: {
        "_id": event.id,
        title: event.title,
        excerpt: event.excerpt,
        date: event.date,
        feature: event.feature,
        file: event.file,
        tags: event.tags
      }

    })
  } catch (e) {
    console.error(e)
  }
}