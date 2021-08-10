<template>
  <div class="touch-area">
    <svg
      :width="width"
      :height="height"
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M1.6 0C1.6 0 0 0 0 1.6V22.4C0 22.4 0 24 1.6 24H22.4C22.4 24 24 24 24 22.4V1.6C24 1.6 24 0 22.4 0H1.6ZM5.015 5.6H9.795L14.22 12.058V5.6H18.985V18.4H14.205L9.78 11.943V18.4H5.015V5.6Z"
        :fill="fill"
      />
    </svg>
  </div>
</template>

<script>
export default {
  name: 'NaverIcon',
  props: {
    fill: { type: String, default: 'white' },
    width: { type: Number, default: 24, required: false },
    height: { type: Number, default: 24, required: false },
  },
}
</script>

<style scoped>
.touch-area {
  padding: 8px;
}
</style>
