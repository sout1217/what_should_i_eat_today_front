<template>
  <v-container fluid>
    <v-row class="px-lg-16">
      <!-- left -->
      <v-col cols="5" class="pr-6">
        <v-card class="transparent" flat>
          <router-link to="#">
            <v-img
              class="rounded-xl"
              max-height="445"
              v-ripple="{ class: 'secondary-orange-1' }"
              :lazy-src="require('@/assets/sundai.png')"
              :src="require('@/assets/sundai.png')"
            />
          </router-link>

          <v-card-text class="b1 pt-2 pb-0 d-flex align-center">
            <div class="flex-grow-1">순대국밥</div>
            <div>
              <v-btn icon>
                <v-icon color="red lighten-1">mdi-heart</v-icon>
              </v-btn>
              <v-btn icon>
                <v-icon color="orange lighten-2">mdi-star</v-icon>
              </v-btn>
              <v-btn icon>
                <v-icon color="grey">mdi-plus</v-icon>
              </v-btn>
            </div>
          </v-card-text>
          <v-card-actions class="pt-0 px-4">
            <v-chip-group column>
              <v-chip
                color="bg-grayscale-black-3"
                text-color="grayscale-black-6"
                label
                small
                v-for="tag in ['든든한', '뜨근한', '건강식']"
                :key="tag"
              >
                <span class="b2 font-weight-light">
                  {{ tag }}
                </span>
              </v-chip>
            </v-chip-group>
          </v-card-actions>
        </v-card>
      </v-col>

      <!-- right -->
      <v-col cols="7" class="pl-6 pt-5">
        <v-row align="baseline" class="mb-8" no-gutters>
          <h1 class="mr-4">맛나고 맛좋은 맛있는 음식들</h1>
          <h6 class="b3 grayscale-black-6 font-weight-light">2019.03.27</h6>
          <v-spacer />
          <h6>
            <v-btn x-small plain link :ripple="false">
              <div
                class="
                  b3
                  red--text
                  text--lighten-1
                  font-weight-light
                  d-flex
                  center
                "
              >
                <v-icon small class="mr-1"> mdi-account-alert</v-icon>
                신고하기
              </div>
            </v-btn>
          </h6>
        </v-row>
        <v-row no-gutters class="mb-8">
          <dl>
            <dt class="mb-4">작성자</dt>
            <dd class="pl-8">든든한 배달음식</dd>
          </dl>
        </v-row>
        <v-row no-gutters class="mb-8">
          <dl>
            <dt class="mb-4">태그</dt>
            <dd class="pl-8">든든한 배달음식</dd>
          </dl>
        </v-row>
        <v-row no-gutters>
          <dl>
            <dt class="mb-4">오늘의 문구</dt>
            <dd class="pl-8">
              Habitasse nibh sed pulvinar facilisis tempus. Bibendum tempus
              integer ut varius et a hendrerit. Vehicula est elit pellentesque
            </dd>
          </dl>
        </v-row>
      </v-col>
    </v-row>

    <!-- section 2 -->
    <v-row>
      <v-col>
        <CardListGroup
          :cards="recommendedPosts.posts"
          groupName="추천 글"
          :model="4"
          :frist="recommendedPosts.first"
          :second="recommendedPosts.second"
          :third="recommendedPosts.third"
          @first="doLike"
          @second="doRating"
          @third="doFavorite"
        />
      </v-col>
    </v-row>
    <v-row>
      <v-col>
        <CardListGroup
          :cards="recommendedPosts.posts"
          groupName="최근 올라온 글"
          :model="4"
          :frist="recommendedPosts.first"
          :second="recommendedPosts.second"
          :third="recommendedPosts.third"
          @first="doLike"
          @second="doRating"
          @third="doFavorite"
        />
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import CardListGroup from '@/views/components/common/card/CardListGroup'
export default {
  name: 'PostDetailPage',
  components: { CardListGroup },
  data() {
    return {
      recommendedPosts: {
        first: {
          fill: 'mdi-heart',
          outline: 'mdi-heart-outline',
          color: 'red',
        },
        second: {
          fill: 'mdi-star',
          outline: 'mdi-star-outline',
          color: 'orange lighten-2',
        },
        third: {
          fill: 'mdi-thresh',
          outline: 'mdi-plus',
          color: 'grey',
        },
        page: 1,
        size: 10,
        posts: [
          {
            id: 1,
            src: '/img/sundai.2bac2e05.png',
            alt: 'alt',
            title: 'title',
            content:
              'contentcontentcontentcontentcontentcontentcontentcontentcontentcontentcontentcontentcontentcontentcontentcontent',
            like: true,
            favorite: true,
            deleteAction: true,
            likeAction: true,
            favoriteAction: true,
          },
          {
            id: 2,
            src: '/img/sundai.2bac2e05.png',
            alt: 'alt',
            title: 'title',
            content: 'content',
            like: false,
            favorite: false,
            deleteAction: true,
            likeAction: true,
            favoriteAction: true,
          },
          {
            id: 3,
            src: '/img/sundai.2bac2e05.png',
            alt: 'alt',
            title: 'title',
            content: 'content',
            like: false,
            favorite: false,
            deleteAction: true,
            likeAction: true,
            favoriteAction: true,
          },
        ],
      },
      recentlyPosts: {
        posts: [],
      },
    }
  },
  methods: {
    /** 최근 게시물 불러오기 */
    loadRecentlyPosts() {
      this.$store
        .dispatch('GET_RECENTLY_POSTS')
        .then(data => {
          console.log(data)
        })
        .catch(error => this.$toastError(error))
    },
    doLike() {},
    doRating() {},
    doFavorite() {},
  },
  mounted() {
    this.loadRecentlyPosts()
  },
}
</script>

<style scoped lang="scss"></style>
