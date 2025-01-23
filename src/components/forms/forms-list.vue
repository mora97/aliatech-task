<template>
  <div
      class="flex justify-start gap-0 flex-wrap"
  >
    <div v-for="form in forms"
         :key="form.id"
         class="p-2 w-1/3">
      <FormItem
        :data="form"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import {defineProps, ref} from "vue";
import FormItem from "./form-item.vue";

defineProps({
  forms: {
    type: Array,
    required: true
  }
})
</script>
