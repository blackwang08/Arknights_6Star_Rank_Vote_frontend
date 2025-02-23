import type { MockMethod } from 'vite-plugin-mock'

export default [
  {
    url: '/save_score',
    method: 'post',
    response({ body }: any) {
      if (!body.code) {
        return {
          status: 400,
          message: 'code error',
        }
      }

      return 'success'
    },
  },
] as MockMethod[]
