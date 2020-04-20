<template>
  <div id="recPost">
    <div class="posts">
      <van-list
        v-model="loading"
        :finished="finished"
        finished-text="没有更多了"
        @load="onLoad"
      >
        <van-cell
          v-for="item of postList"
          :key="item.id"
          class="postItem"
          @click.stop="goTo(item.id)"
        >
          <div class="info">
            <!-- 头像 -->
            <div class="avatar">
              <img :src="item.avatar" :alt="item.nickname" />
            </div>
            <div class="detail">
              <!-- 昵称 -->
              <p class="name">{{ item.nickname }}</p>
              <!-- 发布时间 -->
              <p class="date">{{ solveTime(item.ptime) }}</p>
            </div>
            <!-- 评论 -->
            <div class="comments">
              <div class="fr">
                <span class="iconfont icon-comments"></span>
              </div>
            </div>
          </div>
          <!-- 正文内容 -->
          <div class="text">
            <!-- 后续做正则匹配追加话题链接 -->
            <div class="textInner" v-html="item.body"></div>
            <!-- 图片 -->
            <div class="imag">
              <li
                class="imgLi"
                v-for="(unit, index) of solveArr(item.img_url)"
                :key="unit"
                v-lazy:background-image="unit"
                v-show="index < 3"
                @click.stop="preImag(index, solveArr(item.img_url))"
              ></li>
            </div>
          </div>
          <!-- 下方操作 -->
          <div class="operate">
            <!-- 分享 -->
            <span
              class="iconfont fl icon-resonserate"
              @click.stop="showShare = true"
            ></span>
            <!-- 收藏 -->
            <div class="fr" @click.stop="setCollect(item.id, item)">
              <span class="iconfont" :class="getCollect(item.id)"></span
              ><span class="count">{{ item.collects }}</span>
            </div>
            <!-- 点赞 -->
            <div class="fr" @click.stop="setLike(item.id, item)">
              <span class="iconfont" :class="getLike(item.id)"></span
              ><span class="count">{{ item.likes }}</span>
            </div>
          </div>
        </van-cell>
      </van-list>
    </div>
    <van-share-sheet
      v-model="showShare"
      title="立即分享给好友"
      :options="options"
      @select="onSelect"
    />
  </div>
