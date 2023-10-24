import axiosInst from 'axios'

const axios = axiosInst.create({
  baseURL: import.meta.env.PROD
    ? 'http://localhost:5000/'
    : 'http://localhost:5000/',
  headers: {
    Authorization: localStorage.getItem('creds') || '',
  },
})

export default axios
