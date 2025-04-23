import { URL_API_LOGIN } from '@/utils/constants'
import axios from 'axios'

export const LogoutAndDeleteToken = () => {
  axios.get(`${URL_API_LOGIN}/logout`)
    .then(res => {
      console.log(res)
    })
    .catch(err => console.log(err))
}