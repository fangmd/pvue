<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png">
    <HelloWorld msg="Welcome to Your Vue.js App"/>
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
