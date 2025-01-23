<template>
  <div class="card bg-white p-2">
    <section class="flex justify-between">
      <div class="flex w-1/2">
        <TextInput class="w-1/2" v-model="title" :placeholder="__('Question Title')" />
        <Dropdown v-model="type" :disabled="!isTypeSelectable"  :options="sectionTypes"/>
      </div>

      <div class="flex justify-end py-3">
        <div class="border shadow-lg p-1 rounded-lg">
          <Switch v-model="required"/>
          <span class="text-xs ms-1">{{ __('Answer is Required') }}</span>
        </div>

        <Button className="pb-1 mx-2" :icon="{name: 'trash', size: 'xs' }"  @click="deleteSection"/>
        <Button className="pb-1 mx-2"  :icon="{name: 'copy', size: 'xs' }"  @click="copySection"/>

        <div class="h-8 p-2 flex border rounded-lg bg-white">
          <Button className="px-2" :icon="{name: 'up', size: 'xs' }"  @click="swapItem('up')"/>
          <Button className="px-2" :icon="{name: 'down', size: 'xs' }"  @click="swapItem('down')"/>
        </div>
      </div>
    </section>

    <section>
      <TextInput v-if="type === 'text'" :disabled="true" :placeholder="__('Your Answer')" class="w-1/3" />
      <textarea v-if="type === 'textarea'" disabled :placeholder="__('Your Answer')" class="bg-gray-100 w-full h-32 rounded-lg border"/>

      <div v-if="type === 'attachment'" class="relative w-full border rounded-lg h-20">
        <div class="position-center-absolute">
          <p>{{ __('Upload File') }}</p>
        </div>
      </div>

      <div v-if="type === 'checkbox' || type === 'radio'">
        <div
          v-for="(option, index) in properties"
          :key="index"
          class="flex justify-start my-2"
        >
          <span class="me-2">{{ index + 1 }}:</span> <Component
            :is="type === 'checkbox' ? Checkbox : RadioButton "
            :title="option"
            :disabled="true"
          />
          <Icon name="close" size="2xs" @click="deleteOption(index)" class="rounded-lg border p-1.5 bg-gray-200"/>
        </div>

        <div class="flex justify-start">
          <span class="mt-4 me-2">{{ properties?.length ? properties?.length + 1 : 1 }}:</span>
          <TextInput class="w-1/6" v-model="optionTitle" @focusout="addOption" :placeholder="__('Add New Option')" />
        </div>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import TextInput from "@/components/common/text-input.vue";
import Dropdown from '@/components/common/dropdown.vue'
import {computed, defineEmits, defineProps, markRaw, ref} from "vue";
import Switch from "@/components/common/switch.vue"
import Icon from "@/components/common/icon.vue"
import Checkbox from "@/components/common/checkbox.vue";
import RadioButton from '@/components/common/radio-button.vue'
import {useLocalization} from "@/composables";
import Button from "@/components/common/button.vue";

const emits = defineEmits(['submitSection', 'swapSection', 'copySection', 'deleteSection'])
const props = defineProps({
  data: {
    type: Object,
    required: true
  },
  position: {
    type: Number
  },
  isTypeSelectable: {
    type: Boolean,
    default: false
  }
})

const { __ } = useLocalization()

const sectionTypes = markRaw([
  {
    text: __('Short Answer'),
    value: 'text'
  },
  {
    text: __('Long Answer'),
    value: 'textarea'
  },
  {
    text: __('Single Select'),
    value: 'radio'
  },
  {
    text: __('Multi Select'),
    value: 'checkbox'
  },
  {
    text: __('Attachment'),
    value: 'attachment'
  }
])

const optionTitle = ref('')

const title = computed({
  set(value) {
    submitSection({
      title: value,
    })
  },
  get() {
    return props.data.title
  }
})

const type = computed({
  set(value) {
    submitSection({
      type: value,
    })
  },
  get() {
    return props.data.type.length ? props.data.type : 0
  }
})

const required = computed({
  set(value) {
    submitSection({
      required: value
    })
  },
  get() {
    return props.data.required
  }
})

const properties = computed({
  set(value) {
    submitSection({
        properties: value
    })
  },
  get() {
    return props.data.properties
  }
})

const submitSection = (changedFiles) => {
  emits('submitSection', {
    index: props.position,
    ...props.data,
    ...changedFiles,
  })
}

const addOption = () => {
  if (!optionTitle.value.length) {
    return
  }

  properties.value.push(optionTitle.value)
  optionTitle.value = ''
}

const deleteOption = (index) => {
  properties.value.splice(index, 1)
}

const swapItem = (state) => {
  emits('swapSection', {
    itemIndex: props.position,
    swapWithIndex: state === 'up' ? props.position - 1 : props.position + 1
  })
}

const copySection = () => {
  emits('copySection', { index: props.position })
}

const deleteSection = () => {
  emits('deleteSection',{ index: props.position })
}
</script>
