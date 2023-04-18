import axios from 'axios'

const api = axios.create({
  baseURL: 'http://apitc.intranetsushimi.mx'
})

export default api
