import React from 'react'
import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import RegisterForm from '@/components/auth/register-form'
import { useAuth } from '@/hooks/useAuth'

jest.mock('@/hooks/useAuth')

describe('RegisterForm', () => {
    const mockRegister = jest.fn()

    beforeEach(() => {
        ;(useAuth as jest.Mock).mockReturnValue({
            register: mockRegister,
            isLoading: false,
        })
    })

    afterEach(() => {
        jest.clearAllMocks()
    })

    it('renders the form with all input fields', () => {
        render(<RegisterForm />)

        expect(screen.getByLabelText(/^Name$/i)).toBeInTheDocument()
        expect(screen.getByLabelText(/^Email$/i)).toBeInTheDocument()
        expect(screen.getByLabelText(/^Password$/i)).toBeInTheDocument()
        expect(screen.getByLabelText(/^Confirm Password$/i)).toBeInTheDocument()
        expect(screen.getByTestId('submit')).toBeInTheDocument()
    })

    it('displays errors when submitting a blank form', async () => {
        render(<RegisterForm />)

        fireEvent.submit(screen.getByTestId('submit'))

        await waitFor(() => {
            expect(screen.getByText(/Name is required/i)).toBeInTheDocument()
            expect(screen.getByText(/Invalid email address/i)).toBeInTheDocument()
            expect(screen.getByText(/Password must be at least 8 characters/i)).toBeInTheDocument()
        })
    })

    it('displays errors when passwords do not match', async () => {
        render(<RegisterForm />)

        fireEvent.change(screen.getByLabelText(/^Password$/i), { target: { value: 'password1' } })
        fireEvent.change(screen.getByLabelText(/^Confirm Password$/i), {
            target: { value: 'password2' },
        })
        fireEvent.submit(screen.getByTestId('submit'))

        await waitFor(() => {
            expect(screen.getByText(/Passwords do not match/i)).toBeInTheDocument()
        })
    })

    it('displays backend errors', async () => {
        ;(useAuth as jest.Mock).mockReturnValue({
            register: ({ setErrors }: { setErrors: Function }) => {
                setErrors({
                    name: ['Name is required'],
                    email: ['Invalid email address'],
                    password: ['Password must be at least 8 characters'],
                    confirmPassword: ['Passwords do not match'],
                })
            },
            isLoading: false,
        })

        render(<RegisterForm />)

        fireEvent.submit(screen.getByTestId('submit'))


        await waitFor(() => {
            expect(screen.getByText(/Name is required/i)).toBeInTheDocument()
            expect(screen.getByText(/Invalid email address/i)).toBeInTheDocument()
            expect(screen.getByText(/Password must be at least 8 characters/i)).toBeInTheDocument()
        })
    })
})
