import { MessageBox, Message } from 'element-ui'

export const MixinMessageBox = (id, callback) => {
  return new Promise((resolve) => {
    const res = MessageBox.confirm('是否确认删除?', '提示', {
      confirmButtonText: '确定',
      cancelButtonText: '取消',
      type: 'warning'
    }).then(async() => {
      const res = await callback(id)
      console.log(222)
      Message({
        type: 'success',
        message: '删除成功!'
      })
      resolve(res)
    }).catch(() => {
      Message({
        type: 'info',
        message: '已取消删除'
      })
    })
  })
}

export const MixinCancel = (id, callback) => {
  return new Promise((resolve) => {
    const res = MessageBox.confirm('是否重置密码为123456?', '提示', {
      confirmButtonText: '确定',
      cancelButtonText: '取消',
      type: 'warning'
    }).then(async() => {
      const res = await callback({ id })
      console.log(222)
      Message({
        type: 'success',
        message: '重置成功!'
      })
      resolve(res)
    }).catch(() => {
      Message({
        type: 'info',
        message: '已取消重置'
      })
    })
  })
}

export const MixinTree = (list) => {
  list.forEach(item => {
    if (item.children && item.children.length > 0) {
      MixinTree(item.children)
    }

    item.disabled	= true
  })
  return list
}
