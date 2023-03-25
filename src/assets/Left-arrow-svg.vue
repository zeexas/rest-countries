<!-- Uploaded to: SVG Repo, www.svgrepo.com, Transformed by: SVG Repo Mixer Tools -->
<template>
  <svg
    fill="#000000"
    width="28px"
    height="36px"
    viewBox="0 0 24 24"
    id="left-arrow"
    data-name="Flat Line"
    xmlns="http://www.w3.org/2000/svg"
    class="icon flat-line"
  >
    <g id="SVGRepo_bgCarrier" stroke-width="0" />
    <g
      id="SVGRepo_tracerCarrier"
      stroke-linecap="round"
      stroke-linejoin="round"
      stroke="#CCCCCC"
      stroke-width="0.048"
    />
    <g id="SVGRepo_iconCarrier">
      <line
        id="primary"
        x1="18"
        y1="12"
        x2="3"
        y2="12"
        style="
          fill: none;
          stroke: #000000;
          stroke-linecap: round;
          stroke-linejoin: round;
          stroke-width: 1.5;
        "
        :style="{stroke: theme }"
      />
      <polyline
        id="primary-2"
        data-name="primary"
        points="6 9 3 12 6 15"
        style="
          fill: none;
          stroke: #000000;
          stroke-linecap: round;
          stroke-linejoin: round;
          stroke-width: 1.5;
        "
        :style="{stroke: theme }"
      />
    </g>
  </svg>
</template>

<script>
export default {
  inject: ['theme'],
  props: ['theme'],
  name: 'LeftArrowSvg'
}
</script>
