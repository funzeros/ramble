<template>
    <div id="login" class="login">
        <img class="logo"  :src="imgLogo" alt="闲侃" />
        <div class="blank"></div>
        <van-cell-group>
            <van-field
                v-model="username"
                required
                clearable
                label="手机号"
                placeholder="请输入手机号"
            />
            <van-field
                v-model="password"
                type="password"
                label="密码"
                placeholder="请输入密码"
                required
            />
        </van-cell-group>
        <div class="blank"></div>
        <van-button type="primary" :color="getColor" @click="submit">确认登录</van-button>
        <p class="other">
            <router-link to = "">
                <span class="forget">忘记密码</span>
            </router-link>&nbsp;|&nbsp; 
            <router-link to = "">
                <span class="register">立即注册</span>
            </router-link>
        </p>
    </div>
</template>
<script>
import sha256 from "js-sha256"
import imgLogo from "@/assets/rambLogo.png"
export default {
    data(){
        return {
            username:"",
            password:"",
            secPassword:"",
            imgLogo:imgLogo
        }
    },
    methods:{
       async submit(){
            this.secPassword = this.password&&sha256(this.password)||"";
            let userInfo = {
                username:this.username,
                password:this.secPassword
            }
            await this.$store.dispatch('login/getInfo',userInfo);
            if(this.$store.state.login){
                this.$router.push({name:'post'});
            }
       }
    },
    computed:{
        getColor(){
            return this.$store.state.logoColor;
        }
    }
}
</script>
<style lang="scss" scoped>
    .login{
        height: 100%;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        
        .logo{
        width: 140px;
        }
        .other{
            font-size: 16px;
            position: absolute;
            bottom: 50px;
            .forget{
                font-size: 16px;
                color: #bbbbcc;
            }
            .register{
                font-size: 16px;
                color: #bbccbb;
            }
        }
        .blank{
            height: 30px;
        }
    }
    
</style>