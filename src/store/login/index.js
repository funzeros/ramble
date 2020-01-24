import axios from "axios";
import qs from 'qs';
export default{
    namespaced:true,
    state:{
        username:"",
        password:"",
        loginFlag:false
    },
    mutations:{
        setInfo(state,data){
            state.username = data.username;
            state.password = data.password;
            state.loginFlag = data.loginFlag;
        }
    },
    actions:{
        getInfo({commit},data){
            return new Promise((resolve,reject)=>{
                setTimeout(()=>{
                    data.loginFlag = true;
                    commit('setInfo',data)
                    resolve(1);
                },200)
            })
          
        }
    }
}