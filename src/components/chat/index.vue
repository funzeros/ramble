<template>
  <div id="chat" class="chat">
    <div class="header" @click.stop="seeMemb">
      <span class="iconfont icon-Customermanagement"></span>当前在线人数：{{
        getMember.length
      }}
      人 点击查看有谁在
    </div>
    <div class="body" ref="body">
      <div
        class="msg"
        v-for="(item, index) of getChatList"
        :key="'msg' + index"
      >
        <div class="box" v-if="item.id == getId">
          <div class="time">{{ item.time }}</div>
          <div class="info box width">
            <div class="avatar right">
              <img :src="item.avatar" :alt="item.name" />
            </div>
            <div class="name right">{{ item.name }}</div>
          </div>
          <div class="box width">
            <div class="body right">{{ item.body }}</div>
          </div>
        </div>
        <div class="box" v-else>
          <div class="time">{{ item.time }}</div>
          <div class="info box width">
            <div class="avatar left">
              <img :src="item.avatar" :alt="item.name" />
            </div>
            <div class="name left">{{ item.name }}</div>
          </div>
          <div class="box width">
            <div class="body left">{{ item.body }}</div>
          </div>
        </div>
      </div>
    </div>
    <div class="input">
      <van-field v-model="value" placeholder="输入点什么..." ref="input"
        ><template #button>
          <van-button size="small" type="info" @click="send">发送</van-button>
        </template></van-field
      >
    </div>
    <van-popup
      v-model="show"
      position="left"
      :style="{ height: '100%', width: '70%' }"
    >
      <div class="name" v-for="(item, index) of getMember" :key="item.rid">
        用户{{ index + 1 }}：{{ item.rname }}
      </div>
    </van-popup>
  </div>
</template>
<script>
export default {
  data() {
    return {
      value: "",
      show: false,
    };
  },
  methods: {
    send() {
      if (this.value) {
        let info = this.$store.state.userInfo;
        let data = `{"time":"${this.getTime()}","avatar":"${info.avatar ||
          "https://img.yzcdn.cn/vant/cat.jpeg"}","name":"${
          info.nickname
        }","id":"${info.id}","body":"${this.value}","type":"1"}`;
        this.$store.state.ws.send(data);
        this.value = "";
      }
    },
    seeMemb() {
      this.show = true;
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
          // console.log(res);
          this.$store.state.msgP = true;
        }
      };
    },
    getTime() {
      let d = new Date();
      return `${d.getHours()}:${
        d.getMinutes() < 10 ? "0" + d.getMinutes() : d.getMinutes()
      }:${d.getSeconds() < 10 ? "0" + d.getSeconds() : d.getSeconds()}`;
    },
  },
  computed: {
    getMember() {
      return this.$store.state.chatMembers;
    },
    getChatList() {
      return this.$store.state.chatList;
    },
    getId() {
      return this.$store.state.userInfo.id;
    },
  },
  mounted() {
    this.getWsMsg();
    this.$refs.body.scrollTop = this.$refs.body.scrollHeight;
  },
};
</script>
<style lang="scss" scoped>
.chat {
  height: 100%;
  padding-bottom: 50px;
  box-sizing: border-box;
  position: relative;
  display: flex;
  flex-direction: column;
  .header {
    height: 20px;
    border: 2px solid #aaaaff;
    font-size: 16px;
    color: #999;
    line-height: 20px;
    .iconfont {
      font-size: 16px;
      color: #aaaaff;
    }
  }
  .body {
    flex: 1;
    overflow: scroll;
    .msg {
      padding: 10px 5px;
      .box {
        overflow: hidden;
      }
      .left {
        float: left;
      }
      .right {
        float: right;
      }
      .time {
        text-align: center;
        font-size: 12px;
        color: #999;
      }
      .info {
        .avatar {
          img {
            width: 30px;
            height: 30px;
            border-radius: 50%;
          }
        }
      }
      .width {
        width: 100%;
      }
      .body {
        display: inline;
        border-radius: 20px;
        background: #faaaff;
        padding: 5px;
      }
    }
  }
  .input {
    width: 100%;
    box-sizing: border-box;
    background: #aaaaff;
    border: 2px solid #aaaaff;
    overflow: hidden;
    border-radius: 20px 20px 0 0;
  }
}
.name {
  padding: 5px;
  font-size: 14px;
  color: #666;
}
</style>
