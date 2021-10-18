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
          :cards="postFavoriteByMe.posts"
          groupName="찜한 글"
          :model="4"
          @first="doLike"
          @second="doFavorite"
          @third="doDelete"
        />
      </div>
      <div>
        <CardListGroup
          :cards="postLikedByMe.posts"
          groupName="좋아요를 누른 글"
          :model="4"
          @first="doLike"
          @second="doFavorite"
          @third="doDelete"
        />
      </div>
    </div>
  </div>
</template>

<script>
import Profile from '@/views/components/common/profile/Profile'
import CardListGroup from '@/views/components/common/card/CardListGroup'
import {
  likePost,
  cancelLikd,
  favoritePost,
  unfavoritePost,
  deletePost,
} from '@/api/admin/post'
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
    doLike(card) {
      if (card.like) {
        cancelLikd(card.id).then(({ status }) => {
          if (status == 200) {
            location.reload()
          }
        })
      } else {
        likePost(card.id).then(({ status }) => {
          if (status == 200) {
            location.reload()
          }
        })
      }
    },
    doFavorite(card) {
      if (card.favorite) {
        unfavoritePost(card.id).then(({ status }) => {
          if (status == 200) {
            location.reload()
          }
        })
      } else {
        favoritePost(card.id).then(({ status }) => {
          if (status == 200) {
            location.reload()
          }
        })
      }
    },
    doDelete(card) {
      deletePost(card.id).then(() => {
        location.reload()
      })
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
          like: d.isLikedByMe,
          favorite: d.isFavoriteByMe,
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
          like: d.isLikedByMe,
          favorite: d.isFavoriteByMe,
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
          like: d.isLikedByMe,
          favorite: d.isFavoriteByMe,
        })
      }
    })
  },
}
</script>

<style scoped></style>
