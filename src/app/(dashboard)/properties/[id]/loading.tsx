import { Skeleton } from '@/components/ui/skeleton'
import { Card, CardContent, CardHeader } from '@/components/ui/card'

export default function Loading() {
    return (
        <div className='container mx-auto animate-pulse px-4 py-8'>
            <div className='mb-4 flex items-start justify-between'>
                <Skeleton className='h-10 w-64' />
                <div className='flex gap-2'>
                    <Skeleton className='h-10 w-32' />
                    <Skeleton className='h-10 w-32' />
                </div>
            </div>

            <div className='mb-6 grid gap-8 md:grid-cols-2'>
                <Skeleton className='h-[400px] w-full rounded-lg' />
                <Card>
                    <CardHeader>
                        <Skeleton className='h-6 w-40' />
                    </CardHeader>
                    <CardContent>
                        <div className='space-y-4'>
                            {[...Array(6)].map((_, index) => (
                                <div key={index} className='flex justify-between'>
                                    <Skeleton className='h-4 w-24' />
                                    <Skeleton className='h-4 w-32' />
                                </div>
                            ))}
                        </div>
                    </CardContent>
                </Card>
            </div>

            <div className='mb-6'>
                <div className='mb-2 flex items-center justify-between'>
                    <Skeleton className='h-6 w-20' />
                    <Skeleton className='h-8 w-32' />
                </div>
                <Skeleton className='mb-2 h-4 w-64' />
                <div className='flex flex-wrap gap-2'>
                    {[...Array(6)].map((_, index) => (
                        <Skeleton key={index} className='h-6 w-20' />
                    ))}
                </div>
            </div>

            <div className='mt-8'>
                <Skeleton className='mb-4 h-8 w-40' />
                <Skeleton className='h-4 w-full' />
                <Skeleton className='mt-2 h-4 w-full' />
                <Skeleton className='mt-2 h-4 w-3/4' />
            </div>

            <div className='mt-8'>
                <Skeleton className='mb-4 h-8 w-48' />
                <div className='space-y-2'>
                    {[...Array(8)].map((_, index) => (
                        <Skeleton key={index} className='h-4 w-full' />
                    ))}
                </div>
            </div>

            <div className='mt-8'>
                <Skeleton className='mb-4 h-8 w-40' />
                <div className='space-y-4'>
                    {[...Array(3)].map((_, index) => (
                        <div key={index} className='flex items-start'>
                            <Skeleton className='mr-4 mt-1 h-4 w-4 rounded-full' />
                            <div className='flex-1'>
                                <Skeleton className='mb-1 h-6 w-32' />
                                <Skeleton className='mb-1 h-4 w-48' />
                                <Skeleton className='h-4 w-full' />
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            <div className='mt-8'>
                <Skeleton className='mb-4 h-8 w-24' />
                <Skeleton className='h-[400px] w-full rounded-lg' />
            </div>

            <div className='mt-8 grid gap-8 md:grid-cols-2'>
                {[...Array(2)].map((_, index) => (
                    <Card key={index}>
                        <CardHeader>
                            <Skeleton className='h-6 w-32' />
                        </CardHeader>
                        <CardContent>
                            <div className='space-y-4'>
                                {[...Array(3)].map((_, subIndex) => (
                                    <div key={subIndex} className='flex justify-between'>
                                        <Skeleton className='h-4 w-24' />
                                        <Skeleton className='h-4 w-32' />
                                    </div>
                                ))}
                            </div>
                        </CardContent>
                    </Card>
                ))}
            </div>

            <div className='mt-8 grid gap-8 md:grid-cols-2'>
                {[...Array(2)].map((_, index) => (
                    <Card key={index}>
                        <CardHeader>
                            <Skeleton className='h-6 w-40' />
                        </CardHeader>
                        <CardContent>
                            <div className='space-y-4'>
                                {[...Array(5)].map((_, subIndex) => (
                                    <div key={subIndex} className='flex justify-between'>
                                        <Skeleton className='h-4 w-32' />
                                        <Skeleton className='h-4 w-24' />
                                    </div>
                                ))}
                            </div>
                        </CardContent>
                    </Card>
                ))}
            </div>

            <Card className='mt-8'>
                <CardHeader>
                    <Skeleton className='h-6 w-40' />
                </CardHeader>
                <CardContent>
                    <div className='flex items-center'>
                        <Skeleton className='mr-4 h-16 w-16 rounded-full' />
                        <div>
                            <Skeleton className='mb-2 h-6 w-32' />
                            <Skeleton className='mb-2 h-4 w-48' />
                            <Skeleton className='mb-1 h-4 w-40' />
                            <Skeleton className='h-4 w-56' />
                        </div>
                    </div>
                </CardContent>
            </Card>

            <div className='mt-8'>
                <Skeleton className='mb-4 h-8 w-32' />
                <div className='space-y-2'>
                    {[...Array(3)].map((_, index) => (
                        <Skeleton key={index} className='h-10 w-full' />
                    ))}
                </div>
            </div>
        </div>
    )
}
