'use client'

import { useAuth } from '@/hooks/useAuth'
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
import { LoginSchema, LoginSchemaType } from '@/schemas/auth'
import CardWrapper from './card-wrapper'

const LoginForm: React.FC = () => {
    const { login, isLoading } = useAuth({
        middleware: 'guest',
    })

    const form = useForm<LoginSchemaType>({
        resolver: zodResolver(LoginSchema),
        defaultValues: {
            email: '',
            password: '',
        },
    })

    const onSubmit: SubmitHandler<LoginSchemaType> = async ({ email, password }) => {
        const setErrors = (errors: any) => {
            console.error(errors)
        }

        await login({ email, password, setErrors })
    }

    return (
        <CardWrapper
            label='Login to your account'
            title='Login'
            backButtonHref='/auth/register'
            backButtonLabel="Don't have an account? Register here."
        >
            <Form {...form}>
                <form className='space-y-6' onSubmit={form.handleSubmit(onSubmit)}>
                    <div className='space-y-4'>
                        <FormField
                            control={form.control}
                            name='email'
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Email</FormLabel>
                                    <FormControl>
                                        <Input
                                            {...field}
                                            type='email'
                                            placeholder='Email'
                                            autoFocus
                                            autoComplete='off'
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name='password'
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Password</FormLabel>
                                    <FormControl>
                                        <Input
                                            {...field}
                                            type='password'
                                            placeholder='******'
                                            autoComplete='off'
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </div>
                    <Button type='submit' className='w-full' disabled={isLoading}>
                        {isLoading ? 'Loading...' : 'Login'}
                    </Button>
                </form>
            </Form>
        </CardWrapper>
    )
}

export default LoginForm
