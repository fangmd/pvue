<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png" />
    <HelloWorld msg="Welcome to Your Vue.js App" />
    <p class="head-one">标题</p>
  </div>
</template>

<script>
// @ is an alias to /src
import HelloWorld from '@/components/HelloWorld.vue';
import { common } from '@/api';

export default {
  name: 'home',
  components: {
    HelloWorld,
  },
  mounted() {
    common.getUser().then(resp => {
      console.log('TCL: mounted -> resp', resp);
    });
  },
};
</script>

<style lang="less" scoped>
.head-one {
  height: 75px;
  font-size: 54px;
  font-weight: 600;
  color: rgba(0, 0, 0, 1);
  line-height: 75px;
}
</style>
