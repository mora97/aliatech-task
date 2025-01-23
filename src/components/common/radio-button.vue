<template>
  <div class="flex justify-start">
    <input type="radio" id="radio_option" name="radio" value="yes" v-model="selected" class="mt-1 w-3.5 h-3.5" />
    <label for="radio_option" class="mx-2">{{ title }}</label>
  </div>
</template>

<script setup>
import { computed } from 'vue'

const emits = defineEmits(['update:modelValue'])

const props = defineProps({
  modelValue: {
    required: false,
  },
  disabled: {
    required: false,
    default: false
  },
  title: {
    required: false,
    default: ''
  }
})

const selected = computed({
  set(value) {
    emits('update:modelValue', value)
  },
  get() {
    return props.modelValue
  }
})
</script>
