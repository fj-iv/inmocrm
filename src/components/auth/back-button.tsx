import Link from 'next/link'
import { Button } from '@/components/ui/button'

interface BackButtonProps {
    label: string
    href: string
}

const BackButton: React.FC<BackButtonProps> = ({ label, href }) => {
    return (
        <Button variant='link' className='w-full font-normal' size='sm' asChild>
            <Link href={href}>{label}</Link>
        </Button>
    )
}

export default BackButton
