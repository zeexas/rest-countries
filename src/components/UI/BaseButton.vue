<template>
  <button
    :type="type"
    class="w-36 font-semibold rounded-sm shadow-[0_0_10px_0_rgba(0,0,0,0.3)] px-4 py-0 text-sm"
    :class="applyTheme"
  >
    <slot></slot>
  </button>
</template>

<script>
export default {
  props: {
    type: String,
  },
  name: 'BaseButton',
  computed: {
    theme() {
      return this.$store.getters.currentTheme
    },
    applyTheme() {
      return this.theme === 'dark' ? 'dark-el' : 'light-el'
    },
  }
}
</script>
