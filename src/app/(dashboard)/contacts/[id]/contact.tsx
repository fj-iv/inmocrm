'use client'

import Link from 'next/link'
import clsx from 'clsx'
import { Trash2, Edit2 } from 'lucide-react'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import DeleteContact from '../delete-contact'
import { Progress } from '@/components/ui/progress'
import { CalendarDays, Clock, Delete, Mail, MapPin, Menu, Phone, Star } from 'lucide-react'
import { Contact as ContactInterface } from '@/lib/db'
import { toCapitalCase } from '@/lib/utils'
import { getContactProfileName } from '@/constants/contact/getContactProfileName'
import { getContactMethodName } from '@/constants/getContactMethodName'
import { getPropertyPreferenceName } from '@/constants/getPropertyPreferenceName'

interface ContactProps {
    contact: ContactInterface
}

const Contact: React.FC<ContactProps> = ({ contact }) => {
    return (
        <div className='container mx-auto p-4 sm:p-6'>
            <Card>
                <CardHeader className='flex flex-col items-center gap-4 sm:flex-row sm:items-start'>
                    <Avatar className='h-24 w-24 border-4 border-primary'>
                        <AvatarImage src={contact.avatarSrc} alt={contact.avatarAlt} />
                        <AvatarFallback>{contact.avatarFallback}</AvatarFallback>
                    </Avatar>

                    <div className='flex-grow text-center sm:text-left'>
                        <CardTitle className='text-2xl sm:text-3xl'>{contact.name}</CardTitle>
                        <CardDescription>{contact.description}</CardDescription>
                        <div className='mt-2 flex flex-wrap justify-center gap-2 sm:justify-start'>
                            <Badge>
                                {contact.status.charAt(0).toUpperCase() + contact.status.slice(1)}
                            </Badge>
                            <Badge
                                variant='outline'
                                className={clsx(
                                    contact.priority === 'high' ? 'bg-red-100' : 'bg-grey-100'
                                )}
                            >
                                {contact.priority.charAt(0).toUpperCase() +
                                    contact.priority.slice(1)}{' '}
                                Priority
                            </Badge>

                            <Badge
                                variant='outline'
                                className={clsx(
                                    contact.rgpdAccepted ? 'bg-green-100' : 'bg-red-100'
                                )}
                            >
                                {contact.rgpdAccepted ? 'RGPD Accepted' : 'RGPD Not Accepted'}
                            </Badge>
                        </div>
                        <div className='mt-2 flex flex-wrap justify-center gap-2 sm:justify-start'>
                            {contact.profiles.map((profile) => (
                                <Badge key={profile} variant='outline'>
                                    {getContactProfileName(profile)}
                                </Badge>
                            ))}
                        </div>
                    </div>

                    <div className='mt-4 flex flex-col gap-2 sm:mt-0 sm:flex-row'>
                        <DeleteContact contactId={contact.id} goBackOnDelete>
                            <Button
                                variant='outline'
                                className='border-red-500 text-red-500 hover:bg-red-100'
                            >
                                <Trash2 className='mr-1 h-4 w-4 text-red-500' />
                                <span className='text-red-500'>Delete</span>
                            </Button>
                        </DeleteContact>
                        <Link href={`/contacts/${contact.id}/edit`} className='w-full'>
                            <Button variant='outline' className='hover:bg-gray-200'>
                                <Edit2 className='mr-1 h-4 w-4' />
                                Edit
                            </Button>
                        </Link>

                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <Button className='flex-shrink-0' variant='outline' size='icon'>
                                    <Menu className='h-4 w-4' />
                                </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align='end'>
                                <DropdownMenuLabel>Create</DropdownMenuLabel>
                                <DropdownMenuItem className='cursor-pointer'>
                                    New property
                                </DropdownMenuItem>
                                <DropdownMenuSeparator />
                                <DropdownMenuLabel>Send</DropdownMenuLabel>
                                <DropdownMenuItem className='cursor-pointer'>
                                    WhatsApp
                                </DropdownMenuItem>
                                <DropdownMenuItem className='cursor-pointer'>
                                    Email
                                </DropdownMenuItem>
                                <DropdownMenuItem className='cursor-pointer'>RGPD</DropdownMenuItem>
                            </DropdownMenuContent>
                        </DropdownMenu>
                    </div>
                </CardHeader>

                <CardContent className='grid gap-6'>
                    <div className='grid gap-4 sm:grid-cols-2'>
                        <Card>
                            <CardHeader>
                                <CardTitle>Personal Information</CardTitle>
                            </CardHeader>
                            <CardContent className='grid gap-2'>
                                <div className='flex items-center gap-2'>
                                    <Mail className='h-4 w-4 flex-shrink-0 text-muted-foreground' />
                                    <span className='text-sm'>
                                        {contact.personalInformation.email}
                                    </span>
                                </div>
                                <div className='flex items-center gap-2'>
                                    <Phone className='h-4 w-4 flex-shrink-0 text-muted-foreground' />
                                    <span className='text-sm'>
                                        {contact.personalInformation.phone}
                                    </span>
                                </div>
                                <div className='flex items-center gap-2'>
                                    <MapPin className='h-4 w-4 flex-shrink-0 text-muted-foreground' />
                                    <span className='text-sm'>
                                        {contact.personalInformation.address}
                                    </span>
                                </div>
                                <div className='flex items-center gap-2'>
                                    <CalendarDays className='h-4 w-4 flex-shrink-0 text-muted-foreground' />
                                    <span className='text-sm'>
                                        Date of Birth: {contact.personalInformation.dateOfBirth}
                                    </span>
                                </div>
                                <div className='flex items-center gap-2'>
                                    <Star className='h-4 w-4 flex-shrink-0 text-muted-foreground' />
                                    <span className='text-sm'>
                                        Preferred Contact Method:{' '}
                                        {getContactMethodName(
                                            contact.personalInformation.preferredContactMethod
                                        )}
                                    </span>
                                </div>
                                <div className='flex items-center gap-2'>
                                    <Clock className='h-4 w-4 flex-shrink-0 text-muted-foreground' />
                                    <span className='text-sm'>
                                        Preferred Contact Time:{' '}
                                        {toCapitalCase(
                                            contact.personalInformation.preferredContactTime
                                        )}
                                    </span>
                                </div>
                            </CardContent>
                        </Card>

                        <Card>
                            <CardHeader>
                                <CardTitle>Financial Information</CardTitle>
                            </CardHeader>
                            <CardContent className='grid gap-2'>
                                <div className='flex items-center justify-between'>
                                    <span className='text-sm'>Budget:</span>
                                    <span className='text-sm font-semibold'>
                                        {contact.financialInformation.budget}
                                    </span>
                                </div>
                                <div className='flex items-center justify-between'>
                                    <span className='text-sm'>Pre-approved:</span>
                                    <Badge variant='outline' className='bg-green-100'>
                                        {contact.financialInformation.preApproved}
                                    </Badge>
                                </div>
                                <div className='flex items-center justify-between'>
                                    <span className='text-sm'>Client Rating:</span>
                                    <div className='flex'>
                                        {[
                                            ...Array(
                                                Math.floor(
                                                    contact.financialInformation.clientRating
                                                )
                                            ),
                                        ].map((_, index) => (
                                            <Star
                                                key={index}
                                                className='h-4 w-4 fill-yellow-400 text-yellow-400'
                                            />
                                        ))}
                                        {contact.financialInformation.clientRating % 1 !== 0 && (
                                            <Star
                                                className='h-4 w-4 fill-yellow-400 text-yellow-400'
                                                style={{ clipPath: 'inset(0 50% 0 0)' }}
                                            />
                                        )}
                                    </div>
                                </div>
                                <div className='flex items-center justify-between'>
                                    <span className='text-sm'>Bank Account:</span>
                                    <span className='text-sm font-semibold'>
                                        {contact.financialInformation.bankAccount}
                                    </span>
                                </div>
                            </CardContent>
                        </Card>
                    </div>

                    <div className='grid gap-4 sm:grid-cols-2'>
                        <Card>
                            <CardHeader>
                                <CardTitle>Agent Information</CardTitle>
                            </CardHeader>
                            <CardContent className='grid gap-2'>
                                <div className='flex items-center justify-between'>
                                    <span className='text-sm'>Acquired By:</span>
                                    <div className='flex items-center gap-2'>
                                        <Avatar className='h-6 w-6'>
                                            <AvatarImage
                                                src={contact.agentInformation.acquiredBy.avatar}
                                                alt={contact.agentInformation.acquiredBy.name}
                                            />
                                            <AvatarFallback>
                                                {contact.agentInformation.acquiredBy.name
                                                    .split(' ')
                                                    .map((n) => n[0])
                                                    .join('')}
                                            </AvatarFallback>
                                        </Avatar>
                                        <span className='text-sm font-semibold'>
                                            {contact.agentInformation.acquiredBy.name}
                                        </span>
                                    </div>
                                </div>
                                <div className='flex items-center justify-between'>
                                    <span className='text-sm'>Current Agent:</span>
                                    <div className='flex items-center gap-2'>
                                        <Avatar className='h-6 w-6'>
                                            <AvatarImage
                                                src={contact.agentInformation.currentAgent.avatar}
                                                alt={contact.agentInformation.currentAgent.name}
                                            />
                                            <AvatarFallback>
                                                {contact.agentInformation.currentAgent.name
                                                    .split(' ')
                                                    .map((n) => n[0])
                                                    .join('')}
                                            </AvatarFallback>
                                        </Avatar>
                                        <span className='text-sm font-semibold'>
                                            {contact.agentInformation.currentAgent.name}
                                        </span>
                                    </div>
                                </div>
                                <div className='flex items-center justify-between'>
                                    <span className='text-sm'>Initial Contact Method:</span>
                                    <span className='text-sm font-semibold'>
                                        {getContactMethodName(
                                            contact.agentInformation.initialContactMethod
                                        )}
                                    </span>
                                </div>
                            </CardContent>
                        </Card>

                        <Card>
                            <CardHeader>
                                <CardTitle>Administrative Details</CardTitle>
                            </CardHeader>
                            <CardContent className='grid gap-2'>
                                <div className='flex items-center justify-between'>
                                    <span className='text-sm'>Client ID:</span>
                                    <span className='text-sm font-semibold'>
                                        {contact.administrativeDetails.clientId}
                                    </span>
                                </div>
                                <div className='flex items-center justify-between'>
                                    <span className='text-sm'>Registration Date:</span>
                                    <span className='text-sm font-semibold'>
                                        {contact.administrativeDetails.registrationDate}
                                    </span>
                                </div>
                                <div className='flex items-center justify-between'>
                                    <span className='text-sm'>Last Updated:</span>
                                    <span className='text-sm font-semibold'>
                                        {contact.administrativeDetails.lastUpdated}
                                    </span>
                                </div>
                            </CardContent>
                        </Card>
                    </div>

                    <Card>
                        <CardHeader>
                            <CardTitle>Property Preferences</CardTitle>
                        </CardHeader>
                        <CardContent className='flex flex-wrap gap-2'>
                            {contact.propertyPreferences.map((preference) => (
                                <Badge key={preference} variant='outline'>
                                    {getPropertyPreferenceName(preference)}
                                </Badge>
                            ))}
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader>
                            <CardTitle>Buying Process Progress</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <Progress value={contact.buyingProcessProgress} className='w-full' />
                            <div className='mt-2 flex justify-between text-xs text-muted-foreground sm:text-sm'>
                                <span>Initial Consultation</span>
                                <span>Property Search</span>
                                <span>Offer Made</span>
                                <span>Inspection</span>
                                <span>Closing</span>
                            </div>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader>
                            <CardTitle>Recent Activity</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <ul className='space-y-4'>
                                {contact.recentActivity.map((activity, index) => (
                                    <li key={index} className='flex items-center gap-4'>
                                        <div className='h-2 w-2 flex-shrink-0 rounded-full bg-primary' />
                                        <div className='grid gap-0.5'>
                                            <span className='text-sm font-medium'>
                                                {activity.description}
                                            </span>
                                            <span className='text-xs text-muted-foreground'>
                                                {activity.timeAgo}
                                            </span>
                                        </div>
                                    </li>
                                ))}
                            </ul>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardHeader>
                            <CardTitle>Relevant Notes</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <ul className='space-y-4'>
                                {contact.relevantNotes.map((note, index) => (
                                    <li key={index} className='grid gap-1'>
                                        <span className='text-sm font-medium'>{note.note}</span>
                                        <span className='text-xs text-muted-foreground'>
                                            Added by {note.addedBy} - {note.timeAgo}
                                        </span>
                                    </li>
                                ))}
                            </ul>
                        </CardContent>
                    </Card>
                </CardContent>
            </Card>
        </div>
    )
}

export default Contact
