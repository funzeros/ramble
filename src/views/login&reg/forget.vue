<template>
  <div class="forget">
    <van-nav-bar
      title="忘记密码"
      left-text="返回"
      left-arrow
      @click-left.stop="onClickLeft"
    />
    <div class="forget-box">
      <van-cell-group v-if="isShow">
        <van-field
          v-model="email"
          label="邮箱"
          placeholder="输入您绑定的邮箱"
          key="input1"
        />
        <van-field
          v-model="qcode"
          center
          clearable
          label="邮箱验证码"
          placeholder="请输入验证码"
          @input="validCode"
          key="input2"
        >
          <template #button>
            <van-button
              size="small"
              type="primary"
              @click.stop="sendEmail"
              :disabled="disabled"
              >{{ text }}</van-button
            >
          </template>
        </van-field>
        <p class="tips">tpis:只有绑定过邮箱的账号才能使用邮箱找回密码哦！</p>
      </van-cell-group>
      <van-cell-group v-else>
        <van-field
          v-model="password"
          type="password"
          placeholder="输入新的密码"
          label="密码"
          @blur="passwordVliad"
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
import {
  send_email_code,
  email_code_valid,
  updata_password,
} from "@/api/user.js";
import sha256 from "js-sha256";
export default {
  data() {
    return {
      email: "",
      qcode: "",
      text: "发送验证码",
      disabled: false,
      isShow: true,
      password: "",
      password2: "",
      valid: "",
    };
  },
  methods: {
    onClickLeft() {
      this.$router.push({ name: "login" });
    },
    async sendEmail() {
      let reg = new RegExp(
        "^[a-z0-9A-Z]+[- | a-z0-9A-Z . _]+@([a-z0-9A-Z]+(-[a-z0-9A-Z]+)?\\.)+[a-z]{2,}$"
      );
      if (reg.test(this.email)) {
        const result = await send_email_code({ email: this.email });
        if (result.code === 0) {
        }
        this.$toast("验证码已发送");
        this.btnTime();
      } else {
        this.$toast("邮箱格式有误");
      }
    },
    btnTime() {
      this.disabled = true;
      this.timer = setTimeout(() => {
        this.disabled = false;
        this.text = "发送验证码";
        clearTimeout(this.timer);
      }, 60000);
      for (let i = 59; i >= 0; i--) {
        this.timer = setTimeout(() => {
          this.text = `${60 - i}秒`;
          clearTimeout(this.timer);
        }, i * 1000);
      }
    },
    async validCode() {
      if (this.qcode.length === 4) {
        const result = await email_code_valid({
          email: this.email,
          qcode: this.qcode,
        });
        if (result.data.code === 0) {
          this.valid = result.data.data.valid;
          this.isShow = false;
        } else {
          this.$toast("验证码错误");
        }
      }
    },
    passwordVliad() {
      if (this.password.length < 6) {
        this.$toast("密码长度不能小于6");
      }
    },
    async submit() {
      if (this.password === this.password2 && this.password.length >= 6) {
        const result = await updata_password({
          email: this.email,
          valid: this.valid,
          password: sha256(this.password),
        });
        console.log(result);
        if (result.data.code === 0) {
          this.$toast("修改成功");
          this.$router.push({ name: "login" });
        } else {
          this.$toast("修改失败");
        }
      } else {
        this.$toast("两次密码输入不同");
      }
    },
  },
};
</script>
<style lang="scss" scoped>
.forget {
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  .forget-box {
    flex: 1;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    .tips {
      margin-top: 20px;
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
