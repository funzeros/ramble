<template>
  <div class="reg">
    <van-nav-bar
      title="注册"
      left-text="返回"
      left-arrow
      @click-left="onClickLeft"
    />
    <div class="reg-box">
      <van-button type="primary" @click="reg">一键注册</van-button>
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
