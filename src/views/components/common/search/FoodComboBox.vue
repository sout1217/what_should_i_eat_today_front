<template>
  <v-combobox
    v-model="chips"
    :items="items"
    chips
    clearable
    multiple
    @input.native="searchText = $event.target.value"
  >
    <template v-slot:selection="">
      <v-input v-model="searchText" />
    </template>
    <template v-slot:selection="{ attrs, item, select, selected }">
      <v-chip
        v-bind="attrs"
        :input-value="selected"
        close
        @click="select"
        @click:close="remove(item)"
      >
        <strong>{{ item.text }}</strong>
      </v-chip>
    </template>
  </v-combobox>
</template>

<script>
import { getFoods } from '@/api/member/foods'
export default {
  name: 'ComboBox',
  data() {
    return {
      chips: [],
      items: [],
      searchText: '',
    }
  },

  methods: {
    remove(item) {
      this.chips.splice(this.chips.indexOf(item), 1)
      this.chips = [...this.chips]
    },

    async loadFoods() {
      const result = await getFoods(this.searchText, 0, 10).then(({ data }) => {
        this.items = []
        data.content.forEach(food => {
          this.items.push({
            text: food.name,
            value: food.id,
          })
        })
      })
      console.log(result)
    },
  },

  watch: {
    searchText() {
      if (!this.searchText) return

      this.loadFoods()
    },
  },
}
</script>

<style scoped></style>
