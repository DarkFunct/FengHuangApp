<template>
  <div>
    <group title="登录">
      <x-input title="帐号:" v-model="username" placeholder="请输入帐号"></x-input>
      <x-input title="密码:" v-model="password" type="password" placeholder="请输入登录密码"></x-input>
      <x-input title="验证码:" v-model="yzma" placeholder="请输入验证码">
        <img class="yanzhengimg" slot="right-full-height"  @click="getyanzheng" :src="'data:image/png;base64,'+tupian">
      </x-input>
    </group>

    <div style="padding:15px;">
      <x-button @click.native="login" type="primary">登  录</x-button>
    </div>

  </div>
</template>


<script>
import cookieParser from './../assets/js/cookie';
import { mapGetters } from 'vuex';
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
    
    if (window.ENV == 'dev') {
      //console.log('研发自动登录');

      this.logindev();

    } else {
      //普通用户登录
       //this.$router.push({name: 'login'});
    }
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

        stroe.commit('updateisLoading',true);

        await that.$post(`${window.url}/api/login`,obj).then((res) => {
          that.$handelResponse(res, (result) => {
            stroe.commit('updateisLoading',false);

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
</style>
