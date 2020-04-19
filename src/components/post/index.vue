<template>
  <div id="post" class="post">
    <!-- 贴屋顶部导航 -->
    <div class="tab-top">
      <div class="logo">
        <img :src="imgLogo" alt="闲侃" @click.stop="goToMy" />
        <!-- 待定logo,视业务换头像 -->
      </div>
      <div class="switch">
        <li
          :style="{ fontSize: curSwtich ? '16px' : '24px' }"
          @click.stop="postSwtich(0)"
        >
          最新
        </li>
        <li
          :style="{ fontSize: curSwtich ? '24px' : '16px' }"
          @click.stop="postSwtich(1)"
        >
          热门
        </li>
        <!-- 判断选中状态绑定类 -->
      </div>
      <div class="operate">
        <a href="javascript:;">
          <span class="iconfont icon-comments-fill"></span>
        </a>
        <a href="javascript:">
          <span class="iconfont icon-add"></span>
        </a>
      </div>
    </div>
    <!-- 路由视窗 -->
    <div class="content-father" ref="contFather">
      <router-view />
    </div>
  </div>
</template>
<script>
// import imgLogo from "@/assets/rambLogo.png";

export default {
  data() {
    return {
      imgLogo:
        this.$store.state.userInfo.avatar ||
        "https://img.yzcdn.cn/vant/cat.jpeg",
    };
  },
  methods: {
    goToMy() {
      this.$router.push({ name: "my" });
    },
    postSwtich(key) {
      // 最新与热门页的切换函数
      if (key === this.$store.state.post.curSwtich) {
        // console.log("触发了一次帖子选择的无效点击已返回");
        return false;
      }
      if (key) {
        this.$store.dispatch("post/getCurSwtich", 1);
        this.$router.push({ name: "recPost" });
      } else {
        this.$store.dispatch("post/getCurSwtich", 0);
        this.$router.push({ name: "newPost" });
      }
    },
  },
  computed: {
    curSwtich() {
      // 获取当前页类型的判定值
      return this.$store.state.post.curSwtich;
    },
  },
  mounted() {
    // 测试路由
    // console.log("进入贴屋");
    if (this.$store.state.post.curSwtich) {
      this.$router.push({ name: "recPost" });
    } else {
      this.$router.push({ name: "newPost" });
    }
    // console.log("帖屋初始化完成");
  },
};
</script>
<style lang="scss" scoped>
#post {
  height: 100%;
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  overflow: hidden;
  .tab-top {
    height: 45px;
    width: 100%;
    background: #86cce8;
    display: flex;
    justify-content: space-around;
    align-items: center;

    div {
      height: 40px;
      display: flex;
      align-items: center;
      justify-content: space-around;
      &.logo {
        width: 90px;
        img {
          display: block;
          height: 30px;
          width: 30px;
          border: 1px #fff solid;
          border-radius: 50%;
        }
      }
      &.switch {
        flex: 1;
        display: flex;
        justify-content: space-around;
        align-items: center;
        li {
          flex: 1;
          text-align: center;
          color: #fff;
          font-size: 16px;
        }
      }
      &.operate {
        width: 90px;
        .iconfont {
          color: #fff;
          font-size: 24px;
        }
        a {
          &:active {
            background: #75bbe0;
            border-radius: 50%;
          }
        }
      }
    }
  }
  .content-father {
    flex: 1;
    position: relative;
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
