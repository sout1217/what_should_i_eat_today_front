<template>
  <!--  <v-row id="category" class="fill-height" no-gutters>-->
  <!--    <router-view />-->
  <!--  </v-row>-->
  <v-container id="category" class="fill-height" fluid>
    <v-card flat class="transparent mx-auto" max-width="1440" width="100%">
      <router-view />
    </v-card>
  </v-container>
</template>

<script>
export default {
  name: 'Category',
}
</script>

<style scoped></style>
