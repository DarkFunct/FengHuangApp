<template>
  <div class="menuBody" style="bottom:0;">
  	<ul class="list">
  		<li v-for="(item,index) in nowOrder.list">
	  		<div class="card">
	  			<div>单号：{{item.orderNum}}</div>
	  			<div>日期：{{$timestampToTime(item.createDate)}}</div>
	  			<div>期数：第 {{item.periods}} 期</div>
	  			<div>游戏类型：<font color="green">{{item.bocaiTypeName}}</font></div>
	  			<div>投注内容：<font color="blur">{{item.bocaiCategory2Name}}</font> {{item.bocaiOddName}}@<font color="red">{{item.odds}}</font></div> 
	  			<div>投注金额：<font color="red">{{item.betsMoney}}</font>&nbsp;&nbsp;&nbsp;&nbsp;可赢：<font color="red">{{item.winnerMoney}}</font></div>
	  		</div>
  		</li>
  	</ul>

  	<div style="width:100%;text-align:center;">
  		<a @click="getnowOrder" style="width:80%;margin-bottom:10px;margin-top:10px" class="layui-btn layui-btn-small layui-btn-normal">点击加载更多</a>
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
    	pageSize: 0,
    	nowOrder: {}
    }
  },
  created() {
  	this.getnowOrder();
  },
  computed: {
  ...mapGetters({
      bocaiName: 'getbocaiName'
    })    
  },
  methods: {
  	async getnowOrder() { 
  		let that = this;
  		this.pageSize = this.pageSize + 10;

  		this.$isLoading(true);
          await that.$get(`${window.url}/api/nowOrder?currentPage=1&pageSize=`+this.pageSize).then((res) => {
            that.$handelResponse(res, (result) => {
              that.$isLoading(false);
              if(result.code===200){
                    that.nowOrder = res.page;
                  } else {
                  }
            })
          });

  	}, 
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

</style>
<style lang="less">
  
</style>