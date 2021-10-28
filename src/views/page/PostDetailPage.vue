<template>
  <v-container fluid>
    <v-row class="px-lg-16">
      <!-- left -->
      <v-col cols="12" md="5" class="pr-6">
        <v-card class="transparent" flat>
          <router-link to="#">
            <v-img
              class="rounded-xl"
              max-height="445"
              v-ripple="{ class: 'secondary-orange-1' }"
              :src="post.imagePath"
              :alt="post.imageName"
            />
          </router-link>

          <v-card-text class="b1 pt-2 pb-0 d-flex align-center">
            <div class="flex-grow-1"></div>
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
                v-for="category in post.food.foodCategories"
                :key="category.id"
              >
                <span class="b2 font-weight-light">
                  {{ category.name }}
                </span>
              </v-chip>
            </v-chip-group>
          </v-card-actions>
        </v-card>
      </v-col>

      <!-- right -->
      <v-col cols="12" md="7" class="pl-6 pt-5">
        <v-row align="baseline" class="mb-8" no-gutters>
          <h1 class="mr-4">{{ post.title }}</h1>
          <h6
            class="b3 grayscale-black-6 font-weight-light"
            :title="post.createdAt | yyyymmdd"
          >
            {{ post.createdAt | untillNow }} 일 전
          </h6>
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
            <dd class="pl-8 d-flex align-center">
              <v-img
                v-ripple
                dark
                :src="post.member.profileImg"
                max-width="36"
                class="pointer rounded-circle mr-2"
              />
              {{ post.member.name }}
            </dd>
          </dl>
        </v-row>
        <v-row no-gutters class="mb-8">
          <dl>
            <dt class="mb-4">태그</dt>
            <dd class="pl-8">
              {{ post.food.foodTags.map(f => f.name) | join }}
            </dd>
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
          groupName="현재 음식의 최근 올라온 글"
          :model="4"
          :frist="recommendedPosts.first"
          :second="recommendedPosts.second"
          :third="recommendedPosts.third"
          @firstAction="doLike"
          @secondAction="doRating"
          @thirdAction="doFavorite"
        />
      </v-col>
    </v-row>
    <v-row>
      <v-col>
        <CardListGroup
          :cards="recentlyPosts.posts"
          groupName="최근 올라온 글"
          :model="4"
          :frist="recentlyPosts.first"
          :second="recentlyPosts.second"
          :third="recentlyPosts.third"
          @firstAction="doLike"
          @secondAction="doRating"
          @thirdAction="doFavorite"
        />
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import CardListGroup from '@/views/components/common/card/CardListGroup'
import postApi from '@/api/member/post'

export default {
  name: 'PostDetailPage',
  components: { CardListGroup },
  data() {
    return {
      post: {
        archive: false,
        content: '',
        createdAt: [0, 1, 1, 0, 0, 0, 0],
        food: {
          foodTags: [],
        },
        id: 0,
        imageName: '',
        imagePath: '',
        isFavoriteByMe: false,
        isLikedByMe: false,
        likes: null,
        member: {},
        title: '',
      },
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
        posts: [],
      },
      recentlyPosts: {
        posts: [],
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
      },
      recentPostsOfCurrentFood: {
        posts: [],
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
      },
    }
  },
  methods: {
    /** postId에 해당하는 Post 불러오기 */
    loadPost() {
      this.$store
        .dispatch('GET_POST', this.$route.params.postId)
        .then(post => {
          this.post = post
          console.log(post)

          this.loadRecentPostsOfCurrentFood(post.food.id)
        })
        .catch(error => this.$toastError(error))
    },
    /** 최근 Post 불러오기 */
    loadRecentlyPosts() {
      this.$store
        .dispatch('GET_RECENTLY_POSTS')
        .then(postsPage => {
          const { content: posts } = postsPage
          // console.log(posts)

          const newPosts = posts.map(post => ({
            ...post,
            src: post.imagePath,
            alt: post.imageName,
            likeAction: true,
            favoriteAction: true,
            deleteAction: true,
          }))

          // this.recentlyPosts.posts.push(...newPosts)
          this.recentlyPosts.posts = [].concat(newPosts)
        })
        .catch(error => this.$toastError(error))
    },
    /** 최근 Post 불러오기 (음식아이디 필요) */
    loadRecentPostsOfCurrentFood(foodId) {
      console.log(foodId)
      this.$store
        .dispatch('GET_RECENTLY_POSTS', foodId)
        .then(postsPage => {
          const { content: posts } = postsPage
          // console.log(posts)

          const newPosts = posts.map(post => ({
            ...post,
            src: post.imagePath,
            alt: post.imageName,
            likeAction: true,
            favoriteAction: true,
            deleteAction: true,
          }))

          // this.recentlyPosts.posts.push(...newPosts)
          this.recentlyPosts.posts = [].concat(newPosts)
        })
        .catch(error => this.$toastError(error))
    },
    async doLike(card) {
      console.log(this.$store.state.me)

      if (card.like) {
        await postApi.cancelLiked(card.id).then(({ status }) => {
          if (status == 200) {
            card.like = false
            this.loadLikePost()
            this.makeOtherLike(card.id, false)
          }
        })
      } else {
        await postApi.likePost(card.id).then(({ status }) => {
          if (status == 200) {
            card.like = true
            this.loadLikePost()
            this.makeOtherLike(card.id, true)
          }
        })
      }
      await this.statusLikePost()
    },
    doRating() {},
    doFavorite() {},
  },
  mounted() {
    this.loadPost()
    this.loadRecentlyPosts()
  },
}
</script>

<style scoped lang="scss"></style>
