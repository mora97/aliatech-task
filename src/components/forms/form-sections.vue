<template>
  <div>
    <section>
      <template v-for="(section, index) in sectionsData" :key="index">
        <FormSectionsItem
          :data="section"
          :position="index"
          :isTypeSelectable="section?.isNew"
          @swapSection="swapSections"
          @submitSection="submitSection"
          @copySection="copySection"
          @deleteSection="deleteSection"
          class="my-5"
        />
      </template>
    </section>

    <section>
      <button
        class="w-full rounded-lg bg-white shadow-lg h-10 my-5"
        @click="addSection">{{ __('New Question') }}</button>
    </section>
  </div>
</template>

<script setup lang="ts">
import {computed, defineEmits, defineProps} from "vue";
import {useLocalization} from "@/composables";
import FormSectionsItem from '@/components/forms/form-sections-item.vue'

const emits = defineEmits(['updateSections'])
const props = defineProps({
  sections: {
    type: Array,
    required: true
  }
})

const { __ } = useLocalization()

const sectionsData = computed(() => props.sections)

const addSection = () => {
  sectionsData.value.push({
    title: '',
    type: '',
    required: false,
    properties: [],
    isNew: true
  })
}

const updateSections = () => {
  emits('updateSections', sectionsData.value)
}

const submitSection = (sectionData) => {
  sectionsData.value[sectionData.index] = sectionData
  updateSections()
}

const swapSections = (data: { itemIndex: number, swapWithIndex: number }) => {
  if (data.swapWithIndex < 0 || data.swapWithIndex >= sectionsData.value.length) {
    return
  }

  const temp = {...sectionsData.value[data.itemIndex]}

  sectionsData.value[data.itemIndex] = {...sectionsData.value[data.swapWithIndex]}
  sectionsData.value[data.swapWithIndex] = temp

  updateSections()
}

const copySection = (data: { index: number }) => {
  sectionsData.value.push(sectionsData.value[data.index])

  updateSections()
}

const deleteSection = (data: { index: number }) => {
  sectionsData.value.splice(data.index, 1)

  updateSections()
}

</script>
