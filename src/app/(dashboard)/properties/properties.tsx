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
import { Eye, Pencil, Trash2, EllipsisVertical } from 'lucide-react'
import Pagination from '@/components/pagination'
import { PropertyListing } from '@/lib/db'
import { PaginationLinks, PaginationMeta } from '@/interfaces/pagination'
import DeleteProperty from './delete-property'

interface PropertiesProps {
    data: PropertyListing[]
    links: PaginationLinks
    meta: PaginationMeta
    onPageChange: (page: number) => void
}

export default function Properties({ data, links, meta, onPageChange }: PropertiesProps) {
    return (
        <Card className='w-full'>
            <div className='flex justify-between'>
                <CardHeader>
                    <CardTitle className='truncate'>Properties List</CardTitle>
                    <CardDescription className='truncate'>
                        Manage your properties and view their details.
                    </CardDescription>
                </CardHeader>
                <Button className='mr-4 mt-4'>
                    <Link href='/properties/new'>Add Property</Link>
                </Button>
            </div>

            <CardContent>
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead className='truncate'>ID</TableHead>
                            <TableHead className='truncate'>Type</TableHead>
                            <TableHead className='truncate'>Location</TableHead>
                            <TableHead className='truncate'>Street</TableHead>
                            <TableHead className='truncate'>Selling Price</TableHead>
                            <TableHead className='truncate'>Renting Price</TableHead>
                            <TableHead className='truncate'>Leads</TableHead>
                            <TableHead className='truncate'>Rating</TableHead>
                            <TableHead className='truncate'>Matches</TableHead>
                            <TableHead className='truncate'>Agent</TableHead>
                            <TableHead className='truncate'>Creation Date</TableHead>
                            <TableHead className='truncate'>Conservation</TableHead>
                            {/* <TableHead className='truncate'>Operation</TableHead> */}
                            <TableHead className='truncate'>State</TableHead>
                            <TableHead className='truncate'>Exclusive</TableHead>
                            <TableHead>
                                <span className='sr-only'>Actions</span>
                            </TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {data.map((property) => (
                            <TableRow
                                key={property.id}
                                className='group transition-colors hover:bg-muted'
                            >
                                <TableCell>
                                    <div className='flex items-center gap-3'>
                                        <img
                                            src='/placeholder.svg'
                                            alt='Property Image'
                                            width={40}
                                            height={40}
                                            className='rounded-md'
                                            style={{ aspectRatio: '40/40', objectFit: 'cover' }}
                                        />
                                        <div className='truncate'>
                                            <div className='truncate font-medium'>
                                                {property.id}
                                            </div>
                                        </div>
                                    </div>
                                </TableCell>
                                <TableCell>
                                    <div className='truncate'>{property.type}</div>
                                </TableCell>
                                <TableCell>
                                    <div className='truncate'>{property.location}</div>
                                </TableCell>
                                <TableCell>
                                    <div className='truncate'>{property.street}</div>
                                </TableCell>
                                <TableCell>
                                    <div className='truncate'>{property.sellingPrice}</div>
                                </TableCell>
                                <TableCell>
                                    <div className='truncate'>{property.rentingPrice}</div>
                                </TableCell>
                                <TableCell>
                                    <div className='truncate'>{property.leads}</div>
                                </TableCell>
                                <TableCell>
                                    <div className='truncate'>{property.rating}</div>
                                </TableCell>
                                <TableCell>
                                    <div className='truncate'>{property.matches}</div>
                                </TableCell>
                                <TableCell>
                                    <div className='flex items-center gap-3'>
                                        <Avatar>
                                            <AvatarImage
                                                src={property.agent.image}
                                                alt={property.agent.name}
                                            />
                                            <AvatarFallback>
                                                {property.agent.name[0]}
                                            </AvatarFallback>
                                        </Avatar>
                                        <div className='truncate'>
                                            <div className='truncate font-medium'>
                                                {property.agent.name}
                                            </div>
                                        </div>
                                    </div>
                                </TableCell>
                                <TableCell>
                                    <div className='truncate'>{property.creationDate}</div>
                                </TableCell>
                                <TableCell>
                                    <div className='truncate'>{property.conservationState}</div>
                                </TableCell>
                                {/* <TableCell>
                                    <div className='truncate'>{property.operation}</div>
                                </TableCell> */}
                                <TableCell>
                                    <Badge variant='outline' className='truncate'>
                                        {property.state}
                                    </Badge>
                                </TableCell>
                                <TableCell>
                                    <Badge variant='outline' className='truncate'>
                                        {property.exclusive}
                                    </Badge>
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
                                                    href={`/properties/${property.id}`}
                                                    className='w-full'
                                                >
                                                    <button className='flex items-center'>
                                                        <Eye className='mr-2 h-4 w-4' />
                                                        View property
                                                    </button>
                                                </Link>
                                            </DropdownMenuItem>
                                            <DropdownMenuItem className='cursor-pointer'>
                                                <Link
                                                    href={`/properties/${property.id}/edit`}
                                                    className='w-full'
                                                >
                                                    <button className='flex items-center'>
                                                        <Pencil className='mr-2 h-4 w-4' />
                                                        Edit
                                                    </button>
                                                </Link>
                                            </DropdownMenuItem>
                                            <DropdownMenuItem
                                                className='cursor-pointer'
                                                onSelect={(event) => event.preventDefault()}
                                            >
                                                <DeleteProperty
                                                    propertyId={property.id}
                                                    refreshOnDelete
                                                >
                                                    <button className='flex items-center'>
                                                        <Trash2 className='mr-2 h-4 w-4 text-red-500' />
                                                        <span className='text-red-500'>Delete</span>
                                                    </button>
                                                </DeleteProperty>
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
