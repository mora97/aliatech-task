<template>
  <div>
    <section class="flex justify-between">
      <h4 class="text-2xl font-bold">{{ __('Forms') }}</h4>
      <RouterLink :to="{ name: 'CreateForm' }">
        <Button className="rounded-lg bg-gray-700 text-white p-2" :title="__('Make Form')" />
      </RouterLink>
    </section>

    <section class="card bg-white relative mt-5 p-2">
      <div class="h-[calc(100vh-24vh)] overflow-auto">
        <div v-if="forms.length">
          <FormsList
            :forms="forms"
          />
        </div>
        <div
          class="position-center-absolute"
          v-else>
          {{ __('No Form Has Been Created')}}
          <RouterLink class="text-blue-600 mx-2" :to="{ name: 'CreateForm'}">{{ __('Make Form')}}</RouterLink>
        </div>
      </div>

      <div class="flex justify-center my-3 pb-2">
        <Pagination :pages="pager.lastPage" v-model="page" />
      </div>
    </section>
  </div>
</template>


<script setup lang="ts">
import {computed, onMounted, ref, watch} from "vue";
import FormsList from '../../../components/forms/forms-list.vue'
import {useFormStore} from "@/stores/form";
import {useLocalization} from "@/composables";
import Button from "@/components/common/button.vue";
import Pagination from '@/components/common/pagination.vue'
import {useRoute, useRouter} from "vue-router";

const formStore = useFormStore()
const { __ } = useLocalization()
const route = useRoute()
const router = useRouter()

const forms = computed(() => {
  return formStore.forms ? formStore.forms.data : []
})
const pager = computed(() => formStore.pager)

const page = ref(1)

watch(() => page.value, (value) => {
  router.push({
    query: {
      page: value
    }
  })
  formStore.getForms({
    page: value
  })
})

onMounted(() => {
  page.value = (route.query && route.query.page) ? Number(route.query.page) : 1
  formStore.getForms({
    page: page.value
  })
})
</script>
