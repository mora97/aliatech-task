import {defineStore} from "pinia";
import {useHttp} from "@/composables";
import {api} from "@/statics/api";
import { FormTypes } from "@/types";

export const useFormStore = defineStore('form', {
  state: () => ({
    forms: {
      data: []
    },
    form: {},
    pager: {
      lastPage: 1
    }
  }),
  actions: {
    async getForms(payload: { page: String }) {
      const response = await useHttp().GET({
        url: api.FORMS,
        params: {
          page: payload?.page ?? 1
        },
        originInfo: {
          storeName: 'form',
          storeMethod: 'getForms',
          payload: {}
        }
      })

      this.forms = response.data
      this.pager.lastPage = Math.ceil(response.data.totla_quantity / 15)
    },
    async createForm(payload: FormTypes.CreateFormType) {
      const response = await useHttp().POST({
        url: api.FORM,
        body: {
          form_type: payload.type,
          form_title: payload.title,
          description: payload.description,
          sections: payload.sections
        },
        originInfo: {
          storeName: 'form',
          storeMethod: 'createForm',
          payload: payload
        }
      })

      if (response.data) {
        this.router.push({ name: 'ListForm'})
      }
    },
    async getFormDetails(payload: { formId: String }) {
      const response = await useHttp().GET({
        url: api.FORM,
        params: {
          form_id: payload.formId
        },
        originInfo: {
          storeName: 'form',
          storeMethod: 'getFormDetails',
          payload
        }
      })

      if (response) {
        this.form = response.data
      }
    },
    async updateForm(payload: FormTypes.UpdateFormType) {
      const response = await useHttp().PUT({
        url: api.FORM,
        body: {
          form_type: payload.type,
          form_title: payload.title,
          description: payload.description,
          sections: payload.sections
        },
        params: {
          form_id: payload.formId
        },
        originInfo: {
          storeName: 'form',
          storeMethod: 'updateForm',
          payload
        }
      })

      if (response) {
        this.router.push({ name: 'ListForm'})
      }
    },
    async deleteForm(payload: { formId: String }) {
      const response = await useHttp().DELETE({
        url: api.FORM,
        params: {
          form_id: payload.formId
        },
        originInfo: {
          storeName: 'form',
          storeMethod: 'deleteForm',
          payload
        }
      })

      if (response) {
        this.router.push({ name: 'ListForm'})
      }

    }
  }
})
