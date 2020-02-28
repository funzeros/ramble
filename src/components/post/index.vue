<template>
    <div id="post" class="post">
        <!-- 贴屋顶部导航 -->
        <div class="tab-top">
            <div class="logo">
                <img :src="imgLogo" alt="闲侃">
                <!-- 待定logo,视业务换头像 -->
            </div>
            <div class="switch" >
                <li :style="{fontSize:curSwtich?'16px':'24px'}"  @click="postSwtich(0)">最新</li>
                <li :style="{fontSize:curSwtich?'24px':'16px'}" @click="postSwtich(1)">推荐</li>
                <!-- 判断选中状态绑定类 -->
            </div>
            <div class="operate">
                <a href="javascript:;">
                    <span class="iconfont icon-search"></span>
                </a>
                <a href="javascript:">
                    <span class="iconfont icon-add"></span>
                </a>
            </div>
        </div>
        <!-- 路由视窗 -->
        <div class="content-father" ref="contFather">
            <div>
                <router-view :saveScrollY="this.saveScrollY" /> 
            </div>
        </div>

    </div>
</template>
<script>
import imgLogo from "@/assets/rambLogo.png"

export default {
    data(){
        return {
            imgLogo:imgLogo,
        }
    },
    methods:{
        contScroll(y){// 帖子上下滚动组件
            this.$nextTick(()=>{
                if (!this.scroll) {
                    console.log("帖子BScroll初始化");
                    this.scroll = new this.$BScroll(this.$refs.contFather, {
                        startY: y, 
                        click: true,
                        scrollX: false,
                        scrollY: true,
                        mouseWheel: true,//开启鼠标滚轮
                        disableMouse: false,//启用鼠标拖动
                        disableTouch: false//启用手指触摸
                    })
                } else {
                    this.scroll.refresh();
                    console.log("帖子BScroll刷新");
                }
            })
        },
        postSwtich(key){// 最新与推荐页的切换函数
           if(key===this.$store.state.post.curSwtich){
               console.log("触发了一次帖子选择的无效点击已返回");
               return false;
           }
           if(key){
                this.$store.dispatch('post/getCurSwtich',1);
                this.$router.push({name:"recPost"});
            }else{
                this.$store.dispatch('post/getCurSwtich',0);
                this.$router.push({name:"newPost"});
            }
        },
        matchScrollY(){// 匹配对应页滚动高度
            if(this.$store.state.post.curSwtich){
                this.scroll.scrollTo(0,this.$store.state.post.rScrollY)
            }else{
                this.scroll.scrollTo(0,this.$store.state.post.nScrollY)
            }
        },
        saveScrollY(key){// 保存对应页的滚动高度 
            // console.log('key',key);
            // console.log('高度',this.scroll.y);
            this.$store.dispatch('post/getScrollY',{type:key,scrollY:this.scroll.y});
            if(key!==this.$store.state.post.curSwtich){
                this.matchScrollY();
            }
        }
    },
    computed:{
        curSwtich(){// 获取当前页类型的判定值
            return this.$store.state.post.curSwtich;
        }
    },
    mounted(){
        // 测试路由
        console.log("进入贴屋");
        if(this.$store.state.post.curSwtich){
            this.$router.push({name:'recPost'});
            this.contScroll(this.$store.state.post.rScrollY);

        }else{
            this.$router.push({name:'newPost'});
            this.contScroll(this.$store.state.post.nScrollY);
        }
        this.contScroll();
        console.log('帖屋初始化完成');
    },
    updated(){
        
    },
    destroyed(){
        this.scroll.destroy();
    }
   
}
</script>
<style lang="scss" scoped>
    #post{
        height: 100%;
        position: relative;
        display: flex;
        flex-direction: column;
        justify-content: flex-start;
        overflow: hidden;
        .tab-top{
            height: 45px;
            width: 100%;
            background: #86cce8;
            display: flex;
            justify-content: space-around;
            align-items: center;

            div{
                height: 40px;
                display: flex;
                align-items: center;
                justify-content: space-around;
                &.logo{
                    width: 90px;
                    img{
                        display: block;
                        height: 80%;
                        border: 1px #fff solid;
                        border-radius: 50%;
                        }
                }
                &.switch{
                    flex: 1;
                    display: flex;
                    justify-content: space-around;
                    align-items: center;
                    li{
                        flex:1;
                        text-align: center;
                        color: #fff;
                        font-size: 16px;
                    }
                }
                &.operate{
                    width: 90px;
                    .iconfont{
                        color: #fff;
                        font-size: 24px;
                    }
                    a{
                        &:active{
                            background: #75bbe0;    
                            border-radius: 50%;
                        }
                    }
                }
                
            }
            
        }
        .content-father{
            flex: 1;
            position: relative;
            overflow: hidden;
        }
    }
</style>
<style lang="scss">
    // v-html渲染的标签样式 
    .text{
        mark{
            color: #fb0;
            background: transparent;

        }
    }
    .fl{
        float: left;
    }
    .fr{
        float: right;
    }
</style>