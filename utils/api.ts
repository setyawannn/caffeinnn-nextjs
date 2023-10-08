import axios from 'axios'
import { getCookie } from 'cookies-next'

const token = getCookie('jwtToken')
const auth = token ? `Bearer ${token}` : ''
export const api = axios.create({
  headers: {
    Authorization: auth
  }
})
