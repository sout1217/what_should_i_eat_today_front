<template>
  <v-container fluid>
    <v-combobox v-model="items" hide-selected multiple small-chips solo>
      <template v-slot:selection="{ attrs, item, parent, selected }">
        <v-chip
          v-if="item === Object(item)"
          v-bind="attrs"
          :color="`${item.color} lighten-3`"
          :input-value="selected"
          label
          small
        >
          <span class="pr-2">
            {{ item.name }}
          </span>
        </v-chip>
      </template>
    </v-combobox>
  </v-container>
</template>

<script>
export default {
  name: 'FoodComboBox',
  data() {
    return {
      colors: ['green', 'purple', 'indigo', 'cyan', 'teal', 'orange'],
      nonce: 1,
    }
  },

  props: {
    items: { type: Array, require: true },
  },

  computed: {},

  watch: {
    model() {},
  },
}
</script>

<style scoped></style>
