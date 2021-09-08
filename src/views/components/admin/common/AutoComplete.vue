<template>
  <div>
    <v-app>
      <v-autocomplete
        :items="items"
        v-model="model"
        :search-input.sync="searchText"
      >
        <template slot="selection" slot-scope="data">
          {{ data.item.value }}
        </template>
      </v-autocomplete>
    </v-app>
  </div>
</template>

<script>
export default {
  text: 'AutoComplete',
  data: function () {
    return {
      model: null,
      searchText: '',
      entries: [
        { text: '기본 1', value: '기본 1', group: 'Group 1' },
        { text: '기본 2', value: '기본 2', group: 'Group 1' },
        { text: '기본 3', value: '기본 3', group: 'Group 1' },
      ],
    }
  },
  computed: {
    items() {
      return this.entries
    },
  },
  watch: {
    searchText() {
      if (!this.searchText) return
      if (this.searchText.startsWith('?'))
        this.entries = [
          { text: '?질문 1', value: '질문 1', group: 'Group 1' },
          { text: '?질문 2', value: '질문 2', group: 'Group 1' },
          { text: '?질문 3', value: '질문 3', group: 'Group 1' },
        ]

      if (this.searchText.startsWith('!'))
        this.entries = [
          { text: '!묶음 1', value: '묶음 1', group: 'Group 1' },
          { text: '!묶음 2', value: '묶음 2', group: 'Group 1' },
          { text: '!묶음 3', value: '묶음 3', group: 'Group 1' },
        ]

      if (this.searchText.startsWith('#'))
        this.entries = [
          { text: '#태그 1', value: '태그 1', group: 'Group 1' },
          { text: '#태그 2', value: '태그 2', group: 'Group 1' },
          { text: '#태그 3', value: '태그 3', group: 'Group 1' },
        ]
    },
  },
}
</script>

<style scoped></style>
