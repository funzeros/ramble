<template>
  <div class="comments">
    <van-list
      v-model="loading"
      :finished="finished"
      finished-text="没有更多了"
      @load="onLoad"
    >
      <van-cell
        v-for="item of commentsList"
        :key="item.id"
        class="item"
        @click.stop="goTo(item.pid)"
      >
        <div class="time">
          {{ solveTime(item.ctime) }}
          <div class="fr">
            <span
              class="iconfont icon-close"
              @click.stop.prevent="deleteComments(item.id)"
            ></span>
          </div>
        </div>
        <div class="title">
          你评论<span>@{{ item.cname }}</span>
        </div>
        <div class="cont">{{ item.body }}</div>
      </van-cell>
    </van-list>
  </div>
</template>
<script>
import { comments_user_page, comments_user_delete } from "@/api/comments";
export default {
  name: "comments",
  data() {
    return {
      commentsList: [],
      size: 10,
      page: 1,
      loading: true,
      finished: false,
    };
  },
  methods: {
    //删除
    deleteComments(id) {
      this.$dialog
        .confirm({
          title: "提示",
          message: `确定要删除评论吗？`,
        })
        .then(async () => {
          // on confirm
          const result = await comments_user_delete({ mid: id });
          if (result.data.code === 0) {
            this.refresh();
          }
          this.$toast(result.data.msg);
        })
        .catch(() => {
          // on cancel
        });
    },
    goTo(id) {
      console.log(1);
      this.$router.push(`/detail/${id}`);
    },
    onLoad() {
      this.getComments();
      this.page += 1;
    },
    refresh() {
      this.commentsList = [];
      this.page = 1;
      this.getComments();
    },
    async getComments() {
      let params = {
        size: this.size,
        page: this.page,
      };
      const result = await comments_user_page(params);
      if (result.data.code === 0) {
        if (result.data.data.length) {
          this.commentsList = this.commentsList.concat(result.data.data);
          this.loading = false;
        } else {
          this.loading = false;
          this.finished = true;
        }
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
  computed: {},
  mounted() {
    this.onLoad();
  },
};
</script>
<style lang="scss" scoped>
.comments {
  height: 100%;
  overflow: scroll;
  .item {
    border: solid #eeeeee;
    border-width: 0 0 1px 0;
    .time {
      font-size: 14px;
      color: #666;
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
.fr {
  display: inline;
}
</style>
