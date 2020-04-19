<template>
  <div class="reg">
    <van-nav-bar
      title="注册"
      left-text="返回"
      left-arrow
      @click-left.stop="onClickLeft"
    />
    <div class="reg-box">
      <van-button type="primary" @click.stop="reg">一键注册</van-button>
    </div>
  </div>
</template>
<script>
import { register } from "@/api/user.js";
export default {
  data() {
    return {};
  },
  methods: {
    onClickLeft() {
      this.$router.push({ name: "login" });
    },
    async reg() {
      const result = await register();
      if (result.data.code === 0) {
        this.$storage.set("TOKEN", result.data.data.token);
        this.$router.push({ name: "login" });
        this.$dialog
          .alert({
            message:
              "初始密码为<h4>123456</h4><br/>请尽快到 >我的>修改密码 修改您的密码",
          })
          .then(() => {
            // on close
          });
      }
    },
  },
};
</script>
<style lang="scss" scoped>
.reg {
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  .reg-box {
    flex: 1;
    display: flex;
    justify-content: center;
    align-items: center;
  }
}
</style>
