import { Button } from '@/components/ui/button'
import Image from 'next/image'
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import Link from 'next/link'


export async function User() {
    const user = {
        image: '/placeholder-user.jpg',
    }

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant='outline' size='icon' className='overflow-hidden rounded-full'>
                    <Image
                        src={user?.image ?? '/placeholder-user.jpg'}
                        width={36}
                        height={36}
                        alt='Avatar'
                        className='overflow-hidden rounded-full'
                    />
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align='end'>
                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                    <Link href='/settings'>Settings</Link>
                </DropdownMenuItem>
                <DropdownMenuItem>
                <Link href='/support'>Support</Link>
                </DropdownMenuItem>
                <DropdownMenuItem>
                    <Link href='/auth/login'>Log out</Link>
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    )
}
