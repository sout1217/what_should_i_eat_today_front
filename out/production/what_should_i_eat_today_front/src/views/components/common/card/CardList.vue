<template>
  <v-slide-group v-model="model" center-active show-arrows small>
    <template v-for="(card, index) in cards">
      <card-item :card="card" :key="`card-list-${index}`" />
    </template>
  </v-slide-group>
</template>
<script>
import CardItem from '@/views/components/common/card/CardItem'

export default {
  name: 'card-list',
  components: { CardItem },
  props: {
    cards: { type: Array },
    model: { type: Number, default: 0 },
  },
}
</script>
