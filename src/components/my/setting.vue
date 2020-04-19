<template>
  <div class="setting-wrapper">
    <van-nav-bar
      :title="setTitle"
      left-text="返回"
      left-arrow
      @click-left.stop="onClickLeft"
    />
    <div class="cont">
      <Info v-if="this.$route.params.id === '0'" />
      <Email v-if="this.$route.params.id === '1'" />
      <Posts v-if="this.$route.params.id === '2'" />
      <Comments v-if="this.$route.params.id === '3'" />
      <Likes v-if="this.$route.params.id === '4'" />
      <Collects v-if="this.$route.params.id === '5'" />
      <Password v-if="this.$route.params.id === '6'" />
    </div>
  </div>
</template>
<script>
import Info from "./comp/info.vue";
import Email from "./comp/email.vue";
import Password from "./comp/password.vue";
import Posts from "./comp/posts.vue";
import Comments from "./comp/comments.vue";
import Likes from "./comp/likes.vue";
import Collects from "./comp/collects.vue";

import { get_info_by_token } from "@/api/user.js";

export default {
  name: "setting",
  components: { Info, Email, Password, Posts, Comments, Likes, Collects },
  methods: {
    onClickLeft() {
      this.$router.push({ name: "my" });
    },
  },

  computed: {
    setTitle() {
      let str = "设置";
      switch (this.$route.params.id) {
        case "0":
          str = "个人信息";
          break;
        case "1":
          str = "绑定邮箱";
          break;
        case "2":
          str = "发布的帖子";
          break;
        case "3":
          str = "发布的评论";
          break;
        case "4":
          str = "点赞的帖子";
          break;
        case "5":
          str = "收藏的帖子";
          break;
        case "6":
          str = "修改密码";
          break;
        default:
          break;
      }
      return str;
    },
  },
  async mounted() {
    if (this.$store.state.userInfo.id) {
    } else {
      let result = await get_info_by_token();
      if (result.data.code === 0) {
        this.$store.state.userInfo = result.data.data;
      } else {
        this.$toast("token失效");
      }
    }
  },
};
</script>
<style lang="scss" scoped>
.setting-wrapper {
  height: 100%;
  position: relative;
  display: flex;
  flex-direction: column;
  .cont {
    flex: 1;
    overflow: hidden;
  }
}
</style>
<style lang="scss">
// v-html渲染的标签样式
.text {
  mark {
    color: #fb0;
    background: transparent;
  }
}
.fl {
  float: left;
}
.fr {
  float: right;
}
</style>
