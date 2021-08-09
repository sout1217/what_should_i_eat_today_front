<template>
  <v-sheet class="mx-auto transparent">
    <div class="h3 px-16">{{ groupName }}</div>
    <card-list :cards="cards" :model="model" />
  </v-sheet>
</template>

<script>
import CardList from '@/components/common/card/CardList'

export default {
  name: 'CardListGroup',
  components: { CardList },
  props: {
    cards: {
      type: Array,
    },
    groupName: {
      type: String,
    },
    model: {
      type: Number,
      default: 0,
    },
  },
}
</script>