</template>
<script>
import { get_topic } from "@/api/topic";
import { post_page, set_likes, set_collects } from "@/api/posts";
import { get_info_by_token } from "@/api/user.js";
export default {
  data() {
    return {
      topic: [],
      postList: [],
      size: 10,
      page: 1,
      loading: true,
      finished: false,
      type: 0,
      showShare: false,
      options: [
        { name: "微信", icon: "wechat" },
        { name: "微博", icon: "weibo" },
        { name: "复制链接", icon: "link" },
        { name: "分享海报", icon: "poster" },
        { name: "二维码", icon: "qrcode" },
      ],
    };
  },
  methods: {
    //点赞
    getLike(id) {
      let arr = this.$store.state.userInfo.like_posts || "";
      arr = arr.split(",");
      let item = arr.find((item) => {
        return id == item;
      });
      return item ? "icon-good-fill" : "icon-good";
    },
    async setLike(id, item) {
      let arr = this.$store.state.userInfo.like_posts || "";
      arr = arr.split(",");
      let item2 = arr.find((item3) => {
        return id == item3;
      });
      let type = 1;
      if (item2) {
        type = 0;
      }
      let data = {
        type: type,
        pid: id,
      };
      let result = await set_likes(data);
      if (result.data.code === 0) {
        let result2 = await get_info_by_token();
        if (result2.data.code === 0) {
          this.$store.state.userInfo = result2.data.data;
        } else {
          this.$toast("token失效");
        }
        if (type) {
          item.likes += 1;
        } else {
          item.likes -= 1;
        }
      } else {
        this.$toast(result.data.msg);
      }
    },
    //收藏
    getCollect(id) {
      let arr = this.$store.state.userInfo.collect_posts || "";
      arr = arr.split(",");
      let item = arr.find((item) => {
        return id == item;
      });
      return item ? "icon-collection-fill" : "icon-collection";
    },
    async setCollect(id, item) {
      let arr = this.$store.state.userInfo.collect_posts || "";
      arr = arr.split(",");
      let item2 = arr.find((item3) => {
        return id == item3;
      });
      let type = 1;
      if (item2) {
        type = 0;
      }
      let data = {
        type: type,
        pid: id,
      };
      let result = await set_collects(data);
      if (result.data.code === 0) {
        let result2 = await get_info_by_token();
        if (result2.data.code === 0) {
          this.$store.state.userInfo = result2.data.data;
        } else {
          this.$toast("token失效");
        }
        if (type) {
          item.collects += 1;
        } else {
          item.collects -= 1;
        }
      } else {
        this.$toast(result.data.msg);
      }
    },
    //分享面板
    onSelect(option) {
      this.$toast(option.name);
      this.showShare = false;
    },
    goTo(id) {
      this.$router.push(`/detail/${id}`);
    },
    onLoad() {
      this.getPosts();
      this.page += 1;
    },
    refresh() {
      this.postList = [];
      this.page = 1;
      this.getPosts();
    },
    async getPosts() {
      let params = {
        size: this.size,
        page: this.page,
        type: 1,
      };
      const result = await post_page(params);
      if (result.data.code === 0) {
        if (result.data.data.length) {
          this.postList = this.postList.concat(result.data.data);
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
    solveArr(str) {
      if (str) {
        let arr = str.split(",");
        return arr;
      } else {
        return [];
      }
    },
    preImag(index, lists) {
      this.$imagePreview({
        images: lists,
        showIndex: true,
        loop: false,
        startPosition: index,
      });
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
    this.onLoad();
  },
};
</script>
<style lang="scss" scoped>
#recPost {
  height: 100%;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  .ad {
    height: 30px;
    text-align: center;
    line-height: 30px;
    margin: 5px 5px;
    border: 1px solid #333;
    border-radius: 20px;
  }
  .topics {
    height: 30px;
    overflow: hidden;
    width: 100%;
    background: #fff;
    .topicWrap {
      white-space: nowrap;
      a {
        margin: 0 0 0 10px;
        font-weight: 900;
        color: #333;
        line-height: 30px;

        &:active {
          color: #ea3;
          text-decoration: underline;
        }
      }
    }
  }
}
.posts {
  flex: 1;
  overflow: scroll;
}
.postItem {
  display: block;
  //   background: #eee;
  border-bottom: 1px solid #ccf;
  min-height: 100px;
  //   padding: 10px;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  color: #222;
  .info {
    height: 50px;
    display: flex;
    justify-content: flex-start;
    align-items: center;
    .avatar {
      width: 45px;
      height: 45px;
      overflow: hidden;
      border-radius: 50%;
      img {
        width: 100%;
      }
    }
    .detail {
      padding-left: 10px;
      .name {
        font-size: 16px;
        color: #555;
      }
      .date {
        font-size: 14px;
        color: #aaa;
      }
    }
    .comments {
      flex: 1;
      .iconfont {
        font-size: 24px;
        color: #222;
      }
      .count {
        line-height: 24px;
        color: #999;
        font-size: 14px;
      }
    }
  }
  .text {
    padding: 5px 5px;
    .textInner {
      display: -webkit-box;
      overflow: hidden;
      -webkit-line-clamp: 5;
      -webkit-box-orient: vertical;
    }
    .imag {
      padding-top: 5px;
      .imgLi {
        display: inline-block;
        margin: 0 5px;
        height: 100px;
        width: 100px;
        border-radius: 10%;
        background-position: center center;
        background-repeat: no-repeat;
        background-size: cover;
      }
    }
  }
  .operate {
    .iconfont {
      font-size: 24px;
    }
    .count {
      line-height: 24px;
      color: #999;
      font-size: 14px;
    }
  }
}
</style>
