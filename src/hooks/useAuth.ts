import { useState, useEffect } from 'react'
import useSWR from 'swr'
import axios from '@/lib/axios'
import { useParams, useRouter } from 'next/navigation';

interface UseAuthProps {
    middleware?: 'auth' | 'guest'
    redirectIfAuthenticated?: string
}

interface AuthFormProps {
    setErrors: (errors: any) => void
    setStatus?: (status: string) => void
    name?: string
    email: string
    password?: string
    confirmPassword?: string
}

export const useAuth = ({ middleware, redirectIfAuthenticated }: UseAuthProps = {}) => {
    const router = useRouter()
    const params = useParams();
    const [isLoading, setIsLoading] = useState(false)

    const fetcher = (url: string) => {
        setIsLoading(true)
        return axios
            .get(url)
            .then((res) => {
                setIsLoading(false)
                return res.data
            })
            .catch((error: any) => {
                setIsLoading(false)
                throw error
            })
    }

    const {
        data: user,
        error,
        mutate,
    } = useSWR(middleware === 'auth' ? '/api/user' : null, fetcher, {
        onError: (error: any) => {
            if (error.response?.status === 401) {
                if (middleware === 'guest') {
                    console.log('Skipping user fetch for unauthenticated routes.')
                } else {
                    console.log('Unauthorized access, redirecting...')
                    router.push('/login')
                }
            } else if (error.response?.status === 409) {
                router.push('/verify-email')
            }
        },
    })

    const csrf = () => axios.get('/sanctum/csrf-cookie')

    const register = async ({
        setErrors,
        name,
        email,
        password,
        confirmPassword,
    }: AuthFormProps) => {
        setIsLoading(true)
        try {
            await csrf()
            await axios.post('/register', {
                name,
                email,
                password,
                password_confirmation: confirmPassword,
            })
            mutate()
            router.push('/')
        } catch (error: any) {
            if (error.response && error.response.status === 422) {
                setErrors(error.response.data.errors)
            } else {
                throw error
            }
        } finally {
            setIsLoading(false)
        }
    }

    const login = async ({ setErrors, setStatus, ...props }: AuthFormProps) => {
        setIsLoading(true)
        try {
            await csrf()
            await axios.post('/login', props)
            mutate()
            router.push('/')
        } catch (error: any) {
            if (error.response && error.response.status !== 422) {
                throw error
            }
            setErrors(error.response.data.errors)
        } finally {
            setIsLoading(false)
        }
    }

    const forgotPassword = async ({ setErrors, setStatus, email }: AuthFormProps) => {
        setIsLoading(true)
        try {
            await csrf()
            const response = await axios.post('/forgot-password', { email })
            setStatus && setStatus(response.data.status)
        } catch (error: any) {
            if (error.response && error.response.status !== 422) {
                throw error
            }
            setErrors(error.response.data.errors)
        } finally {
            setIsLoading(false)
        }
    }

    const resetPassword = async ({ setErrors, setStatus, ...props }: AuthFormProps) => {
        setIsLoading(true)
        try {
            await csrf()
            const response = await axios.post('/reset-password', { token: params.token, ...props });
            router.push(`/login?reset=${btoa(response.data.status)}`)
        } catch (error: any) {
            if (error.response && error.response.status !== 422) {
                throw error
            }
            setErrors(error.response.data.errors)
        } finally {
            setIsLoading(false)
        }
    }

    const resendEmailVerification = async ({ setStatus }: Pick<AuthFormProps, 'setStatus'>) => {
        setIsLoading(true)
        try {
            const response = await axios.post('/email/verification-notification')
            setStatus && setStatus(response.data.status)
        } catch (error: any) {
            console.error('Failed to resend verification email:', error)
        } finally {
            setIsLoading(false)
        }
    }

    const logout = async () => {
        setIsLoading(true)
        try {
            await axios.post('/logout')
            mutate()
        } catch (error: any) {
            console.error('Logout failed:', error)
        } finally {
            setIsLoading(false)
            router.replace('/login')
        }
    }

    useEffect(() => {
        if (user || error || middleware === 'guest') {
            setIsLoading(false)
        }
    }, [user, error, middleware])

    return {
        isLoading,
        user,
        register,
        login,
        forgotPassword,
        resetPassword,
        resendEmailVerification,
        logout,
    }
}
