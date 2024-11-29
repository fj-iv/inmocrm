import Link from 'next/link'
import { Upload } from 'lucide-react'
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip'

export default function ToolsPage() {
    return (
        <div className='min-h-screen bg-gray-100 p-4 sm:p-6 md:p-8'>
            <div className='grid grid-cols-3 gap-4 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-8'>
                <TooltipProvider>
                    <Tooltip>
                        <TooltipTrigger asChild>
                            <Link href='/tools/import-inmovilla'>
                                <button className='flex flex-col items-center justify-center rounded-lg p-2 text-center transition-all hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-opacity-50 active:bg-gray-300'>
                                    <div className='mb-2 rounded-lg border border-gray-200 bg-white p-4 shadow-sm'>
                                        <Upload className='h-12 w-12 text-gray-600' />
                                    </div>
                                    <span className='max-w-[80px] break-words text-xs font-medium text-gray-800'>
                                        Import data from Inmovilla
                                    </span>
                                </button>
                            </Link>
                        </TooltipTrigger>
                        <TooltipContent>
                            <p>Import your real estate data from Inmovilla into the CRM</p>
                        </TooltipContent>
                    </Tooltip>
                </TooltipProvider>
            </div>
        </div>
    )
}
