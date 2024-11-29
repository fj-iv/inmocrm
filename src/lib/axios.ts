import Axios, { AxiosResponse, InternalAxiosRequestConfig } from 'axios'

const setMetaData = (config: InternalAxiosRequestConfig): InternalAxiosRequestConfig => {
    const timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone
    if (config.headers) {
        config.headers.metaData = JSON.stringify({
            timeZone,
        })
    }
    return config
}

const setToken = (config: InternalAxiosRequestConfig): InternalAxiosRequestConfig => {
    const token = document.cookie.split('; ').find((row) => row.startsWith('XSRF-TOKEN='))
    if (token && config.headers) {
        config.headers['X-XSRF-TOKEN'] = decodeURIComponent(token.split('=')[1])
    }
    return config
}

const handleResponse = (response: AxiosResponse): AxiosResponse => {
    if (response.status >= 400 && response.status <= 599) {
        // Implement error handling logic here
        // For example, throw an error or return a custom error response
        throw new Error(`Request failed with status ${response.status}`)
    }
    return response
}

const axios = Axios.create({
    baseURL: process.env.NEXT_PUBLIC_BACKEND_URL,
    headers: {
        'X-Requested-With': 'XMLHttpRequest',
    },
    withCredentials: true,
})

axios.interceptors.request.use(
    (config: InternalAxiosRequestConfig) => {
        config = setToken(config)
        config = setMetaData(config)
        return config
    },
    (error) => Promise.reject(error)
)

axios.interceptors.response.use(
    (response: AxiosResponse) => handleResponse(response),
    (error) => Promise.reject(error)
)

export default axios
