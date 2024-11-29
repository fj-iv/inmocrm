import * as React from 'react'
import Image from 'next/image'
import { Card, CardContent } from '@/components/ui/card'
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from '@/components/ui/carousel'

interface CarouselProps {
    images: string[]
}

const ImageCarousel: React.FC<CarouselProps> = ({ images }) => {
    return (
        <Carousel className='relative w-full h-full'>
            <CarouselContent className='h-full'>
                {images.map((image, index) => (
                    <CarouselItem key={index} className='h-full'>
                        <Card className='h-full'>
                            <CardContent className='h-full p-0'>
                                <div className='relative aspect-[16/9] w-full h-full overflow-hidden rounded-lg'>
                                    <Image
                                        src={image}
                                        alt={`Carousel image ${index + 1}`}
                                        fill
                                        className='object-cover'
                                    />
                                </div>
                            </CardContent>
                        </Card>
                    </CarouselItem>
                ))}
            </CarouselContent>
            <CarouselPrevious className='absolute left-2 top-1/2 -translate-y-1/2' />
            <CarouselNext className='absolute right-2 top-1/2 -translate-y-1/2' />
        </Carousel>
    )
}

export default ImageCarousel
