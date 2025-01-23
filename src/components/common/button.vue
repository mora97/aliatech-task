<template>
  <button :class="className">
    <Icon
      v-if="icon"
      :name="icon.name"
      :size="icon.size ?? 'sm'"
    />
    {{ title }}
  </button>

</template>

<script setup lang="ts">
import {defineProps} from "vue";
import Icon from './icon.vue'

defineProps({
  title: {
    type: String,
    default: ''
  },
  icon: {
    type: Object(),
    default: null
  },
  className: {
    type: String
  }
})
</script>
