import { useEffect, useState } from "react"

const useFetch = <T>(fetchFunc: () => Promise<T>, autoFetch = true) => {
    const [data, setData] = useState<T | null>(null)
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState<Error | null>(null)

    const fetchData = async () => {
        try {
            setLoading(true)
            setError(null)
            const result = await fetchFunc()
            setData(result)
        } catch (err) {
            setError(err as Error)
        } finally {
            setLoading(false)
        }
    }

    const reset = () => {
        setData(null)
        setError(null)
        setLoading(false)
    }

    useEffect(() => {
        if (autoFetch) {
            fetchData()
        }
    }, [autoFetch])

    return { data, loading, error, fetchData, reset }
}

export default useFetch;