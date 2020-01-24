<template>
  <div id="app">
    <transition name="bounce">
     <router-view></router-view>
    </transition>
  </div>
</template>

<style lang="scss">
  #app {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    /* text-align: center; */
    color: #333;

    .bounce-enter-active {
    animation: bounce-in .5s;
    }
    .bounce-leave-active {
      animation: bounce-in .5s reverse;
    }
    @keyframes bounce-in {
      0% {
        transform: scale(0);
      }
      50% {
        transform: scale(1.5);
      }
      100% {
        transform: scale(1);
      }
    }

  }

  *{
    margin: 0;
    padding: 0;
    font-size: 16px;
  }
  li{
    list-style: none;
  }
  img{
    content: normal !important;
  }


</style>


