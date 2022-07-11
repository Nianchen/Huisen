<template>
  <div class="login">
    <h1>智慧路灯物联网管理云平台</h1>
    <h2>THE PLATFORM OF INTELLLIGENT STREET LIGHT CLOUD</h2>
    <div class="gerui-logon">
      <img :src="geruilogoImg">
    </div>
    <div class="login-body-img">
      <img :src="LoginRightImg" draggable="false" alt="">
    </div>
    <div class="login-body">
      <el-form ref="loginForm" :model="loginForm" :rules="loginRules" class="login-form table-list">
        <h3 class="title">账号登录</h3>
        <el-form-item prop="username">
          <el-input v-model="loginForm.username" type="text" auto-complete="off" placeholder="账号">
            <svg-icon slot="prefix" icon-class="user" class="el-input__icon input-icon"/>
          </el-input>
        </el-form-item>
        <el-form-item prop="password">
          <el-input
            v-model="loginForm.password"
            type="password"
            auto-complete="off"
            placeholder="密码"
            @keyup.enter.native="handleLogin"
          >
            <svg-icon slot="prefix" icon-class="password" class="el-input__icon input-icon"/>
          </el-input>
        </el-form-item>
        <el-form-item prop="code">
          <el-input
            v-model="loginForm.code"
            auto-complete="off"
            placeholder="验证码"
            style="width: 63%"
            @keyup.enter.native="handleLogin">
            <svg-icon slot="prefix" icon-class="validCode" class="el-input__icon input-icon"/>
          </el-input>
          <div class="login-code">
            <img :src="codeUrl" @click="getCode" class="login-code-img"/>
          </div>
        </el-form-item>
        <el-checkbox v-model="loginForm.rememberMe" style="margin:0px 0px 25px 0px;">记住密码</el-checkbox>
        <el-form-item style="width:100%;">
          <el-button
            :loading="loading"
            size="medium"
            type="primary"
            style="width:100%;"
            @click.native.prevent="handleLogin">
            <span v-if="!loading">登 录</span>
            <span v-else>登 录 中...</span>
          </el-button>
        </el-form-item>
      </el-form>
    </div>
       <div class="el-login-footer">

       </div>
  </div>
</template>

<script>
import {getCodeImg} from "@/api/login";
import Cookies from "js-cookie";
import {encrypt, decrypt} from '@/utils/jsencrypt'
import LoginRightImg from '@/assets/images/login-rigth-img.png'
import geruilogoImg from '@/assets/images/udior/login.png'
export default {
  name: "Login",
  data() {
    return {
      LoginRightImg: LoginRightImg,
      geruilogoImg:geruilogoImg,
      codeUrl: "",
      cookiePassword: "",
      loginForm: {
        username: "",
        password: "",
        rememberMe: false,
        code: "",
        uuid: ""
      },
      loginRules: {
        username: [
          {required: true, trigger: "blur", message: "用户名不能为空"}
        ],
        password: [
          {required: true, trigger: "blur", message: "密码不能为空"}
        ],
        code: [{required: true, trigger: "change", message: "验证码不能为空"}]
      },
      loading: false,
      redirect: undefined
    };
  },
  watch: {
    $route: {
      handler: function (route) {
        this.redirect = route.query && route.query.redirect;
      },
      immediate: true
    }
  },
  created() {
    this.getCode();
    this.getCookie();
  },
  methods: {
    getCode() {
      this.loginForm.code = "";
      getCodeImg().then(res => {
        this.codeUrl = "data:image/gif;base64," + res.img;
        this.loginForm.uuid = res.uuid;
      });
    },
    getCookie() {
      const username = Cookies.get("username");
      const password = Cookies.get("password");
      const rememberMe = Cookies.get('rememberMe')
      this.loginForm = {
        username: username === undefined ? this.loginForm.username : username,
        password: password === undefined ? this.loginForm.password : decrypt(password),
        rememberMe: rememberMe === undefined ? false : Boolean(rememberMe)
      };
    },
    handleLogin() {
     
      this.$refs.loginForm.validate(valid => {
        if (valid) {
          this.loading = true;
          if (this.loginForm.rememberMe) {
            Cookies.set("username", this.loginForm.username, {expires: 30});
            Cookies.set("password", encrypt(this.loginForm.password), {expires: 30});
            Cookies.set('rememberMe', this.loginForm.rememberMe, {expires: 30});
          } else {
            Cookies.remove("username");
            Cookies.remove("password");
            Cookies.remove('rememberMe');
          }
          this.$store.dispatch("Login", this.loginForm).then(() => {
            console.log(this.redirect)
            this.$router.push({path: this.redirect || "/index_v2"}).catch(() => {
            });
            this.$router.go(0)
          }).catch(() => {
            this.loading = false;
            this.getCode();
          });
        }
      });
    }
  }
};
</script>

<style rel="stylesheet/scss" lang="scss">
.gerui-logon{
  position: fixed;
  left: 0.2%;
  top: 1%;
  img{
    width: 300px;
  }
}
.login {
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  height: 100%;
  background-image: url("../assets/images/login-bg.jpg");
  background-size: cover;

  h1, h2 {
    color: white;
  }

  h1 {
    font-size: 4rem;
    font-weight: 500;
    letter-spacing: 0.4vw;
  }

  h2 {
    margin-top: -20px;
    font-size: 1.5rem;
    font-weight: 400;
    letter-spacing: 0.1vw;
  }
}

.login-body-img {
  position: absolute;
  left: 0;
  bottom: 0;
  width: 52vw;
  height: auto;

  img {
    width: 100%;
    height: 100%;
  }
}

.login-body {
  //position: relative;
  width: 100%;
  display: flex;
  justify-content: space-around;
  align-items: center;


}

.title {
  margin: 0px auto 30px auto;
  text-align: center;
  color: #ffffff;
  font-size: 2rem;
  letter-spacing: 0.2vw;
  font-weight: 500;
}

.login-form {
  position: absolute;
  top: 50%;
  right: 25%;
  transform: translate(50%, -50%);
  border-radius: 6px;
  //background: #ffffff;
  background: no-repeat url("../assets/images/login-from-line.png");
  background-size: 100% 100%;
  width: 600px;
  //height: 514px;
  height: auto;
  //padding: 25px 25px 5px 25px;
  padding: 50px 100px;

  .el-input {
    height: 38px;

    input {
      height: 38px;
    }
  }

  .input-icon {
    height: 39px;
    width: 14px;
    margin-left: 2px;
  }
}

.login-tip {
  font-size: 13px;
  text-align: center;
  color: #bfbfbf;
}

.login-code {
  width: 33%;
  height: 38px;
  float: right;

  img {
    cursor: pointer;
    vertical-align: middle;
  }
}

.el-login-footer {
  height: 40px;
  line-height: 40px;
  position: fixed;
  bottom: 0;
  width: 100%;
  text-align: center;
  color: #fff;
  font-family: Arial;
  font-size: 12px;
  letter-spacing: 1px;
}

.login-code-img {
  height: 38px;
}
</style>
