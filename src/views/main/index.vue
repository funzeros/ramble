<template>
    <div id="main" class="main">
        <router-view></router-view>
        <nav class="tabBar">
            <li class="tab" v-for="(tab,index) of tabList" :key="tab.id" @click="chooseTab(index)">
                <router-link class="cont" :to="tab.router">
                    <span class="iconfont" :class="tab.sel?tab.seliconfont:tab.iconfont"></span>
                    <span class="text">{{tab.title}}</span>
                </router-link>
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
            }
            this.$store.state.main.tabList[index].sel = true;

       }

    },
    computed:{
        tabList(){
            return this.$store.state.main.tabList;
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