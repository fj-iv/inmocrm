import { Button } from '@/components/ui/button'
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from '@/components/ui/card'
import { AlertCircle, PhoneCall, Mail, RefreshCw } from 'lucide-react'
import { SUPPORT_EMAIL, SUPPORT_PHONE } from '@/constants/support'

interface ErrorComponentProps {
    error: Error
}

export default function ErrorComponent({ error }: ErrorComponentProps) {
    const handleReload = () => {
        window.location.reload()
    }

    return (
        <div className='flex min-h-screen items-center justify-center bg-background p-4'>
            <Card className='w-full max-w-md'>
                <CardHeader>
                    <div className='flex items-center space-x-2'>
                        <AlertCircle className='h-6 w-6 text-destructive' />
                        <CardTitle>Oops! Something went wrong</CardTitle>
                    </div>
                    <CardDescription>
                        We apologize for the inconvenience. Our team has been notified and is
                        working on a fix.
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    {error.message && (
                        <p className='mb-4 text-sm text-muted-foreground'>Error: {error.message}</p>
                    )}
                    <div className='space-y-2'>
                        <div className='flex items-center space-x-2'>
                            <PhoneCall className='h-4 w-4' />
                            <span className='text-sm'>Support: {SUPPORT_PHONE}</span>
                        </div>
                        <div className='flex items-center space-x-2'>
                            <Mail className='h-4 w-4' />
                            <span className='text-sm'>Email: {SUPPORT_EMAIL}</span>
                        </div>
                    </div>
                </CardContent>
                <CardFooter>
                    <Button onClick={handleReload} className='w-full'>
                        <RefreshCw className='mr-2 h-4 w-4' />
                        Reload Page
                    </Button>
                </CardFooter>
            </Card>
        </div>
    )
}
