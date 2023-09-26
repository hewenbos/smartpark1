
<template>
  <div class="login_body">
    <div class="bg" />
    <div class="box">
      <div class="title">智慧园区-登录</div>
      <el-form ref="form" :model="loginForm" :rules="rules">
        <el-form-item
          label="账号"
          prop="username"
        >
          <el-input v-model="loginForm.username" />
        </el-form-item>

        <el-form-item
          label="密码"
          prop="password"
        >
          <el-input v-model="loginForm.password" type="password" show-password />
        </el-form-item>

        <el-form-item prop="remember">
          <el-checkbox v-model="loginForm.isChecked">记住我</el-checkbox>
        </el-form-item>

        <el-form-item>
          <el-button type="primary" class="login_btn" @click="submit">登录</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
import { mapActions } from 'vuex'

export default {
  name: 'Login',
  data() {
    return {
      // 登录表单数据
      loginForm: {
        username: '',
        password: '',
        isChecked: false
      },
      // 登录表单校验规则
      rules: {
        username: [
          { required: true, message: '请输入用户名', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' }
        ]
      }
    }
  },
  mounted() {
    this.getLoginUserStorage()
  },
  methods: {
    ...mapActions('user', ['getLogin']),
    submit() {
      this.$refs['form'].validate(async(valid) => {
        if (valid) {
          this.setLoginUserStorage()

          await this.getLogin(this.loginForm)
          this.$router.push(this.$route.query.fullpath ? this.$route.query.fullpath : '/')
        }
      })
    },
    // 获取用户名和密码
    getLoginUserStorage() {
      const data = localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')) : {}
      if (data.isChecked) {
        this.loginForm.username = data.username
        this.loginForm.password = data.password
      }
    },
    // 存放用户名和密码
    setLoginUserStorage() {
      if (this.loginForm.isChecked) {
        localStorage.setItem('user', JSON.stringify(this.loginForm))
      } else {
        localStorage.removeItem('user')
      }
    }
  }

}

</script>

<style scoped lang="scss">
  .login_body {
    display: flex;
  }
  .bg {
    width: 60vw;
    height: 100vh;
    background: url('~@/assets/login-bg.svg') no-repeat;
    background-position: right top;
    background-size: cover;
  }
  .box {
    margin: 200px 10% 0;
    flex: 1;
    .title {
      padding-bottom: 76px;
      font-size: 26px;
      font-weight: 500;
      color: #1e2023;
    }
    ::v-deep() {
      .ant-form-item {
        display: flex;
        margin-bottom: 62px;
        flex-direction: column;
      }
      .ant-form-item-label label {
        font-size: 16px;
        color: #8b929d;
      }
      .ant-input,
      .ant-input-password {
        border-radius: 8px;
      }
    }
  }
  .login_btn{
    width: 100%;
  }
</style>
