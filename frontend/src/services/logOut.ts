import { URL_API_LOGIN } from '@/utils/constants'
import axios from 'axios'

export const LogoutAndDeleteToken = () => {
  const token = document.cookie

  axios.post(`${URL_API_LOGIN}/logout`, { token })
    .then(res => {
      console.log(res)
    })
    .catch(err => console.log(err))
}