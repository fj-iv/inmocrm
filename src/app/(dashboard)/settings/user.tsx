'use client'

import { useState, useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { User as UserIcon } from 'lucide-react'
import { useToast } from '@/hooks/use-toast'
import { getUserProfile, editUserProfile } from '@/lib/db'
import { userProfileSchema, UserProfileData } from '@/schemas/user-profile'
import UserProfileSkeleton from './user-skeleton'

export default function User() {
    const { toast } = useToast()
    const [profileImage, setProfileImage] = useState('/placeholder.svg?height=100&width=100')
    const [loading, setLoading] = useState(true)

    const {
        register,
        handleSubmit,
        setValue,
        formState: { errors },
    } = useForm<UserProfileData>({
        resolver: zodResolver(userProfileSchema),
    })

    useEffect(() => {
        const fetchData = async () => {
            const data = await getUserProfile()
            setValue('profileImage', data.profileImage)
            setValue('fullName', data.fullName)
            setValue('email', data.email)
            setValue('phone', data.phone)
            setValue('license', data.license)
            setProfileImage(data.profileImage)
            setLoading(false)
        }

        fetchData()
    }, [])

    const onSubmit = async (data: UserProfileData) => {
        try {
            await editUserProfile(data)
            toast({ title: 'Profile updated successfully' })
        } catch (err) {
            toast({ title: 'Failed to update profile', variant: 'destructive' })
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
                }
            }
            reader.readAsDataURL(file)
        }
    }

    if (loading) {
        return <UserProfileSkeleton />
    }

    return (
        <Card>
            <CardHeader>
                <CardTitle>Agent Profile</CardTitle>
                <CardDescription>Manage your personal and professional information</CardDescription>
            </CardHeader>
            <CardContent className='space-y-4'>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className='flex items-center space-x-4'>
                        <Avatar className='h-24 w-24'>
                            <AvatarImage src={profileImage} alt='Profile picture' />
                            <AvatarFallback>
                                <UserIcon className='h-12 w-12' />
                            </AvatarFallback>
                        </Avatar>
                        <div>
                            <Input
                                id='picture'
                                type='file'
                                accept='image/*'
                                onChange={(e) => handleImageUpload(e, setProfileImage)}
                                className='w-full'
                            />
                            <p className='mt-1 text-sm text-muted-foreground'>
                                Upload a new profile picture
                            </p>
                        </div>
                    </div>
                    <div className='grid grid-cols-2 gap-4'>
                        <div className='space-y-2'>
                            <Label htmlFor='fullName'>Full Name</Label>
                            <Input id='fullName' placeholder='John Doe' {...register('fullName')} />
                            {errors.fullName && (
                                <p className='text-red-500'>{errors.fullName.message}</p>
                            )}
                        </div>
                        <div className='space-y-2'>
                            <Label htmlFor='email'>Email</Label>
                            <Input
                                id='email'
                                type='email'
                                placeholder='john@example.com'
                                {...register('email')}
                            />
                            {errors.email && <p className='text-red-500'>{errors.email.message}</p>}
                        </div>
                        <div className='space-y-2'>
                            <Label htmlFor='phone'>Phone</Label>
                            <Input
                                id='phone'
                                type='tel'
                                placeholder='+1 (555) 123-4567'
                                {...register('phone')}
                            />
                            {errors.phone && <p className='text-red-500'>{errors.phone.message}</p>}
                        </div>
                        <div className='space-y-2'>
                            <Label htmlFor='license'>Real Estate License Number</Label>
                            <Input id='license' placeholder='123456789' {...register('license')} />
                            {errors.license && (
                                <p className='text-red-500'>{errors.license.message}</p>
                            )}
                        </div>
                    </div>
                    <div className='space-y-2'>
                        <div className='grid grid-cols-2 gap-4'>
                            <div className='space-y-2'>
                                <Label htmlFor='current-password'>Current Password</Label>
                                <Input
                                    id='current-password'
                                    type='password'
                                    {...register('currentPassword')}
                                />
                                {errors.currentPassword && (
                                    <p className='text-red-500'>{errors.currentPassword.message}</p>
                                )}
                            </div>
                            <div className='space-y-2'>
                                <Label htmlFor='new-password'>New Password</Label>
                                <Input
                                    id='new-password'
                                    type='password'
                                    {...register('newPassword')}
                                />
                                {errors.newPassword && (
                                    <p className='text-red-500'>{errors.newPassword.message}</p>
                                )}
                            </div>
                            <div className='col-start-2 space-y-2'>
                                <Label htmlFor='confirm-password'>Confirm New Password</Label>
                                <Input
                                    id='confirm-password'
                                    type='password'
                                    {...register('confirmPassword')}
                                />
                                {errors.confirmPassword && (
                                    <p className='text-red-500'>{errors.confirmPassword.message}</p>
                                )}
                            </div>
                        </div>
                    </div>
                    <div className='mt-4 flex justify-end'>
                        <Button type='submit'>Save Profile</Button>
                    </div>
                </form>
            </CardContent>
        </Card>
    )
}
