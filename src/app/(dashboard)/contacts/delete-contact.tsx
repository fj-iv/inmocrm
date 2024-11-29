'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import DeleteElement from '@/components/delete-element'
import { deleteContact } from '@/lib/db'
import { useToast } from '@/hooks/use-toast'

interface DeleteContactProps {
    contactId: string
    children: React.ReactNode
    refreshOnDelete?: boolean
    goBackOnDelete?: boolean
    showToastOnDelete?: boolean
}

export default function DeleteContact({
    contactId,
    children,
    refreshOnDelete = false,
    goBackOnDelete = false,
    showToastOnDelete = true,
}: DeleteContactProps) {
    const router = useRouter()
    const { toast } = useToast()

    const [isOpen, setIsOpen] = useState(false)

    const onContactDeleteSuccess = () => {
        if (showToastOnDelete) {
            toast({
                title: 'Contact deleted',
                description: 'The contact has been successfully deleted.',
            })
        }
        if (refreshOnDelete) {
            router.refresh()
        } else if (goBackOnDelete) {
            router.back()
        }
    }

    return (
        <>
            <div onClick={() => setIsOpen(true)}>{children}</div>
            <DeleteElement
                elementId={contactId}
                elementType='contact'
                deleteFunction={deleteContact}
                onDeleteSuccess={onContactDeleteSuccess}
                isOpen={isOpen}
                setIsOpen={setIsOpen}
            />
        </>
    )
}
