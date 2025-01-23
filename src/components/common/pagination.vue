<template>
  <div v-if="showPageNumbers > 1" class="flex justify-start">
    <Button v-if="modelValue > 1"
            :icon="{ name: 'next' }"
            :className="`${buttonStyles} px-2`"
            @click="changePage({ state: 'previous' })" />

    <template v-for="(_, index) in showPageNumbers" :key="index">
      <Button
        :title="`${index + 1}`"
        :className="buttonStyles(index + 1 === modelValue)"
        @click="changePage({ number: index + 1 })"
      />
    </template>

    <Button
      v-if=" modelValue < pages"
      :icon="{ name: 'previous' }"
      :className="`${buttonStyles} px-2`"
      @click="changePage({ state: 'next' })"
    />
  </div>
</template>

<script setup lang="ts">
import {computed, defineEmits, defineProps, toRefs} from "vue";
import Button from './button.vue'

const emits = defineEmits(['update:modelValue'])
const props = defineProps({
  modelValue: {
    type: Number,
    required: true
  },
  pages: {
    type: Number,
    default: 1
  },
  currentPage: {
    type: Number,
    default: 1
  }
})

const buttonStyles = (activePage) => {
  return `bg-white shadow-gl mx-2 rounded-lg w-10 h-10 ${activePage && 'bg-gray-300'}`
}

const showPageNumbers = computed(() => {
  return props.pages > 4 ? props.modelValue - 1 : props.pages
})
const currentPageNumber = computed(() => props.modelValue)

const changePage = (page: { state?: String, number?: Number }) => {
  let currentPage = 1
  if (page.state?.length) {
    currentPage = page.state === 'next' ? currentPageNumber.value + 1 : currentPageNumber.value - 1
  } else {
    currentPage = page.number ?? 1
  }

  emits('update:modelValue', currentPage)
}
</script>
