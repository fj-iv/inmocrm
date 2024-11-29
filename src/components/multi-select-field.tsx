'use client'

import clsx from 'clsx'
import { UseFormReturn } from 'react-hook-form'
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from '@/components/ui/form'
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { X } from 'lucide-react'

interface Option {
    id: number
    name: string
}

interface MultiSelectFieldProps {
    form: UseFormReturn<any>
    name: string
    label: string
    options: Option[]
    className?: string
}

export default function MultiSelectField({
    form,
    name,
    label,
    options,
    className,
}: MultiSelectFieldProps) {
    const selectedValues: number[] = form.watch(name) || []

    const handleSelect = (value: number) => {
        const currentValues: number[] = form.getValues(name) || []

        if (!currentValues.includes(value)) {
            form.setValue(name, [...currentValues, value])
        }
    }

    const handleRemove = (value: number) => {
        const currentValues: number[] = form.getValues(name) || []

        form.setValue(
            name,
            currentValues.filter((v: number) => v !== value)
        )
    }

    const selectedOptions = options.filter((option) => selectedValues.includes(option.id))
    const selectedNames = selectedOptions.map((option) => option.name).join(', ')

    return (
        <FormField
            control={form.control}
            name={name}
            render={() => (
                <FormItem className={clsx('space-y-2', className)}>
                    <FormLabel>{label}</FormLabel>
                    <FormControl>
                        <Select onValueChange={(value) => handleSelect(Number(value))}>
                            <SelectTrigger>
                                <SelectValue placeholder={`Select ${label.toLowerCase()}`}>
                                    {selectedNames || `Select ${label.toLowerCase()}`}
                                </SelectValue>
                            </SelectTrigger>
                            <SelectContent>
                                {options
                                    .filter((option) => !selectedValues.includes(option.id))
                                    .map((option) => (
                                        <SelectItem key={option.id} value={option.id.toString()}>
                                            {option.name}
                                        </SelectItem>
                                    ))}
                            </SelectContent>
                        </Select>
                    </FormControl>
                    <div className='flex flex-wrap gap-2'>
                        {selectedOptions.map((option) => (
                            <Badge key={option.id} variant='secondary'>
                                {option.name}
                                <Button
                                    type='button'
                                    variant='ghost'
                                    size='sm'
                                    className='ml-2 h-auto p-0 text-base'
                                    onClick={() => handleRemove(option.id)}
                                >
                                    <X className='h-3 w-3' />
                                </Button>
                            </Badge>
                        ))}
                    </div>
                    <FormMessage />
                </FormItem>
            )}
        />
    )
}
