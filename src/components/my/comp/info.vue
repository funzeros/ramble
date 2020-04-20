<template>
  <div class="wrapper">
    <van-cell-group>
      <van-cell key="avatar" title="头像" is-link>
        <van-uploader
          :after-read="afterRead"
          image-fit="cover"
          accept="image/*"
          ref="uploader"
        >
          <van-image
            round
            width="50px"
            height="50px"
            :src="url"
          /> </van-uploader
      ></van-cell>
      <van-cell key="nickname" title="昵称" :value="userInfo.nickname" />
      <van-field
        label="用户名"
        v-model="userInfo.user_name"
        right-icon="arrow"
      />
    </van-cell-group>
    <van-button type="primary" @click.stop="submit">保存</van-button>
  </div>
</template>
<script>
import { img_upload, updata_info, get_info_by_token } from "@/api/user";
export default {
  name: "info",
  data() {
    return {
      userInfo: { nickname: "", user_name: "" },
      url: "",
    };
  },
  methods: {
    async afterRead(file) {
      file.status = "uploading";
      file.message = "上传中...";
      let param = new FormData();
      param.append("file", file.file);
      const result = await img_upload(param);
      if (result.data.success) {
        this.url = result.data.image_url;
        this.$toast("上传成功");
        file.status = "done";
      } else {
        this.$toast("上传失败");
        file.status = "failed";
      }
    },
    async submit() {
      if (this.userInfo.user_name && this.url) {
        const result = await updata_info({
          user_name: this.userInfo.user_name,
          avatar: this.url,
        });
        if (result.data.code === 0) {
          this.$toast(result.data.msg);
          let result2 = await get_info_by_token();
          if (result2.data.code === 0) {
            this.$store.state.userInfo = result2.data.data;
          } else {
            this.$toast("token失效");
          }
        } else {
          this.$toast(result.data.msg);
        }
      } else {
        this.$toast("头像或用户名不合法");
      }
    },
  },
  mounted() {
    this.userInfo.user_name = this.$store.state.userInfo.user_name;
    this.userInfo.nickname = this.$store.state.userInfo.nickname;
    this.url =
      this.$store.state.userInfo.avatar || "https://img.yzcdn.cn/vant/cat.jpeg";
  },
};
</script>
<style lang="scss" scoped>
.wrapper {
  .van-cell {
    display: flex;
    align-items: center;
    img {
      border-radius: 5px;
    }
    .van-cell__value {
      flex: 4;
    }
  }
  .van-uploader {
    width: 50px;
    height: 50px;
    &::v-deep .van-uploader__wrapper {
      width: 100%;
      height: 100%;
      .van-uploader__upload {
        width: 100%;
        height: 100%;
        margin: 0;
      }
      .van-uploader__preview {
        width: 100%;
        height: 100%;
        margin: 0;
        .van-image {
          width: 100%;
          height: 100%;
        }
      }
    }
  }
  .van-button {
    width: 80%;
    position: fixed;
    bottom: 10%;
    left: 50%;
    transform: translateX(-50%);
  }
}
</style>
