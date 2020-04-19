<template>
  <div class="password">
    <div class="password-box">
      <van-cell-group>
        <p class="tips">tips：初始密码为123456</p>
        <van-field
          v-model="valid_password"
          type="password"
          placeholder="输入旧密码"
          label="密码"
          @blur="passwordVliad(valid_password)"
          key="input2"
        />
        <van-field
          v-model="password"
          type="password"
          placeholder="输入新的密码"
          label="密码"
          @blur="passwordVliad(password)"
          key="input3"
        />
        <van-field
          v-model="password2"
          type="password"
          placeholder="再次输入密码"
          label="确认密码"
          key="input4"
        />
        <van-button type="primary" @click.stop="submit">确认</van-button>
      </van-cell-group>
    </div>
  </div>
</template>
<script>
import { updata_password_valid } from "@/api/user.js";
import sha256 from "js-sha256";
export default {
  name: "password",
  data() {
    return {
      valid_password: "",
      password: "",
      password2: "",
    };
  },
  methods: {
    passwordVliad(password) {
      if (password.length < 6) {
        this.$toast("密码长度不能小于6");
      }
    },
    async submit() {
      if (this.password === this.password2 && this.password.length >= 6) {
        const result = await updata_password_valid({
          valid_password: sha256(this.valid_password),
          password: sha256(this.password),
        });
        if (result.data.code === 0) {
          this.$router.push({ name: "login" });
        }
        this.$toast(result.data.msg);
      } else {
        this.$toast("两次密码输入不同");
      }
    },
  },
};
</script>
<style lang="scss" scoped>
.password {
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  .password-box {
    flex: 1;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    .tips {
      margin-bottom: 20px;
      color: #999;
      font-size: 14px;
      text-align: center;
    }
    .van-cell-group {
      display: flex;
      justify-content: center;
      flex-direction: column;
    }
  }
}
</style>
