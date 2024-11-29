'use client'

import { useState, useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Building } from 'lucide-react'
import { useToast } from '@/hooks/use-toast'
import { getAgencyData, editAgencyData } from '@/lib/db'
import { agencyDataSchema, AgencyData } from '@/schemas/agency-data'
import AgencySkeleton from './agency-skeleton'

export default function Agency() {
    const { toast } = useToast()
    const [agencyLogo, setAgencyLogo] = useState('/placeholder.svg?height=100&width=100')
    const [loading, setLoading] = useState(true)

    const {
        register,
        handleSubmit,
        setValue,
        formState: { errors },
    } = useForm<AgencyData>({
        resolver: zodResolver(agencyDataSchema),
    })

    useEffect(() => {
        const fetchData = async () => {
            const data = await getAgencyData()
            setValue('logo', data.logo)
            setValue('name', data.name)
            setValue('license', data.license)
            setValue('phone', data.phone)
            setValue('email', data.email)
            setValue('address', data.address)
            setValue('website', data.website)

            setLoading(false)
        }

        fetchData()
    }, [setValue])

    const onSubmit = async (data: AgencyData) => {
        try {
            await editAgencyData(data)
            toast({ title: 'Agency information updated successfully' })
        } catch (err) {
            toast({ title: 'Failed to update agency data', variant: 'destructive' })
        }
    }

    const handleImageUpload = (
        event: React.ChangeEvent<HTMLInputElement>,
        setImage: React.Dispatch<React.SetStateAction<string>>
    ) => {
        const file = event.target.files?.[0]

        if (file) {
            const reader = new FileReader()
            reader.onload = (e) => {
                if (e.target) {
                    setImage((e.target.result as string) || '')
                    setValue('logo', e.target.result as string)
                }
            }
            reader.readAsDataURL(file)
        }
    }

    if (loading) {
        return <AgencySkeleton />
    }

    return (
        <Card>
            <CardHeader>
                <CardTitle>Agency Information</CardTitle>
                <CardDescription>Manage your agency details and branding</CardDescription>
            </CardHeader>
            <CardContent className='space-y-4'>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className='flex items-center space-x-4'>
                        <Avatar className='h-24 w-24'>
                            <AvatarImage src={agencyLogo} alt='Agency logo' />
                            <AvatarFallback>
                                <Building className='h-12 w-12' />
                            </AvatarFallback>
                        </Avatar>
                        <div>
                            <Input
                                id='logo'
                                type='file'
                                accept='image/*'
                                onChange={(e) => handleImageUpload(e, setAgencyLogo)}
                                className='w-full'
                            />
                            <p className='mt-1 text-sm text-muted-foreground'>
                                Upload your agency logo
                            </p>
                        </div>
                    </div>
                    <div className='grid grid-cols-2 gap-4'>
                        <div className='space-y-2'>
                            <Label htmlFor='name'>Agency Name</Label>
                            <Input
                                id='name'
                                placeholder='Real Estate Experts LLC'
                                {...register('name')}
                            />
                            {errors.name && <p className='text-red-500'>{errors.name.message}</p>}
                        </div>
                        <div className='space-y-2'>
                            <Label htmlFor='license'>Agency License Number</Label>
                            <Input id='license' placeholder='987654321' {...register('license')} />
                            {errors.license && (
                                <p className='text-red-500'>{errors.license.message}</p>
                            )}
                        </div>
                        <div className='space-y-2'>
                            <Label htmlFor='phone'>Agency Phone</Label>
                            <Input
                                id='phone'
                                type='tel'
                                placeholder='+1 (555) 987-6543'
                                {...register('phone')}
                            />
                            {errors.phone && <p className='text-red-500'>{errors.phone.message}</p>}
                        </div>
                        <div className='space-y-2'>
                            <Label htmlFor='email'>Agency Email</Label>
                            <Input
                                id='email'
                                type='email'
                                placeholder='info@realestateexperts.com'
                                {...register('email')}
                            />
                            {errors.email && <p className='text-red-500'>{errors.email.message}</p>}
                        </div>
                    </div>
                    <div className='space-y-2'>
                        <Label htmlFor='address'>Agency Address</Label>
                        <Input
                            id='address'
                            placeholder='123 Main St, City, State, ZIP'
                            {...register('address')}
                        />
                        {errors.address && <p className='text-red-500'>{errors.address.message}</p>}
                    </div>
                    <div className='space-y-2'>
                        <Label htmlFor='website'>Agency Website</Label>
                        <Input
                            id='website'
                            type='url'
                            placeholder='https://www.realestateexperts.com'
                            {...register('website')}
                        />
                        {errors.website && <p className='text-red-500'>{errors.website.message}</p>}
                    </div>
                    <div className='flex justify-end'>
                        <Button type='submit'>Save Agency Information</Button>
                    </div>
                </form>
            </CardContent>
        </Card>
    )
}
