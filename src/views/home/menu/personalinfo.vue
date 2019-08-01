<template>
  <div class="menuBody" style="bottom: 0px;padding: 1px;">

    <div id='game'>
      <div class="sublist">
        <div class="menu">
          <button v-for="(item,index) in bocaiTypeList" class="layui-btn layui-btn-mini layui-btn-radius" :class="['OddsCategory'+item.bocaiTypeId,item.bocaiTypeId == bocaiTypeIdSele? 'selected':'']"  @click="hisOrderSele(item.bocaiTypeId)">{{item.bocaiTypeName}}</button>
        </div>
      </div>
    </div>

    <table border="0" class="table2">
      <tbody>
        <tr>
          <th>玩法</th>
          <th>退水</th> 
          <th>单注限额</th> 
          <th>单期限额</th>
        </tr>
      </tbody>
      <tbody id="orderList">
        <tr v-if="cUserdeList.length*1 == '0'">
          <td style="line-height: 26px;" colspan="4">{{"暂无数据"}}</td> 
        </tr>
        <tr v-for="item in cUserdeList">
          <td style="line-height: 24px;">{{item.deWaterName}}</td>
          <td style="line-height: 24px;">{{item.handicapDewaterRate}}</td> 
          <td style="line-height: 24px;">{{item.danzhuXiane}}</td> 
          <td style="line-height: 24px;">{{item.danqiXiane}}</td>
        </tr>
      </tbody>
    </table>

  </div>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
  components: {
  },
  data() {
    return {
      bocaiTypeIdSele: '',
      cbocai: '',
      cUserdeList: []
    }
  },
  created() {
    if(this.bocaiTypeId != '') {
      this.bocaiTypeIdSele = this.bocaiTypeId;
    }
  	this.cUserdewater();
  },
  computed: {
    ...mapGetters({
        bocaiName: 'getbocaiName',
        bocaiTypeList: 'getbocaiTypeList',
        bocaiTypeId: 'getbocaiTypeId'
      })
  },
  methods: {
    async cUserdewater() {

      if(this.bocaiTypeIdSele != '') {

      $('.OddsCategory'+this.bocaiTypeIdSele).addClass('selected').siblings().removeClass('selected');

      let res = await this.$get(`${window.url}/api/cUserdewater?bocaiTypeId=`+this.bocaiTypeIdSele);

        if(res.code===200){
            this.cUserdeList = res.data;

        } 
      }
    },
    hisOrderSele(data) {
      this.bocaiTypeIdSele = data;
      this.cUserdewater();
    }
  },
  mounted() {
    bus.$on('getbocaiTypeList', (data) => {
        this.bocaiTypeIdSele = this.bocaiTypeList[0].bocaiTypeId;
        this.cUserdewater();
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

.resulList li, .list li {
    overflow: hidden;
    margin: 10px 0 10px 0;
}
.list .card {
    border: 1px dashed #ccc;
    width: 95%;
    margin: 0 auto;
    padding: 10px;
}

.table2 {
    width: 100%;
    border-collapse: collapse;
    margin-top: 10px;
}

.table2 th {
    background-color: #9ca9b0;
    height: 25px;
    line-height: 25px;
    color: #fff;
    font-weight: normal;
    border: 1px solid #ccc;
    padding: 3px;
}
.table2 td {
    height: 25px;
    padding: 5px;
    text-align: center;
    border: 1px solid #ccc;
    padding: 3px;
}


footer {
    position: fixed;
    left: 0;
    bottom: 0;
    width: 100%;
    background-color: #455463;
    height: 40px;
    line-height: 40px;
    padding: 5px 0px 10px 0px;
    z-index: 9;
    overflow: hidden;
}
.page header, .page footer {
    text-align: center;
    position: absolute;
}
.qs {
    color: #FF5722;
    margin-left: 2px;
    margin-right: 2px;
}
</style>
<style lang="less">
  
</style>