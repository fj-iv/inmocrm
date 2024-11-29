'use client'

import Link from 'next/link'
import clsx from 'clsx'
import { Download, MapPin, Phone, Mail, Trash2, Edit2, Clock } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Table, TableBody, TableCell, TableRow } from '@/components/ui/table'
import { Badge } from '@/components/ui/badge'
import ImageCarousel from '@/components/image-carousel'
import Map from '@/components/map'
import DeleteProperty from '../delete-property'
import { Property as PropertyInterface } from '@/lib/db'

interface PropertyProps {
    property: PropertyInterface
}

const Property: React.FC<PropertyProps> = ({ property }) => {
    return (
        <div className='container mx-auto px-4 py-8'>
            <div className='mb-4 flex items-start justify-between'>
                <h1 className='text-3xl font-bold'>{property.title}</h1>
                <div className='flex gap-2'>
                    <DeleteProperty propertyId={property.id} goBackOnDelete>
                        <Button
                            variant='outline'
                            className='border-red-500 text-red-500 hover:bg-red-100'
                        >
                            <Trash2 className='mr-1 h-4 w-4 text-red-500' />
                            <span className='text-red-500'>Delete</span>
                        </Button>
                    </DeleteProperty>
                    <Link href={`/properties/${property.id}/edit`} className='w-full'>
                        <Button variant='outline' className='hover:bg-gray-200'>
                            <Edit2 className='mr-1 h-4 w-4' />
                            Edit
                        </Button>
                    </Link>
                </div>
            </div>

            <div className='mb-6 grid gap-8 md:grid-cols-2'>
                <ImageCarousel images={property.images} />

                <Card>
                    <CardHeader>
                        <CardTitle>Property Details</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <Table>
                            <TableBody>
                                <TableRow>
                                    <TableCell className='font-medium'>Property Type</TableCell>
                                    <TableCell>{property.propertyType}</TableCell>
                                </TableRow>

                                <TableRow>
                                    <TableCell className='font-medium'>Lot Size</TableCell>
                                    <TableCell>{property.lotSize}</TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell className='font-medium'>Floor</TableCell>
                                    <TableCell>2nd</TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell className='font-medium'>Elevator</TableCell>
                                    <TableCell>{property.elevator ? 'Yes' : 'No'}</TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell className='font-medium'>Parking</TableCell>
                                    <TableCell>{property.parking}</TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell className='font-medium'>Year Built</TableCell>
                                    <TableCell>{property.yearBuilt}</TableCell>
                                </TableRow>
                            </TableBody>
                        </Table>
                    </CardContent>
                </Card>
            </div>

            <div className='mb-6'>
                <div className='mb-2 flex items-center justify-between'>
                    <Badge variant='secondary'>{property.status}</Badge>
                    <span className='text-2xl font-bold'>{property.price}</span>
                </div>
                <p className='mb-2 flex items-center text-muted-foreground'>
                    <MapPin className='mr-2 h-4 w-4' />
                    {property.address}
                </p>
                <div className='flex flex-wrap gap-2'>
                    {property.features.map((feature, index) => (
                        <Badge key={index}>{feature}</Badge>
                    ))}
                </div>
            </div>

            <div className='mt-8'>
                <h2 className='mb-4 text-2xl font-bold'>Description</h2>
                <p className='text-muted-foreground'>
                    {property.description || 'No description available.'}
                </p>
            </div>

            <div className='mt-8'>
                <h2 className='mb-4 text-2xl font-bold'>Highlights</h2>
                <ul className='list-inside list-disc text-muted-foreground'>
                    {property.highlights.map((feature, index) => (
                        <li key={index}>{feature}</li>
                    ))}
                </ul>
                {property.highlights.length === 0 && (
                    <p className='text-muted-foreground'>No highlights available.</p>
                )}
            </div>

            <div className='mt-8'>
                <h2 className='mb-4 text-2xl font-bold'>Status History</h2>
                <div className='space-y-4'>
                    {property.statusHistory.map((status, index) => (
                        <div key={index} className='flex items-start'>
                            <div className='mr-4 mt-1 h-4 w-4 rounded-full bg-primary'></div>
                            <div>
                                <h3 className='font-semibold'>{status.status}</h3>
                                <p className='text-sm text-muted-foreground'>
                                    <Clock className='mr-1 inline-block h-4 w-4' />
                                    {status.date}
                                </p>
                                <p className='mt-1'>{status.description}</p>
                            </div>
                        </div>
                    ))}
                    {property.statusHistory.length === 0 && (
                        <p className='text-muted-foreground'>No status history available.</p>
                    )}
                </div>
            </div>

            <div className='mt-8'>
                <h2 className='mb-4 text-2xl font-bold'>Location</h2>
                <div className='flex h-[400px] w-full items-center justify-center rounded-lg bg-gray-200'>
                    <Map
                        longitude={property.location.longitude}
                        latitude={property.location.latitude}
                        popupText={property.title}
                    />
                </div>
            </div>

            <div
                className={clsx(
                    'mt-8 grid gap-8',
                    property.forSale.isListed && property.forRent.isListed && 'md:grid-cols-2'
                )}
            >
                {property.forSale.isListed && (
                    <Card>
                        <CardHeader>
                            <CardTitle>For Sale</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <Table>
                                <TableBody>
                                    <TableRow>
                                        <TableCell className='font-medium'>List Price</TableCell>
                                        <TableCell>{property.forSale.listPrice}</TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell className='font-medium'>
                                            Price per sqft
                                        </TableCell>
                                        <TableCell>{property.forSale.pricePerSqft}</TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell className='font-medium'>
                                            Estimated Mortgage
                                        </TableCell>
                                        <TableCell>{property.forSale.estimatedMortgage}</TableCell>
                                    </TableRow>
                                </TableBody>
                            </Table>
                        </CardContent>
                    </Card>
                )}

                {property.forRent.isListed && (
                    <Card>
                        <CardHeader>
                            <CardTitle>For Rent</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <Table>
                                <TableBody>
                                    <TableRow>
                                        <TableCell className='font-medium'>Monthly Rent</TableCell>
                                        <TableCell>{property.forRent.monthlyRent}</TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell className='font-medium'>
                                            Security Deposit
                                        </TableCell>
                                        <TableCell>{property.forRent.securityDeposit}</TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell className='font-medium'>Lease Term</TableCell>
                                        <TableCell>{property.forRent.leaseTerm}</TableCell>
                                    </TableRow>
                                </TableBody>
                            </Table>
                        </CardContent>
                    </Card>
                )}
            </div>

            <div className='mt-8 grid gap-8 md:grid-cols-2'>
                <Card>
                    <CardHeader>
                        <CardTitle>Financial Details</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <Table>
                            <TableBody>
                                <TableRow>
                                    <TableCell className='font-medium'>Property Taxes</TableCell>
                                    <TableCell>{property.financialDetails.propertyTaxes}</TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell className='font-medium'>HOA Fees</TableCell>
                                    <TableCell>{property.financialDetails.hoaFees}</TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell className='font-medium'>Insurance</TableCell>
                                    <TableCell>{property.financialDetails.insurance}</TableCell>
                                </TableRow>
                            </TableBody>
                        </Table>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader>
                        <CardTitle>Cadaster Information</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <Table>
                            <TableBody>
                                <TableRow>
                                    <TableCell className='font-medium'>Parcel Number</TableCell>
                                    <TableCell>
                                        {property.cadasterInformation.parcelNumber}
                                    </TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell className='font-medium'>Legal Description</TableCell>
                                    <TableCell>
                                        {property.cadasterInformation.legalDescription}
                                    </TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell className='font-medium'>Zoning</TableCell>
                                    <TableCell>{property.cadasterInformation.zoning}</TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell className='font-medium'>Land Value</TableCell>
                                    <TableCell>{property.cadasterInformation.landValue}</TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell className='font-medium'>Improvement Value</TableCell>
                                    <TableCell>
                                        {property.cadasterInformation.improvementValue}
                                    </TableCell>
                                </TableRow>
                            </TableBody>
                        </Table>
                    </CardContent>
                </Card>
            </div>

            <Card className='mt-8'>
                <CardHeader>
                    <CardTitle>Agent Information</CardTitle>
                </CardHeader>
                <CardContent>
                    <div className='flex items-center'>
                        <img
                            src={property.agentInformation.image}
                            alt='Agent'
                            className='mr-4 h-16 w-16 rounded-full'
                        />
                        <div>
                            <h3 className='font-bold'>{property.agentInformation.name}</h3>
                            <p className='text-muted-foreground'>
                                {property.agentInformation.title}
                            </p>
                            <div className='mt-2 flex items-center'>
                                <Phone className='mr-2 h-4 w-4' />
                                <span>{property.agentInformation.phone}</span>
                            </div>
                            <div className='mt-1 flex items-center'>
                                <Mail className='mr-2 h-4 w-4' />
                                <span>{property.agentInformation.email}</span>
                            </div>
                        </div>
                    </div>
                </CardContent>
            </Card>

            <div className='mt-8'>
                <h2 className='mb-4 text-2xl font-bold'>Documents</h2>
                <div className='space-y-2'>
                    {property.documents.map((document, index) => (
                        <a key={index} href={document.url} download className='w-full'>
                            <Button variant='outline' className='w-full justify-start'>
                                <Download className='mr-2 h-4 w-4' />
                                {document.name}
                            </Button>
                        </a>
                    ))}
                    {property.documents.length === 0 && (
                        <p className='text-muted-foreground'>No documents available.</p>
                    )}
                </div>
            </div>
        </div>
    )
}

export default Property
