import { useState, useEffect } from 'react';
import axios from 'axios';

// Obviously that's is created about fetch data
const useAxiosFetch = (dataUrl) => {
    const [data, setData] = useState([])
    const [fetchError, setFetchError] = useState(null)
    const [isLoading, setIsLoading] = useState(null);

    useEffect(() => {
        let isMounted = true;
        const source = axios.CancelToken.source() // it's canceled connection to the source;

        const fetchData = async (url) => {
            setIsLoading(true)
            try {
                const response = await axios.get(url, {
                    cancelToken: source.token
                });
                if (isMounted) {
                    setData(response.data)
                    setFetchError(null)
                }
            }
            catch (err) {
                if (isMounted) {
                    setFetchError(err.message)
                    setData([])
                }
            }
            finally {
                isMounted && setTimeout(() => { setIsLoading(false) }, 2000)
            }
        }

        fetchData(dataUrl)

        // it's a closure function
        const cleanUp = () => {
            console.log("clean up function");
            isMounted = false;
            source.cancel()
            console.log("Explantation details about source object ", source);
        }
        return cleanUp;
    }, [dataUrl])

    return { data, fetchError, isLoading }

}

export default useAxiosFetch;