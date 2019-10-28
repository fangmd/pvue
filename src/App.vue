<template>
  <div id="app">
    <div id="nav">
      <router-link to="/">Home</router-link>
      <router-link to="/about">About</router-link>
    </div>
    <router-view/>
  </div>
</template>

<script>
import FastClick from 'fastclick';
export default {
  name: 'app',
  created() {
    FastClick.attach(document.body);
  },
};
</script>

<style lang="less">
@import 'assets/css/base.less';
</style>
