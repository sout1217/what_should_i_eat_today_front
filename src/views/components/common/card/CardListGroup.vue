<template>
  <v-sheet class="mx-auto transparent">
    <div class="h3 px-16" v-if="cards.length > 0">{{ groupName }}</div>
    <div class="h3 px-16" v-else>{{ groupName }}이 없습니다.</div>
    <card-list
      :cards="cards"
      :model="model"
      @first="first"
      @second="second"
      @third="third"
      @onclick="click"
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
    click(param) {
      this.$emit('onclick', param)
    },
  },
}
</script>
