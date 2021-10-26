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
          style="border-radius: 20px"
        >
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
            :rules="form.title"
            placeholder="글 제목을 입력하세요"
          ></v-text-field>
        </v-col>
      </v-row>
      <v-row class="mb-3" justify="center" no-gutters>
        <v-col cols="12" sm="1"><v-card-text>내용</v-card-text></v-col>
        <v-col cols="12" sm="6">
          <v-text-field
            :rules="form.content"
            placeholder="글 내용을 입력하세요"
          ></v-text-field>
        </v-col>
      </v-row>
      <v-row class="mb-3" justify="center" no-gutters>
        <ComboBox></ComboBox>
      </v-row>
      <v-row class="mb-3" justify="center" no-gutters>
        <ComboBox></ComboBox>
      </v-row>
      <v-row class="mb-3" justify="center" no-gutters>
        <ComboBox></ComboBox>
      </v-row>
    </v-container>
  </div>
</template>

<script>
import ComboBox from '@/views/components/common/search/FoodComboBox'
export default {
  name: 'PostAddPage',
  components: {
    ComboBox,
  },
  data: function () {
    return {
      form: {
        title: '',
        content: '',
        foods: [],
        categories: [],
        tags: [],
      },
    }
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
