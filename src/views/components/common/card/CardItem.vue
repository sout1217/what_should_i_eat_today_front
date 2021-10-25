<template>
  <v-slide-item style="width: 500px">
    <v-card class="ma-4" max-width="250" @click="$emit('onclick', card)">
      <v-img
        :src="card.src"
        :alt="card.alt"
        class="white--text align-end"
        gradient="to bottom, rgba(0,0,0,.1), rgba(0,0,0,.5)"
        height="150px"
      >
        <v-card-title v-text="card.title"></v-card-title>
      </v-img>

      <v-card-actions>
        <v-card-text class="food-card-text">
          {{ card.content }}
        </v-card-text>

        <v-spacer></v-spacer>

        <v-btn small icon @click="$emit('first', card)" v-if="card.likeAction">
          <v-icon small v-if="card.like">mdi-heart</v-icon>
          <v-icon small v-if="!card.like">mdi-heart-outline</v-icon>
        </v-btn>

        <v-btn
          small
          icon
          @click="$emit('second', card)"
          v-if="card.favoriteAction"
        >
          <v-icon small v-if="card.favorite">mdi-bookmark</v-icon>
          <v-icon small v-if="!card.favorite">mdi-bookmark-outline</v-icon>
        </v-btn>

        <v-btn
          small
          icon
          @click="$emit('third', card)"
          v-if="card.deleteAction"
        >
          <v-icon small>mdi-delete</v-icon>
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
    id: {
      type: Number,
    },
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
