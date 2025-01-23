<template>
    <div class="position-center-fixed max-w-sm card py-12 px-10 bg-white">
      <p class="text-xl font-bold">{{ __('Welcome') }}</p>
      <p class="text-gray-500 mt-3">{{ __('Enter your email and password')}}</p>

      <div class="mt-10">
        <div>
          <TextInput
            v-model="email"
            :title="__('Email')"
            :placeholder="__('Enter Your Email')"
            type="email"
            :required="true"
            :icon="{ name: 'email', size:'sm' }"
            class="mb-2"
          />
          <p v-for="error in errors.email" :key="error">- {{ error }}</p>
        </div>

        <div class="my-5">
          <TextInput
            v-model="password"
            :title="__('Password')"
            :placeholder="__('Password')"
            type="password"
            :required="true"
            :icon="{ name: 'lock', size:'sm' }"
            class="mb-2"
          />
          <p v-for="error in errors.password" :key="error" class="w-full">- {{ error }}</p>
        </div>
      </div>

        <button
          class="bg-gray-700 w-full text-white rounded-lg h-10 mt-2"
          @click="submitAuthData"
        >
          {{ __('Enter') }}
        </button>
    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useLocalization } from '../../composables'
import TextInput from '@/components/common/text-input.vue';
import {useAuthStore} from "@/stores/auth";
import {useValidation} from "@/composables/useValidation";

const { __ } = useLocalization()
const authStore = useAuthStore()
const { validation } = useValidation()
const email = ref('')
const password = ref('')
const errors = ref({})

const submitAuthData = () => {
  errors.value = validation({
    email: {
      value: email.value,
      rules: 'required|email'
    },
    password: {
      value: password.value,
      rules: 'required|password'
    }
  })

  if (Object.keys(errors.value).length) {
    return
  }

  authStore.authentication({
    email: email.value,
    password: password.value
  });
}
</script>
