<template>
  <v-dialog v-model="dialog" max-width="880" @click:outside="closeModal">
    <v-card class="pa-16">
      <v-card-title class="h1"> 카테고리에 음식 추가하기 </v-card-title>

      <v-card-text class="mt-5">
        <v-row>
          <v-col cols="2">
            <v-select label="국가" outlined dense :items="form.countries" />
          </v-col>
          <v-col cols="2">
            <v-select label="태그" outlined dense :items="form.tags" />
          </v-col>
          <v-col cols="8">
            <v-text-field
              class="v-btn--block"
              v-model="form.search"
              outlined
              hide-details
              dense
              placeholder="검색"
              autocomplete="off"
              @keydown.enter="readDataFromAPI"
            >
              <v-icon @click="readDataFromAPI" slot="append" color="black">
                mdi-magnify
              </v-icon>
            </v-text-field>
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="12">
            <v-data-table
              dense
              v-model="table.selected"
              show-select
              :page="table.page"
              :pageCount="table.numberOfElements"
              :headers="table.headers"
              hide-default-footer
              :options="table.options"
              :items="table.foods"
              single-expand
            >
              <template v-slot:item.tags="{ item }">
                {{ item.tags.map(tag => tag.name) | join }}
              </template>
            </v-data-table>
          </v-col>
        </v-row>
      </v-card-text>

      <v-card-actions>
        <v-row>
          <v-col cols="12">
            <v-pagination
              total-visible="11"
              v-model="table.page"
              :length="table.totalPages"
            ></v-pagination>
          </v-col>
        </v-row>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  name: 'FoodAddModal',
  props: {
    dialog: {
      type: Boolean,
      value: false,
      require: true,
    },
    categoryId: {
      default: '1',
      require: true,
    },
  },
  data() {
    return {
      form: {
        countries: [],
        tags: [],
        search: '',
      },
      table: {
        selected: [],
        foods: /** id, name, country, foodTags */ [],
        page: 1,
        numberOfElements: 10,
        totalPages: 1,
        options: {},
        headers: [
          { text: '번호', value: 'id' },
          { text: '음식명', value: 'name' },
          { text: '국가', value: 'country' },
          { text: '태그', value: 'tags' },
        ],
      },
    }
  },
  methods: {
    /** 모달창 닫기 */
    closeModal() {
      this.$emit('closeModal')
    },
    /** api 조회하기 */
    readDataFromAPI() {
      console.log('this table page', this.table.page)
      this.$store
        .dispatch('GET_FOODS_WITH_TAGS_AND_COUNTRY', {
          page: this.table.page - 1,
          size: 10,
        })
        .then(foodsPage => {
          this.setTableData(foodsPage)
        })
        .catch(error => {
          this.$toastError(error)
        })
    },
    /** table 데이터 세팅하기 */
    setTableData(data) {
      console.log(data)
      const { content: foods, number: page, totalPages } = data
      this.table.foods = foods
      this.table.page = page + 1
      this.table.totalPages = totalPages
    },
    changePage(data) {
      console.log(data)
    },
  },
  watch: {
    /** 모달이 오픈될 때 api 조회하기 */
    dialog(newValue) {
      if (newValue) {
        this.readDataFromAPI()
      }
    },
    'table.page': {
      handler() {
        this.readDataFromAPI()
      },
    },
  },
}
</script>

<style scoped></style>
