'use client'

import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import UserProfile from './user'
import AgencyData from './agency'

export default function Component() {
    return (
        <div className='container mx-auto py-10'>
            <h1 className='mb-6 text-3xl font-bold'>CRM Settings</h1>
            <Tabs defaultValue='profile' className='w-full'>
                <TabsList className='grid w-full grid-cols-6'>
                    <TabsTrigger value='profile'>Profile</TabsTrigger>
                    <TabsTrigger value='agency'>Agency</TabsTrigger>
                </TabsList>
                <TabsContent value='profile'>
                    <UserProfile />
                </TabsContent>
                <TabsContent value='agency'>
                    <AgencyData />
                </TabsContent>
            </Tabs>
        </div>
    )
}
