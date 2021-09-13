<template>
  <div class="admin-container">
    <div class="admin-content-wrapper">
      <!-- 검색바 -->
      <v-container class="d-flex justify-center">
        <v-row align="center" class="d-flex flex-row-reverse">
          <v-col cols="6" sm="3">
            <v-text-field
              class="admin-search"
              label="enter text"
              outlined
              dense
              hide-details
              @keydown="searchIfPressEnter"
            >
              <v-icon slot="append" color="black" @click="search">
                mdi-magnify
              </v-icon>
            </v-text-field>
          </v-col>
          <v-col class="" cols="6" sm="2">
            <v-select
              :items="selectItems"
              label="처리상태"
              @change="searchWithSelect"
              hide-details
              dense
              outlined
            ></v-select>
          </v-col>
        </v-row>
      </v-container>

      <v-container class="d-flex justify-center">
        <v-row>
          <v-col align-self="center">
            <v-data-table
              :headers="headers"
              :items="desserts"
              class="elevation-1"
              item-key="name"
              hide-default-footer
              :single-select="true"
              :show-select="true"
            >
              <!--키 값을 명시해 주어야 만, select 시 1개만 정상 select 됩니다. -->
              <template v-slot:items="props">
                <td>{{ props.item.name }}</td>
                <td class="text-xs-right">{{ props.item.calories }}</td>
                <td class="text-xs-right">{{ props.item.fat }}</td>
                <td class="text-xs-right">{{ props.item.carbs }}</td>
                <td class="text-xs-right">{{ props.item.protein }}</td>
                <td class="justify-center layout px-0">
                  <v-icon small class="mr-2" @click="editItem(props.item)">
                    edit
                  </v-icon>
                  <v-icon small @click="deleteItem(props.item)">
                    delete
                  </v-icon>
                </td>
              </template>
              <!--<template v-slot:no-data>
            <v-btn color="primary" @click="initialize">Reset</v-btn>
          </template>-->
            </v-data-table>
          </v-col>
        </v-row>
      </v-container>

      <div class="text-center">
        <v-pagination v-model="page" :length="6"></v-pagination>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Report',
  data: () => ({
    page: 1,
    dialog: false,
    headers: [
      {
        text: 'Dessert (100g serving)',
        align: 'left',
        sortable: false,
        value: 'name',
      },
      { text: 'Calories', value: 'calories' },
      { text: 'Fat (g)', value: 'fat' },
      { text: 'Carbs (g)', value: 'carbs' },
      { text: 'Protein (g)', value: 'protein' },
      { text: 'Actions', value: 'name', sortable: false },
    ],
    desserts: [],
    editedIndex: -1,
    editedItem: {
      name: '',
      calories: 0,
      fat: 0,
      carbs: 0,
      protein: 0,
    },
    defaultItem: {
      name: '',
      calories: 0,
      fat: 0,
      carbs: 0,
      protein: 0,
    },
    selectItems: [
      { text: '처리', value: true },
      { text: '미처리', value: false },
    ],
  }),

  computed: {
    formTitle() {
      return this.editedIndex === -1 ? 'New Item' : 'Edit Item'
    },
  },

  watch: {
    dialog(val) {
      val || this.close()
    },
  },

  created() {
    this.initialize()
  },

  methods: {
    searchWithSelect(event) {
      console.log(event)
    },
    searchIfPressEnter(event) {
      let key = event.key || event.keyCode

      if (key == 'Enter' || key == 13) {
        this.search()
      }
    },
    search() {
      console.log('search')
    },
    singleSelect(event) {
      console.log(event)
    },
    initialize() {
      this.desserts = [
        {
          name: 'Frozen Yogurt',
          calories: 159,
          fat: 6.0,
          carbs: 24,
          protein: 4.0,
        },
        {
          name: 'Ice cream sandwich',
          calories: 237,
          fat: 9.0,
          carbs: 37,
          protein: 4.3,
        },
        {
          name: 'Eclair',
          calories: 262,
          fat: 16.0,
          carbs: 23,
          protein: 6.0,
        },
        {
          name: 'Cupcake',
          calories: 305,
          fat: 3.7,
          carbs: 67,
          protein: 4.3,
        },
        {
          name: 'Gingerbread',
          calories: 356,
          fat: 16.0,
          carbs: 49,
          protein: 3.9,
        },
        {
          name: 'Jelly bean',
          calories: 375,
          fat: 0.0,
          carbs: 94,
          protein: 0.0,
        },
        {
          name: 'Lollipop',
          calories: 392,
          fat: 0.2,
          carbs: 98,
          protein: 0,
        },
        {
          name: 'Honeycomb',
          calories: 408,
          fat: 3.2,
          carbs: 87,
          protein: 6.5,
        },
        {
          name: 'Donut',
          calories: 452,
          fat: 25.0,
          carbs: 51,
          protein: 4.9,
        },
        {
          name: 'KitKat',
          calories: 518,
          fat: 26.0,
          carbs: 65,
          protein: 7,
        },
      ]
    },

    editItem(item) {
      this.editedIndex = this.desserts.indexOf(item)
      this.editedItem = Object.assign({}, item)
      this.dialog = true
    },

    deleteItem(item) {
      const index = this.desserts.indexOf(item)
      confirm('Are you sure you want to delete this item?') &&
        this.desserts.splice(index, 1)
    },

    close() {
      this.dialog = false
      setTimeout(() => {
        this.editedItem = Object.assign({}, this.defaultItem)
        this.editedIndex = -1
      }, 300)
    },

    save() {
      if (this.editedIndex > -1) {
        Object.assign(this.desserts[this.editedIndex], this.editedItem)
      } else {
        this.desserts.push(this.editedItem)
      }
      this.close()
    },
  },
}
</script>

<style scoped>
.admin-content {
  width: 930px;
}
</style>
