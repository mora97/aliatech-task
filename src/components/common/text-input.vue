<template>
    <div class="relative">
      <h5 class="text-sm mb-2">{{ title }}</h5>
      <input
          :class="`border rounded-xl py-2 w-full ${icon ? 'px-8' : 'px-2'}`"
          v-model="inputValue"
          :value="inputValue"
          :type="type"
          :required="required"
          :placeholder="placeholder"
          :disabled="disabled"
      />
      <Icon
        v-if="icon"
        :name="icon.name"
        :size="icon.size ?? 'sm'"
        class="absolute start-0 mt-2 ms-1"
      />
    </div>
</template>

<script setup lang="ts">
import Icon from '@/components/common/icon.vue'
import {computed, defineEmits, defineProps} from 'vue';

const emit = defineEmits(['update:modelValue'])

const props = defineProps({
  modelValue: {
      type: String,
      default: '',
      required: false
  },
  title: {
      type: String,
      required: false
  },
  type: {
      type: String,
      required: false,
      default: 'text'
  },
  required: {
      type: Boolean,
      required: false,
      default: false
  },
  icon: {
      type: Object(),
      required: false
  },
  placeholder: {
    type: String,
    required: false,
    default: ''
  },
  disabled: {
    type: Boolean,
    default: false
  }
})

const inputValue = computed({
    set(value) {
        emit('update:modelValue', value)
    },
    get() {
        return props.modelValue
    }
})
</script>
