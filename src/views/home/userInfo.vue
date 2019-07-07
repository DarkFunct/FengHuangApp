<template>
  <div id="userinfo">
    <nav class="header content">
      <a class="ui user header"><p><label>账   户：</label><span>{{userInfo.username}}</span>({{userInfo.handicap}}盘)</p> 
        <div class="sub header">现金余额:<span>{{userInfo.cashBalance}}</span>元
          <a @click="getcUserInfo"><img slot="icon" :src="'./../../static/img/tongbu.png'"></a>
        </div>
        <div class="sub header">锁定金额：<span style="color: #999999;">{{userInfo.lockBalance}}</span>元
        </div>
      </a>
    </nav>

    <group>
      <cell title="昵称" :value="userInfo.nickname"></cell>
      <cell title="会员消息" @click.native="getnotice" is-link></cell>
      <cell title="修改密码" @click.native="tochangePassword" is-link></cell>
      <cell title="退出登录" @click.native="exit" is-link></cell>
    </group>

    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
  components: {
  },
  data() {
    return {

    }
  },
  async created() {
    if(this.userInfo.username) {
      console.log('已登录');
    } else {
      this.getcUserInfo();
    }
    
  },
  computed: {
    ...mapGetters({
      userInfo: 'getuserInfo'
    }),
    bocaiTypeListTemp() {
      return _.chunk(this.bocaiTypeList,3) || [];
    }
  },
  mounted() {
    bus.$on('getbocaiInfo', (data) => {
        this.bocaiInfo();
    });
    bus.$on('getcUserInfo', (data) => {
        this.getcUserInfo();
    });
    bus.$on('iskaipaning', (data) => {
        this.iskaipaning = data;
    });
  },
  updated() {
  },
  methods: {
    async getnotice() {
      let res = await this.$get(`${window.url}/api/notice`);

      if(res.code===200){
        this.$alert(true,'会员消息',res.data.content);
      } else {
        this.$alert(true,'会员消息','无');
      }
    },
    tochangePassword() {
      store.commit('updateheadTitle','修改密码');
      this.$router.push({name: 'changePassword'});
    },
    async exit() {
      let ret = await this.$get(`${window.url}/api/exitLogin`);
      if(ret.code===200) {
        this.$toast('退出登录成功!');
      } else {
      }
      this.$router.push({name: 'login'});
    },
    async getcUserInfo() {
      let res = await this.$get(`${window.url}/api/cUserInfo`);

      if(res.code===200){
        store.commit('updateuserInfo',res.data);
      } else {

      }
    }


  }
};


</script>
<style scoped lang="less">
nav.content {
    padding: 15px;
    background-color: #2c3e50;
}

.ui.header {
    border: none;
    margin: calc(2rem - .14285em) 0 1rem;
    padding: 0;
    font-family: Lato,'Helvetica Neue',Arial,Helvetica,sans-serif;
    font-weight: 700;
    line-height: 1.2857em;
    text-transform: none;
    color: rgba(0,0,0,.87);
}
.ui.header .sub.header {
    display: block;
    font-weight: 400;
    padding: 0;
    margin: 0;
    line-height: 1.2em;
    color: rgba(0,0,0,.6);
}

.ui.header:not(h1):not(h2):not(h3):not(h4):not(h5):not(h6) {
    font-size: 1.28em;
}
.ui.header:first-child {
    margin-top: -.14285em;
}
.ui.header:last-child {
    margin-bottom: 0;
}
nav.content > .ui.header {
    color: #e3a539;
    position: relative;
    display: block;
    font-weight: normal;
}

nav.content > .ui.header > .sub.header {
    margin-top: 5px;
    color: #e3a539;
}
nav.content > .ui.header > .sub.header > span {
    color: #e83119;
}

.ui.header .sub.header, .ui.small.header .sub.header {
    font-size: 0.36rem;
}

</style>