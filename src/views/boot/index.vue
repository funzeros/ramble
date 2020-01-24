<template>
  <div id="boot" class="boot">
    <img class="logo" :style="visible" :src="imglogo" alt="闲侃" />
  </div>
</template>
<script>
import imglogo from "@/assets/rambLogo.png"
export default {
  data() {
    return {
      visible: '',
      imglogo:imglogo,
    };
  },
  methods: {},
  computed: {},
  mounted() {
    this.timer = setTimeout(() => {
      this.visible = 'opacity: 1';
      this.timer = setTimeout(()=>{
        this.visible = 'opacity: 1;transform: translateY(-100px)';
        this.timer = setTimeout(()=>{
          clearTimeout(this.timer);
          this.$router.push({name:'post'})
        },700)
      },500);
    }, 500);
  }
};
</script>
<style lang="scss" scoped>
.boot {
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  .logo {
    width: 140px;
    transition: all 0.5s linear;
    opacity: 0;
  }
}
</style>