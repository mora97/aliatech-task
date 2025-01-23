<template>
  <div class="mx-2">
    <label class="block text-sm mb-2" :for="title">{{ title }}</label>
    <select
      v-model="selectedOptions"
      :name="title"
      :id="title"
      class="border rounded-xl py-2 w-full bg-white text-sm"
      :disabled="disabled"
    >
      <option value="0" disabled>{{ __('Select') }}</option>
      <option v-for="option in options" :value="option.value" :key="option.value">
        {{ option.text }}
      </option>
    </select>
  </div>
</template>

<script setup lang="ts">
import {computed, defineEmits, defineProps} from "vue";
import {useLocalization} from "@/composables";

const { __ } = useLocalization()
const emit = defineEmits(['update:modelValue'])

const props = defineProps({
  modelValue: {
    required: true,
    default: 0
  },
  options: {
    required: true,
    type: Array<{ text: String, value: String | Number }>
  },
  title: {
    type: String,
    default: ''
  },
  disabled: {
    type: Boolean,
    default: false
  }
})

const selectedOptions = computed({
  set(value) {
    emit('update:modelValue', value)
  },
  get() {
    return props.modelValue
  }
})
</script>
