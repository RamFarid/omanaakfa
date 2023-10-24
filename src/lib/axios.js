import axiosInst from 'axios'

const axios = axiosInst.create({
  baseURL: import.meta.env.PROD
    ? 'https://omanaafka-server.onrender.com'
    : 'http://localhost:5000',
  headers: {
    Authorization: localStorage.getItem('creds') || '',
  },
})

export default axios
