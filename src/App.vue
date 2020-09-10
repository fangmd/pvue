<template>
  <div id="app">
    <router-view />
  </div>
</template>

<script>
import FastClick from 'fastclick'
export default {
  name: 'app',
  created() {
    FastClick.attach(document.body)
  },
}
</script>

<style lang="less">
@import 'assets/css/base.less';
</style>
