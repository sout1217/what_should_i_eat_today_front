<template>
  <v-container fluid>
    <v-combobox
      v-model="model"
      :filter="filter"
      :hide-no-data="!search"
      :items="items"
      :search-input.sync="search"
      hide-selected
      label="Search for an option"
      @input.native="searchText = $event.target.value"
      multiple
      small-chips
      solo
    >
      <template v-slot:no-data>
        <v-list-item>
          <span class="subheading">Create</span>
          <v-chip :color="`${colors[nonce - 1]} lighten-3`" label small>
            {{ search }}
          </v-chip>
        </v-list-item>
      </template>
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
            {{ item.text }}
          </span>
          <v-icon small @click="parent.selectItem(item)"> $delete </v-icon>
        </v-chip>
      </template>
      <template v-slot:item="{ index, item }">
        <v-text-field
          v-if="editing === item"
          v-model="editing.text"
          autofocus
          flat
          background-color="transparent"
          hide-details
          solo
          @keyup.enter="edit(index, item)"
        ></v-text-field>
        <v-chip v-else :color="`${item.color} lighten-3`" dark label small>
          {{ item.text }}
        </v-chip>
        <v-spacer></v-spacer>
        <v-list-item-action @click.stop>
          <v-btn icon @click.stop.prevent="edit(index, item)">
            <v-icon>{{ editing !== item ? 'mdi-pencil' : 'mdi-check' }}</v-icon>
          </v-btn>
        </v-list-item-action>
      </template>
    </v-combobox>
  </v-container>
</template>

<script>
import { getTags } from '@/api/member/tag'
export default {
  name: 'TagComboBox',
  data() {
    return {
      chips: [],
      searchText: '',
      option: {
        select: function (value) {
          console.log(value)
        },
      },
      activator: null,
      attach: null,
      colors: ['green', 'purple', 'indigo', 'cyan', 'teal', 'orange'],
      editing: null,
      editingIndex: -1,
      items: [
        { header: '음식 리스트' },
        // {
        //   text: 'Foo',
        //   color: 'blue',
        // },
        // {
        //   text: 'Bar',
        //   color: 'red',
        // },
      ],
      nonce: 1,
      menu: false,
      model: [
        // {
        //   text: 'Foo',
        //   color: 'blue',
        // },
      ],
      x: 0,
      search: null,
      y: 0,
    }
  },

  methods: {
    closeModal() {},

    remove(item) {
      this.chips.splice(this.chips.indexOf(item), 1)
      this.chips = [...this.chips]
    },

    async loadTags() {
      const result = await getTags(this.searchText, 0, 10).then(({ data }) => {
        this.items = []
        data.content.forEach(tag => {
          this.items.push({
            text: tag.name,
            value: tag.id,
            color: this.colors[Math.floor(Math.random() * this.colors.length)],
          })
        })
      })
      console.log(result)
    },

    edit(index, item) {
      if (!this.editing) {
        this.editing = item
        this.editingIndex = index
      } else {
        this.editing = null
        this.editingIndex = -1
      }
    },

    filter(item, queryText, itemText) {
      if (item.header) return false

      const hasValue = val => (val != null ? val : '')

      const text = hasValue(itemText)
      const query = hasValue(queryText)

      return (
        text.toString().toLowerCase().indexOf(query.toString().toLowerCase()) >
        -1
      )
    },
  },

  computed: {
    isNewItem() {
      const data = this.items.filter(
        item => item.text.toLowerCase() === this.search().toLowerCase(),
      )
      return data.length === 0 ? true : false
    },
  },

  watch: {
    searchText() {
      if (!this.searchText) return
      console.log(this.searchText)
      this.loadFoods()
    },

    model(val, prev) {
      if (val.length === prev.length) return

      this.model = val.map(v => {
        // 새로운 것 입력
        if (typeof v === 'string') {
          v = {
            text: v,
            color: this.colors[this.nonce - 1],
          }
          this.items.push(v)
          this.nonce++
        }
        return v
      })
    },
  },
}
</script>

<style scoped></style>
