import axios from 'axios'

// http://api.egrojtorrez.com
const api = axios.create({
  baseURL: 'https://api.egrojtorrez.com'
})

export default api
