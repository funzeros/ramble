<template>
  <div class="add_wrapper">
    <van-nav-bar
      title="选择主题发布帖子吧"
      left-text="发布"
      @click-left="onClickLeft"
    />
    <van-tabs class="topics" v-model="active" @change="changeTopic">
      <van-tab title="无主题" />
      <van-tab
        v-for="item of topic"
        :key="item.id"
        class="topic"
        :title="item.name"
      />
    </van-tabs>
    <van-field v-model="title" placeholder="写标题是一个好习惯" />
    <van-field
      v-model="body"
      autosize
      type="textarea"
      placeholder="来吧，尽情发挥吧"
    />
    <van-cell>
      <van-uploader
        v-model="fileList"
        multiple
        :after-read="afterRead"
        @delete="deleteImg"
      />
    </van-cell>
  </div>
</template>
<script>
import { post_create } from "@/api/posts";
import { get_topic } from "@/api/topic";
import { img_upload } from "@/api/user";

export default {
  name: "addPost",
  data() {
    return {
      title: "",
      body: "",
      active: 0,
      topic: [],
      fileList: [],
      tid: 0,
    };
  },
  methods: {
    async onClickLeft() {
      // 发布帖子
      if (!this.body || !this.title) {
        this.$toast("帖子标题或内容不能为空");
        return;
      }
      let img_url = "";
      let info = this.$store.state.userInfo;
      if (this.fileList.length) {
        let newArr = this.fileList.map((item) => {
          return item.content;
        });
        img_url = newArr.join(",");
      }
      let data = {
        img_url: img_url,
        nickname: info.nickname,
        avatar: info.avatar,
        tid: this.tid,
        title: this.title,
        body: this.body,
      };
      const result = await post_create(data);
      if (result.data.code === 0) {
        this.$emit("closePopup");
        this.title = "";
        this.body = "";
        this.fileList = [];
      }
      this.$toast(result.data.msg);
    },
    deleteImg(file, { index }) {
      this.fileList.splice(index, 0);
    },
    async afterRead(file, { index }) {
      file.status = "uploading";
      file.message = "上传中...";
      let param = new FormData();
      param.append("file", file.file);
      const result = await img_upload(param);
      if (result.data.success) {
        this.fileList[index].content = result.data.image_url;
        this.$toast("上传成功");
        file.status = "done";
      } else {
        this.$toast("上传失败");
        file.status = "failed";
      }
    },
    changeTopic(name, title) {
      let item = this.topic.find((item) => {
        return item.name === title;
      });
      this.tid = (item && item.id) || 0;
    },
    async getTopic() {
      const result = await get_topic();
      if (result.data.code === 0) {
        this.topic = result.data.data;
      } else {
        this.$toast(result.data.msg);
      }
    },
  },
  mounted() {
    this.getTopic();
  },
};
</script>
<style lang="scss" scoped>
.topics {
  &::v-deep .van-tab {
    flex-basis: 30% !important;
  }
}
.add_wrapper {
  height: 100%;
  overflow: scroll;
}
</style>
