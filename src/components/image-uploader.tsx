import { useState, useCallback } from 'react'
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import { Trash2 } from 'lucide-react'

interface ImageUploaderProps {
    initialImage?: string
    fallback?: string
    alt?: string
    onImageChange: (file: File | null) => void
    className?: string
    shape?: 'square' | 'circle'
    size?: 'sm' | 'md' | 'lg'
    existingImages: string[]
    onUpload: (newImages: string[]) => void
}

export default function ImageUploader({
    initialImage,
    fallback = 'Image',
    alt = 'Uploaded image',
    onImageChange,
    className = '',
    shape = 'circle',
    size = 'md',
    existingImages,
    onUpload,
}: ImageUploaderProps) {
    const [image, setImage] = useState<string | null>(initialImage || null)

    const handleImageChange = useCallback(
        (event: React.ChangeEvent<HTMLInputElement>) => {
            const file = event.target.files?.[0]
            if (file) {
                const reader = new FileReader()
                reader.onloadend = () => {
                    setImage(reader.result as string)
                }
                reader.readAsDataURL(file)
                onImageChange(file)
                onUpload([...existingImages, file.name])
            }
        },
        [onImageChange]
    )

    const handleRemoveImage = useCallback(() => {
        setImage(null)
        onImageChange(null)
    }, [onImageChange])

    const sizeClasses = {
        sm: 'h-16 w-16',
        md: 'h-24 w-24',
        lg: 'h-32 w-32',
    }

    const shapeClass = shape === 'square' ? 'rounded-lg' : ''

    return (
        <div className={`relative ${className}`}>
            <Avatar className={`${sizeClasses[size]} border-4 border-primary ${shapeClass}`}>
                <AvatarImage src={image || '/placeholder.svg?height=96&width=96'} alt={alt} />
                <AvatarFallback>{fallback}</AvatarFallback>
            </Avatar>
            <Label
                htmlFor='image-upload'
                className='absolute inset-0 flex cursor-pointer items-center justify-center bg-black bg-opacity-50 text-white opacity-0 transition-opacity hover:opacity-100'
            >
                Change Image
            </Label>
            <Input
                id='image-upload'
                type='file'
                onChange={handleImageChange}
                className='sr-only'
                accept='image/*'
            />
            {image && (
                <Button
                    type='button'
                    variant='destructive'
                    size='icon'
                    className='absolute -right-2 -top-2'
                    onClick={handleRemoveImage}
                >
                    <Trash2 className='h-4 w-4' />
                    <span className='sr-only'>Remove image</span>
                </Button>
            )}
        </div>
    )
}
