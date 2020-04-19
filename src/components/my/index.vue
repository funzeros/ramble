<template>
  <div id="my" class="my">
    <van-cell-group>
      <van-cell key="info" is-link to="setting/0">
        <div class="info">
          <div class="avatar">
            <van-image
              round
              width="60px"
              height="60px"
              :src="getInfo.avatar || 'https://img.yzcdn.cn/vant/cat.jpeg'"
            />
          </div>
          <div class="name">
            <div class="nickname">{{ getInfo.nickname }}</div>
            <div class="user_name">用户名：{{ getInfo.user_name }}</div>
          </div>
        </div>
      </van-cell>
      <van-cell
        title="邮箱"
        icon="free-postage"
        is-link
        :value="getInfo.email"
        :to="getInfo.email ? '' : 'setting/1'"
      />
      <van-cell title="发布的帖子" icon="records" is-link to="setting/2" />
      <van-cell title="发布的评论" icon="description" is-link to="setting/3" />
      <van-cell title="点赞的帖子" icon="good-job-o" is-link to="setting/4" />
      <van-cell title="收藏的帖子" icon="star-o" is-link to="setting/5" />
      <van-cell title="修改密码" icon="warn-o" is-link to="setting/6" />
    </van-cell-group>
    <van-button plain class="btn" type="danger" @click.stop="putOut"
      >退出登录</van-button
    >
  </div>
</template>
<script>
export default {
  data() {
    return {};
  },
  methods: {
    putOut() {
      this.$storage.remove("TOKEN");
      this.$router.push({ name: "login" });
    },
  },
  computed: {
    getInfo() {
      return this.$store.state.userInfo;
    },
  },
};
</script>
<style lang="scss" scoped>
.my {
  .van-cell-group {
    .van-cell {
      border: solid #eeeeee;
      border-width: 0px 0 5px 0;
      display: flex;
      align-items: center;
      .van-cell__value {
        flex: 2;
      }
    }
  }
  .info {
    display: flex;
    align-items: center;
    padding: 10px 0;
    .avatar {
      padding: 10px;
    }
    .name {
      margin-left: 10px;
      .nickname {
        font-weight: 900;
      }
      .user_name {
        font-size: 14px;
        color: #999;
      }
    }
  }
}
.btn {
  width: 80%;
  position: fixed;
  bottom: 10%;
  left: 50%;
  transform: translateX(-50%);
}
</style>
