<template>
  <v-slide-item style="width: 500px">
    <v-card class="ma-4 rounded-t-lg overflow-hidden" max-width="250">
      <router-link tag="div" :to="`${card.id}`">
        <v-img
          v-ripple="{ class: 'secondary-orange-1' }"
          :src="card.src"
          :alt="card.alt"
          class="white--text align-end pointer"
          gradient="to bottom, rgba(0,0,0,.1), rgba(0,0,0,.5)"
          height="150px"
          style="background-color: #d1d1d1"
        >
          <v-card-title v-text="card.title"></v-card-title>
        </v-img>
      </router-link>

      <v-card-actions>
        <v-card-text class="food-card-text">
          {{ card.content }}
        </v-card-text>

        <v-spacer></v-spacer>

        <v-btn
          small
          icon
          @click="$emit('firstAction', card)"
          v-if="card.likeAction"
        >
          <v-icon :color="first.color" small v-if="card.first">
            {{ first.fill }}
          </v-icon>
          <v-icon :color="first.color" small v-if="!card.first">
            {{ first.outline }}
          </v-icon>
        </v-btn>

        <v-btn
          small
          icon
          @click="$emit('secondAction', card)"
          v-if="card.favoriteAction"
        >
          <v-icon :color="second.color" small v-if="card.second">
            {{ second.fill }}
          </v-icon>
          <v-icon :color="second.color" small v-if="!card.second">
            {{ second.outline }}
          </v-icon>
        </v-btn>

        <v-btn
          small
          icon
          @click="$emit('thirdAction', card)"
          v-if="card.deleteAction"
        >
          <v-icon v-if="card.third" :color="third.color" small>
            {{ third.fill }}
          </v-icon>
          <v-icon v-else :color="third.color" small>
            {{ third.outline }}
          </v-icon>
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
    id: {
      type: Number,
    },
    first: {
      type: Object,
      require: false,
      default: () => {
        return {
          fill: 'mdi-heart',
          outline: 'mdi-heart-outline',
          color: 'red lighten-1',
        }
      },
    },
    second: {
      type: Object,
      require: false,
      default: () => {
        return {
          fill: 'mdi-bookmark',
          outline: 'mdi-bookmark-outline',
          color: 'orange lighten-2',
        }
      },
    },
    third: {
      type: Object,
      require: false,
      default: () => {
        return {
          fill: 'mdi-delete',
          outline: 'mdi-delete-outline',
          color: 'grey',
        }
      },
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
