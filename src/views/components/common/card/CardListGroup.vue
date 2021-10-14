<template>
  <v-sheet class="mx-auto transparent">
    <div class="h3 px-16">{{ groupName }}</div>
    <card-list
      :cards="cards"
      :model="model"
      @first="first"
      @second="second"
      @third="third"
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
  },
}
</script>
