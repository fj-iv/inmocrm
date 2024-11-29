import Link from 'next/link'
import { PanelLeft, Users2, Building, LayoutDashboard, Wrench } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet'

export default function MobileNav() {
    return (
        <Sheet>
            <SheetTrigger asChild>
                <Button size='icon' variant='outline' className='sm:hidden'>
                    <PanelLeft className='h-5 w-5' />
                    <span className='sr-only'>Toggle Menu</span>
                </Button>
            </SheetTrigger>
            <SheetContent side='left' className='sm:max-w-xs'>
                <nav className='grid gap-6 text-lg font-medium'>
                    <Link
                        href='/'
                        className='flex items-center gap-4 px-2.5 text-muted-foreground hover:text-foreground'
                    >
                        <LayoutDashboard className='h-5 w-5' />
                        Dashboard
                    </Link>
                    <Link
                        href='/contacts'
                        className='flex items-center gap-4 px-2.5 text-muted-foreground hover:text-foreground'
                    >
                        <Users2 className='h-5 w-5' />
                        Contacts
                    </Link>
                    <Link
                        href='/properties'
                        className='flex items-center gap-4 px-2.5 text-foreground'
                    >
                        <Building className='h-5 w-5' />
                        Properties
                    </Link>
                    <Link
                        href='/tools'
                        className='flex items-center gap-4 px-2.5 text-muted-foreground hover:text-foreground'
                    >
                        <Wrench className='h-5 w-5' />
                        Tools
                    </Link>
                </nav>
            </SheetContent>
        </Sheet>
    )
}
