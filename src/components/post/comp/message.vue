<template>
  <div class="msg_wrapper">
    <van-nav-bar title="这里有你的消息" />
    <van-cell-group class="body">
      <van-cell class="item" v-for="item of newsList" :key="item.id">
        <div class="time">
          {{ solveTime(item.ctime) }}
        </div>
        <div class="title" v-if="item.type == 1">
          <span>@{{ item.fname }}</span> 评论你
        </div>
        <div class="title" v-if="item.type == 0">
          系统消息：
        </div>
        <div class="title" v-if="item.type == 2">
          <span>@{{ item.fname }}</span> 私聊跟你说
        </div>
        <div class="cont">{{ item.body }}</div>
      </van-cell>
    </van-cell-group>
  </div>
</template>
<script>
import { news_user_page } from "@/api/news";
export default {
  name: "addPost",
  data() {
    return {
      newsList: [],
    };
  },
  methods: {
    async getNews() {
      this.newsList = [];
      const result = await news_user_page();
      if (result.data.code === 0) {
        this.newsList = result.data.data;
        this.$emit("noMsg");
      } else {
        this.$toast(result.data.msg);
      }
    },
    solveTime(time) {
      let d = new Date(time);
      let nowD = new Date();
      let tD = nowD - d;
      // 时间差 -> td  当前时间 -> nowD 发帖时间 -> vD
      if (tD <= 1800000) {
        // 发帖时间距现在小于半个小时;
        // 转换成秒
        tD = Math.ceil(tD / 1000);
        if (tD < 60) {
          // 如小于60S,显示多少秒之前
          d = `${tD}秒之前`;
        } else {
          // 其他显示多少分钟之前
          tD = Math.ceil(tD / 60);
          d = `${tD}分钟之前`;
        }
        // let tDText =
      } else {
        // 如大于半个小时
        // 直接转换日期格式并保存
        d = `${d.getFullYear()}年${d.getMonth() +
          1}月${d.getDate()}日${d.getHours()}:${
          d.getMinutes() < 10 ? "0" + d.getMinutes() : d.getMinutes()
        }`;
      }
      return d;
    },
  },
  mounted() {
    this.getNews();
  },
};
</script>
<style lang="scss" scoped>
.msg_wrapper {
  height: 100%;
  overflow: scroll;
  .item {
    border: solid #eeeeee;
    border-width: 0 0 1px 0;
    .time {
      font-size: 14px;
      color: #666;
      text-align: center;
    }
    .title {
      font-size: 14px;
      span {
        font-size: 14px;

        color: #99f;
      }
    }
  }
}
</style>
