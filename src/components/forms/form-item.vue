<template>
  <div class="p-3 card border">
    <div class="relative bg-gray-100 rounded-lg h-32">
      <p class="position-center-absolute text-xl font-bold">{{ data.form_title}}</p>
    </div>

    <p class="my-6 text-sm text-gray-500">{{ date }}</p>

    <RouterLink :to="{ name: 'FormDetails', params: { id: data.form_id }}">
      <button class="flex justify-center border w-full rounded-lg py-1.5 text-sm">
        <Icon name="view" size="sm" />
        <span class="mt-0.5">{{ __('View Form') }}</span>
      </button>
    </RouterLink>
  </div>
</template>

<script setup lang="ts">
import {computed, defineProps} from "vue";
import {useLocalization} from "@/composables";
import Icon from '@/components/common/icon.vue'
import jMoment from "moment-jalaali";

const props = defineProps({
  data: {
    type: Object,
    require: true
  }
})

const { __ } = useLocalization()

const date = computed(() => {

  jMoment.loadPersian([{ dialect: 'persian-modern' }])

  return jMoment.unix(props.data.created_at).format('jD jMMMM jYYYY')
})
</script>
