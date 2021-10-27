<template>
  <v-sheet class="mx-auto transparent">
    <div class="h3 px-16" v-if="cards.length > 0">{{ groupName }}</div>
    <div class="h3 px-16" v-else>{{ groupName }}이 없습니다.</div>
    <card-list
      :cards="cards"
      :model="model"
      :first="first"
      :second="second"
      :third="third"
      @first="firstAction"
      @second="secondAction"
      @third="thirdAction"
    />
  </v-sheet>
</template>

<script>
import CardList from '@/views/components/common/card/CardList'

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
    first: {
      type: Object,
    },
    second: {
      type: Object,
    },
    third: {
      type: Object,
    },
  },
  methods: {
    firstAction(param) {
      this.$emit('first', param)
    },
    secondAction(param) {
      this.$emit('second', param)
    },
    thirdAction(param) {
      this.$emit('third', param)
    },
  },
}
</script>
