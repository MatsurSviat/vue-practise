<script setup lang="ts">
import { ref, watch, nextTick } from "vue";
const modelValue = defineModel<string>();
const el = ref();

watch(modelValue, async () => {
  el.value.style.height = "auto";
  // Wait for the next tick to get the correct scrollHeight
  // after the textarea has been resized to auto
  // https://vuejs.org/api/general.html#nexttick
  await nextTick();
  el.value.style.height = el.value.scrollHeight + "px";
});
</script>
<template>
  <textarea v-model="modelValue" ref="el" rows="1"></textarea>
</template>
