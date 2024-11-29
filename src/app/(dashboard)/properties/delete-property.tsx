'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import DeleteElement from '@/components/delete-element'
import { deleteProperty } from '@/lib/db'
import { useToast } from '@/hooks/use-toast'

interface DeletePropertyProps {
    propertyId: string
    children: React.ReactNode
    refreshOnDelete?: boolean
    goBackOnDelete?: boolean
    showToastOnDelete?: boolean
}

export default function DeleteProperty({
    propertyId,
    children,
    refreshOnDelete = false,
    goBackOnDelete = false,
    showToastOnDelete = true,
}: DeletePropertyProps) {
    const router = useRouter()
    const { toast } = useToast()
    const [isOpen, setIsOpen] = useState(false)

    const onPropertyDeleteSuccess = () => {
        if (showToastOnDelete) {
            toast({
                title: 'Property deleted',
                description: 'The property has been successfully deleted.',
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
                elementId={propertyId}
                elementType='property'
                deleteFunction={deleteProperty}
                onDeleteSuccess={onPropertyDeleteSuccess}
                isOpen={isOpen}
                setIsOpen={setIsOpen}
            />
        </>
    )
}
