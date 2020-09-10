<template>
  <div class="about">
    <h1>This is an about page</h1>

    <p class="content">less test</p>
    <p class="content">{{ cnt }}</p>

    <div @click="debounce" class="btn">click test debounce</div>

    <div @click="throttles" class="btn">click test throttles</div>
  </div>
</template>

<script>
// import { common } from '@/api';
import _ from 'lodash'

export default {
  data() {
    return {
      cnt: 0,
    }
  },
  mounted() {
    // const a = 'asd';
    // common
    //   .getUser()
    //   .then(resp => {})
    //   .catch(error => {});
  },
  methods: {
    debounce: _.debounce(function() {
      console.log('debounce')
    }, 3000),
    throttles: _.throttle(function() {
      this.cnt++
      console.log('throttles' + this.cnt)
    }, 3000),
  },
}
</script>

<style lang="less" scoped>
.about {
  h1 {
    font-size: 34px;
  }
  .content {
    color: @title-color;
  }

  .btn {
    height: 50 px;
    font-size: 30 px;
    color: #000;

    &:hover {
      cursor: pointer;
    }
  }
}
</style>
