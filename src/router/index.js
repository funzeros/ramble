import Vue from 'vue'
import VueRouter from 'vue-router'
import boot from '@/views/boot/index.vue';
import store from '@/store';

Vue.use(VueRouter)

const routes = [
  {
    path:'/',
    redirect:'/boot',
    meta:{
      title:'闲侃'
    }
  },
  {
    path:'/boot',
    name:'boot',
    component:boot,
    meta:{
      title:'闲侃 - 启动'
    }
  },
  {
    path:'/login',
    name:'login',
    component:()=>import('@/views/login&reg/index.vue'),
    meta:{
      title:'闲侃 - 登录'
    }
  },
  {
    path:'/main',
    name:'main',
    component:()=>import('@/views/main'),
    meta:{
      title:'闲侃 - 主页'
    },
    children:[
      {
        path:'/main/post',
        name:'post',
        component:()=>import('@/components/post'),
        meta:{
          title:'闲侃 - 帖子'
        }
      },
      {
        path:'/main/chat',
        name:'chat',
        component:()=>import('@/components/chat'),
        meta:{
          title:'闲侃 - 好友'
        }
      },
      {
        path:'/main/my',
        name:'my',
        component:()=>import('@/components/my'),
        meta:{
          title:'闲侃 - 我的'
        }
      }
    ]
  }
]


const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

router.beforeEach((to,from,next)=>{
  
  if(to.name==="login"||to.name==="register"||to.name==="boot"){
    if(to.meta.title){
      document.title = to.meta.title;
    }
    next();
  }else if(store.state.login.loginFlag){
    if(to.meta.title){
      document.title = to.meta.title;
    }
    next();
  }else{
    next('login');
  }

})


export default router
