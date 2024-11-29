import Providers from './providers'
import { User } from './user'
import { SearchInput } from './search'
import DesktopNav from './desktop-nav'
import MobileNav from './mobile-nav'
import DashboardBreadcrumb from './dashboard-breadcrumb'

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
    return (
        <Providers>
            <div className='bg-muted/40'>
                <DesktopNav />

                <div className='h-screen overflow-hidden flex flex-col sm:gap-4 sm:py-4 sm:pl-14'>
                    <header className='sticky top-0 z-30 flex h-14 items-center gap-4 border-b bg-background px-4 sm:static sm:h-auto sm:border-0 sm:bg-transparent sm:px-6'>
                        <MobileNav />
                        <DashboardBreadcrumb />
                        <SearchInput />
                        <User />
                    </header>

                    <main className='grid flex-1 items-start gap-2 overflow-y-auto bg-muted/40 p-4 sm:px-6 sm:py-0 md:gap-4'>
                        {children}
                    </main>
                </div>
            </div>
        </Providers>
    )
}
