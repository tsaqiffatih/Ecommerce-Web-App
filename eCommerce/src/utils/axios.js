import axios from 'axios'

export const LocalRequest = axios.create({
    baseURL: 'https://api.p2.slc1.foxhub.space'
})

export const myEndpoint = axios.create({
    baseURL: 'http:http://localhost:3000/'
})

// export default LocalRequest
