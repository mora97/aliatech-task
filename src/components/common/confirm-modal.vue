<template>
  <div v-if="show">
    <div class="backdrop"></div>

    <div  class="position-center-fixed bg-white w-1/3 p-5 border rounded-lg shadow-lg z-50">

      <p>{{ description }}</p>
      <section class="my-10">
        <slot></slot>
      </section>


      <div class="flex justify-end">
        <Button
          className="border rounded-lg w-16 mx-2 h-10"
          :title="__('Cancel')"
          @click="closeModal"/>
        <Button
          className="border rounded-lg w-16 h-10 bg-red-400 text-white"
          :title="__('Yes')"
          @click="confirm"/>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import Icon from './icon.vue'
import Button from "@/components/common/button.vue";
import {defineEmits, defineProps} from "vue";
import {useLocalization} from "@/composables";

const emits = defineEmits(['close', 'confirm'])
defineProps({
  show: {
    type: Boolean,
    default: false
  },
  description: {
    type: String,
    default: ''
  }
})

const { __ } = useLocalization()

const closeModal = () => {
  emits('close')
}

const confirm = () => {
  emits('confirm')
}
</script>
