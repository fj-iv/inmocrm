import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { Skeleton } from '@/components/ui/skeleton'
import { ScrollArea } from '@/components/ui/scroll-area'

export default function Loading() {
    return (
        <div className='flex min-h-screen flex-col bg-background p-4 md:p-6 lg:p-8'>
            <main className='flex-1'>
                <div className='grid gap-6 md:grid-cols-2 lg:grid-cols-3'>
                    <Card>
                        <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
                            <Skeleton className='h-6 w-40' />
                            <Skeleton className='h-6 w-6 rounded-full' />
                        </CardHeader>
                        <CardContent>
                            <Skeleton className='mb-2 h-8 w-20' />
                            <Skeleton className='mb-4 h-6 w-32' />
                            <div className='space-y-2'>
                                <Skeleton className='h-4 w-full' />
                                <Skeleton className='h-4 w-full' />
                                <Skeleton className='h-4 w-full' />
                            </div>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardHeader>
                            <Skeleton className='h-6 w-40' />
                            <Skeleton className='h-4 w-[250px]' />
                        </CardHeader>
                        <CardContent>
                            <ScrollArea className='h-[200px] w-full'>
                                <div className='space-y-4'>
                                    {[...Array(3)].map((_, i) => (
                                        <div key={i} className='flex items-center'>
                                            <Skeleton className='h-9 w-9 rounded-full' />
                                            <div className='ml-4 space-y-1'>
                                                <Skeleton className='h-4 w-[200px]' />
                                                <Skeleton className='h-3 w-[150px]' />
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </ScrollArea>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardHeader>
                            <Skeleton className='h-6 w-40' />
                            <Skeleton className='h-4 w-[250px]' />
                        </CardHeader>
                        <CardContent>
                            <ScrollArea className='h-[200px] w-full'>
                                <div className='space-y-4'>
                                    {[...Array(3)].map((_, i) => (
                                        <div key={i} className='flex items-center'>
                                            <Skeleton className='h-9 w-9 rounded-full' />
                                            <div className='ml-4 space-y-1'>
                                                <Skeleton className='h-4 w-[200px]' />
                                                <Skeleton className='h-3 w-[150px]' />
                                            </div>
                                            <Skeleton className='ml-auto h-4 w-16' />
                                        </div>
                                    ))}
                                </div>
                            </ScrollArea>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
                            <Skeleton className='h-6 w-40' />
                            <Skeleton className='h-4 w-4 rounded-full' />
                        </CardHeader>
                        <CardContent>
                            <Skeleton className='mb-2 h-8 w-16' />
                            <Skeleton className='mb-4 h-4 w-28' />
                            <Skeleton className='h-[200px] w-full' />
                        </CardContent>
                    </Card>
                    <Card>
                        <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
                            <Skeleton className='h-6 w-40' />
                            <Skeleton className='h-4 w-4 rounded-full' />
                        </CardHeader>
                        <CardContent>
                            <Skeleton className='h-[200px] w-full rounded-full' />
                        </CardContent>
                    </Card>
                    <Card>
                        <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
                            <Skeleton className='h-6 w-40' />
                            <Skeleton className='h-4 w-4 rounded-full' />
                        </CardHeader>
                        <CardContent>
                            <Skeleton className='h-[200px] w-full' />
                        </CardContent>
                    </Card>
                    <Card className='col-span-full'>
                        <CardHeader>
                            <Skeleton className='h-6 w-40' />
                            <Skeleton className='h-4 w-[250px]' />
                        </CardHeader>
                        <CardContent>
                            <ScrollArea className='h-[200px] w-full'>
                                <div className='space-y-4'>
                                    {[...Array(3)].map((_, i) => (
                                        <div key={i} className='flex items-center'>
                                            <Skeleton className='h-9 w-9 rounded-full' />
                                            <div className='ml-4 space-y-1'>
                                                <Skeleton className='h-4 w-[200px]' />
                                                <Skeleton className='h-3 w-[150px]' />
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </ScrollArea>
                        </CardContent>
                    </Card>
                </div>
            </main>
        </div>
    )
}
