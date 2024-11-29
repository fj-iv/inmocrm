import { Users2, Building, LayoutDashboard, Wrench } from 'lucide-react'
import { NavItem } from './nav-item'

export default function DesktopNav() {
    return (
        <aside className='fixed inset-y-0 left-0 z-10 hidden w-14 flex-col border-r bg-background sm:flex'>
            <nav className='flex flex-col items-center gap-4 px-2 sm:pb-5 sm:pt-16'>
                <NavItem href='/' label='Dashboard'>
                    <LayoutDashboard className='h-5 w-5' />
                </NavItem>

                <NavItem href='/contacts' label='Contacts'>
                    <Users2 className='h-5 w-5' />
                </NavItem>

                <NavItem href='/properties' label='Properties'>
                    <Building className='h-5 w-5' />
                </NavItem>

                <NavItem href='/tools' label='Tools'>
                    <Wrench className='h-5 w-5' />
                </NavItem>
            </nav>
        </aside>
    )
}
