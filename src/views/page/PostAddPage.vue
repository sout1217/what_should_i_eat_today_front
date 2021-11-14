<template>
  <div>
    <div class="profile-image">
      <v-img
        class="backgroud-with-inner"
        src="https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885__480.jpg"
        lazy-src="https://miro.medium.com/max/1400/0*H3jZONKqRuAAeHnG.jpg"
      ></v-img>
      <v-row justify="center">
        <v-img
          src="https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885__480.jpg"
          lazy-src="https://miro.medium.com/max/1400/0*H3jZONKqRuAAeHnG.jpg"
          max-width="50vw"
          max-height="40vh"
          class="center-image"
          style="border-radius: 20px; cursor: pointer"
          @click="fileUpload"
          id="image_preview"
        >
          <input type="file" id="image_upload" style="display: none" />
          <template v-slot:placeholder>
            <v-row class="fill-height ma-0" align="center" justify="center">
              <v-progress-circular
                indeterminate
                color="grey lighten-5"
              ></v-progress-circular>
            </v-row>
          </template>
        </v-img>
      </v-row>
    </div>
    <v-container fluid class="food-form">
      <v-row class="mb-3" justify="center" no-gutters>
        <v-col cols="12" sm="1"><v-card-text>제목</v-card-text></v-col>
        <v-col cols="12" sm="6">
          <v-text-field
            v-model="form.title"
            placeholder="글 제목을 입력하세요"
          ></v-text-field>
        </v-col>
      </v-row>
      <v-row class="mb-3" justify="center" no-gutters>
        <v-col cols="12" sm="1"><v-card-text>내용</v-card-text></v-col>
        <v-col cols="12" sm="6">
          <v-text-field
            v-model="form.content"
            placeholder="글 내용을 입력하세요"
          ></v-text-field>
        </v-col>
      </v-row>
      <v-row class="mb-3" justify="center" no-gutters>
        <v-col cols="12" sm="1"><v-card-text>음식명</v-card-text></v-col>
        <v-col cols="12" sm="6">
          <FoodComboBox @choice="loadFoodData"></FoodComboBox>
        </v-col>
      </v-row>
      <v-row class="mb-3" justify="center" no-gutters>
        <v-col cols="12" sm="1"><v-card-text>카테고리</v-card-text></v-col>
        <v-col cols="12" sm="6">
          <ResultCombobox :items="categories"></ResultCombobox>
        </v-col>
      </v-row>
      <v-row class="mb-3" justify="center" no-gutters>
        <v-col cols="12" sm="1"><v-card-text>태그</v-card-text></v-col>
        <v-col cols="12" sm="6">
          <ResultCombobox :items="form.tags"></ResultCombobox>
        </v-col>
      </v-row>
    </v-container>
    <div
      style="
        position: absolute;
        top: 500px;
        right: 0;
        display: flex;
        flex-direction: column;
      "
    >
      <v-btn @click="writePost" small class="success"> 작성하기 </v-btn>
      <v-btn @click="goMain" small class="danger"> 뒤로가기 </v-btn>
    </div>
  </div>
</template>

<script>
import ResultCombobox from '@/views/components/common/food/ResultCombobox'
import FoodComboBox from '@/views/components/common/search/FoodComboBox'
import { getFood } from '@/api/member/foods'
import postApi from '@/api/member/post'
export default {
  name: 'PostAddPage',
  components: {
    FoodComboBox,
    ResultCombobox,
  },
  data: function () {
    return {
      form: {
        title: '',
        content: '',
        foodId: 0,
        foods: [],
        categories: [],
        tags: [],
        file: {},
      },
    }
  },
  computed: {
    categories() {
      return this.form.categories
    },
  },
  methods: {
    fileUpload() {
      document.getElementById('image_upload').click()
    },
    loadFoodData(id) {
      getFood(id).then(({ data, status }) => {
        if (Math.floor(status / 10) == 20) {
          this.form.foodId = data.id

          this.form.categories = data.foodCategories
          this.form.tags = data.foodTags
        }
      })
    },
    preview(event) {
      let image = document.querySelector('#image_preview .v-image__image')
      image.style.backgroundImage = `url(${URL.createObjectURL(
        event.target.files[0],
      )})`
      console.log(event.target.files[0])
      this.form.file = event.target.files[0]
      image.onload = function () {
        URL.revokeObjectURL(image.src) // free memory
      }
    },

    writePost() {
      console.log('uploadPost')
      console.log(this.form)
      postApi.uploadPost(this.form).then(value => {
        console.log(value)
        this.$router.push('/')
      })
    },

    goMain() {},
  },

  mounted() {
    let fileInput = document.getElementById('image_upload')
    fileInput.addEventListener('change', this.preview)
  },
}
</script>

<style scoped>
.center-image {
  margin-top: 5vh;
  margin-bottom: 5vh;
}
.backgroud-with-inner {
  position: absolute;
  width: 100vw;
  height: 50vh;
  filter: blur(3px);
}
.food-form {
  text-align: center;
}
</style>
