<template>
  <div>
    <section class="page-title">
      <h4>{{ __('Edit Form')}}</h4>
    </section>

    <FormHeader v-model="formInfo" :showDeleteBtn="true" @submitForm="updateForm" @deleteForm="showDeleteConfirmationModal = true"/>

    <FormSections
      :sections="sections"
      @updateSections="updateSections"
    />

    <ConfirmModal
      :show="showDeleteConfirmationModal"
      @close="showDeleteConfirmationModal = false"
      @confirm="deleteForm"
    >
      <p>{{ __('Are You Sure to Delete The Form') }}</p>
    </ConfirmModal>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref, watchEffect} from "vue";
import {useFormStore} from "@/stores/form";
import {useRoute} from "vue-router";
import FormHeader from "@/components/forms/form-header.vue";
import {useLocalization} from "@/composables";
import FormSections from "@/components/forms/form-sections.vue";
import ConfirmModal from "@/components/common/confirm-modal.vue";

const { __ } = useLocalization()
const route = useRoute()
const formStore = useFormStore()

const formInfo = ref({})
const sections = ref([])
const formId = ref('')
const showDeleteConfirmationModal = ref(false)

watchEffect(() => {
  formInfo.value = {
    type: formStore.form.form_type,
    title: formStore.form.form_title,
    description: formStore.form.description,
  }
  sections.value = formStore.form.sections
})

const updateForm = () => {
  formStore.updateForm({
    ...formInfo.value,
    sections: sections.value,
    formId: formId.value
  })
}

const updateSections = (updatedSections) => {
  sections.value = updatedSections
}

const deleteForm = () => {
  formStore.deleteForm({
    formId: formId.value
  })
}

onMounted(() => {
  formId.value = route.params.id
  formStore.getFormDetails({
    formId: formId.value
  })
})
</script>
