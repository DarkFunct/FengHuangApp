<template>
  <div class="menuBody caiwumanager" style="bottom:0;">
    <nav class="header content">
      <a class="ui user header">
        <p>
          <label>账   户：</label>
          <span>{{userInfo.username}}</span>
          ({{userInfo.handicap}}盘) 
          <button class="layui-btn layui-btn-mini layui-btn-radius textColorBtn" @click="activePage='bankInfo'">设置</button>
        </p> 
        <div class="sub header">账户余额：<span>{{userInfo.cashBalance}}</span>元
          <button class="layui-btn layui-btn-mini layui-btn-radius textColorBtn" @click="getcUserInfo">刷新</button>
        </div>
        <div class="sub header">锁定金额：<span style="color: #999999;">{{userInfo.lockBalance}}</span>元</div>
      </a>
    </nav>


    <template v-if="activePage == 'main'">

      <tab :line-width=2 active-color='#f5b02e' v-model="indexTab">
        <tab-item class="vux-center" selected @on-item-click="toggleTab(0)" key="0">充值</tab-item>
        <tab-item class="vux-center" @on-item-click="toggleTab(1)" key="1">提现</tab-item>
        <tab-item class="vux-center" @on-item-click="toggleTab(2)" key="2">充值记录</tab-item>
        <tab-item class="vux-center" @on-item-click="toggleTab(3)" key="3">提现记录</tab-item>

      </tab>
    
      <swiper v-model="indexTab" :show-dots="false">
        <swiper-item key="0">

          <group>
            <cell title="微信支付" is-link @click.native="toPay(1)">
              <img slot="icon" width="24" style="display:block;margin-right:5px;" src="../../../../static/img/wechatpay-icon.png">
            </cell>
            <cell title="支付宝支付" is-link @click.native="toPay(2)">
              <img slot="icon" width="24" style="display:block;margin-right:5px;" src="../../../../static/img/zfb-icon.png">
            </cell>
            <cell title="银行卡支付" is-link @click.native="toPay(3)"> 
              <img slot="icon" width="24" style="display:block;margin-right:5px;" src="../../../../static/img/online-pay.png">
            </cell>
          </group>

        </swiper-item>

        <swiper-item key="1">

          <p class="grey">* 当前可取余额：<b style="color: green;">{{useMoney}}</b></p> 

          <div class="box">
            <checker v-model="forwardFaction" radio-required default-item-class="demo1-item" selected-item-class="demo1-item-selected">
              <checker-item value="1">微信支付</checker-item>
              <checker-item value="2">支付宝支付</checker-item>
              <checker-item value="3">银行卡支付</checker-item>
              <checker-item value="4">现金</checker-item>
            </checker>
          </div>

        </swiper-item>

        <swiper-item key="2">
          <div class="tab-swiper vux-center">充值记录 Container</div>
        </swiper-item>

        <swiper-item key="3">
          <div class="tab-swiper vux-center">提现记录 Container</div>
        </swiper-item>

      </swiper>
    </template>

    <template v-if="activePage == 'bankInfo'">
      <divider>{{'财务帐户设置'}}</divider>

      <group title="银行卡--(卡主姓名设置后不能修改)">
        <x-input title="银行名称：" v-model="bankInfoObj.bankName" placeholder="请输入银行名称"></x-input>
        <x-input title="银行卡号：" v-model="bankInfoObj.bankNum" placeholder="请输入银行卡号"></x-input>
        <x-input title="卡主姓名：" v-model="bankInfoObj.bankUserName" placeholder="请输入卡主姓名" :disabled="isSetted?true:false"></x-input>
        <x-input title="手机号码：" v-model="bankInfoObj.phone" placeholder="请输入手机号码"></x-input>
      </group>

      <group title="微信--(设置后不能修改)">
        <x-input title="微信支付账号：" v-model="bankInfoObj.weixin" placeholder="请输入微信账号" :disabled="isSetted?true:false"></x-input>
      </group>
      <group title="支付宝--(设置后不能修改)">
        <x-input title="支付宝账号：" v-model="bankInfoObj.zhifubao" placeholder="请输入支付宝账号" :disabled="isSetted?true:false"></x-input>
      </group>

      <group title="提现密码">
        <x-input v-if="bankInfoObj.putForwardPassword == ''" title="密码：" type="text" :min="4" :max="4" v-model="bankInfoObj.putForwardPassword" placeholder="请输入4位数字密码"></x-input>
        
        <template v-else-if="passType">
          <x-input  title="旧密码：" type="text" :min="4" :max="4" v-model="oldPass" placeholder="请输入4位数字旧密码" required></x-input>
          <x-input title="新密码：" type="text" :min="4" :max="4" v-model="newPass" placeholder="请输入4位数字新密码" required></x-input>
        </template>

        <button v-else class="layui-btn layui-btn-mini layui-btn-radius textColorBtn" style="float: right;" @click="passType = true">修改密码</button>

      </group>

      <flexbox style="margin-top: 10px;">
        <flexbox-item>
          <x-button type="primary" @click.native="submitBankInfo">确认</x-button>
        </flexbox-item>
        <flexbox-item>
          <x-button type="warn"  @click.native="bankInfo">重置</x-button>
        </flexbox-item>
      </flexbox>

      <x-button type="default" style="margin-top: 10px;" @click.native="activePage='main'">返回</x-button>

    </template>

    <template v-if="activePage == 'pay'">
      <divider>{{'充值提交'}}</divider>

      <template v-if="chongzhiType == 3">
        <group title="收款人信息：">
          <div class="info">
            <ul v-if="caiwuYinhangzhuanzhangList.length != 0" class="bank-info">
              <li v-for="item in caiwuYinhangzhuanzhangList">
                <b>{{item.yinhangLeixing}}</b> 
                <p><span>卡号：{{item.yinhangZhanghao}}</span> <span class="r">姓名：{{item.shoukuanXingming}}</span></p>
              </li>
            </ul> 
            <ul v-else>
              <li>
                <p>暂无银行转账信息</p>
              </li>
            </ul>
          </div> 
        </group>
      </template>
      <template v-else>
        <group title="收款人信息：（若充值异常，点击二维码刷新）">
          <div class="info">
            <img v-if="chongzhiImgSrc == ''" src="../../../../static/img/onError.gif" alt="" width="120" height="120">  

            <img v-else :src="chongzhiImgSrc" alt="" width="120" height="120" title="充值" >
          </div> 
        </group>
      </template>
      
      <group title="充值信息" style="margin-top: 15px;">
        <x-input title="充值金额：" v-model="paymoney" placeholder="请填写充值金额" required></x-input>
        <x-input title="备  注：" v-model="payremark" placeholder="格式如：账号 123，张三" required></x-input>
      </group>

      <flexbox style="margin-top: 10px;">
        <flexbox-item>
          <x-button type="primary" @click.native="submitPayInfo">确认</x-button>
        </flexbox-item>
        <flexbox-item>
          <x-button type="default"  @click.native="activePage = 'main'">返回</x-button>
        </flexbox-item>
      </flexbox>

    </template>



     <!-- <el-radio v-model="chongzhiType" label="1" @change="getchongzhiType"><img src="../../../../static/img/WXPAY.6f192a3.png" alt=""></el-radio>
                      <el-radio v-model="chongzhiType" label="2" @change="getchongzhiType"><img src="../../../../static/img/alipay.8999215.jpg" alt=""></el-radio>
                      <el-radio v-model="chongzhiType" label="3" @change="getchongzhiType"><img src="../../../../static/img/unionpay.a124865.jpg" alt=""></el-radio>

                    </td> 
                    <td v-if="chongzhiType == ''">
                      <p>
                        <a>如充值异常，请刷新二维码</a>
                      </p> 
                      <img src="../../../../static/img/onError.gif" alt="" width="120" height="120" title="点击图片刷新" style="cursor: pointer;">
                    </td>
                    <td v-else-if="chongzhiType == '3'">
                      <div class="kahaoclass" v-for="item in caiwuYinhangzhuanzhangList">
                        <el-row>
                          <el-col :span="12"><h3 class="grid-content bg-purple-light">{{item.yinhangLeixing}}</h3></el-col>
                        </el-row>
                        <el-row>
                          <el-col :span="16" class="labelStep">
                            <span class="grid-content bg-purple">卡号:{{item.yinhangZhanghao}}</span>
                          </el-col>
                          <el-col :span="8"><span class="grid-content bg-purple-light">收款人:{{item.shoukuanXingming}}</span></el-col>
                        </el-row>
                      </div>
                    </td>
                    <td v-else>
                      <img :src="chongzhiImgSrc" alt="" width="120" height="120" title="充值" >
                    </td>
                  </tr> 
                  <tr>
                    <td style="border-right: none;">
                      <p>
                        <span class="red">*</span>
                        充值金额：
                      </p> 
                      <input type="text" v-model="paymoney" placeholder="请输入金额" style="height: 30px;">
                    </td> 
                    <td class="remark" style="border-left: none;">
                      <span><i class="red">*</i>备注：</span> 
                      <span style="color: rgb(157, 157, 157); font-size: 11px;">(付款账号,姓名等信息)</span>
                      <br> 
                      <textarea v-model="payremark" placeholder="格式如：账号 123，张三" cols="30"></textarea>
                    </td>
                  </tr>
                </table>
              </div> -->


    

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
      activePage: 'main',
    	
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
    this.getActivePage();
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
    async submitPayInfo() {
     if(this.paymoney == '') {
        this.$toast('请确认充值金额!');
      } else if(this.payremark == '') {
        this.$toast('请确认充值备注');
      } else {
      let subobj = {
            type: this.chongzhiType*1,//充值方式,1:微信,2:支付宝,3:银行转账
            money: this.paymoney*1,//充值金额
            remark: this.payremark//充值备注
          }

          let res = await this.$post(`${window.url}/api/rechargeInfoSub`, subobj);

          if(res.code === 200) {
            this.$toast('提交成功!');

            this.paymoney = '';
            this.payremark = '';
            this.activePage = 'main';

          }
      }
    },
    async toPay(data) {

      let res = await this.$get(`${window.url}/api/rechargeInfo`);

        if(res.code===200){

          this.caiwuYinhangzhuanzhangList = res.caiwuYinhangzhuanzhangList;
          this.caiwuChongzhifangshi = res.caiwuChongzhifangshi;
        }

      this.activePage = 'pay';
      this.chongzhiType = data;

      if(this.chongzhiType == '1') {
        if(this.caiwuChongzhifangshi.weixinEwma != '') {
          this.chongzhiImgSrc = this.caiwuChongzhifangshi.weixinEwma;
        } else if(this.caiwuChongzhifangshi.weixinEwmb != '') {
          this.chongzhiImgSrc = this.caiwuChongzhifangshi.weixinEwmb;
        } else if(this.caiwuChongzhifangshi.weixinEwmc != '') {
          this.chongzhiImgSrc = this.caiwuChongzhifangshi.weixinEwmc;
        } else if(this.caiwuChongzhifangshi.weixinEwmd != '') {
          this.chongzhiImgSrc = this.caiwuChongzhifangshi.weixinEwmd;
        } else if(this.caiwuChongzhifangshi.weixinEwme != '') {
          this.chongzhiImgSrc = this.caiwuChongzhifangshi.weixinEwme;
        }
      } else if(this.chongzhiType == '2') {
        if(this.caiwuChongzhifangshi.zhifubaoEwma != '') {
          this.chongzhiImgSrc = this.caiwuChongzhifangshi.zhifubaoEwma;
        } else if(this.caiwuChongzhifangshi.zhifubaoEwmb != '') {
          this.chongzhiImgSrc = this.caiwuChongzhifangshi.zhifubaoEwmb;
        } else if(this.caiwuChongzhifangshi.zhifubaoEwmc != '') {
          this.chongzhiImgSrc = this.caiwuChongzhifangshi.zhifubaoEwmc;
        } else if(this.caiwuChongzhifangshi.zhifubaoEwmd != '') {
          this.chongzhiImgSrc = this.caiwuChongzhifangshi.zhifubaoEwmd;
        } else if(this.caiwuChongzhifangshi.zhifubaoEwme != '') {
          this.chongzhiImgSrc = this.caiwuChongzhifangshi.zhifubaoEwme;
        }
      }

      console.log('this.chongzhiImgSrc',this.chongzhiImgSrc);

    },
    getActivePage() {
      if(this.bankInfoObj.putForwardPassword == '') {
        this.activePage = 'bankInfo';
      } else {
        this.activePage = 'main';
      }
    },
    async submitBankInfo() {
      console.log('submitBankInfo');

      let that = this;
      let normal = true;
      let password = '';

      //设置过密码
      if(this.isSetted) {

        if(this.passType) {
          if(this.oldPass != this.bankInfoObj.putForwardPassword) {
            normal = false;
            this.$toast('旧密码不正确!');
          }

          password = this.newPass;
        } else {
          password = this.bankInfoObj.putForwardPassword;
        }
        
      } else {
        password = this.newPass;
      }

      if(normal) {

        let dataobj = {
            bankName: this.bankInfoObj.bankName,//银行名称
            bankNum: this.bankInfoObj.bankNum,//银行卡号
            bankUserName: this.bankInfoObj.bankUserName,//卡主姓名
            phone: this.bankInfoObj.phone,//手机号码
            weixin: this.bankInfoObj.weixin,//微信支付账号
            zhifubao: this.bankInfoObj.zhifubao,//支付宝账号
            putForwardPassword: password
          }

          that.$isLoading(true);
          await that.$post(`${window.url}/api/bankInfoSub`,dataobj).then((res) => {
            that.$handelResponse(res, (result) => {
              that.$isLoading(false);
              if(result.code===200){
                //更新用户信息
                // bus.$emit('getcUserInfo', ''); 
                // that.orderDatas.list = [];
                that.$toast('修改成功！');
                that.activePage = 'main';
                // that.reset();
                that.bankInfo();
              }
            })
          });

      }

    },
    toggleTab(data) {

      console.log('data',data);

      this.indexTab = data;

      if(data == 2) {
        this.forwardList('0',1,10);
      }
    },
    async forwardList(rechType,cpage,pages) {

      this.currentPage = cpage;

      let res = await this.$get(`${window.url}/api/forwardList?status=`+rechType+`&currentPage=`+cpage+`&pageSize=`+pages);
      if(res.code===200){
        this.forwardObj = res.page;
        this.useMoney = res.useMoney;
      }
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
    bus.$on('newUserInfo', (data) => {
        this.getActivePage();
    });
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

.caiwumanager .info {
    background-color: hsla(0,0%,100%,.3);
    border-radius: 5px;
    overflow: hidden;
    display: -ms-flexbox;
    display: flex;
    display: -webkit-flex;
    -ms-flex-direction: column;
    flex-direction: column;
    -ms-flex-align: start;
    align-items: flex-start;
    padding: .3rem;
    margin-bottom: 15px;
}
.caiwumanager .info ul {
    width: 100%;
}
.caiwumanager .info li {
    margin-bottom: .5rem;
}
.caiwumanager .info li b {
    font-weight: 600;
}
.caiwumanager p {
    position: relative;
    margin-bottom: 15px;
}
.caiwumanager .info li p {
    margin-top: 5px;
    display: -ms-flexbox;
    display: flex;
    display: -webkit-flex;
    -ms-flex-pack: justify;
    justify-content: space-between;
}
.caiwumanager .info img {
    -ms-flex-item-align: center;
    -ms-grid-row-align: center;
    align-self: center;
}
</style>
<style lang="less">

.menuBody {
  .weui-input {
    text-align: right;
  }
}
</style>