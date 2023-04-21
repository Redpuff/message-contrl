import { BASE_URL1, TIME_OUT1 } from './config'
import HYRequest from './request'
import LocStorage from '@/utils/cache'
import { LOGIN_TOKEN } from '@/globle/constant'
const hyRequest = new HYRequest({
  baseURL: BASE_URL1,
  timeout: TIME_OUT1,
  interceptors: {
    requestSuccessFn: (config) => {
      const token = LocStorage.getLocStorage(LOGIN_TOKEN)

      if (config.headers) {
        config.headers.Authorization = `Bearer ${token}`
      }

      return config
    }
  }
})

export default hyRequest
