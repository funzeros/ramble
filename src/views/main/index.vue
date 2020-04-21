<template>
  <div id="main" class="main">
    <div class="wrapper">
      <router-view></router-view>
    </div>
    <van-tabbar v-model="active" @change="chooseTab">
      <van-tabbar-item
        :icon="tab.icon"
        :dot="tab.dot"
        v-for="tab of tabList"
        :key="tab.id"
        >{{ tab.title }}</van-tabbar-item
      >
    </van-tabbar>
  </div>
</template>
<script>
import { get_info_by_token } from "@/api/user.js";

export default {
  data() {
    return {
      active: 0,
    };
  },
  methods: {
    chooseTab(index) {
      //选中事件
      this.$router.push({ path: this.$store.state.main.tabList[index].router });
      //   this.changeTabSel(index);
    },
    getWsMsg() {
      this.$store.state.ws.onmessage = ({ data }) => {
        if (this.$refs.body) {
          this.$refs.body.scrollTop = this.$refs.body.scrollHeight;
        }
        let res = JSON.parse(data);
        if (!res.type) {
          let arr = [];
          for (let i in res) {
            arr.push(res[i]);
          }
          this.$store.state.chatMembers = arr;
        } else if (res.type == "1") {
          this.$store.state.chatList.push(res);
        } else if (res.type == "0") {
          this.$notify({ type: "primary", message: `${res.name}上线啦` });
        } else if (res.type == "2") {
          this.$store.state.msgP = true;
        }
      };
    },
  },
  computed: {
    tabList() {
      return this.$store.state.main.tabList; //用计算属性从主页的状态管理中取到主页tabBar信息
    },
  },
  updated() {
    switch (this.$route.name) {
      case "post":
        this.active = 0;
        break;
      case "chat":
        this.active = 1;
        break;
      case "my":
        this.active = 2;
        break;
      default:
        break;
    }
  },
  async mounted() {
    switch (this.$route.name) {
      case "main":
        this.$router.push({ name: "post" });
        break;
      case "chat":
        this.active = 1;
        break;
      case "my":
        this.active = 2;
        break;
      default:
        break;
    }
    if (this.$store.state.userInfo.id) {
    } else {
      let result = await get_info_by_token();
      if (result.data.code === 0) {
        this.$store.state.userInfo = result.data.data;
      } else {
        this.$toast("token失效");
      }
    }
    if (this.$store.state.wsF) {
      await this.$store.dispatch("userOnLine");
      this.getWsMsg();
    }
  },
};
</script>
<style lang="scss" scoped>
.main {
  height: 100%;
  position: relative;
  .van-tabbar {
    box-shadow: 0px 0 5px 1px #86cce8;
  }
  .wrapper {
    height: 100%;
  }
}
</style>
