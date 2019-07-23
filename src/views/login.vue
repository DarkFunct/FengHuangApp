<template>

  <div class="login_con">
            <span class="welcome">欢迎登陆</span>
            <br>
            <img src="./../../static/img/shouye.png" class="user">
            <input type="text" id="userName" name="userName" placeholder="请输入用户名" class="username same">
            <br>
            <img src="./../../static/img/shouye.png" class="pass">
            <input type="password" id="userPwd" name="userPwd" placeholder="请输入密码" class="password same">
            <br>
            <input type="text" placeholder="请输入验证码" class="yanzhengma">
            <img :src="'data:image/png;base64,'+tupian" style="margin-left: 20px;margin-top: 26px;">
            <div class="btn">
              <button type="button"  class="denglu">登录</button>
              <button type="button" class="zhuce">注册</button>
            </div>
  </div>

  <!-- <div>
    <group title="登录">
      <x-input title="帐号:" v-model="username" placeholder="请输入帐号"></x-input>
      <x-input title="密码:" v-model="password" type="password" placeholder="请输入登录密码"></x-input>
      <x-input title="验证码:" v-model="yzma" placeholder="请输入验证码">
        <img class="yanzhengimg" slot="right-full-height" @click="getyanzheng" :src="'data:image/png;base64,'+tupian">
      </x-input>
         <img class="yanzhengimg" @click="getyanzheng" :src="'data:image/png;base64,'+tupian">
    </group>

    <div style="padding:15px;">
      <x-button @click.native="login" type="primary">登  录</x-button>
    </div>

  </div> -->
</template>


<script>
import cookieParser from './../assets/js/cookie';
import { mapGetters } from 'vuex';

$(".vux-x-input-right-full").on("click", function(){
alert("讨厌，点我干嘛！");
});

export default {
  data () {
    return {
      password: 'a111111',
      username: 'a4m3huiyuan1',
      yzma: '',
      tupian: '',
      yanzhengma: ''
    }
  },
  components: {
  },
  created() {
    this.getyanzheng();

    // vux-x-input-right-full
    
    if (window.ENV == 'dev') {
      //console.log('研发自动登录');

      //this.logindev();

    } else {
      //普通用户登录
       //this.$router.push({name: 'login'});
    }
  },
  mounted(){
  },
  methods: {
    async logindev() {
      let that = this;

              let obj = {
                // username: 'axuyao1',
                // password: 'a111111'
                // username: 'aaa88',
                // password: 'aaa888'
                // username: 'aydwhuiyuan1',
                // password: 'a111111'
                // username: 'a4m28dhy',
                // password: 'a123'

                username: 'atestHYXJ001',
                password: 'a111111'

                // username: 'xianjinzs2',
                // password: '123456'


                // username: 'hih0759',
                // password: 'aaa888'
              };

              let ret = await this.$post(`${window.url}/api/login`, obj);
              if(ret.code === 200) {
                cookieParser.setCookie("accesstoken", ret.token);
                this.$router.push({name: 'userAgreement'});
              }

    },
    async getyanzheng() {
      let res = await this.$get(`${window.url}/api/captcha.jpg`);

      if(res.code===200){
        this.tupian = res.tupian;
        this.yanzhengma = res.yanzhengma;
      }
    },
    async login() {
      let that = this; 

      if(this.yzma != this.yanzhengma) {
          this.$vux.alert.show({
            title: '提示',
            content: '验证码错误!'
          })

      } else {

        let obj = {
          username: this.username,
          password: this.password
        };

        store.commit('updateisLoading',true);

        await that.$post(`${window.url}/api/login`,obj).then((res) => {
          that.$handelResponse(res, (result) => {
            store.commit('updateisLoading',false);

            if(result.code === 200) {
              cookieParser.setCookie("accesstoken", result.token);
              that.$router.push({name: 'userAgreement'});
            } else {
              that.$vux.alert.show({
                  title: '提示',
                  content: result.msg
                })
            }


          })
        });

      }

     // let ret = await this.$post(`${window.url}/api/login`, obj);

    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
.yanzhengimg {
  cursor: pointer
}
.yanzmaSpan {
  display: inline-block;
  width: 200px;
  height: 50px;
  position: absolute;
  top: 104px;
  right: 0px;
}

.login_con {
    width: 450px;
    background: #FFFFFF;
    padding-bottom: 20px;
    margin: 0 auto;
    width: 450px;
    background: rgba(255,255,255,0.5);
    padding: 10px;
}
.welcome {
    font-size: 24px;
    line-height: 32px;
    color: #666666;
    margin-left: 40px;
}
.login_con img {
    position: absolute;
    margin-top: 35px;
    margin-left: 50px;
}
.same {
    width: 360px;
    height: 50px;
    margin-top: 20px;
}
.username {
    border: 1px solid rgb(178,178,178);
}
.password {
    border: 1px solid rgb(178,178,178);
}
.yanzhengma {
    margin-top: 20px;
    width: 250px;
    height: 50px;
    border: 1px solid rgb(178,178,178);
}
.form input {
    margin-left: 40px;
    padding-left: 30px;
    border-radius: 5px;
}
.btn {
    margin-top: 30px;
    margin-left: 40px;
}


</style>
