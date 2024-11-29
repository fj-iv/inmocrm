import Dashboard from './dashboard'
import { getDashboardData } from '@/lib/db'

export default async function DashboardPage() {
    const dashboardData = await getDashboardData()

    return <Dashboard data={dashboardData} />
}
