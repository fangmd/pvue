<template>
  <div class="about">
    <h1>This is an about page</h1>

    <p class="content">less test</p>
  </div>
</template>

<script>
export default {
  mounted() {
    const a = 'asd';
    console.log('mounted ---- ');
  },
};
</script>

<style lang="less" scoped>
.about {
  h1 {
    font-size: 34 / @q;
  }
  .content {
    color: @title-color;
  }
}
</style>
