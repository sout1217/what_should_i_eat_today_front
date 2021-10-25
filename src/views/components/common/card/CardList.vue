<template>
  <v-slide-group center-active show-arrows small>
    <template v-for="(card, index) in cards">
      <card-item
        :card="card"
        :key="`card-list-${index}`"
        :id="card.id"
        @first="first"
        @second="second"
        @third="third"
        @onclick="click"
      />
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
    eclick: { type: Function, default: function () {} },
  },
  methods: {
    first(param) {
      this.$emit('first', param)
    },
    second(param) {
      this.$emit('second', param)
    },
    third(param) {
      this.$emit('third', param)
    },
    click(param) {
      this.$emit('onclick', param)
    },
  },
}
</script>
