import React from 'react'
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'
import { Skeleton } from '@/components/ui/skeleton'

export default function PLoading() {
    return (
        <div className='container mx-auto space-y-8 p-4 sm:p-6'>
            <div className='grid grid-cols-1 gap-6 md:grid-cols-2'>
                <Card>
                    <CardHeader>
                        <CardTitle>
                            <Skeleton className='h-6 w-3/4' />
                        </CardTitle>
                    </CardHeader>
                    <CardContent className='space-y-4'>
                        {[...Array(6)].map((_, i) => (
                            <div key={i} className='space-y-2'>
                                <Skeleton className='h-4 w-1/4' />
                                <Skeleton className='h-10 w-full' />
                            </div>
                        ))}
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader>
                        <CardTitle>
                            <Skeleton className='h-6 w-3/4' />
                        </CardTitle>
                    </CardHeader>
                    <CardContent className='space-y-4'>
                        {[...Array(6)].map((_, i) => (
                            <div key={i} className='space-y-2'>
                                <Skeleton className='h-4 w-1/4' />
                                <Skeleton className='h-10 w-full' />
                            </div>
                        ))}
                    </CardContent>
                </Card>
            </div>

            <Card>
                <CardHeader>
                    <CardTitle>
                        <Skeleton className='h-6 w-3/4' />
                    </CardTitle>
                </CardHeader>
                <CardContent>
                    <div className='space-y-2'>
                        <Skeleton className='h-4 w-1/4' />
                        <Skeleton className='h-32 w-full' />
                    </div>
                </CardContent>
            </Card>

            <div className='grid grid-cols-1 gap-6 md:grid-cols-2'>
                {[...Array(2)].map((_, i) => (
                    <Card key={i}>
                        <CardHeader>
                            <CardTitle>
                                <Skeleton className='h-6 w-3/4' />
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className='space-y-2'>
                                <Skeleton className='h-4 w-1/4' />
                                <Skeleton className='h-10 w-full' />
                            </div>
                        </CardContent>
                    </Card>
                ))}
            </div>

            <div className='grid grid-cols-1 gap-6 md:grid-cols-2'>
                {[...Array(2)].map((_, i) => (
                    <Card key={i}>
                        <CardHeader>
                            <CardTitle>
                                <Skeleton className='h-6 w-3/4' />
                            </CardTitle>
                        </CardHeader>
                        <CardContent className='space-y-4'>
                            {[...Array(4)].map((_, j) => (
                                <div key={j} className='space-y-2'>
                                    <Skeleton className='h-4 w-1/4' />
                                    <Skeleton className='h-10 w-full' />
                                </div>
                            ))}
                        </CardContent>
                    </Card>
                ))}
            </div>

            <div className='grid grid-cols-1 gap-6 md:grid-cols-2'>
                {[...Array(2)].map((_, i) => (
                    <Card key={i}>
                        <CardHeader>
                            <CardTitle>
                                <Skeleton className='h-6 w-3/4' />
                            </CardTitle>
                        </CardHeader>
                        <CardContent className='space-y-4'>
                            {[...Array(5)].map((_, j) => (
                                <div key={j} className='space-y-2'>
                                    <Skeleton className='h-4 w-1/4' />
                                    <Skeleton className='h-10 w-full' />
                                </div>
                            ))}
                        </CardContent>
                    </Card>
                ))}
            </div>

            <Card>
                <CardHeader>
                    <CardTitle>
                        <Skeleton className='h-6 w-3/4' />
                    </CardTitle>
                </CardHeader>
                <CardContent className='space-y-4'>
                    <div className='grid grid-cols-1 gap-4 md:grid-cols-2'>
                        {[...Array(4)].map((_, i) => (
                            <div key={i} className='space-y-2'>
                                <Skeleton className='h-4 w-1/4' />
                                <Skeleton className='h-10 w-full' />
                            </div>
                        ))}
                    </div>
                    <div className='space-y-2'>
                        <Skeleton className='h-4 w-1/4' />
                        <Skeleton className='h-10 w-full' />
                    </div>
                </CardContent>
            </Card>

            <Card>
                <CardHeader>
                    <CardTitle>
                        <Skeleton className='h-6 w-3/4' />
                    </CardTitle>
                </CardHeader>
                <CardContent>
                    <div className='space-y-2'>
                        <Skeleton className='h-4 w-1/4' />
                        <Skeleton className='h-32 w-full' />
                    </div>
                </CardContent>
            </Card>

            <div className='flex justify-end'>
                <Skeleton className='h-10 w-32' />
            </div>
        </div>
    )
}
