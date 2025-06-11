import axios from 'axios'

const api = axios.create({
  baseURL: 'localhost:8000',
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json'
  }
})

export default api
