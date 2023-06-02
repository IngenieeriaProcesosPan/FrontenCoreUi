import axios from 'axios'

// http://api.egrojtorrez.com
const api = axios.create({
  baseURL: 'http://localhost:3500'
})

export default api
