<script setup>
// A CV row: text on the left, institution logo flush to the right edge.
// `height` sizes the logo — squat wordmarks (WeVis) need a smaller value than wide
// ones (KMUTT, Tallinn) to carry the same optical weight. The fixed-width box with
// object-position: right is what keeps all the logos on one right-hand edge despite
// their very different aspect ratios.
defineProps({
  logo: { type: String, required: true },
  alt: { type: String, default: "" },
  height: { type: String, default: "3.5rem" },
});
</script>

<template>
  <div class="logo-row">
    <div><slot /></div>
    <img :src="logo" :alt="alt" :style="{ height }" />
  </div>
</template>

<style scoped>
.logo-row {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 2rem;
}

.logo-row + .logo-row {
  margin-top: 2rem;
}

.logo-row img {
  flex: none;
  width: 13rem;
  object-fit: contain;
  object-position: right;
}
</style>
