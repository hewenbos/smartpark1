export default {
  token: (state) => state.user.token,
  // 用户id
  userId: (state) => state.user.userInfo.id,
  // 用户姓名
  username: (state) => state.user.userInfo.name
}
