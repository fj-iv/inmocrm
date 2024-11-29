import { ReactNode } from 'react'

interface AuthLayoutProps {
    children: ReactNode
}

const AuthLayout = ({ children }: AuthLayoutProps) => {
    return (
        <section className='w-full'>
            <div className='flex h-screen items-center justify-center'>{children}</div>
        </section>
    )
}

export default AuthLayout
