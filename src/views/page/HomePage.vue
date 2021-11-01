<template>
  <div
    class="cover"
    :style="{ backgroundImage: `url(${require('@/assets/main.png')})` }"
  >
    <div class="center-wrap">
      <div class="image-container">
        <template v-for="(post, index) in posts">
          <div class="block" :key="index">
            <a :href="`/posts/${post.id}`">
              <img :src="post.imagePath" :alt="post.title" />
            </a>
          </div>
        </template>
      </div>
    </div>
  </div>
</template>

<script>
import HorizontalScroll from 'horizontal-scroll/src'
export default {
  name: 'HomePage',
  async mounted() {
    try {
      const posts = await this.$store.dispatch('GET_RANDOM_POSTS')
      this.posts = [].concat(posts)
    } catch (error) {
      this.$toastError('서버에 요청할 수 없습니다')
    }

    /** 화면이 다 그려진 후 스크롤 이벤트 실행 */
    this.$nextTick(() => {
      this.scrollInit()
      this.wheelEvent()
    })
  },

  data() {
    return {
      hs: null,
      isCalling: false,
      addScrollRight: 0,
      posts: [],
    }
  },
  created() {},
  methods: {
    /** 메인 스크롤 세팅 */
    scrollInit() {
      const blocks = document.getElementsByClassName('block')
      const container = document.getElementsByClassName('image-container')

      this.hs = new HorizontalScroll({
        blocks: blocks,
        container: container,
        isAnimated: true,
        springEffect: 1.8,
      })

      this.addScrollRight = this.hs.vars.scrollRight
    },
    /** 마우스 휠 이벤트 */
    wheelEvent() {
      const hsElem = document.querySelector('.horizontal-scroll')
      const subPosition = 300

      // window 전역 설정되어 오류 발생
      hsElem.addEventListener('wheel', event => {
        const currentPosition = Math.abs(
          hsElem.style.transform.substring(
            hsElem.style.transform.indexOf('(') + 1,
            hsElem.style.transform.indexOf('p'),
          ),
        )

        const isWheelDown = 0 < event.deltaY

        // const eventActionScrollPosition = this.hs.vars.oldScrollValue / 2 + 100
        const eventActionScrollPosition = this.hs.vars.scrollRight - subPosition

        if (
          !this.isCalling &&
          eventActionScrollPosition < currentPosition &&
          isWheelDown
        ) {
          this.isCalling = true
          this.$store
            .dispatch('GET_RANDOM_POSTS')
            /** @typedef post
             *  @property {boolean} archived
             *  @property {string} title
             *  @property {string} content
             *  @property {Object} food
             *  @property {string} imageName
             *  @property {string} imagePath
             *  @property {string} isFavoriteByMe
             *  @property {number} isLikedByMe
             *  @property {Object} member
             * */
            .then(data => {
              console.log('d---------->', data)
              this.isCalling = false
              // this.posts.push(...data)

              const hsElem = document.querySelector('.horizontal-scroll')

              let html = ''

              data.forEach(post => {
                html += `<div class="block" style="display: inline-block;" >`
                html += `  <a href="/posts/${post.id}">`
                html += `    <img src="${post.imagePath}" alt="${post.title}" />`
                html += `  </a>`
                html += `</div>`
              })

              hsElem.insertAdjacentHTML('beforeend', html)

              this.hs.vars.scrollRight += this.addScrollRight

              /** 만약 마지막이 였다면 더 이상 조회하지 않는다 this.calling = True */
            })
            .catch(error => {
              this.$toastError(error)
              /** 오류나면 더 이상안가져오게 끔 한다 */
            })
        }
        console.log('현재 포지션', currentPosition)
        console.log('api 호출 포지션', eventActionScrollPosition)
      })
    },
  },
}
</script>

<style lang="scss">
.cover {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-size: 100% 100%;
  //background-color: rgba(255, 0, 0, 0.3);
}

.center-wrap {
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
}

.image-container {
  display: flex;
  align-items: center;
  height: 100%;
}

.horizontal-scroll {
  top: 15% !important;
}

.block {
  position: relative;
  width: 51.0556vw;
  max-width: 920px;
  height: 50.717234262125906vh;
  max-height: 615px;
  margin: 80px 50px 0 80px;
  overflow: hidden;
  border-radius: 8px;
}

.block img {
  width: 100%;
  height: 100%;
  transition: transform, filter;
  transition-duration: 0.8s;
  filter: brightness(0.4);
  background-color: #d1d1d1;
}

.block img:hover {
  border-radius: 8px;
  transform: scale(1.1);
  filter: brightness(100%);
}
</style>
