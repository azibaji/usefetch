"use client";
import { useEffect, useState } from "react";

export const useFetch = <dataType>(url:string) => {
    type Cache = {
        [url: string]: dataType;
    };
    const [data, setData] = useState<dataType | null>(null)
    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState<string | null>(null)
    const [cache, setCache] = useState<Cache>({})
    useEffect(() => {
        const fetchData = async () => {
            setIsLoading(true)
            try {
                if(cache[url]) {
                    setData(cache[url])
                    setIsLoading(false)
                    return
                }
                const response = await fetch(url)
                if (!response.ok) throw new Error(response.statusText);
                const json = await response.json()
                setIsLoading(false)
                setData(json)
                setError(null)
                setCache(prevCache =>({
                    ...prevCache,
                    [url]: json
                }))
            } catch(error) {
                setError(`${error} could not fetch data`)
                setIsLoading(false)
            }

        }
        fetchData()
    }, [url])
    return {data, isLoading, error}
}