<template>
  <div class="">
    <div class="mb-4 mt-4">
      <Profile></Profile>
    </div>
    <div class="mt-4">
      <div>
        <CardListGroup
          :cards="myPost.posts"
          groupName="내가 작성한 글"
          :model="4"
          @first="doLike"
          @second="doFavorite"
          @third="doDelete"
        />
      </div>
      <div>
        <CardListGroup
          :cards="postLikedByMe.posts"
          groupName="찜한 글"
          :model="4"
        />
      </div>
      <div>
        <CardListGroup
          :cards="postFavoriteByMe.posts"
          groupName="좋아요를 누른 글"
          :model="4"
        />
      </div>
    </div>
  </div>
</template>

<script>
import Profile from '@/views/components/common/profile/Profile'
import CardListGroup from '@/views/components/common/card/CardListGroup'
import {
  getPostLikedByMe,
  getPostFavoriteByMe,
  getMyPost,
} from '@/api/member/post'
export default {
  name: 'mypage',
  components: {
    Profile,
    CardListGroup,
  },
  data() {
    return {
      postLikedByMe: {
        page: 1,
        size: 10,
        posts: [],
      },
      postFavoriteByMe: {
        page: 1,
        size: 10,
        posts: [],
      },
      myPost: {
        page: 1,
        size: 10,
        posts: [],
      },
    }
  },
  methods: {
    doLike(key) {
      if (key.liked) {
        console.log('좋아요 취소하기')
      }
      console.log('like')
    },
    doFavorite(key) {
      if (key.favorited) {
        console.log('즐겨찾기 취소')
      }
      console.log('favorite')
    },
    doDelete(key) {
      console.log(key)
      console.log('삭제')
    },
  },
  mounted() {
    let postLikedByMe = getPostLikedByMe()
    postLikedByMe.then(({ data: { content } }) => {
      // this.postLikedByMe.posts = []
      for (let d of content) {
        this.postLikedByMe.posts.push({
          id: d.id,
          title: d.title,
          content: d.content,
          src: d.imagePath,
          alt: d.imageName,
        })
      }
    })
    let postFavoriteByMe = getPostFavoriteByMe()
    postFavoriteByMe.then(({ data: { content } }) => {
      for (let d of content) {
        this.postFavoriteByMe.posts.push({
          id: d.id,
          title: d.title,
          content: d.content,
          src: d.imagePath,
          alt: d.imageName,
        })
      }
    })
    let myPost = getMyPost()
    myPost.then(({ data: { content } }) => {
      for (let d of content) {
        this.myPost.posts.push({
          id: d.id,
          title: d.title,
          content: d.content,
          src: d.imagePath,
          alt: d.imageName,
        })
      }
    })
  },
}
</script>

<style scoped></style>
