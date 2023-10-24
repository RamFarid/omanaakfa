import axiosInst from 'axios'

const axios = axiosInst.create({
  baseURL: import.meta.env.PROD
    ? 'https://mo2tamr-omnaakfa.vercel.app'
    : 'http://localhost:5000',
  headers: {
    Authorization: localStorage.getItem('creds') || '',
  },
})

export default axios
