<template>
    <i :class="`icon--${size} icon--${type}`" v-html="icons[name]" />
</template>

<script setup lang="ts">
import icons from '@/assets/icons'
import {defineProps} from "vue";

defineProps({
  name: {
    type: String
  },
  size: {
    type: String,
    default: 'md'
  },
  type: {
    type: String,
    default: 'primary'
  }
})
</script>
