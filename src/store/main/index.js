export default{
    namespaced:true,
    state:{
        tabList:[
            {
                id:"101",
                router:"/main/post",
                title:"贴屋",
                iconfont:"icon-home",
                seliconfont:"icon-home-fill",
                sel:true
            },
            {
                id:"102",
                router:"/main/chat",
                title:"聊天",
                iconfont:"icon-comments",
                seliconfont:"icon-comments-fill",
                sel:false
            },
            {
                id:"103",
                router:"/main/my",
                title:"我的",
                iconfont:"icon-account",
                seliconfont:"icon-account-fill",
                sel:false
            }
        ]
    },
    mutations:{
      
    },
    actions:{
        
       
    }
}