<template>
    <div id="newPost">
        <div class="ad">
            广告位
        </div>
        <!-- 因使用BetterScroll 吸顶效果暂时失效,替代方案暂无 -->
        <div class="topics" ref="topicScroll">
            <div class="topicWrap" ref="topicWrap">
                <a v-for="item of getTopic" :key="item.tid" class="topic" href="javascript:;">
                    #{{item.title}}
                </a>
            </div>
        </div>
        <div class="content">
            <a v-for="item of getPosts" :key="item.pid" class="postItem" href="javascript:;">
                <div class="info">
                    <!-- 头像 -->
                    <div class="avatar">
                        <img :src="item.avatar" :alt="item.username">
                    </div>
                    <div class="detail">
                        <!-- 昵称 -->
                        <p class="name">{{item.username}}</p>
                        <!-- 发布时间 -->
                        <p class="date">{{item.postdateR}}</p>
                    </div>
                    <!-- 评论 -->
                    <div class="comments">
                        <div class="fr">
                            <span class="iconfont icon-comments"></span><span class="count">{{item.comNum}}</span>
                        </div>
                    </div>
                </div>
                <!-- 正文内容 -->
                <div  class="text">
                    <!-- 后续做正则匹配追加话题链接 -->
                    <div class="textInner" v-html="item.content"></div>
                    <!-- 图片 -->
                    <div class="imag">
                        <li class="imgLi"  v-for="(unit,index) of item.img" :key="unit" v-lazy:background-image="unit" v-show="index<3" @click="preImag(index,item.img)"></li>
                        
                    </div>
                </div>
                <!-- 下方操作 -->
                <div class="operate">
                    <!-- 分享 -->
                    <span class="iconfont fl icon-resonserate"></span>
                    
                    <!-- 收藏 -->
                    <div class="fr ">
                        <span class="iconfont icon-collection"></span><span class="count">{{item.collect.length}}</span>
                    </div>
                    <!-- 点赞 -->
                     
                    <div class="fr">
                        <span class="iconfont icon-good"></span><span class="count">{{item.like.length}}</span>
                    </div>

                </div>
            </a>
        </div>
    </div>
</template>
<script>

export default {
    data() {
        return {
            
        }
    },
    methods:{
        verScroll(){
            this.$refs.topicWrap.style.width = this.$refs.topicScroll.scrollWidth+'px';
            this.$nextTick(()=>{
                if (!this.scroll) {
                    console.log("话题BScroll初始化");
                    this.scroll = new this.$BScroll(this.$refs.topicScroll, {
                        startX: 0, 
                        click: true,
                        scrollX: true,
                        scrollY: false,
                        eventPassthrough: 'vertical',
                        mouseWheel: true,//开启鼠标滚轮
                        disableMouse: false,//启用鼠标拖动
                        disableTouch: false//启用手指触摸
                    })
                } else {
                    this.scroll.refresh();
                    console.log("话题BScroll刷新");
                }
            })
        },
        solveDate(){
             let nowD = new Date();
            this.$store.state.post.newPosts.posts.forEach((item,index)=>{
                let dateArr = item.postdate.split("/");
                let vD = new Date(dateArr[0],dateArr[1],dateArr[2],dateArr[3],dateArr[4],dateArr[5]);
                let tD = nowD-vD;
                // 时间差 -> td  当前时间 -> nowD 发帖时间 -> vD
                if(tD<=1800000){
                    // 发帖时间距现在小于半个小时;
                    // 转换成秒
                    tD = Math.ceil(tD/1000);
                    if(tD<60){
                        // 如小于60S,显示多少秒之前
                        item.postdateR = `${tD}秒之前`;
                    }else{
                        // 其他显示多少分钟之前
                        tD = Math.ceil(tD/60);
                        item.postdateR = `${tD}分钟之前`;
                    }
                    // let tDText = 
                }else{
                    // 如大于半个小时
                    // 直接转换日期格式并保存
                    item.postdateR = `${dateArr[0]}年${+dateArr[1]+1}月${dateArr[2]}日${dateArr[3]}:${dateArr[4]}`;
                }
            });
        },
        preImag(index,lists){
            this.$imagePreview({
                images: lists,
                showIndex:true,
                loop:false,
                startPosition: index
            });
        }
        
    },
    computed:{
        getPosts(){
            if(!this.$store.state.post.newPosts.posts.length){
                return [];
                // 如帖子数据长度为0则直接返回空数组
            }
            // Vue3中可能会导致死循环,监听到数组内部继续执行数据更新
            // 放在此处目前可保证每次获取加载路由时会更新时间
            //修改日期格式
            this.solveDate();
            
            return this.$store.state.post.newPosts.posts;
        },
        getTopic(){
            return this.$store.state.post.newPosts.topic;
        }

    },
    mounted(){
        console.log('最新初始化中')
        this.$nextTick(() => {
            this.verScroll()
        });  
    },
    created(){
        if(!this.$store.state.post.newPosts.posts.length){
            this.$store.dispatch("post/getNewPosts");
        }
    },
    updated(){
        console.log('数据刷新');
        this.$nextTick(() => {    
            this.verScroll()
        })
    },
    destroyed(){
        // 销毁话题滚动条
        this.$attrs.saveScrollY(0);//保存当前滚动条进度;
        this.scroll.destroy();
    }   
}
</script>
<style lang="scss" scoped>
    #newPost{
        overflow: hidden;
        .ad{
            height: 30px;
            text-align: center;
            line-height: 30px;
            margin: 5px 5px;
            border: 1px solid #333;
            border-radius: 20px;
        }
        .topics{
            height: 30px;
            overflow: hidden;
            width: 100%;
            background: #fff;
            .topicWrap{
                white-space: nowrap;
                a{  
                    margin: 0 0 0 10px;
                    font-weight: 900;
                    color: #333;
                    line-height: 30px;

                    &:active{
                        color: #ea3;
                        text-decoration:underline;
                    }
                    

                }
            }
        }
        .content{
            .postItem{
                display: block;
                margin: 8px 12px;
                //   background: #eee;
                border-bottom: 1px solid #ccf;
                min-height: 100px;
                //   padding: 10px;
                display: flex;
                flex-direction: column;
                justify-content: flex-start;
                color: #222;
                .info{
                    height: 50px;
                    display:flex;
                    justify-content: flex-start;
                    align-items: center; 
                    .avatar{
                        width: 45px;
                        height: 45px;
                        overflow: hidden;
                        border-radius: 50%;
                        img{
                            width: 100%;
                        }
                    }
                    .detail{
                        padding-left: 10px;
                        .name{
                            font-size: 16px;
                            color: #555;
                        }
                        .date{
                            font-size: 14px;
                            color: #aaa;
                        }
                    }
                    .comments{
                        flex: 1;
                        .iconfont{
                            font-size: 24px;
                            color: #222;
                        }
                        .count{
                        line-height: 24px;
                        color: #999;
                        font-size: 14px;
                    }
                    }
                }
                .text{
                    padding: 5px 5px;
                    .textInner{
                        display: -webkit-box;
                        overflow: hidden;  
                        -webkit-line-clamp: 5;
                        -webkit-box-orient: vertical;
                    }
                    .imag{
                        padding-top: 5px;
                        .imgLi{
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

                }
                .operate{
                    .iconfont{
                        font-size: 24px;
                    }
                    .count{
                        line-height: 24px;
                        color: #999;
                        font-size: 14px;
                    }
                }
                   
                    
            }
            padding-bottom: 50px;
        }
    }
</style>
