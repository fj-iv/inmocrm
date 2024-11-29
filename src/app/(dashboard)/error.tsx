'use client'

import ErrorComponent from '@/components/error-component'

export default function Error({ error }: { error: Error }) {
    return <ErrorComponent error={error} />
}
