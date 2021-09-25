<template>
  <v-menu rounded="rounded" offset-y>
    <template v-slot:activator="{ attrs, on }">
      <v-btn color="error" class="white--text ma-5" v-bind="attrs" v-on="on">
        {{ text }}
      </v-btn>
    </template>

    <v-list dark class="bg-black-opacity text-center">
      <v-list-item v-for="(item, index) in items" :key="index" link>
        <v-list-item-title>
          <span class="b3"> {{ item.name }}</span>
        </v-list-item-title>
      </v-list-item>
    </v-list>
  </v-menu>
</template>

<script>
export default {
  name: 'Popover',
  props: {
    items: { type: Array },
    text: { type: String },
  },
}
</script>

<style scoped lang="scss"></style>
