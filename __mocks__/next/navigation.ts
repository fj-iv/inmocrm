jest.mock('next/navigation', () => ({
    useParams() {
        return {
            prefetch: () => null,
        }
    },
    useRouter() {
        return {
            prefetch: () => null,
        }
    },
}))
