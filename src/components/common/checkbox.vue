<template>
  <div class="flex justify-start">
    <input type="checkbox" id="checkbox" v-model="checked" :disabled="disabled"/>
    <label for="checkbox" class="mx-2">{{ title }}</label>
  </div>
</template>

<script setup lang="ts">
import {computed, defineEmits, defineProps } from "vue";

const emits = defineEmits(['update:modelValue'])

const props = defineProps({
  modelValue: {
    required: false,
    type: Boolean
  },
  disabled: {
    required: false,
    default: false
  },
  title: {
    required: true,
    type: String
  }
})

const checked = computed({
  set(value) {
    emits('update:modelValue', value)
  },
  get() {
    return props.modelValue
  }
})
</script>
