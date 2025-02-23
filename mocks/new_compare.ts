import type { MockMethod } from 'vite-plugin-mock'
import data from './data/name_id.json'

const len = Object.keys(data).length
const ids = Object.values(data)

function randomId() {
  return ids[Math.floor(Math.random() * len)]
}

export default [
  {
    url: '/new_compare',
    method: 'post',
    response({ body }: any) {
      if (!body.code) {
        return {
          status: 400,
          message: 'code error',
        }
      }

      return {
        code: Date.now().toString(),
        left: randomId(),
        right: randomId(),
      }
    },
  },
] as MockMethod[]
