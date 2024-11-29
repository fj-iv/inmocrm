import axios from '@/lib/axios'
import { useState, useEffect } from 'react'

type Data = any[]

interface UseAxiosReturn {
    data: Data | null
    loading: boolean
    error: Error | null
}

const useAxios = (url: string): UseAxiosReturn => {
    const [data, setData] = useState<Data | null>(null)
    const [loading, setLoading] = useState<boolean>(true)
    const [error, setError] = useState<Error | null>(null)

    useEffect(() => {
        let isMounted = true

        const fetchData = async () => {
            try {
                const response = await axios.get<Data>(url)
                if (isMounted) {
                    setData(response.data)
                }
            } catch (error) {
                if (error instanceof Error) {
                    setError(error)
                }
            } finally {
                setLoading(false)
            }
        }

        fetchData()

        return () => {
            isMounted = false
        }
    }, [url])

    return { data, loading, error }
}

export default useAxios
