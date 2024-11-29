'use client'

import React from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { ScrollArea } from '@/components/ui/scroll-area'
import { ResponsivePie } from '@nivo/pie'
import { ResponsiveLine } from '@nivo/line'
import { ResponsiveBar } from '@nivo/bar'
import { Bell, Home, Users, DollarSign, Key, AlertCircle, Trophy } from 'lucide-react'
import { DashboardData } from '@/lib/db'

interface DashboardProps {
    data: DashboardData
}

export default function Dashboard({ data }: DashboardProps) {
    const {
        agentRanking,
        managersNotes,
        recentUpdates,
        newClients,
        propertyDistribution,
        propertyTypes,
        crmUpdates,
    } = data

    return (
        <div className='flex min-h-screen flex-col bg-background p-4 md:p-6 lg:p-8'>
            <main className='flex-1'>
                <div className='grid gap-6 md:grid-cols-2 lg:grid-cols-3'>
                    <Card>
                        <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
                            <CardTitle className='text-lg font-bold'>Agent Ranking</CardTitle>
                            <Trophy className='h-6 w-6 text-muted-foreground' />
                        </CardHeader>
                        <CardContent>
                            <div className='text-3xl font-extrabold'>{agentRanking.rank}</div>
                            <p className='mt-2 text-xl'>{agentRanking.title}</p>
                            <div className='mt-4 space-y-2'>
                                <div className='flex items-center justify-between'>
                                    <span>Sales Volume:</span>
                                    <span className='font-semibold'>
                                        {agentRanking.salesVolume}
                                    </span>
                                </div>
                                <div className='flex items-center justify-between'>
                                    <span>Transactions:</span>
                                    <span className='font-semibold'>
                                        {agentRanking.transactions}
                                    </span>
                                </div>
                                <div className='flex items-center justify-between'>
                                    <span>Client Satisfaction:</span>
                                    <span className='font-semibold'>
                                        {agentRanking.clientSatisfaction}
                                    </span>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardHeader>
                            <CardTitle>Manager's Notes</CardTitle>
                            <CardDescription>Important tasks and reminders</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <ScrollArea className='h-[200px] w-full'>
                                <div className='space-y-4'>
                                    {managersNotes.map((note, index) => (
                                        <div key={index} className='flex items-center'>
                                            <AlertCircle className='h-9 w-9 rounded-full bg-muted p-2' />
                                            <div className='ml-4 space-y-1'>
                                                <p className='text-sm font-medium leading-none'>
                                                    {note.title}
                                                </p>
                                                <p className='text-sm text-muted-foreground'>
                                                    {note.description}
                                                </p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </ScrollArea>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardHeader>
                            <CardTitle>Recent Updates</CardTitle>
                            <CardDescription>
                                Latest news from clients and properties
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            <ScrollArea className='h-[200px] w-full'>
                                <div className='space-y-4'>
                                    {recentUpdates.map((update, index) => (
                                        <div key={index} className='flex items-center'>
                                            {update.avatar ? (
                                                <Avatar className='h-9 w-9'>
                                                    <AvatarImage src={update.avatar} alt='Avatar' />
                                                    <AvatarFallback>
                                                        {update.fallback}
                                                    </AvatarFallback>
                                                </Avatar>
                                            ) : (
                                                <Home className='h-9 w-9 rounded-full bg-muted p-2' />
                                            )}
                                            <div className='ml-4 space-y-1'>
                                                <p className='text-sm font-medium leading-none'>
                                                    {update.name || update.title}
                                                </p>
                                                <p className='text-sm text-muted-foreground'>
                                                    {update.message}
                                                </p>
                                            </div>
                                            <div className='ml-auto font-medium'>{update.time}</div>
                                        </div>
                                    ))}
                                </div>
                            </ScrollArea>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
                            <CardTitle className='text-sm font-medium'>
                                New Clients This Month
                            </CardTitle>
                            <Users className='h-4 w-4 text-muted-foreground' />
                        </CardHeader>
                        <CardContent>
                            <div className='text-2xl font-bold'>{newClients.count}</div>
                            <p className='text-xs text-muted-foreground'>
                                {newClients.percentageChange} from last month
                            </p>
                            <div className='h-[200px]'>
                                <ResponsiveLine
                                    data={newClients.lineData}
                                    margin={{ top: 20, right: 20, bottom: 60, left: 55 }}
                                    xScale={{ type: 'point' }}
                                    yScale={{
                                        type: 'linear',
                                        min: 'auto',
                                        max: 'auto',
                                        stacked: true,
                                        reverse: false,
                                    }}
                                    curve='cardinal'
                                    axisBottom={{
                                        tickSize: 5,
                                        tickPadding: 5,
                                        tickRotation: 0,
                                        legend: 'Weeks',
                                        legendOffset: 36,
                                        legendPosition: 'middle',
                                    }}
                                    axisLeft={{
                                        tickSize: 5,
                                        tickPadding: 5,
                                        tickRotation: 0,
                                        legend: 'Clients',
                                        legendOffset: -40,
                                        legendPosition: 'middle',
                                    }}
                                    colors={{ scheme: 'category10' }}
                                    pointSize={10}
                                    pointColor={{ theme: 'background' }}
                                    pointBorderWidth={2}
                                    pointBorderColor={{ from: 'serieColor' }}
                                    enableSlices='x'
                                />
                            </div>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
                            <CardTitle className='text-sm font-medium'>
                                Property Distribution
                            </CardTitle>
                            <Home className='h-4 w-4 text-muted-foreground' />
                        </CardHeader>
                        <CardContent>
                            <div className='h-[200px]'>
                                <ResponsivePie
                                    data={propertyDistribution}
                                    margin={{ top: 20, right: 20, bottom: 20, left: 20 }}
                                    innerRadius={0.5}
                                    padAngle={0.7}
                                    cornerRadius={3}
                                    activeOuterRadiusOffset={8}
                                    colors={{ scheme: 'paired' }}
                                    borderWidth={1}
                                    borderColor={{ from: 'color', modifiers: [['darker', 0.2]] }}
                                    enableArcLinkLabels={false}
                                    arcLabelsSkipAngle={10}
                                    arcLabelsTextColor={{
                                        from: 'color',
                                        modifiers: [['darker', 2]],
                                    }}
                                />
                            </div>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
                            <CardTitle className='text-sm font-medium'>Property Types</CardTitle>
                            <Key className='h-4 w-4 text-muted-foreground' />
                        </CardHeader>
                        <CardContent>
                            <div className='h-[200px]'>
                                <ResponsiveBar
                                    data={propertyTypes}
                                    keys={['For Sale', 'For Rent']}
                                    indexBy='property'
                                    margin={{ top: 20, right: 20, bottom: 40, left: 40 }}
                                    padding={0.3}
                                    groupMode='grouped'
                                    valueScale={{ type: 'linear' }}
                                    indexScale={{ type: 'band', round: true }}
                                    colors={{ scheme: 'paired' }}
                                    borderColor={{ from: 'color', modifiers: [['darker', 1.6]] }}
                                    axisBottom={{
                                        tickSize: 5,
                                        tickPadding: 5,
                                        tickRotation: 0,
                                        legend: 'Property Type',
                                        legendPosition: 'middle',
                                        legendOffset: 32,
                                    }}
                                    axisLeft={{
                                        tickSize: 5,
                                        tickPadding: 5,
                                        tickRotation: 0,
                                        legend: 'Count',
                                        legendPosition: 'middle',
                                        legendOffset: -40,
                                    }}
                                    labelSkipWidth={12}
                                    labelSkipHeight={12}
                                    labelTextColor={{ from: 'color', modifiers: [['darker', 1.6]] }}
                                />
                            </div>
                        </CardContent>
                    </Card>

                    <Card className='col-span-full'>
                        <CardHeader>
                            <CardTitle>CRM Updates</CardTitle>
                            <CardDescription>Latest features and improvements</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <ScrollArea className='h-[200px] w-full'>
                                <div className='space-y-4'>
                                    {crmUpdates.map((update, index) => (
                                        <div key={index} className='flex items-center'>
                                            {update.icon === 'Bell' && (
                                                <Bell className='h-9 w-9 rounded-full bg-muted p-2' />
                                            )}
                                            {update.icon === 'DollarSign' && (
                                                <DollarSign className='h-9 w-9 rounded-full bg-muted p-2' />
                                            )}
                                            {update.icon === 'Users' && (
                                                <Users className='h-9 w-9 rounded-full bg-muted p-2' />
                                            )}
                                            <div className='ml-4 space-y-1'>
                                                <p className='text-sm font-medium leading-none'>
                                                    {update.title}
                                                </p>
                                                <p className='text-sm text-muted-foreground'>
                                                    {update.description}
                                                </p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </ScrollArea>
                        </CardContent>
                    </Card>
                </div>
            </main>
        </div>
    )
}
