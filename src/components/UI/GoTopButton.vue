<template>
  <div @click="scrollToTop()" :class="['scroll_to_top', { go_top: isTop }]">
    <left-arrow-svg
      :theme="'white'"
      class="rotate-90 w-[70%] h-[70%]"
    ></left-arrow-svg>
  </div>
</template>

<script>
import LeftArrowSvg from '../../assets/Left-arrow-svg.vue'

export default {
  name: 'GoToTop',
  components: {
    LeftArrowSvg
  },
  data() {
    return {
      isTop: false
    }
  },
  methods: {
    scrollToTop() {
      window.scrollTo({ top: 0, left: 0, behavior: 'smooth' })
    }
  },
  mounted() {
    const that = this
    window.addEventListener('scroll', () => {
      let scrollPos = window.scrollY
      if (scrollPos >= 300) {
        that.isTop = true
      } else {
        that.isTop = false
      }
    })
  }
}
</script>

<style scoped>
.scroll_to_top {
  position: fixed;
  cursor: pointer;
  bottom: -8rem;
  right: 2rem;
  background: darkorange;
  z-index: 20;
  width: 5vw;
  height: 5vw;
  min-width: 3.5rem;
  min-height: 3.5rem;
  border-radius: 50%;
  display: flex;
  align-items: center;
  text-align: center;
  opacity: 0;
  visibility: hidden;
  transition: 0.6s;
  overflow: hidden;
  box-shadow: 0 0 10px 3px rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
}

.scroll_to_top:hover {
  box-shadow: 0 0 4px 6px rgba(50, 50, 93, 0.11), 0 0 1px 3px rgba(0, 0, 0, 0.08);
  transform: translateY(-5px);
}

.go_top {
  opacity: 1;
  visibility: visible;
  bottom: 2rem;
}
</style>
