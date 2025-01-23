import {defineStore} from "pinia";
import {useHttp} from "@/composables";
import {api} from "@/statics/api";
import { AuthTypes } from "@/types";
import {useCookie} from "@/composables/useCookie";

export const useAuthStore = defineStore('auth', {
  state: () => ({
    token: ''
  }),
  actions: {
    async authentication(payload: AuthTypes.Authentication) {
      const response = await useHttp().POST({
        url: api.SIGNUP,
        body: {
          email: payload.email,
          password: payload.password
        }
      })

      if (response) {
        await useCookie().set('access_token', response.data.access, 0, '/')
        await useCookie().set('refresh_token', response.data.refresh, 0, '/')

        this.router.push({
          name: 'ListForm'
        })
      }
    }
  }
})
