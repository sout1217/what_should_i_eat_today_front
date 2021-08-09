<template>
  <v-slide-item v-slot="{ active, toggle }">
    <v-card class="ma-4" max-width="250" @click="toggle">
      <v-img
        :src="card.src"
        class="white--text align-end"
        gradient="to bottom, rgba(0,0,0,.1), rgba(0,0,0,.5)"
        height="150px"
      >
        <v-card-title v-text="card.title"></v-card-title>
      </v-img>

      <v-card-actions>
        <v-card-text class="food-card-text">
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Alias culpa
          cupiditate delectus deleniti eos eum excepturi expedita itaque
          molestias, mollitia nihil nobis placeat quas quidem reprehenderit.
          Reprehenderit tenetur vel voluptatum.
        </v-card-text>

        <v-spacer></v-spacer>

        <v-btn small icon>
          <v-icon small>mdi-heart</v-icon>
        </v-btn>

        <v-btn small icon>
          <v-icon small>mdi-bookmark</v-icon>
        </v-btn>

        <v-btn small icon>
          <v-icon small>mdi-share-variant</v-icon>
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-slide-item>
</template>
<script>
export default {
  name: 'card-item',
  props: {
    card: {
      type: Object,
    },
    toggle: { type: Function },
  },
}
</script>
<style scoped>
.food-card-text {
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 2; /* 라인수 */
  -webkit-box-orient: vertical;
  word-wrap: break-word;
  padding: 0 4px;
}
</style>
