<template>
  <div class="menuBody caiwumanager" style="bottom:0;">
    <nav class="header content">
      <a class="ui user header">
        <p>
          <label>账   户：</label>
          <span>{{userInfo.username}}</span>
          ({{userInfo.handicap}}盘) 
          <button class="layui-btn layui-btn-mini layui-btn-radius textColorBtn" @click="">设置</button>
        </p> 
        <div class="sub header">账户余额：<span>{{userInfo.cashBalance}}</span>元
          <button class="layui-btn layui-btn-mini layui-btn-radius textColorBtn" @click="getcUserInfo">刷新</button>
        </div>
        <div class="sub header">锁定金额：<span style="color: #999999;">{{userInfo.lockBalance}}</span>元</div>
      </a>
    </nav>


    <template v-if="!isSetted">

      <tab :line-width=2 active-color='#f5b02e' v-model="indexTab">
        <tab-item class="vux-center" selected @on-item-click="toggleTab(0)" key="0">充值</tab-item>
        <tab-item class="vux-center" @on-item-click="toggleTab(1)" key="1">提现</tab-item>
        <tab-item class="vux-center" @on-item-click="toggleTab(2)" key="2">充值记录</tab-item>
        <tab-item class="vux-center" @on-item-click="toggleTab(3)" key="3">提现记录</tab-item>

      </tab>
    
      <swiper v-model="indexTab" height="100px" :show-dots="false">
        <swiper-item key="0">
          <div class="tab-swiper vux-center">充值 Container</div>
        </swiper-item>
        <swiper-item key="1">
          <div class="tab-swiper vux-center">提现 Container</div>
        </swiper-item>
        <swiper-item key="2">
          <div class="tab-swiper vux-center">充值记录 Container</div>
        </swiper-item>
        <swiper-item key="3">
          <div class="tab-swiper vux-center">提现记录 Container</div>
        </swiper-item>
      </swiper>
    </template>

    <template v-else>
      <divider>{{'财务帐户设置'}}</divider>

      <group title="银行卡--(卡主姓名设置后不能修改)">
        <x-input title="银行名称：" v-model="bankInfoObj.bankName" placeholder="请输入银行名称"></x-input>
        <x-input title="银行卡号：" v-model="bankInfoObj.bankNum" placeholder="请输入银行卡号"></x-input>
        <x-input title="卡主姓名：" v-model="bankInfoObj.bankUserName" placeholder="请输入卡主姓名"></x-input>
        <x-input title="手机号码：" v-model="bankInfoObj.phone" placeholder="请输入手机号码"></x-input>
      </group>

      <group title="微信--(设置后不能修改)">
        <x-input title="微信支付账号：" v-model="bankInfoObj.weixin" placeholder="请输入微信账号"></x-input>
      </group>
      <group title="支付宝--(设置后不能修改)">
        <x-input title="支付宝账号：" v-model="bankInfoObj.zhifubao" placeholder="请输入支付宝账号"></x-input>
      </group>

      <group title="提现密码">
        <x-input v-if="bankInfoObj.putForwardPassword == ''" title="密码：" type="text" :min="4" :max="4" v-model="bankInfoObj.putForwardPassword" placeholder="请输入4位数字密码"></x-input>
        
        <template v-else-if="passType">
          <x-input  title="旧密码：" type="text" :min="4" :max="4" v-model="oldPass" placeholder="请输入4位数字旧密码"></x-input>
          <x-input title="新密码：" type="text" :min="4" :max="4" v-model="newPass" placeholder="请输入4位数字新密码"></x-input>
        </template>

        <button v-else class="layui-btn layui-btn-mini layui-btn-radius textColorBtn" style="float: right;" @click="passType = true">修改密码</button>

      </group>

      <x-button type="primary" @click.native="login">确认</x-button>

    </template>
    

  </div>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
  components: {
  },
  data() {
    return {
    	pageSize: 0,
      indexTab: 0,
    	
      historyDataList: {},
      historyType: '2',
      histDate: [],
      forwardPass: '',
      forwardFaction: '1',
      forwardCash: '0',
      useMoney: '',
      currentPage: 1,
      rechargeHisType: '0',
      paymoney: '',
      payremark: '',
      chongzhiImgSrc: '',
      chongzhiType: '',
      forwardType: '0',
      rechargeObj: {},
      forwardObj: {},
      chongzhiHisOp: false,
      bankInfoObj: {},
      caiwuYinhangzhuanzhangList: [],
      caiwuChongzhifangshi: {},
      newPass: '',
      oldPass: '',
      tabNum: '1',
      passType: false,
      mima: ['--','0','1','2','3','4','5','6','7','8','9'],
      payType: [
                {value: '1',label: '微信'},
                {value: '2',label: '支付宝'},
                {value: '3',label: '银行卡'},
                {value: '4',label: '现金'}
              ]

      }
  },
  created() {
  	this.bankInfo();
  },
  computed: {
    ...mapGetters({
        bocaiName: 'getbocaiName',
        userInfo: 'getuserInfo'
    }),
    isSetted() {
      return this.bankInfoObj.putForwardPassword == ''? false : true;
    }
  },
  methods: {
    toggleTab(data) {
      this.indexTab = data;
    },
    getcUserInfo() {
      bus.$emit('getcUserInfo', '');
    },
  	async bankInfo() {
      $('.bankInfo').addClass('active').siblings().removeClass('active');

      let res = await this.$get(`${window.url}/api/bankInfo`);

      if(res.code===200){
        this.bankInfoObj = res.data;

        if(this.bankInfoObj.bankUserName != '') {
          $(".bankUserName").attr("disabled", true);
        }
        if(this.bankInfoObj.weixin != '') {
          $(".weixin").attr("disabled", true);
        }
        if(this.bankInfoObj.zhifubao != '') {
          $(".zhifubao").attr("disabled", true);
        }

        this.passType = false;
      }

      this.tabNum = '1';
    }
  },
  mounted() {
  },
  updated() {
  }
};
</script>
<style scoped>
.default-list h2 {
    margin-top: 10px;
    font-size: 16px;
    font-weight: 700;
}
.default-list p {
    line-height: 30px;
}
.text-indent {
    text-indent: 2em;
}
h1, h2, h3 {
    font-size: 0.373rem;
    font-weight: 400;
    font-weight: bold;
}
.tab-swiper {
    background-color: #fff;
    height: 100px;
    display: flex;
    align-items: center;
    justify-content: center;
}
</style>
<style lang="less">

.menuBody {
  .weui-input {
    text-align: right;
  }
}
</style>