'use client'

import { useAuth } from '@/hooks/useAuth'
import { useState } from 'react'
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm, SubmitHandler } from 'react-hook-form'
import { RegisterSchema, RegisterSchemaType } from '@/schemas/auth'
import CardWrapper from './card-wrapper'

interface ErrorMessages {
    [key: string]: string[]
}

const RegisterForm: React.FC = () => {
    const { register, isLoading } = useAuth({
        middleware: 'guest',
    })

    const [errors, setErrors] = useState<ErrorMessages>({})

    const form = useForm<RegisterSchemaType>({
        resolver: zodResolver(RegisterSchema),
        defaultValues: {
            email: '',
            name: '',
            password: '',
            confirmPassword: '',
        },
    })

    const onSubmit: SubmitHandler<RegisterSchemaType> = ({
        name,
        email,
        password,
        confirmPassword,
    }) => {
        register({ name, email, password, confirmPassword, setErrors })
    }

    return (
        <CardWrapper
            label='Create an account'
            title='Register'
            backButtonHref='/auth/login'
            backButtonLabel='Already have an account? Login here.'
        >
            <Form {...form}>
                <form className='space-y-6' onSubmit={form.handleSubmit(onSubmit)}>
                    <div className='space-y-4'>
                        <FormField
                            control={form.control}
                            name='name'
                            render={({ field, fieldState }) => (
                                <FormItem>
                                    <FormLabel>Name</FormLabel>
                                    <FormControl>
                                        <Input
                                            {...field}
                                            placeholder='User name'
                                            autoComplete='off'
                                            data-testid='nameInput'
                                        />
                                    </FormControl>
                                    <FormMessage>
                                        {fieldState.error?.message || errors.name?.[0]}
                                    </FormMessage>
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name='email'
                            render={({ field, fieldState }) => (
                                <FormItem>
                                    <FormLabel>Email</FormLabel>
                                    <FormControl>
                                        <Input
                                            {...field}
                                            type='email'
                                            placeholder='Email'
                                            autoFocus
                                            autoComplete='off'
                                            data-testid='emailInput'
                                        />
                                    </FormControl>
                                    <FormMessage>
                                        {fieldState.error?.message || errors.email?.[0]}
                                    </FormMessage>
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name='password'
                            render={({ field, fieldState }) => (
                                <FormItem>
                                    <FormLabel>Password</FormLabel>
                                    <FormControl>
                                        <Input
                                            {...field}
                                            type='password'
                                            placeholder='******'
                                            autoComplete='off'
                                            data-testid='passwordInput'
                                        />
                                    </FormControl>
                                    <FormMessage>
                                        {fieldState.error?.message || errors.password?.[0]}
                                    </FormMessage>
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name='confirmPassword'
                            render={({ field, fieldState }) => (
                                <FormItem>
                                    <FormLabel>Confirm password</FormLabel>
                                    <FormControl>
                                        <Input
                                            {...field}
                                            type='password'
                                            placeholder='******'
                                            data-testid='confirmPasswordInput'
                                        />
                                    </FormControl>
                                    <FormMessage>
                                        {fieldState.error?.message || errors.confirmPassword?.[0]}
                                    </FormMessage>
                                </FormItem>
                            )}
                        />
                    </div>
                    <Button
                        type='submit'
                        className='w-full'
                        disabled={isLoading}
                        data-testid='submit'
                    >
                        {isLoading ? 'Loading...' : 'Register'}
                    </Button>
                </form>
            </Form>
        </CardWrapper>
    )
}

export default RegisterForm
