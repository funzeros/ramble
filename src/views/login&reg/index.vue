<template>
  <div id="login" class="login">
    <img class="logo" :src="imgLogo" alt="闲侃" />
    <div class="blank"></div>
    <van-cell-group>
      <van-field
        v-model="user_name"
        required
        clearable
        label="用户名"
        placeholder="请输入用户名"
      />
      <van-field
        v-model="password"
        type="password"
        label="密码"
        placeholder="请输入密码"
        required
      />
    </van-cell-group>
    <div class="blank"></div>
    <van-button type="primary" :color="getColor" @click.stop="submit"
      >确认登录</van-button
    >
    <p class="other">
      <router-link to="/forget">
        <span class="forget">忘记密码</span> </router-link
      >&nbsp;|&nbsp;
      <router-link to="/reg">
        <span class="register">立即注册</span>
      </router-link>
    </p>
  </div>
</template>
<script>
import sha256 from "js-sha256";
import imgLogo from "@/assets/rambLogo.png";
import {
  login_by_password,
  login_by_token,
  get_info_by_token,
} from "@/api/user.js";
export default {
  data() {
    return {
      user_name: "",
      password: "",
      secPassword: "",
      imgLogo: imgLogo,
    };
  },
  methods: {
    async submit() {
      this.secPassword = (this.password && sha256(this.password)) || "";
      let userInfo = {
        user_name: this.user_name,
        password: this.secPassword,
      };
      // await this.$store.dispatch("login/getInfo", userInfo);
      // if (this.$store.state.login) {
      //   this.$router.push({ name: "post" });
      // }
      let result = await login_by_password(userInfo);
      if (result.data.code === 0) {
        this.$storage.set("TOKEN", result.data.data.token);
        this.getInfo();
        this.$router.push({ name: "newPost" });
      } else {
        this.$toast("用户名或密码错误");
      }
    },
    async getInfo() {
      let result = await get_info_by_token();
      if (result.data.code === 0) {
        this.$store.state.userInfo = result.data.data;
      } else {
        this.$toast("token失效");
      }
    },
  },
  computed: {
    getColor() {
      return this.$store.state.logoColor;
    },
  },
  async mounted() {
    let token = this.$storage.get("TOKEN");
    if (token) {
      let result = await login_by_token();
      if (result.data.code === 0) {
        this.$storage.set("TOKEN", result.data.data.token);
        this.getInfo();
        this.$router.push({ name: "newPost" });
      } else {
        this.$toast("认证失效了，请重新登录");
      }
    }
  },
};
</script>
<style lang="scss" scoped>
.login {
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  .logo {
    width: 140px;
  }
  .other {
    font-size: 16px;
    position: absolute;
    bottom: 50px;
    .forget {
      font-size: 16px;
      color: #bbbbcc;
    }
    .register {
      font-size: 16px;
      color: #bbccbb;
    }
  }
  .blank {
    height: 30px;
  }
}
</style>
