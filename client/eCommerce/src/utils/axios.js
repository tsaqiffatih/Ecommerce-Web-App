import axios from 'axios'

const LocalRequest = axios.create({
    baseURL: 'http://localhost:3000'
})

export default LocalRequest