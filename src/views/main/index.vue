<template>
    <div id="main" class="main">
        <router-view></router-view>
        <nav class="tabBar">
            <li class="tab" v-for="(tab,index) of tabList" :key="tab.id" @click="chooseTab(index)">
                <div  class="cont" :class="tab.sel?'darkB':'lightB'" :to="tab.router">
                    <span class="iconfont" :class="tab.seliconfont"></span>
                    <span class="text">{{tab.title}}</span>
                </div>
            </li>
        </nav>
    </div>
</template>
<script>
export default {
    data(){
        return {
            
        }
    },
    methods:{
        chooseTab(index){//选中事件
            this.changeTabSel(index);
        },
        changeTabSel(index){//改变tab烂选中状态
            let len = this.$store.state.main.tabList.length;
            for(let i = 0 ;i<len;i++){
                this.$store.state.main.tabList[i].sel = false;
            };
            this.$store.state.main.tabList[index].sel = true;
            let currentPath = this.$route.path.split("/")[2];
            let nextPath = this.$store.state.main.tabList[index].router.split("/")[2];
            if(currentPath === nextPath){
                console.log('阻止了一次自跳转');
                return;
            }
            this.$router.push({path:this.$store.state.main.tabList[index].router});

       }

    },
    computed:{
        tabList(){
            return this.$store.state.main.tabList;//用计算属性从主页的状态管理中取到主页tabBar信息
        }
    }
}
</script>
<style lang="scss" scoped>
    .main{
        height: 100%;
        position: relative;
        
        .tabBar{
            position: fixed;
            bottom: 0;
            display: flex;
            justify-content: space-between;
            align-items: center;
            width: 100%;
            .tab{
                flex: 1;
                box-shadow: 0px -1px 5px 1px #86cce8;

                .cont{
                    display: flex;
                    flex-direction: column;
                    justify-content: center;
                    align-items: center;
                    color: #86cce8;
                    height: 50px;
                    background: #fff;
                    &.darkB{
                    background: #86cce8;//选中状态的深色背景
                    color:#fff;//选中状态的浅色字体
                    }
                    &.lightB{
                        background: #fff;//选中状态的浅色背景
                        color:#86cce8;//未选中状态的深色字体
                    }
                    .iconfont{
                        font-size: 24px;
                    }
                    .text{
                        font-size: 18px;

                    }
                
                }
                
            }
        }
    }
</style>