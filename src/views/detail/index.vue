<template>
  <div class="wrapper">
    <van-nav-bar
      :title="main.title"
      left-text="返回"
      left-arrow
      @click-left.stop="onClickLeft"
    />
    <div class="main">
      <div class="section">
        <van-cell>
          <div class="info">
            <div class="avatar">
              <img :src="main.avatar" alt="" />
            </div>
            <div class="cont">
              <div class="name">{{ main.nickname }}</div>
              <div class="time">{{ solveTime(main.ptime) }}</div>
            </div>
          </div>
          <div class="body">
            {{ main.body }}
          </div>
          <div class="imag">
            <li
              class="imgLi"
              v-for="(unit, index) of solveArr(main.img_url)"
              :key="unit"
              v-lazy:background-image="unit"
              v-show="index < 3"
              @click.stop="preImag(index, solveArr(main.img_url))"
            ></li>
          </div>
        </van-cell>
        <van-cell
          v-for="item of floor"
          :key="item.id"
          @click.stop="isShow(true, item, item)"
        >
          <div class="info">
            <div class="avatar">
              <img :src="item.avatar" alt="" />
            </div>
            <div class="cont">
              <div class="name">{{ item.nickname }}</div>
              <div class="time">{{ solveTime(item.ctime) }}</div>
            </div>
          </div>
          <div class="body">
            {{ item.body }}
          </div>
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
          <div class="comments">
            <van-cell
              v-for="item2 of item.child"
              :key="item2.id"
              @click.stop="isShow(true, item, item2)"
            >
              <div class="info">
                <div class="avatar">
                  <img :src="item2.avatar" alt="" />
                </div>
                <div class="cont">
                  <div class="name">
                    {{ item2.nickname }}<span> 回复 </span>{{ item2.cname }}
                  </div>
                  <div class="time">{{ solveTime(item2.ctime) }}</div>
                </div>
              </div>
              <div class="body">
                {{ item2.body }}
              </div>
              <div class="imag">
                <li
                  class="imgLi"
                  v-for="(unit, index) of solveArr(item2.img_url)"
                  :key="unit"
                  v-lazy:background-image="unit"
                  v-show="index < 3"
                  @click.stop="preImag(index, solveArr(item2.img_url))"
                ></li>
              </div>
            </van-cell>
          </div>
        </van-cell>
      </div>
    </div>
    <van-overlay :show="show" @click.stop="isShow(false)" />
    <div class="input">
      <van-field v-model="value" placeholder="输入点什么..."
        ><template #button>
          <van-button size="small" type="info" @click="send">发送</van-button>
        </template></van-field
      >
    </div>
  </div>
</template>
<script>
import { post_detail } from "@/api/posts";
import { comments_create } from "@/api/comments";
export default {
  data() {
    return {
      main: {},
      pid: "",
      floor: [],
      value: "",
      show: false,
      sendData: {
        img_url: "",
        tid: "",
        fid: "",
        nickname: "",
        cname: "",
        avatar: "",
        pid: "",
        body: "",
      },
    };
  },
  methods: {
    isShow(b, item1, item2) {
      this.show = b;
      if (b) {
        this.sendData.fid = item1.id;
        this.sendData.tid = item2.uid;
        this.sendData.cname = item2.nickname;
      } else {
        this.sendData.fid = 0;
        this.sendData.tid = this.main.id;
        this.sendData.cname = this.main.nickname;
      }
    },
    async send() {
      if (!this.value) {
        this.$toast("不能发表空内容");
        return;
      }
      this.sendData.body = this.value;
      this.sendData.pid = this.pid;
      const result = await comments_create(this.sendData);
      if (result.data.code === 0) {
        this.getDetail();
        this.$toast(result.data.msg);
        this.show = false;
      } else {
        this.$toast(result.data.msg);
      }
    },
    onClickLeft() {
      this.$router.go(-1);
    },
    async getDetail() {
      const result = await post_detail({ pid: this.pid });
      if (result.data.code === 0) {
        this.main = result.data.data;
        this.solveDate(result.data.data.comments);
      } else {
        this.$toast(result.data.msg);
      }
    },
    solveDate(data) {
      if (data.length === 0) {
        return;
      }
      let arr1 = data.filter((item) => {
        item.child = [];
        return item.fid === 0;
      });
      let arr2 = data.filter((item) => {
        return item.fid !== 0;
      });
      arr2.forEach((item) => {
        arr1.forEach((item2) => {
          if (item.fid === item2.id) {
            item2.child.push(item);
          }
        });
      });
      this.floor = arr1;
      this.sendData.avatar = this.$store.state.userInfo.avatar;
      this.sendData.nickname = this.$store.state.userInfo.nickname;
      this.sendData.fid = 0;
      this.sendData.tid = this.main.id;
      this.sendData.cname = this.main.nickname;
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
  },
  created() {
    this.pid = this.$route.params.id;
    this.getDetail();
  },
};
</script>
<style lang="scss" scoped>
.wrapper {
  height: 100%;
  display: flex;
  flex-direction: column;
  position: relative;
  .main {
    flex: 1;
    overflow: scroll;
    .section {
      padding-bottom: 60px;
    }
    .avatar {
      img {
        width: 40px;
        height: 40px;
        border-radius: 50%;
      }
    }
    .info {
      display: flex;
      .cont {
        margin-left: 20px;
      }
      .name {
        font-size: 14px;
        font-weight: 900;

        span {
          font-size: 14px;
          font-weight: 500;
        }
      }
      .time {
        font-size: 12px;
        color: #999;
      }
    }
  }
  .input {
    width: 100%;
    position: fixed;
    bottom: 0;
    box-sizing: border-box;
    border: 2px solid #aaaaff;
    border-radius: 0 0 20px 20px;
    overflow: hidden;
    z-index: 9;
  }
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
.van-cell {
  border: #eeeeee solid;
  border-width: 0 0 1px 0;
}
</style>
