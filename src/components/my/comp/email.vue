<template>
  <div class="email">
    <div class="email-box">
      <van-cell-group v-if="getEmail">
        <van-cell title="邮箱" :value="getEmail" />
      </van-cell-group>
      <van-cell-group v-else>
        <van-field
          v-model="email"
          label="邮箱"
          placeholder="输入您要绑定的邮箱"
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
      </van-cell-group>
    </div>
  </div>
</template>
<script>
import {
  send_email_code_new,
  bind_email,
  get_info_by_token,
} from "@/api/user.js";
import sha256 from "js-sha256";
export default {
  name: "email",
  data() {
    return {
      email: "",
      qcode: "",
      text: "发送验证码",
      disabled: false,
    };
  },
  methods: {
    async sendEmail() {
      let reg = new RegExp(
        "^[a-z0-9A-Z]+[- | a-z0-9A-Z . _]+@([a-z0-9A-Z]+(-[a-z0-9A-Z]+)?\\.)+[a-z]{2,}$"
      );
      if (reg.test(this.email)) {
        const result = await send_email_code_new({ email: this.email });
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
        const result = await bind_email({
          email: this.email,
          qcode: this.qcode,
        });
        if (result.data.code === 0) {
          this.$toast("绑定成功");
          let result2 = await get_info_by_token();
          if (result2.data.code === 0) {
            this.$store.state.userInfo = result2.data.data;
          } else {
            this.$toast("token失效");
          }
        } else {
          this.$toast("验证码错误");
        }
      }
    },
  },
  computed: {
    getEmail() {
      return this.$store.state.userInfo.email;
    },
  },
};
</script>
<style lang="scss" scoped>
.email {
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  .email-box {
    flex: 1;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    .van-cell-group {
      display: flex;
      justify-content: center;
      flex-direction: column;
      width: 100%;
      .van-cell__value {
        flex: 4;
      }
    }
  }
}
</style>
