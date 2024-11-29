'use client'

import React, { useState, useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Checkbox } from '@/components/ui/checkbox'
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select'
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from '@/components/ui/form'
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'
import ImageUploader from '@/components/image-uploader'
import { useToast } from '@/hooks/use-toast'
import { propertyFormSchema, PropertyFormData } from '@/schemas/property-form'
import MultiSelectField from '@/components/multi-select-field'

interface PropertyFormProps {
    property?: PropertyFormData
    isEditing?: boolean
}

const featureOptions = [
    { id: 1, name: 'Swimming Pool' },
    { id: 2, name: 'Garden' },
    { id: 3, name: 'Garage' },
    { id: 4, name: 'Fireplace' },
    { id: 5, name: 'Home Office' },
]

const highlightOptions = [
    { id: 1, name: 'Recently Renovated' },
    { id: 2, name: 'Energy Efficient' },
    { id: 3, name: 'Smart Home' },
    { id: 4, name: 'Panoramic View' },
    { id: 5, name: 'Close to Schools' },
]

export default function PropertyForm({ property, isEditing = false }: PropertyFormProps) {
    const { toast } = useToast()
    const [images, setImages] = useState<string[]>(property?.images || [])

    const form = useForm<PropertyFormData>({
        resolver: zodResolver(propertyFormSchema),
        defaultValues: isEditing
            ? property
            : {
                  title: '',
                  propertyType: '',
                  lotSize: '',
                  floor: '',
                  elevator: false,
                  parking: '',
                  yearBuilt: new Date().getFullYear(),
                  status: '',
                  price: '',
                  address: '',
                  features: [],
                  images: [],
                  description: '',
                  highlights: [],
                  statusHistory: [],
                  location: {
                      latitude: 0,
                      longitude: 0,
                  },
                  forSale: {
                      isListed: false,
                      listPrice: '',
                      pricePerSqft: '',
                      estimatedMortgage: '',
                  },
                  forRent: {
                      isListed: false,
                      monthlyRent: '',
                      securityDeposit: '',
                      leaseTerm: '',
                  },
                  financialDetails: {
                      propertyTaxes: '',
                      hoaFees: '',
                      insurance: '',
                  },
                  cadasterInformation: {
                      parcelNumber: '',
                      legalDescription: '',
                      zoning: '',
                      landValue: '',
                      improvementValue: '',
                  },
                  agentInformation: {
                      name: '',
                      title: '',
                      phone: '',
                      email: '',
                      image: '',
                  },
                  documents: [],
              },
    })

    useEffect(() => {
        if (isEditing && property) {
            Object.entries(property).forEach(([key, value]) => {
                form.setValue(key as keyof PropertyFormData, value)
            })
            setImages(property.images)
        }
    }, [isEditing, property, form])

    const handleImageUpload = (newImages: string[]) => {
        setImages((prevImages) => [...prevImages, ...newImages])
        form.setValue('images', [...images, ...newImages])
    }

    const onSubmit = async (data: PropertyFormData) => {
        try {
            console.log(data)
            await new Promise((resolve) => setTimeout(resolve, 1000))
            toast({
                title: isEditing ? 'Property Updated' : 'Property Added',
                description: `Successfully ${isEditing ? 'updated' : 'added'} property: ${data.title}`,
            })
        } catch (error) {
            console.error('Error submitting form:', error)
            toast({
                title: 'Error',
                description: 'There was a problem submitting the form. Please try again.',
                variant: 'destructive',
            })
        }
    }

    return (
        <div className='container mx-auto p-4 sm:p-6'>
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-8'>
                    <div className='grid grid-cols-1 gap-6 md:grid-cols-2'>
                        <Card>
                            <CardHeader>
                                <CardTitle>Property Information</CardTitle>
                            </CardHeader>
                            <CardContent className='space-y-4'>
                                <FormField
                                    control={form.control}
                                    name='title'
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Title</FormLabel>
                                            <FormControl>
                                                <Input {...field} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name='propertyType'
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Property Type</FormLabel>
                                            <Select
                                                onValueChange={field.onChange}
                                                defaultValue={field.value}
                                            >
                                                <FormControl>
                                                    <SelectTrigger>
                                                        <SelectValue placeholder='Select a property type' />
                                                    </SelectTrigger>
                                                </FormControl>
                                                <SelectContent>
                                                    <SelectItem value='house'>House</SelectItem>
                                                    <SelectItem value='apartment'>
                                                        Apartment
                                                    </SelectItem>
                                                    <SelectItem value='condo'>Condo</SelectItem>
                                                    <SelectItem value='townhouse'>
                                                        Townhouse
                                                    </SelectItem>
                                                </SelectContent>
                                            </Select>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name='lotSize'
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Lot Size</FormLabel>
                                            <FormControl>
                                                <Input {...field} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name='floor'
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Floor</FormLabel>
                                            <FormControl>
                                                <Input {...field} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name='elevator'
                                    render={({ field }) => (
                                        <FormItem className='flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4'>
                                            <FormControl>
                                                <Checkbox
                                                    checked={field.value}
                                                    onCheckedChange={field.onChange}
                                                />
                                            </FormControl>
                                            <div className='space-y-1 leading-none'>
                                                <FormLabel>Elevator</FormLabel>
                                                <FormDescription>
                                                    Does this property have an elevator?
                                                </FormDescription>
                                            </div>
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name='parking'
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Parking</FormLabel>
                                            <FormControl>
                                                <Input {...field} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                            </CardContent>
                        </Card>

                        <Card>
                            <CardHeader>
                                <CardTitle>Location and Price</CardTitle>
                            </CardHeader>
                            <CardContent className='space-y-4'>
                                <FormField
                                    control={form.control}
                                    name='yearBuilt'
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Year built</FormLabel>
                                            <FormControl>
                                                <Input
                                                    type='number'
                                                    {...field}
                                                    onChange={(e) =>
                                                        field.onChange(parseInt(e.target.value))
                                                    }
                                                />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
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
                                                        <SelectValue placeholder='Select a status' />
                                                    </SelectTrigger>
                                                </FormControl>
                                                <SelectContent>
                                                    <SelectItem value='available'>
                                                        Available
                                                    </SelectItem>
                                                    <SelectItem value='sold'>Sold</SelectItem>
                                                    <SelectItem value='pending'>Pending</SelectItem>
                                                    <SelectItem value='off-market'>
                                                        Off Market
                                                    </SelectItem>
                                                </SelectContent>
                                            </Select>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name='price'
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Price</FormLabel>
                                            <FormControl>
                                                <Input {...field} />
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
                                                <Input {...field} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name='location.latitude'
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Latitude</FormLabel>
                                            <FormControl>
                                                <Input
                                                    type='number'
                                                    {...field}
                                                    onChange={(e) =>
                                                        field.onChange(parseFloat(e.target.value))
                                                    }
                                                />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name='location.longitude'
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Longitude</FormLabel>
                                            <FormControl>
                                                <Input
                                                    type='number'
                                                    {...field}
                                                    onChange={(e) =>
                                                        field.onChange(parseFloat(e.target.value))
                                                    }
                                                />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                            </CardContent>
                        </Card>
                    </div>

                    <Card>
                        <CardHeader>
                            <CardTitle>Description</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <FormField
                                control={form.control}
                                name='description'
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Description</FormLabel>
                                        <FormControl>
                                            <Textarea {...field} className='min-h-[100px]' />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </CardContent>
                    </Card>

                    <div className='grid grid-cols-1 gap-6 md:grid-cols-2'>
                        <Card>
                            <CardHeader>
                                <CardTitle>Features</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <MultiSelectField
                                    form={form}
                                    name='features'
                                    label='Features'
                                    options={featureOptions}
                                />
                            </CardContent>
                        </Card>

                        <Card>
                            <CardHeader>
                                <CardTitle>Highlights</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <MultiSelectField
                                    form={form}
                                    name='highlights'
                                    label='Highlights'
                                    options={highlightOptions}
                                />
                            </CardContent>
                        </Card>
                    </div>

                    <div className='grid grid-cols-1 gap-6 md:grid-cols-2'>
                        <Card>
                            <CardHeader>
                                <CardTitle>For Sale Details</CardTitle>
                            </CardHeader>
                            <CardContent className='space-y-4'>
                                <FormField
                                    control={form.control}
                                    name='forSale.isListed'
                                    render={({ field }) => (
                                        <FormItem className='flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4'>
                                            <FormControl>
                                                <Checkbox
                                                    checked={field.value}
                                                    onCheckedChange={field.onChange}
                                                />
                                            </FormControl>
                                            <div className='space-y-1 leading-none'>
                                                <FormLabel>Listed for Sale</FormLabel>
                                                <FormDescription>
                                                    Is this property listed for sale?
                                                </FormDescription>
                                            </div>
                                        </FormItem>
                                    )}
                                />
                                {form.watch('forSale.isListed') && (
                                    <>
                                        <FormField
                                            control={form.control}
                                            name='forSale.listPrice'
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormLabel>List Price</FormLabel>
                                                    <FormControl>
                                                        <Input {...field} />
                                                    </FormControl>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />
                                        <FormField
                                            control={form.control}
                                            name='forSale.pricePerSqft'
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormLabel>Price per sqft</FormLabel>
                                                    <FormControl>
                                                        <Input {...field} />
                                                    </FormControl>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />
                                        <FormField
                                            control={form.control}
                                            name='forSale.estimatedMortgage'
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormLabel>Estimated Mortgage</FormLabel>
                                                    <FormControl>
                                                        <Input {...field} />
                                                    </FormControl>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />
                                    </>
                                )}
                            </CardContent>
                        </Card>

                        <Card>
                            <CardHeader>
                                <CardTitle>For Rent Details</CardTitle>
                            </CardHeader>
                            <CardContent className='space-y-4'>
                                <FormField
                                    control={form.control}
                                    name='forRent.isListed'
                                    render={({ field }) => (
                                        <FormItem className='flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4'>
                                            <FormControl>
                                                <Checkbox
                                                    checked={field.value}
                                                    onCheckedChange={field.onChange}
                                                />
                                            </FormControl>
                                            <div className='space-y-1 leading-none'>
                                                <FormLabel>Listed for Rent</FormLabel>
                                                <FormDescription>
                                                    Is this property listed for rent?
                                                </FormDescription>
                                            </div>
                                        </FormItem>
                                    )}
                                />
                                {form.watch('forRent.isListed') && (
                                    <>
                                        <FormField
                                            control={form.control}
                                            name='forRent.monthlyRent'
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormLabel>Monthly Rent</FormLabel>
                                                    <FormControl>
                                                        <Input {...field} />
                                                    </FormControl>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />
                                        <FormField
                                            control={form.control}
                                            name='forRent.securityDeposit'
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormLabel>Security Deposit</FormLabel>
                                                    <FormControl>
                                                        <Input {...field} />
                                                    </FormControl>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />
                                        <FormField
                                            control={form.control}
                                            name='forRent.leaseTerm'
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormLabel>Lease Term</FormLabel>
                                                    <FormControl>
                                                        <Input {...field} />
                                                    </FormControl>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />
                                    </>
                                )}
                            </CardContent>
                        </Card>
                    </div>

                    <div className='grid grid-cols-1 gap-6 md:grid-cols-2'>
                        <Card>
                            <CardHeader>
                                <CardTitle>Financial Details</CardTitle>
                            </CardHeader>
                            <CardContent className='space-y-4'>
                                <FormField
                                    control={form.control}
                                    name='financialDetails.propertyTaxes'
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Property Taxes</FormLabel>
                                            <FormControl>
                                                <Input {...field} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name='financialDetails.hoaFees'
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>HOA Fees</FormLabel>
                                            <FormControl>
                                                <Input {...field} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name='financialDetails.insurance'
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Insurance</FormLabel>
                                            <FormControl>
                                                <Input {...field} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                            </CardContent>
                        </Card>

                        <Card>
                            <CardHeader>
                                <CardTitle>Cadaster Information</CardTitle>
                            </CardHeader>
                            <CardContent className='space-y-4'>
                                <FormField
                                    control={form.control}
                                    name='cadasterInformation.parcelNumber'
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Parcel Number</FormLabel>
                                            <FormControl>
                                                <Input {...field} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name='cadasterInformation.legalDescription'
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Legal Description</FormLabel>
                                            <FormControl>
                                                <Textarea {...field} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name='cadasterInformation.zoning'
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Zoning</FormLabel>
                                            <FormControl>
                                                <Input {...field} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name='cadasterInformation.landValue'
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Land Value</FormLabel>
                                            <FormControl>
                                                <Input {...field} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name='cadasterInformation.improvementValue'
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Improvement Value</FormLabel>
                                            <FormControl>
                                                <Input {...field} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                            </CardContent>
                        </Card>
                    </div>

                    <Card>
                        <CardHeader>
                            <CardTitle>Agent Information</CardTitle>
                        </CardHeader>
                        <CardContent className='space-y-4'>
                            <div className='grid grid-cols-1 gap-4 md:grid-cols-2'>
                                <FormField
                                    control={form.control}
                                    name='agentInformation.name'
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Name</FormLabel>
                                            <FormControl>
                                                <Input {...field} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name='agentInformation.title'
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Title</FormLabel>
                                            <FormControl>
                                                <Input {...field} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name='agentInformation.phone'
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Phone</FormLabel>
                                            <FormControl>
                                                <Input {...field} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name='agentInformation.email'
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Email</FormLabel>
                                            <FormControl>
                                                <Input type='email' {...field} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                            </div>
                            <FormField
                                control={form.control}
                                name='agentInformation.image'
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Image URL</FormLabel>
                                        <FormControl>
                                            <Input {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader>
                            <CardTitle>Property Images</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <ImageUploader
                                onUpload={handleImageUpload}
                                existingImages={images}
                                onImageChange={() => {}}
                            />
                            {form.formState.errors.images && (
                                <p className='text-sm font-medium text-destructive'>
                                    {form.formState.errors.images.message}
                                </p>
                            )}
                        </CardContent>
                    </Card>

                    <div className='flex justify-end'>
                        <Button type='submit' className='w-full md:w-auto'>
                            {isEditing ? 'Update Property' : 'Add Property'}
                        </Button>
                    </div>
                </form>
            </Form>
        </div>
    )
}
