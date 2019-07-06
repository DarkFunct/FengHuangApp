<template>
  <div id="changePassword">
    <group>
      <x-input title="原密码" v-model="oldPassWrod" type="password" :show-clear="true" placeholder="请输入原密码"></x-input>
    </group>
    <group>
      <x-input title="新密码" v-model="newPassWord" type="password" :show-clear="true" placeholder="请输入新密码"></x-input>
    </group>
    <group>
      <x-input title="确认密码" v-model="newPassWordDb" type="password" :show-clear="true" placeholder="请输入确认密码"></x-input>
    </group>

    <div style="padding:15px;">
      <x-button @click.native="updatePassWord" type="primary">确  认</x-button>
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
      oldPassWrod: '',
      newPassWord: '',
      newPassWordDb: ''
    }
  },
  async created() {
  },
  computed: {
    ...mapGetters({
      userInfo: 'getuserInfo'
    })
  },
  mounted() {
  },
  updated() {
  },
  methods: {
    async updatePassWord(formName) {
        let that = this;

        if(this.newPassWord != this.newPassWordDb) {
          this.$toast('两次密码输入不一致!');
        }
        let obj = {
          oldPassWrod: this.oldPassWrod,
          newPassWord: this.newPassWord
        }

        let ret = await this.$post(`${window.url}/api/rePassWord`, obj);
        if(ret.code===200) {
          this.$toast('修改密码成功!');
          this.$router.push({name: 'userInfo'});
        } else {
        }


    }


  }
};


</script>
<style scoped lang="less">

</style>