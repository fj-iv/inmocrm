'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from '@/components/ui/card'
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/components/ui/table'
import { Progress } from '@/components/ui/progress'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import { Input } from '@/components/ui/input'

export default function Component() {
    const [importing, setImporting] = useState(false)
    const [progress, setProgress] = useState(0)
    const [importResult, setImportResult] = useState<null | { success: boolean; message: string }>(
        null
    )
    const [apiKey, setApiKey] = useState('')

    const isApiKeyValid = apiKey.length === 20

    const startImport = () => {
        if (!isApiKeyValid) return

        setImporting(true)
        setProgress(0)
        setImportResult(null)

        const interval = setInterval(() => {
            setProgress((prevProgress) => {
                if (prevProgress >= 100) {
                    clearInterval(interval)
                    setImporting(false)
                    setImportResult({
                        success: Math.random() > 0.5, // Simulate success/failure
                        message:
                            Math.random() > 0.5
                                ? 'All data imported successfully.'
                                : 'Error: Some data could not be imported.',
                    })
                    return 100
                }
                return prevProgress + 10
            })
        }, 500)
    }

    return (
        <div className='container mx-auto space-y-8 p-4'>
            <Card>
                <CardHeader>
                    <CardTitle>Import Data from Inmovilla</CardTitle>
                    <CardDescription>
                        Transfer your data from Inmovilla to our CRM system
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <p>
                        Importing data from Inmovilla allows you to seamlessly transfer your
                        existing real estate listings, client information, and transaction history
                        to our modern CRM platform. This process ensures that you can continue your
                        work without losing valuable data.
                    </p>
                </CardContent>
            </Card>

            <Card>
                <CardHeader>
                    <CardTitle>Import Requirements</CardTitle>
                </CardHeader>
                <CardContent>
                    <ul className='list-disc space-y-2 pl-5'>
                        <li>Active Inmovilla account with administrative access</li>
                        <li>Inmovilla API key (contact Inmovilla support if you don't have one)</li>
                        <li>All data in Inmovilla should be up-to-date before import</li>
                        <li>
                            Ensure you have sufficient storage space in your current CRM account
                        </li>
                        <li>Stable internet connection during the import process</li>
                    </ul>
                </CardContent>
            </Card>

            <Card>
                <CardHeader>
                    <CardTitle>Previous Imports</CardTitle>
                </CardHeader>
                <CardContent>
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Date</TableHead>
                                <TableHead>Status</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            <TableRow>
                                <TableCell>2023-06-15</TableCell>
                                <TableCell className='text-green-600'>Successful</TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell>2023-05-01</TableCell>
                                <TableCell className='text-red-600'>Failed</TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell>2023-03-22</TableCell>
                                <TableCell className='text-green-600'>Successful</TableCell>
                            </TableRow>
                        </TableBody>
                    </Table>
                </CardContent>
            </Card>

            {!importResult && (
                <Card>
                    <CardHeader>
                        <CardTitle>Start Import</CardTitle>
                        <CardDescription>
                            Begin the data import process from Inmovilla
                        </CardDescription>
                    </CardHeader>
                    <CardContent className='space-y-4'>
                        {!importing ? (
                            <div className='space-y-2'>
                                <div className='flex space-x-4'>
                                    <div className='relative flex-grow'>
                                        <Input
                                            type='text'
                                            placeholder='Enter Inmovilla API Key'
                                            value={apiKey}
                                            onChange={(e) => setApiKey(e.target.value)}
                                            className={`w-full ${!isApiKeyValid && apiKey.length > 0 ? 'border-red-500' : ''}`}
                                        />
                                        <p className='mt-1 text-sm text-red-500'>
                                            API Key must be 20 characters
                                        </p>
                                    </div>
                                    <Button onClick={startImport} disabled={!isApiKeyValid}>
                                        Start Import
                                    </Button>
                                </div>
                            </div>
                        ) : (
                            <div className='space-y-2'>
                                <Progress value={progress} className='w-full' />
                                <p className='text-sm text-muted-foreground'>
                                    Importing data... {progress}% complete
                                </p>
                            </div>
                        )}
                    </CardContent>
                </Card>
            )}

            {importResult && (
                <Card>
                    <CardHeader>
                        <CardTitle>Import Result</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <Alert variant={importResult.success ? 'default' : 'destructive'}>
                            <AlertTitle
                                className={importResult.success ? 'text-green-600' : 'text-red-600'}
                            >
                                {importResult.success ? 'Success' : 'Error'}
                            </AlertTitle>
                            <AlertDescription>{importResult.message}</AlertDescription>
                        </Alert>
                    </CardContent>
                    <CardFooter>
                        <p
                            className={`text-sm ${importResult.success ? 'text-green-600' : 'text-red-600'}`}
                        >
                            {importResult.success
                                ? 'Your data has been successfully imported. Refresh the page to see the updated information.'
                                : 'There was an issue with the import. Please try again later or contact support if the problem persists.'}
                        </p>
                    </CardFooter>
                </Card>
            )}
        </div>
    )
}
