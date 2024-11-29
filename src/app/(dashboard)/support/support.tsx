import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Mail, Phone, Clock, ExternalLink } from 'lucide-react'

export default function Component() {
    return (
        <div className='container mx-auto max-w-3xl px-4 py-8'>
            <h1 className='mb-8 text-center text-4xl font-bold'>Support Center</h1>

            <div className='mb-12 grid grid-cols-1 gap-8'>
                <Card>
                    <CardHeader>
                        <CardTitle>Contact Information</CardTitle>
                        <CardDescription>Get in touch with our support team</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className='space-y-4'>
                            <div className='flex items-center'>
                                <Mail className='mr-2 h-4 w-4' />
                                <span>support@example.com</span>
                            </div>
                            <div className='flex items-center'>
                                <Phone className='mr-2 h-4 w-4' />
                                <span>+1 (555) 123-4567</span>
                            </div>
                            <div className='flex items-center'>
                                <Clock className='mr-2 h-4 w-4' />
                                <span>Monday - Friday, 9:00 AM - 5:00 PM EST</span>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </div>

            <div className='mb-12'>
                <h2 className='mb-4 text-2xl font-semibold'>Contact Us</h2>
                <Card>
                    <CardContent className='pt-6'>
                        <form className='space-y-4'>
                            <div className='space-y-2'>
                                <label htmlFor='name' className='text-sm font-medium'>
                                    Name
                                </label>
                                <Input id='name' placeholder='Your name' />
                            </div>
                            <div className='space-y-2'>
                                <label htmlFor='email' className='text-sm font-medium'>
                                    Email
                                </label>
                                <Input id='email' type='email' placeholder='Your email' />
                            </div>
                            <div className='space-y-2'>
                                <label htmlFor='subject' className='text-sm font-medium'>
                                    Subject
                                </label>
                                <Input id='subject' placeholder='What is your inquiry about?' />
                            </div>
                            <div className='space-y-2'>
                                <label htmlFor='message' className='text-sm font-medium'>
                                    Message
                                </label>
                                <Textarea
                                    id='message'
                                    placeholder='Please describe your issue or question'
                                    rows={4}
                                />
                            </div>
                            <Button type='submit' className='w-full'>
                                Send Message
                            </Button>
                        </form>
                    </CardContent>
                </Card>
            </div>

            <div className='text-center text-sm text-muted-foreground'>
                <p>
                    For urgent matters outside of our support hours, please email{' '}
                    <a href='mailto:urgent@example.com' className='text-primary hover:underline'>
                        urgent@example.com
                    </a>
                </p>
                <p className='mt-2'>
                    By using our support services, you agree to our{' '}
                    <a href='#' className='text-primary hover:underline'>
                        Terms of Service
                    </a>{' '}
                    and{' '}
                    <a href='#' className='text-primary hover:underline'>
                        Privacy Policy
                    </a>
                    .
                </p>
            </div>
        </div>
    )
}
