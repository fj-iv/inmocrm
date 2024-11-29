'use client'

import { useState } from 'react'
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
} from '@/components/ui/alert-dialog'
import { Button } from '@/components/ui/button'

interface DeleteElementProps {
    elementId: string
    elementType: string
    deleteFunction: (id: string) => Promise<void>
    onDeleteSuccess?: () => void
    isOpen: boolean
    setIsOpen: (isOpen: boolean) => void
}

export default function DeleteElement({
    elementId,
    elementType,
    deleteFunction,
    onDeleteSuccess,
    isOpen,
    setIsOpen,
}: DeleteElementProps) {
    const [isDeleting, setIsDeleting] = useState(false)

    const handleDelete = async () => {
        setIsDeleting(true)
        try {
            await deleteFunction(elementId)
            if (onDeleteSuccess) {
                onDeleteSuccess()
            }
        } catch (error) {
            console.error(`Error deleting ${elementType}:`, error)
            alert(`Failed to delete ${elementType}. Please try again.`)
        } finally {
            setIsDeleting(false)
            setIsOpen(false)
        }
    }

    return (
        <AlertDialog open={isOpen} onOpenChange={setIsOpen}>
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>Confirm Deletion</AlertDialogTitle>
                    <AlertDialogDescription>
                        Are you sure you want to delete this {elementType}? This action cannot be
                        undone.
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel asChild>
                        <Button variant='outline' disabled={isDeleting}>
                            Cancel
                        </Button>
                    </AlertDialogCancel>
                    <AlertDialogAction asChild>
                        <Button variant='destructive' onClick={handleDelete} disabled={isDeleting}>
                            {isDeleting ? 'Deleting...' : `Delete ${elementType}`}
                        </Button>
                    </AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    )
}
