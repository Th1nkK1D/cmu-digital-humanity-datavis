<script setup>
// A row of 2–4 <Figure>s side by side, for "here are three examples" slides.
// No tahta layout covers this: showcase/image take a single image, and
// feature/panels render lucide icons, not pictures. This is the contract's
// rule 6 — compose in the body when no layout fits.
//
// `ratio` crops every image to one aspect with object-fit: cover. Source
// photos rarely share a ratio, and without this the row gets ragged bottoms
// and the captions stop aligning — the same problem LogoRow solves with its
// fixed-width box.
defineProps({
  ratio: { type: String, default: "4 / 3" },
});
</script>

<template>
  <div class="figure-row" :style="{ '--fr-ratio': ratio }">
    <slot />
  </div>
</template>

<style scoped>
.figure-row {
  display: flex;
  align-items: flex-start;
  gap: 1.5rem;
}

.figure-row :deep(.tahta-figure) {
  flex: 1 1 0;
  min-width: 0;
}

.figure-row :deep(.tahta-figure img) {
  aspect-ratio: var(--fr-ratio);
  object-fit: cover;
}

.figure-row :deep(.tahta-figure figcaption) {
  display: block;
  font-size: 1.05rem;
}
</style>
