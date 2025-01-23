<template>
  <div>
    <section class="card w-full flex justify-end mt-5 p-2 bg-white">
      <button class="bg-white rounded-lg p-2 mx-2" v-if="showDeleteBtn" @click="deleteForm">{{ __('Delete Form')}}</button>
      <button class="bg-gray-500 rounded-lg p-2 text-white" @click="submitForm">{{ __('Save Form') }}</button>
    </section>

    <section class="my-5">
      <div class="card bg-white p-4">
        <div class="flex justify-start">
          <div class="w-1/4">
            <TextInput v-model="modelValue.title" :title="__('Form Name')" :placeholder="__('A Title For the Form')" />
          </div>
          <Dropdown class="w-1/5 mx-4" v-model="modelValue.type" :title="__('Category')"  :options="formPrivacyOptions"/>
        </div>

        <div class="w-1/4 h-32 mt-4">
          <h4>{{ __('Form Description')}}</h4>
          <textarea class="text-input h-4/5 p-2" v-model="modelValue.description" :placeholder="__('Description About Form')"/>
        </div>
      </div>
    </section>

    <section v-if="modelValue.type ==='public'" class="mb-5">
      <div class="card bg-white p-4">
        <div class="flex justify-start">
          <TextInput class="w-1/4" :title="__('Last Name')" :placeholder="__('Your Answer')" :disabled="true" />
          <TextInput class="mx-4" :title="__('First Name')" :placeholder="__('Your Answer')" :disabled="true" />
        </div>

        <TextInput class="mt-4 w-1/4" :title="__('Email')" :placeholder="__('Your Answer')" :disabled="true" />
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import {defineEmits, defineProps, reactive, watch, markRaw} from "vue";
import {useLocalization} from "@/composables";
import TextInput from '@/components/common/text-input.vue'
import Dropdown from '@/components/common/dropdown.vue'

const emits = defineEmits(['update:modelValue', 'submitForm', 'deleteForm'])
const props = defineProps({
  modelValue: {
    type: Object,
    required: true
  },
  showDeleteBtn: {
    type: Boolean,
    default: false
  }
})

const { __ } = useLocalization()

const formInfo = reactive(props.modelValue)
const formPrivacyOptions = markRaw([
  {
    text: __('Private'),
    value: 'private'
  },
  {
    text: __('Public'),
    value: 'public'
  },
])

const submitForm = () => {
  emits('submitForm')
}

const deleteForm = () => {
  emits('deleteForm')
}

watch(formInfo, (value) => {
  emits('update:modelValue', value)
})
</script>
