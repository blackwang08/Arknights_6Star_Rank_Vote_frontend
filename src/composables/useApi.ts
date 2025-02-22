import { createFetch } from '@vueuse/core'

export const useApi = createFetch({
  baseUrl: BASE_URL,
  fetchOptions: {
    headers: {
      'Content-Type': 'application/json',
    },
  },
})
