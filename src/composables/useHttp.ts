import axios from "axios";
import { HttpTypes } from "@/types";
import {useCookie} from "@/composables/useCookie";
import {cookies} from "@/statics/cookies";
import {api} from "@/statics/api";
import router from "@/router";
import { useUtilsStore } from '@/stores/utils'

export const useHttp = () => {
  const utilsStore = useUtilsStore()
  const cacheRequests = []

  const checkRefreshToken = async () => {
    const response = await request({
      url: 'refresh',
      method: 'POST',
      params: {
        token: useCookie().get(cookies.REFRESH_TOKEN)
      }
    })

    if (response) {
      await useCookie().set(cookies.ACCESS_TOKEN, response.data.access, 0, '/')

      cacheRequests.forEach(cachedRequest => {
        utilsStore.repeatRequest(cachedRequest)
      })
    }
  }

  const errorHandler = async (error, originOfRequest) => {
    if (error.status === 403) {
      if (error.config.url !== api.REFRESH_TOKEN) {
        cacheRequests.push(originOfRequest)
        checkRefreshToken()
      } else {
        useCookie().expire(cookies.ACCESS_TOKEN)
        useCookie().expire(cookies.REFRESH_TOKEN)

        await router.push({
          name: 'Auth'
        })
      }
    }

    if (error.status === 401) {
      await router.push({
        name: 'Auth'
      })
    }
  }

  const responseHandler = (responseData) => {
    return { ...responseData.data }
  }

  const request = async (config: HttpTypes.HttpConfig) => {
    const token =  await useCookie().get(cookies.ACCESS_TOKEN)
    const requestData: axios.AxiosRequestConfig = {
      baseURL: import.meta.env.VITE_API_URL,
      url: config.url,
      method: config.method,
      headers: {
        Accept: 'application/json',
        Authorization: `Bearer ${token}`
      },
    }

    if (config.body) {
      requestData.data = config.body
    }

    if (config.params) {
      requestData.params = config.params
    }

    try {
      const response = await axios.request(requestData)

      return responseHandler(response)
    } catch (error) {
      errorHandler(error, config.originInfo)
    }
  }

  const GET = (config) => {
    return request({
      method: 'GET',
      ...config
    })
  }

  const POST = (config) => {
    return request({
      method: 'POST',
      ...config
    })
  }

  const PUT = (config) => {
    return request({
      method: 'PUT',
      ...config
    })
  }

  const DELETE = (config) => {
    return request({
      method: 'DELETE',
      ...config
    })
  }

  return {
    GET,
    POST,
    PUT,
    DELETE
  }
}
