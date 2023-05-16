<template>
  <div @click="scrollToTop()" :class="['scroll_to_top', { go_top: isTop }]">
    <p class="font-semibold text-2xl">top</p>
  </div>
</template>

<script>
export default {
  name: 'GoToTop',
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
  background: #ffa101;
  color: white;
  z-index: 20;
  padding: 0.7rem 1rem;
  border-radius: 10%;
  opacity: 0;
  visibility: hidden;
  transition: 0.5s;
  overflow: hidden;
  box-shadow: 0 0 10px 3px rgba(0, 0, 0, 0.5);
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
