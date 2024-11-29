'use client'

import { useState } from 'react'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import * as z from 'zod'
import { format } from 'date-fns'
import { CalendarIcon, X } from 'lucide-react'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import { Calendar } from '@/components/ui/calendar'
import { Checkbox } from '@/components/ui/checkbox'
import { Separator } from '@/components/ui/separator'
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select'
import { Textarea } from '@/components/ui/textarea'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { cn } from '@/lib/utils'
import { Contact } from '@/lib/db'
import { contactFormSchema } from '@/schemas/contact-form'
import { toCapitalCase } from '@/lib/utils'
import { contactMethods } from '@/constants/contactMethods'
import { contactProfiles } from '@/constants/contact/contactProfiles'
import { propertyPreferences } from '@/constants/propertyPreferences'
import MultiSelectField from '@/components/multi-select-field'

interface ContactFormProps {
    contact?: Contact
    isEditing?: boolean
}

export default function ContactForm({ contact, isEditing = false }: ContactFormProps) {
    const [avatar, setAvatar] = useState<string | null>(contact?.avatarSrc || null)

    const form = useForm<z.infer<typeof contactFormSchema>>({
        resolver: zodResolver(contactFormSchema),
        defaultValues: {
            fullName: contact?.name || '',
            status: contact?.status || '',
            priority: contact?.priority || '',
            email: contact?.personalInformation.email || '',
            phone: contact?.personalInformation.phone || '',
            address: contact?.personalInformation.address || '',
            dateOfBirth: contact?.personalInformation.dateOfBirth
                ? new Date(contact.personalInformation.dateOfBirth)
                : undefined,
            preferredContactMethod: contact?.personalInformation.preferredContactMethod || 1,
            preferredContactTime:
                (contact?.personalInformation.preferredContactTime as
                    | 'morning'
                    | 'afternoon'
                    | 'evening') || undefined,
            contactProfiles: contact?.profiles || [],
            budget: contact?.financialInformation.budget || '',
            preApproved: contact?.financialInformation.preApproved === 'Yes',
            clientRating: contact?.financialInformation.clientRating.toString() || '',
            bankAccount: contact?.financialInformation.bankAccount || '',
            acquiredBy: contact?.agentInformation.acquiredBy.name || '',
            currentAgent: contact?.agentInformation.currentAgent.name || '',
            initialContactMethod: contact?.agentInformation.initialContactMethod || 1,
            propertyPreferences: contact?.propertyPreferences || [],
            buyingProcessProgress: contact?.buyingProcessProgress.toString() || '',
            notes: '',
        },
    })

    function onSubmit(values: z.infer<typeof contactFormSchema>) {
        console.log(values)
    }

    const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            const reader = new FileReader()
            reader.onload = (e) => {
                setAvatar(e.target?.result as string)
            }
            reader.readAsDataURL(e.target.files[0])
        }
    }

    return (
        <div className='container mx-auto p-4 sm:p-6'>
            <Card>
                <CardHeader className='flex flex-col items-start gap-4 sm:flex-row'>
                    <div className='relative'>
                        <Avatar className='h-24 w-24 border-4 border-primary'>
                            <AvatarImage
                                src={
                                    avatar ||
                                    contact?.avatarSrc ||
                                    '/placeholder.svg?height=96&width=96'
                                }
                                alt={contact?.avatarAlt || 'Contact'}
                            />
                            <AvatarFallback>{contact?.avatarFallback || 'CN'}</AvatarFallback>
                        </Avatar>
                        <Input
                            type='file'
                            onChange={handleAvatarChange}
                            className='absolute inset-0 h-full w-full cursor-pointer opacity-0'
                            accept='image/*'
                        />
                    </div>
                    <div className='flex-grow'>
                        <CardTitle className='mb-2 text-2xl sm:text-3xl'>
                            {isEditing ? 'Edit Contact' : 'New Contact'}
                        </CardTitle>
                        <CardDescription>Enter the contact's information below</CardDescription>
                    </div>
                </CardHeader>
                <CardContent>
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-8'>
                            <div className='grid gap-4 sm:grid-cols-2'>
                                <Card>
                                    <CardHeader className='pb-2'>
                                        <CardTitle>Personal Information</CardTitle>
                                    </CardHeader>
                                    <CardContent className='grid gap-4 sm:grid-cols-2'>
                                        <FormField
                                            control={form.control}
                                            name='fullName'
                                            render={({ field }) => (
                                                <FormItem className='sm:col-span-2'>
                                                    <FormLabel>Full Name</FormLabel>
                                                    <FormControl>
                                                        <Input placeholder='John Doe' {...field} />
                                                    </FormControl>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />

                                        <FormField
                                            control={form.control}
                                            name='email'
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormLabel>Email</FormLabel>
                                                    <FormControl>
                                                        <Input
                                                            type='email'
                                                            placeholder='john.doe@example.com'
                                                            {...field}
                                                        />
                                                    </FormControl>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />
                                        <FormField
                                            control={form.control}
                                            name='phone'
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormLabel>Phone</FormLabel>
                                                    <FormControl>
                                                        <Input
                                                            type='tel'
                                                            placeholder='(555) 123-4567'
                                                            {...field}
                                                        />
                                                    </FormControl>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />
                                        <FormField
                                            control={form.control}
                                            name='address'
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormLabel>Address</FormLabel>
                                                    <FormControl>
                                                        <Input
                                                            placeholder='123 Main St, Anytown, USA 12345'
                                                            {...field}
                                                        />
                                                    </FormControl>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />
                                        <FormField
                                            control={form.control}
                                            name='dateOfBirth'
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormLabel>Date of Birth</FormLabel>
                                                    <Popover>
                                                        <PopoverTrigger asChild>
                                                            <FormControl>
                                                                <Button
                                                                    variant={'outline'}
                                                                    className={cn(
                                                                        'w-full pl-3 text-left font-normal',
                                                                        !field.value &&
                                                                            'text-muted-foreground'
                                                                    )}
                                                                >
                                                                    {field.value ? (
                                                                        format(field.value, 'PPP')
                                                                    ) : (
                                                                        <span>Pick a date</span>
                                                                    )}
                                                                    <CalendarIcon className='ml-auto h-4 w-4 opacity-50' />
                                                                </Button>
                                                            </FormControl>
                                                        </PopoverTrigger>
                                                        <PopoverContent
                                                            className='w-auto p-0'
                                                            align='start'
                                                        >
                                                            <Calendar
                                                                mode='single'
                                                                selected={field.value}
                                                                onSelect={field.onChange}
                                                                disabled={(date) =>
                                                                    date > new Date() ||
                                                                    date < new Date('1900-01-01')
                                                                }
                                                                initialFocus
                                                            />
                                                        </PopoverContent>
                                                    </Popover>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />
                                        <FormField
                                            control={form.control}
                                            name='preferredContactMethod'
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormLabel>Preferred Contact Method</FormLabel>
                                                    <Select
                                                        onValueChange={field.onChange}
                                                        defaultValue={field.value.toString()}
                                                    >
                                                        <FormControl>
                                                            <SelectTrigger>
                                                                <SelectValue placeholder='Select contact method' />
                                                            </SelectTrigger>
                                                        </FormControl>
                                                        <SelectContent>
                                                            {contactMethods.map((method) => (
                                                                <SelectItem
                                                                    key={method.id}
                                                                    value={method.id.toString()}
                                                                >
                                                                    {method.name}
                                                                </SelectItem>
                                                            ))}
                                                        </SelectContent>
                                                    </Select>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />
                                        <FormField
                                            control={form.control}
                                            name='preferredContactTime'
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormLabel>Preferred Contact Time</FormLabel>
                                                    <Select
                                                        onValueChange={field.onChange}
                                                        defaultValue={field.value}
                                                    >
                                                        <FormControl>
                                                            <SelectTrigger>
                                                                <SelectValue placeholder='Select preferred time' />
                                                            </SelectTrigger>
                                                        </FormControl>
                                                        <SelectContent>
                                                            <SelectItem value='morning'>
                                                                Morning
                                                            </SelectItem>
                                                            <SelectItem value='afternoon'>
                                                                Afternoon
                                                            </SelectItem>
                                                            <SelectItem value='evening'>
                                                                Evening
                                                            </SelectItem>
                                                        </SelectContent>
                                                    </Select>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />
                                        <Separator className='my-8 sm:col-span-2' />
                                        <FormField
                                            control={form.control}
                                            name='status'
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormLabel>Status</FormLabel>
                                                    <Select
                                                        onValueChange={field.onChange}
                                                        defaultValue={field.value}
                                                    >
                                                        <FormControl>
                                                            <SelectTrigger>
                                                                <SelectValue placeholder='Select status' />
                                                            </SelectTrigger>
                                                        </FormControl>
                                                        <SelectContent>
                                                            <SelectItem value='active'>
                                                                Active
                                                            </SelectItem>
                                                            <SelectItem value='inactive'>
                                                                Inactive
                                                            </SelectItem>
                                                        </SelectContent>
                                                    </Select>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />
                                        <FormField
                                            control={form.control}
                                            name='priority'
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormLabel>Priority</FormLabel>
                                                    <Select
                                                        onValueChange={field.onChange}
                                                        defaultValue={field.value}
                                                    >
                                                        <FormControl>
                                                            <SelectTrigger>
                                                                <SelectValue placeholder='Select priority' />
                                                            </SelectTrigger>
                                                        </FormControl>
                                                        <SelectContent>
                                                            <SelectItem value='low'>Low</SelectItem>
                                                            <SelectItem value='medium'>
                                                                Medium
                                                            </SelectItem>
                                                            <SelectItem value='high'>
                                                                High
                                                            </SelectItem>
                                                        </SelectContent>
                                                    </Select>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />
                                        <MultiSelectField
                                            form={form}
                                            name='contactProfiles'
                                            label='Contact profile'
                                            options={contactProfiles}
                                            className='sm:col-span-2'
                                        />
                                    </CardContent>
                                </Card>
                                <div className='grid gap-4'>
                                    <Card>
                                        <CardHeader className='pb-2'>
                                            <CardTitle>Financial Information</CardTitle>
                                        </CardHeader>
                                        <CardContent className='grid gap-4'>
                                            <FormField
                                                control={form.control}
                                                name='budget'
                                                render={({ field }) => (
                                                    <FormItem>
                                                        <FormLabel>Budget Range</FormLabel>
                                                        <FormControl>
                                                            <Input
                                                                placeholder='$500,000 - $750,000'
                                                                {...field}
                                                            />
                                                        </FormControl>
                                                        <FormMessage />
                                                    </FormItem>
                                                )}
                                            />
                                            <FormField
                                                control={form.control}
                                                name='preApproved'
                                                render={({ field }) => (
                                                    <FormItem className='flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4'>
                                                        <FormControl>
                                                            <Checkbox
                                                                checked={field.value}
                                                                onCheckedChange={field.onChange}
                                                            />
                                                        </FormControl>
                                                        <div className='space-y-1 leading-none'>
                                                            <FormLabel>
                                                                Pre-approved for mortgage
                                                            </FormLabel>
                                                            <FormDescription>
                                                                Check if the client is pre-approved
                                                                for a mortgage.
                                                            </FormDescription>
                                                        </div>
                                                    </FormItem>
                                                )}
                                            />
                                            <FormField
                                                control={form.control}
                                                name='clientRating'
                                                render={({ field }) => (
                                                    <FormItem>
                                                        <FormLabel>Client Rating</FormLabel>
                                                        <Select
                                                            onValueChange={field.onChange}
                                                            defaultValue={field.value}
                                                        >
                                                            <FormControl>
                                                                <SelectTrigger>
                                                                    <SelectValue placeholder='Select rating' />
                                                                </SelectTrigger>
                                                            </FormControl>
                                                            <SelectContent>
                                                                <SelectItem value='1'>
                                                                    1 Star
                                                                </SelectItem>
                                                                <SelectItem value='2'>
                                                                    2 Stars
                                                                </SelectItem>
                                                                <SelectItem value='3'>
                                                                    3 Stars
                                                                </SelectItem>
                                                                <SelectItem value='4'>
                                                                    4 Stars
                                                                </SelectItem>
                                                                <SelectItem value='5'>
                                                                    5 Stars
                                                                </SelectItem>
                                                            </SelectContent>
                                                        </Select>
                                                        <FormMessage />
                                                    </FormItem>
                                                )}
                                            />
                                            <FormField
                                                control={form.control}
                                                name='bankAccount'
                                                render={({ field }) => (
                                                    <FormItem>
                                                        <FormLabel>
                                                            Bank Account (Last 4 digits)
                                                        </FormLabel>
                                                        <FormControl>
                                                            <Input
                                                                maxLength={4}
                                                                placeholder='1234'
                                                                {...field}
                                                            />
                                                        </FormControl>
                                                        <FormMessage />
                                                    </FormItem>
                                                )}
                                            />
                                        </CardContent>
                                    </Card>
                                    <Card>
                                        <CardHeader className='pb-2'>
                                            <CardTitle>Agent Information</CardTitle>
                                        </CardHeader>
                                        <CardContent className='grid gap-4'>
                                            <FormField
                                                control={form.control}
                                                name='acquiredBy'
                                                render={({ field }) => (
                                                    <FormItem>
                                                        <FormLabel>Acquired By</FormLabel>
                                                        <Select
                                                            onValueChange={field.onChange}
                                                            defaultValue={field.value}
                                                        >
                                                            <FormControl>
                                                                <SelectTrigger>
                                                                    <SelectValue placeholder='Select agent' />
                                                                </SelectTrigger>
                                                            </FormControl>
                                                            <SelectContent>
                                                                <SelectItem value='Sarah Johnson'>
                                                                    Sarah Johnson
                                                                </SelectItem>
                                                                <SelectItem value='Michael Smith'>
                                                                    Michael Smith
                                                                </SelectItem>
                                                                <SelectItem value='Emma Davis'>
                                                                    Emma Davis
                                                                </SelectItem>
                                                            </SelectContent>
                                                        </Select>
                                                        <FormMessage />
                                                    </FormItem>
                                                )}
                                            />
                                            <FormField
                                                control={form.control}
                                                name='currentAgent'
                                                render={({ field }) => (
                                                    <FormItem>
                                                        <FormLabel>Current Agent</FormLabel>
                                                        <Select
                                                            onValueChange={field.onChange}
                                                            defaultValue={field.value}
                                                        >
                                                            <FormControl>
                                                                <SelectTrigger>
                                                                    <SelectValue placeholder='Select agent' />
                                                                </SelectTrigger>
                                                            </FormControl>
                                                            <SelectContent>
                                                                <SelectItem value='Sarah Johnson'>
                                                                    Sarah Johnson
                                                                </SelectItem>
                                                                <SelectItem value='Michael Smith'>
                                                                    Michael Smith
                                                                </SelectItem>
                                                                <SelectItem value='Emma Davis'>
                                                                    Emma Davis
                                                                </SelectItem>
                                                            </SelectContent>
                                                        </Select>
                                                        <FormMessage />
                                                    </FormItem>
                                                )}
                                            />
                                            <FormField
                                                control={form.control}
                                                name='initialContactMethod'
                                                render={({ field }) => (
                                                    <FormItem>
                                                        <FormLabel>
                                                            Initial Contact Method
                                                        </FormLabel>
                                                        <Select
                                                            onValueChange={field.onChange}
                                                            defaultValue={field.value.toString()}
                                                        >
                                                            <FormControl>
                                                                <SelectTrigger>
                                                                    <SelectValue placeholder='Select contact method' />
                                                                </SelectTrigger>
                                                            </FormControl>
                                                            <SelectContent>
                                                                {contactMethods.map((method) => (
                                                                    <SelectItem
                                                                        key={method.id}
                                                                        value={method.id.toString()}
                                                                    >
                                                                        {method.name}
                                                                    </SelectItem>
                                                                ))}
                                                            </SelectContent>
                                                        </Select>
                                                        <FormMessage />
                                                    </FormItem>
                                                )}
                                            />
                                        </CardContent>
                                    </Card>
                                </div>
                            </div>
                            <div className='grid gap-4 sm:grid-cols-2'>
                                <Card>
                                    <CardHeader className='pb-4'>
                                        <CardTitle>Property Preferences</CardTitle>
                                    </CardHeader>
                                    <CardContent>
                                        <MultiSelectField
                                            form={form}
                                            name='propertyPreferences'
                                            label='Property preferences'
                                            options={propertyPreferences}
                                        />
                                    </CardContent>
                                </Card>
                                <Card>
                                    <CardHeader className='pb-4'>
                                        <CardTitle>Buying Process Progress</CardTitle>
                                    </CardHeader>
                                    <CardContent>
                                        <FormField
                                            control={form.control}
                                            name='buyingProcessProgress'
                                            render={({ field }) => (
                                                <FormItem>
                                                    <Select
                                                        onValueChange={field.onChange}
                                                        defaultValue={field.value}
                                                    >
                                                        <FormControl>
                                                            <SelectTrigger>
                                                                <SelectValue placeholder='Select current stage' />
                                                            </SelectTrigger>
                                                        </FormControl>
                                                        <SelectContent>
                                                            <SelectItem value='20'>
                                                                Initial Consultation
                                                            </SelectItem>
                                                            <SelectItem value='40'>
                                                                Property Search
                                                            </SelectItem>
                                                            <SelectItem value='60'>
                                                                Offer Made
                                                            </SelectItem>
                                                            <SelectItem value='80'>
                                                                Closing
                                                            </SelectItem>
                                                            <SelectItem value='100'>
                                                                Closing
                                                            </SelectItem>
                                                        </SelectContent>
                                                    </Select>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />
                                    </CardContent>
                                </Card>
                            </div>

                            <Card>
                                <CardHeader className='pb-4'>
                                    <CardTitle>Relevant Notes</CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <div className='space-y-4'>
                                        <ul className='mb-2 space-y-3'>
                                            {contact?.relevantNotes.map((note, index) => (
                                                <li key={index} className='grid gap-1'>
                                                    <span className='text-sm font-medium'>
                                                        {note.note}
                                                    </span>
                                                    <span className='text-xs text-muted-foreground'>
                                                        Added by {note.addedBy} - {note.timeAgo}
                                                    </span>
                                                </li>
                                            ))}
                                        </ul>
                                        <FormField
                                            control={form.control}
                                            name='notes'
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormControl>
                                                        <Textarea
                                                            placeholder='Add a new note...'
                                                            className='resize-none'
                                                            {...field}
                                                        />
                                                    </FormControl>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />
                                    </div>
                                </CardContent>
                            </Card>
                            <div className='flex justify-end gap-4'>
                                <Button type='button' variant='outline'>
                                    Cancel
                                </Button>
                                <Button type='submit'>
                                    {isEditing ? 'Update Contact' : 'Create Contact'}
                                </Button>
                            </div>
                        </form>
                    </Form>
                </CardContent>
            </Card>
        </div>
    )
}
