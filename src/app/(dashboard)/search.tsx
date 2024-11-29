'use client'

import { useState, useTransition, useRef } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { Input } from '@/components/ui/input'
import { Spinner } from '@/components/icons'
import { Search } from 'lucide-react'
import { useDebouncedCallback } from 'use-debounce'
import { search, SearchResult } from '@/lib/db'

export function SearchInput() {
    const router = useRouter()
    const [isPending, startTransition] = useTransition()
    const [searchResults, setSearchResults] = useState<SearchResult[]>([])
    const [isDropdownOpen, setIsDropdownOpen] = useState(false)
    const [searchQuery, setSearchQuery] = useState('')
    const inputRef = useRef<HTMLInputElement>(null)

    const debouncedSearch = useDebouncedCallback(async (value: string) => {
        const trimmedValue = value.trim()
        if (trimmedValue === '') {
            setSearchResults([])
            setIsDropdownOpen(false)
            return
        }
        const results = await search(trimmedValue)
        setSearchResults(results)
        setIsDropdownOpen(true)
    }, 500)

    async function searchAction(formData: FormData) {
        let value = formData.get('q') as string
        let trimmedValue = value.trim()
        if (trimmedValue === '') {
            setSearchResults([])
            setIsDropdownOpen(false)
            return
        }
        setSearchQuery(trimmedValue)
        let params = new URLSearchParams({ q: trimmedValue })
        startTransition(() => {
            router.replace(`/?${params.toString()}`)
        })

        debouncedSearch(trimmedValue)
    }

    function handleInputChange(e: React.ChangeEvent<HTMLInputElement>) {
        setSearchQuery(e.target.value)
        setIsDropdownOpen(false) // Hide dropdown while typing
        debouncedSearch(e.target.value)
    }

    function handleLinkClick() {
        setIsDropdownOpen(false)
        setSearchResults([])
        setSearchQuery('')
        if (inputRef.current) {
            inputRef.current.value = ''
        }
    }

    return (
        <div className='relative ml-auto flex-1 md:grow-0'>
            <form action={searchAction} className='relative'>
                <Search className='absolute left-2.5 top-[.75rem] h-4 w-4 text-muted-foreground' />
                <Input
                    ref={inputRef}
                    name='q'
                    type='search'
                    placeholder='Search...'
                    className='w-full rounded-lg bg-background pl-8 md:w-[200px] lg:w-[336px]'
                    readOnly={isPending}
                    onChange={handleInputChange}
                    onFocus={() => setIsDropdownOpen(true)}
                    onBlur={() => setTimeout(() => setIsDropdownOpen(false), 200)} // Delay to allow click event to register
                    autoComplete='off'
                />
                {isPending && (
                    <div className='absolute bottom-0 right-0 top-2 z-[1]'>
                        <Spinner />
                    </div>
                )}
            </form>

            {isDropdownOpen && searchQuery.trim() !== '' && (
                <div className='absolute z-10 mt-1 w-full rounded-md border border-gray-200 bg-white shadow-lg'>
                    {searchResults.length > 0 ? (
                        searchResults.map((result) => (
                            <Link
                                key={result.id}
                                href={result.link}
                                className='block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100'
                                onClick={handleLinkClick}
                            >
                                <span className='font-medium'>{result.title}</span>
                                <span className='ml-2 text-xs text-gray-500'>({result.type})</span>
                            </Link>
                        ))
                    ) : (
                        <div className='px-4 py-2 text-sm text-gray-700'>No results found</div>
                    )}
                </div>
            )}
        </div>
    )
}
