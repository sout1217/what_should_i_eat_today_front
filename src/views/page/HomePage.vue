<template>
  <div class="cover">
    <div class="food-list-wrap"></div>
  </div>
</template>

<script>
export default {
  name: 'HomePage',
}
</script>

<style lang="scss">
.cover {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-image: url(https://cdn.notefolio.net/img/d7/5b/d75bf02e2a35f76dba6ed5eeccde793c45d74edd83df838e31290603ceb5c5c9_v1.jpg);
  background-size: 100% 100%;
  z-index: 1;
  //background-color: rgba(255, 0, 0, 0.3);
}
.food-list-wrap {
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.6);
}
</style>
