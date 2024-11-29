import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import '@testing-library/jest-dom'
import LoginForm from '@/components/auth/login-form'
import { useAuth } from '@/hooks/useAuth'

jest.mock('@/hooks/useAuth')

describe('LoginForm', () => {
    const mockLogin = jest.fn()

    beforeEach(() => {
        ;(useAuth as jest.Mock).mockReturnValue({
            login: mockLogin,
            isLoading: false,
        })
    })

    it('renders the login form', () => {
        render(<LoginForm />)
        expect(screen.getByPlaceholderText('Email')).toBeInTheDocument()
        expect(screen.getByPlaceholderText('******')).toBeInTheDocument()
        expect(screen.getByRole('button', { name: 'Login' })).toBeInTheDocument()
    })

    it('calls the login function with the email and password when form is submitted', async () => {
        render(<LoginForm />)

        fireEvent.change(screen.getByPlaceholderText('Email'), {
            target: { value: 'user@example.com' },
        })
        fireEvent.change(screen.getByPlaceholderText('******'), {
            target: { value: 'password123' },
        })
        fireEvent.click(screen.getByRole('button', { name: 'Login' }))

        await waitFor(() => {
            expect(mockLogin).toHaveBeenCalledWith({
                email: 'user@example.com',
                password: 'password123',
                setErrors: expect.any(Function),
            })
        })
    })

    it('disables the login button when isLoading is true', () => {
        ;(useAuth as jest.Mock).mockReturnValue({
            login: mockLogin,
            isLoading: true,
        })
        render(<LoginForm />)
        expect(screen.getByRole('button', { name: 'Loading...' })).toBeDisabled()
    })
})
