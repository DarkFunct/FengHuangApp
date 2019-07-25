<template>
  <div>
    <x-header :left-options="{showBack: false}">凤凰</x-header>

    <divider>{{'会员登录'}}</divider>

    <div class="ui login form" id="loginBox">
      <div class="field">
        <label>账号</label>
        <input type="text" name="username" placeholder="请输入账号" autocapitalize="off" autocorrect="off" v-model="username">
        <!-- <div class="ui basic red pointing prompt label transition visible">不能为空</div> -->
      </div>
      <div class="field">
        <label>密码</label>
        <input type="password" name="password" placeholder="请输入密码" v-model="password">
        <!-- <div class="ui basic red pointing prompt label transition visible">不能为空</div> -->
      </div>

      <div class="field">
        <label>验证码</label>
        <input class="yanzhengmaInput" type="text" name="yanzhengma" placeholder="请输入验证码" v-model="yzma">
        <div class="yanzhengTem"  @click="getyanzheng"><img class="yanzhengimg" :src="'data:image/png;base64,'+tupian"></div>
      </div>

      <flexbox>
        <flexbox-item>
          <x-button type="primary" @click.native="login">登录</x-button>
        </flexbox-item>
        <flexbox-item>
          <x-button @click.native="">注册</x-button>
        </flexbox-item>
      </flexbox>

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

    // vux-x-input-right-full
    
    if (window.ENV == 'dev') {
      //console.log('研发自动登录');

      this.logindev();

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


.ui.form {
    position: relative;
    max-width: 100%;
}
.ui.form {
    font-size: 16px;
}
.ui.login.form {
    padding: 15px;
}
.ui.form .field {
    clear: both;
    margin: 0 0 1em;
}
.ui.login.form .field {
    position: relative;
}
.ui.form .field>label {
    display: block;
    margin: 0 0 .28571429rem;
    color: rgba(0,0,0,.87);
    font-size: .92857143em;
    font-weight: 700;
    text-transform: none;
}
.ui.form .field.error .input, .ui.form .field.error label, .ui.form .fields.error .field .input, .ui.form .fields.error .field label {
    color: #9F3A38;
}
.ui.login.form .field > label {
    position: absolute;
    top: 10px;
    left: 15px;
    font-weight: normal;
}
.ui.form input:not([type]), .ui.form input[type=text], .ui.form input[type=email], .ui.form input[type=search], .ui.form input[type=password], .ui.form input[type=date], .ui.form input[type=datetime-local], .ui.form input[type=tel], .ui.form input[type=time], .ui.form input[type=file], .ui.form input[type=url], .ui.form input[type=number], .ui.form textarea {
    width: 100%;
    vertical-align: top;
}
.ui.form input:not([type]), .ui.form input[type=text], .ui.form input[type=email], .ui.form input[type=search], .ui.form input[type=password], .ui.form input[type=date], .ui.form input[type=datetime-local], .ui.form input[type=tel], .ui.form input[type=time], .ui.form input[type=file], .ui.form input[type=url], .ui.form input[type=number] {
    font-family: Lato,'Helvetica Neue',Arial,Helvetica,sans-serif;
    margin: 0;
    outline: 0;
    -webkit-appearance: none;
    tap-highlight-color: rgba(255,255,255,0);
    line-height: 1.2142em;
    padding: .67861429em 1em;
    font-size: 1em;
    background: #FFF;
    border: 1px solid rgba(34,36,38,.15);
    color: rgba(0,0,0,.87);
    box-shadow: 0 0 0 0 transparent inset;
    -webkit-transition: color .1s ease,border-color .1s ease;
    transition: color .1s ease,border-color .1s ease;
}
.ui.form .field.error input:not([type]), .ui.form .field.error input[type=text], .ui.form .field.error input[type=email], .ui.form .field.error input[type=search], .ui.form .field.error input[type=password], .ui.form .field.error input[type=date], .ui.form .field.error input[type=datetime-local], .ui.form .field.error input[type=tel], .ui.form .field.error input[type=time], .ui.form .field.error input[type=file], .ui.form .field.error input[type=url], .ui.form .field.error input[type=number], .ui.form .field.error select, .ui.form .field.error textarea, .ui.form .fields.error .field input:not([type]), .ui.form .fields.error .field input[type=text], .ui.form .fields.error .field input[type=email], .ui.form .fields.error .field input[type=search], .ui.form .fields.error .field input[type=password], .ui.form .fields.error .field input[type=date], .ui.form .fields.error .field input[type=datetime-local], .ui.form .fields.error .field input[type=tel], .ui.form .fields.error .field input[type=time], .ui.form .fields.error .field input[type=file], .ui.form .fields.error .field input[type=url], .ui.form .fields.error .field input[type=number], .ui.form .fields.error .field select, .ui.form .fields.error .field textarea {
    background: #FFF6F6;
    border-color: #E0B4B4;
    color: #9F3A38;
    border-radius: '';
    box-shadow: none;
}

.ui.login.form .field input {
    text-indent: 75px;
}

.weui-btn_warn {
    background-color: #E0E1E2;
}

.yanzhengmaInput {
  width: 60% !important;
}
.yanzhengimg { 
  height: 40px;
  width: 120px;
  position: absolute;
  top: 0;
  right: 5px;
  cursor: pointer;
}

.yanzhengTem {
  height: 40px;
  width: 120px;
  position: absolute;
  top: 0;
  right: 5px;
  cursor: pointer;
}

</style>
