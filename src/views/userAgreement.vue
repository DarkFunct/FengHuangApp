<template>
  <div>
    <x-header>用户协议</x-header>
    <div id="wrapper">
      <div id="scroller">
        <div class="agree">
          <h1>协议内容</h1>
          <ul>
            <li>● 01. 使用本公司网站的客户，请留意阁下所在的国家或居住地的相关法律规定，如有疑问应就相关问题，寻求当地法律意见。</li>
            <li>● 02. 若发生遭黑客入侵破坏行为或不可抗拒之灾害导致网站故障或资料损坏、资料丢失等情况，我们将以本公司之后备资料为最后处理依据；为确保各方利益，请各会员投注后打印资料。本公司不会接受没有打印资料的投诉。</li>
            <li>● 03. 为避免纠纷，各会员在投注之后，务必进入下注明细检查。若发现任何异常，请立即与代理商联系查证，一切投注将以本公司资料库的资料为准，不得异议。如出现特殊网络情况或线路不稳定导致不能下注或下注失败。本公司概不负责。</li>
            <li>● 04. 开奖结果以官方公布的结果为准。</li>
            <li>● 05. 如遇到官方停止销售或者开奖结果不确定的情况，本公司将对相关注单进行无效处理，并且返还下注本金。</li>
            <li>● 06. 我们将竭力提供准确而可靠的开奖统计等资料，但并不保证资料绝对无误，统计资料只供参考，并非是对客户行为的指引，本公司也不接受关于统计数据产生错误而引起的相关投诉。</li>
            <li>● 07. 本公司拥有一切判决及注消任何涉嫌以非正常方式下注之权利，在进行更深入调查期间将停止发放与其有关之任何彩金。客户有责任确保自己的帐户及密码保密，如果客户怀疑自己的资料被盗用，应立即通知本公司，并须更改其个人详细资料。所有被盗用帐号之损失将由客户自行负责。</li>
            <li>管理层 敬啟</li>
            <li>我了解以及同意下注列明的协定和规则。</li>
            <li class="user_winbu">
              <flexbox>
                <flexbox-item>
                  <x-button type="primary" @click.native="$router.push({name: 'bocaiList'})">同意</x-button>
                </flexbox-item>
                <flexbox-item>
                  <x-button type="warn" @click.native="exit()">不同意</x-button>
                </flexbox-item>
              </flexbox>
            </li>
          </ul>
        </div>

      </div>
    </div>
  </div>
  
</template>

<script>
export default {
  data () {
    return {
    }
  },
  created() {
  },
  methods: {
    async exit() {
      this.$router.push({name: 'login'});
      
      let ret = await this.$get(`${window.url}/api/exitLogin`);
      if(ret.code===200) {
        cookie.delCookie('accesstoken');
      } else {
      }
      
    }

  }
}
</script>

<style scoped >

#wrapper {
  position: absolute;
  z-index: 1;
  top: 45px;
  bottom: 0px;
  left: 0;
  width: 100%;
  overflow: hidden;
}
#scroller {
    position: absolute;
    z-index: 1;
    width: 100%;
    height: 100%;
}
#scroller .agree {
    margin: 5% 5% 0;
    font-size: .4rem;
    color: #3c3c3c;
    border-radius: 5px;
    background-color: rgba(255,255,255,5);
    width: 90%;
    height: 95%;
    overflow: scroll;
}
#scroller .agree h1 {
    font-size: .5rem;
    font-weight: 600;
    text-align: center;
    margin: 0;
    padding: 10px;
}
#scroller .agree ul {
    padding: 10px;
    line-height: .7rem;
}
#scroller .agree ul li {
    list-style: none;
    margin-bottom: 10px;
}

</style>
<style lang="less">
</style>