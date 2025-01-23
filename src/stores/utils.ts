import {defineStore} from "pinia";
import { useFormStore } from "@/stores/form";

export const useUtilsStore = defineStore('utils', {
  actions: {
    async repeatRequest(payload: { storeName: String, storeMethod: String , payload: any }) {
      const store = {
        ...useFormStore()
      }

      store[payload.storeMethod](payload.payload)
    }
  }
})
