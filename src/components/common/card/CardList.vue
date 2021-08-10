<template>
  <v-slide-group v-model="model" center-active show-arrows small>
    <template v-for="card in cards">
      <card-item :card="card" :key="card" />
    </template>
  </v-slide-group>
</template>
<script>
import CardItem from '@/components/common/card/CardItem'

export default {
  name: 'card-list',
  components: { CardItem },
  props: {
    cards: { type: Array },
    model: { type: Number, default: 0 },
  },
}
</script>
