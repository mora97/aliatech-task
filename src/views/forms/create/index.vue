<template>
  <div>
    <section>
      <h2 class="page-title">{{ __('Create Form') }}</h2>
    </section>

    <FormHeader v-model="formInfo" @submitForm="createForm" />

    <FormSections
      :sections="sections"
      @updateSections="updateSections"
    />
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import {useLocalization} from "@/composables";
import {useFormStore} from "@/stores/form";
import FormHeader from "@/components/forms/form-header.vue";
import FormSections from "@/components/forms/form-sections.vue";

const formStore = useFormStore()
const { __ } = useLocalization()

const sections = ref([])
const formInfo = ref({})

const createForm = () => {
  formStore.createForm({
    ...formInfo.value,
    sections: sections.value
  })
}

const updateSections = (updatedSections) => {
  sections.value = updatedSections
}

</script>
