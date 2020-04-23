<template>
  <div id="app">
    <transition name="bounce">
      <router-view></router-view>
    </transition>
  </div>
</template>
<script>
export default {
  destroyed() {
    this.$store.state.ws.close();
    this.$store.state.ws=null;
      this.$store.state.wsF=1;
  },
};
</script>
<style lang="scss">
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  /* text-align: center; */

  .bounce-enter-active {
    animation: bounce-in 0.3s reverse;
  }
  .bounce-leave-active {
    animation: bounce-in 0.3s;
  }
  @keyframes bounce-in {
    0% {
      transform: translateX(0%);
    }
    // 50% {
    //   transform: translateX(50%);
    // }
    100% {
      transform: translateX(-100%);
    }
  }
}

* {
  margin: 0;
  padding: 0;
  font-size: 16px;
}
li {
  list-style: none;
}
img {
  content: normal !important;
}
</style>
