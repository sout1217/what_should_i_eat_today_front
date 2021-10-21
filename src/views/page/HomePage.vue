<template>
  <div
    class="cover"
    :style="{ backgroundImage: `url(${require('@/assets/main.png')})` }"
  >
    <div class="center-wrap">
      <div class="image-container">
        <div class="block block-1">
          <a href="#">
            <img :src="require('@/assets/main.png')" alt="" />
          </a>
        </div>
        <div class="block block-2">
          <a href="#">
            <img :src="require('@/assets/main-2.png')" alt="" />
          </a>
        </div>
        <div class="block block-3">
          <a href="#">
            <img :src="require('@/assets/main-3.png')" alt="" />
          </a>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import HorizontalScroll from 'horizontal-scroll/src'
export default {
  name: 'HomePage',
  async mounted() {
    this.scrollInit()

    this.wheelEvent()
  },

  data() {
    return {
      hs: null,
      isCalling: false,
    }
  },
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
    },
    wheelEvent() {
      const hsElem = document.querySelector('.horizontal-scroll')
      const addPosition = 100

      window.addEventListener('wheel', () => {
        const currentPosition = Math.abs(
          hsElem.style.transform.substring(
            hsElem.style.transform.indexOf('(') + 1,
            hsElem.style.transform.indexOf('p'),
          ),
        )
        const eventActionScrollPosition =
          this.hs.vars.oldScrollValue / 2 + addPosition

        if (!this.isCalling && eventActionScrollPosition < currentPosition) {
          this.isCalling = true
          this.$store
            .dispatch('GET_RANDOM_POSTS')
            .then(data => {
              console.log(data)
              this.isCalling = false

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
}

.block img:hover {
  border-radius: 8px;
  transform: scale(1.2);
  filter: brightness(100%);
}

//.block-1,
//.block-2,
//.block-3,
.block-4,
.block-5 {
  background: url(http://placehold.it/692x443) no-repeat;
  background-size: 100% 100%;
}
</style>
