<script setup lang="ts">
import { ref, watch } from "vue";
const props = defineProps({
  modelValue: {
    type: Object,
    default() {
      return { username: "", password: "" };
    },
  },
});
const emit = defineEmits(["update:modelValue"]);

const localModelValue = ref();

watch(
  () => props.modelValue,
  (newValue) => {
    localModelValue.value = clone(newValue);
  },
  { immediate: true },
);

function handleSubmit() {
  emit("update:modelValue", clone(localModelValue.value));
}

function clone(obj: any) {
  return JSON.parse(JSON.stringify(obj));
}
</script>
<template>
  <form @submit.prevent="handleSubmit">
    <h1>Login</h1>
    <label>
      <span>Username</span>
      <input type="text" v-model="localModelValue.username" />
    </label>

    <label>
      <span>Password</span>
      <input type="password" v-model="localModelValue.password" />
    </label>

    <button>Login</button>
  </form>
</template>
