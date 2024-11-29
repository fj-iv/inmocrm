'use client'

import Link from 'next/link'
import {
    Card,
    CardHeader,
    CardTitle,
    CardDescription,
    CardContent,
    CardFooter,
} from '@/components/ui/card'
import {
    Table,
    TableHeader,
    TableRow,
    TableHead,
    TableBody,
    TableCell,
} from '@/components/ui/table'
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import {
    DropdownMenu,
    DropdownMenuTrigger,
    DropdownMenuContent,
    DropdownMenuLabel,
    DropdownMenuItem,
} from '@/components/ui/dropdown-menu'
import { Mail, Phone, Eye, Pencil, Trash2, EllipsisVertical } from 'lucide-react'
import Pagination from '@/components/pagination'
import { ContactListing } from '@/lib/db'
import { PaginationLinks, PaginationMeta } from '@/interfaces/pagination'
import DeleteContact from './delete-contact'

interface ContactsProps {
    data: ContactListing[]
    links: PaginationLinks
    meta: PaginationMeta
    onPageChange: (page: number) => void
}

export default function Contacts({ data, links, meta, onPageChange }: ContactsProps) {
    return (
        <Card className='relative w-full'>
            <div className='flex justify-between'>
                <CardHeader>
                    <CardTitle className='truncate'>Contacts List</CardTitle>
                    <CardDescription className='truncate'>
                        Manage your contacts and view their details.
                    </CardDescription>
                </CardHeader>
                <Button className='mr-4 mt-4'>
                    <Link href='/contacts/new'>Add Contact</Link>
                </Button>
            </div>
            <CardContent>
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead className='truncate'>Name</TableHead>
                            <TableHead className='truncate'>ID</TableHead>
                            <TableHead className='truncate'>Phone</TableHead>
                            <TableHead className='truncate'>Email</TableHead>
                            <TableHead className='truncate'>Profile Type</TableHead>
                            <TableHead className='truncate'>Language</TableHead>
                            <TableHead className='truncate'>Last Update</TableHead>
                            <TableHead className='truncate'>Register Date</TableHead>
                            <TableHead className='truncate'>Agent</TableHead>
                            <TableHead>
                                <span className='sr-only'>Actions</span>
                            </TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {data.map((contact) => (
                            <TableRow
                                key={contact.id}
                                className='group transition-colors hover:bg-muted'
                            >
                                <TableCell>
                                    <div className='flex items-center gap-3'>
                                        <Avatar>
                                            <AvatarImage src={contact.avatar} alt={contact.name} />
                                            <AvatarFallback>
                                                {contact.name
                                                    .split(' ')
                                                    .map((n) => n[0])
                                                    .join('')}
                                            </AvatarFallback>
                                        </Avatar>
                                        <div className='truncate'>
                                            <div className='truncate font-medium'>
                                                {contact.name}
                                            </div>
                                            <div className='truncate text-sm text-muted-foreground'>
                                                {contact.email}
                                            </div>
                                        </div>
                                    </div>
                                </TableCell>
                                <TableCell>
                                    <div className='truncate font-medium'>{contact.id}</div>
                                </TableCell>
                                <TableCell>
                                    <div className='truncate'>{contact.phone}</div>
                                </TableCell>
                                <TableCell>
                                    <div className='truncate'>{contact.email}</div>
                                </TableCell>
                                <TableCell>
                                    <Badge variant='outline' className='truncate'>
                                        {contact.membership}
                                    </Badge>
                                </TableCell>
                                <TableCell>
                                    <div className='truncate'>{contact.language}</div>
                                </TableCell>
                                <TableCell>
                                    <div className='truncate'>{contact.createdDate}</div>
                                </TableCell>
                                <TableCell>
                                    <div className='truncate'>{contact.lastContactedDate}</div>
                                </TableCell>
                                <TableCell>
                                    <div className='flex items-center gap-3'>
                                        <Avatar>
                                            <AvatarImage
                                                src={contact.assignedAgent.avatar}
                                                alt={contact.assignedAgent.name}
                                            />
                                            <AvatarFallback>
                                                {contact.assignedAgent.name
                                                    .split(' ')
                                                    .map((n) => n[0])
                                                    .join('')}
                                            </AvatarFallback>
                                        </Avatar>
                                        <div className='truncate'>
                                            <div className='truncate font-medium'>
                                                {contact.assignedAgent.name}
                                            </div>
                                            <div className='truncate text-sm text-muted-foreground'>
                                                {contact.assignedAgent.email}
                                            </div>
                                        </div>
                                    </div>
                                </TableCell>
                                <TableCell>
                                    <DropdownMenu>
                                        <DropdownMenuTrigger asChild>
                                            <Button
                                                aria-haspopup='true'
                                                size='icon'
                                                variant='ghost'
                                            >
                                                <EllipsisVertical className='h-4 w-4' />
                                                <span className='sr-only'>Toggle menu</span>
                                            </Button>
                                        </DropdownMenuTrigger>
                                        <DropdownMenuContent align='end'>
                                            <DropdownMenuLabel>Actions</DropdownMenuLabel>

                                            <DropdownMenuItem className='cursor-pointer'>
                                                <Link
                                                    href={`/contacts/${contact.id}`}
                                                    className='w-full'
                                                >
                                                    <button className='flex items-center'>
                                                        <Eye className='mr-2 h-4 w-4' />
                                                        View contact
                                                    </button>
                                                </Link>
                                            </DropdownMenuItem>
                                            <DropdownMenuItem className='cursor-pointer'>
                                                <Link
                                                    href={`/contacts/${contact.id}/edit`}
                                                    className='w-full'
                                                >
                                                    <button className='flex items-center'>
                                                        <Pencil className='mr-2 h-4 w-4' />
                                                        Edit
                                                    </button>
                                                </Link>
                                            </DropdownMenuItem>
                                            <DropdownMenuItem>
                                                <Mail className='mr-2 h-4 w-4' />
                                                Send Email
                                            </DropdownMenuItem>
                                            <DropdownMenuItem>
                                                <Phone className='mr-2 h-4 w-4' />
                                                Call
                                            </DropdownMenuItem>
                                            <DropdownMenuItem
                                                className='cursor-pointer'
                                                onSelect={(event) => event.preventDefault()}
                                            >
                                                <DeleteContact
                                                    contactId={contact.id}
                                                    refreshOnDelete
                                                >
                                                    <button className='flex items-center'>
                                                        <Trash2 className='mr-2 h-4 w-4 text-red-500' />
                                                        <span className='text-red-500'>Delete</span>
                                                    </button>
                                                </DeleteContact>
                                            </DropdownMenuItem>
                                        </DropdownMenuContent>
                                    </DropdownMenu>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
                <Pagination links={links} meta={meta} onPageChange={onPageChange} />
            </CardContent>
            <CardFooter className='absolute bottom-2 right-2'>
                <div className='text-xs text-muted-foreground'>
                    Showing{' '}
                    <strong>
                        {meta.from}-{meta.to}
                    </strong>{' '}
                    of <strong>{meta.total}</strong> users
                </div>
            </CardFooter>
        </Card>
    )
}
