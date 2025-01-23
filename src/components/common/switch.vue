<template>
  <label class="switch">
    <input
      type="checkbox"
      :checked="modelValue"
      @change="toggleSwitch"
    />
    <span class="slider"></span>
  </label>
</template>

<script setup>
import { defineProps, defineEmits } from 'vue';

const props = defineProps({
  modelValue: {
    type: Boolean,
    required: true,
  },
});

const emit = defineEmits(['update:modelValue']);

const toggleSwitch = () => {
  emit('update:modelValue', !props.modelValue);
};
</script>
