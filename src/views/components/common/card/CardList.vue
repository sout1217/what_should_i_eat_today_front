<template>
  <v-slide-group center-active show-arrows="always" small @click:next="next">
    <template v-for="(card, index) in cards">
      <card-item
        :card="card"
        :key="`card-list-${index}`"
        :id="card.id"
        :first="first"
        :second="second"
        :third="third"
        @firstAction="firstAction"
        @secondAction="secondAction"
        @thirdAction="thirdAction"
      />
    </template>
  </v-slide-group>
</template>
<script>
import CardItem from '@/views/components/common/card/CardItem'

export default {
  name: 'card-list',
  components: { CardItem },
  data() {
    return {
      m: null,
    }
  },
  props: {
    cards: { type: Array },
    first: {
      type: Object,
    },
    second: {
      type: Object,
    },
    third: {
      type: Object,
    },
    eclick: { type: Function, default: function () {} },
  },
  methods: {
    firstAction(param) {
      this.$emit('firstAction', param)
    },
    secondAction(param) {
      this.$emit('secondAction', param)
    },
    thirdAction(param) {
      this.$emit('thirdAction', param)
    },
    next() {
      this.$emit('next')
    },
    click(param) {
      this.$emit('onclick', param)
    },
  },
}
</script>
