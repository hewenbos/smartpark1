import { Message } from 'element-ui'
export default {
  ErrorEvent: (msg) => {
    Message({
      message: msg,
      type: 'error'
    })
  },
  SuccessEvent: (msg) => {
    Message({
      message: msg,
      type: 'success'
    })
  }
}
