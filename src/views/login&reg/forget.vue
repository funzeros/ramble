<template>
  <div class="forget">
    <van-nav-bar
      title="忘记密码"
      left-text="返回"
      left-arrow
      @click-left="onClickLeft"
    />
    <div class="forget-box">
      <van-field v-model="email" label="邮箱" placeholder="输入您绑定的邮箱" />
      <van-field
        v-model="qcode"
        center
        clearable
        label="邮箱验证码"
        placeholder="请输入验证码"
        @input="validCode"
      >
        <template #button>
          <van-button
            size="small"
            type="primary"
            @click="sendEmail"
            :disabled="disabled"
            >{{ text }}</van-button
          >
        </template>
      </van-field>
      <p class="tips">tpis:只有绑定过邮箱的账号才能使用邮箱找回密码哦！</p>
    </div>
  </div>
</template>
<script>
import { send_email_code } from "@/api/user.js";
export default {
  data() {
    return {
      email: "",
      qcode: "",
      text: "发送验证码",
      disabled: false,
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
    validCode() {
      if (qcode.length === 4) {
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
    }
  }
}
</style>
