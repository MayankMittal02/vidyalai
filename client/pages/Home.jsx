import axiosInstance from '../apicalls';
import React, { useEffect, useState } from 'react'

function Home() {

    const [data, setData] = useState([])

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axiosInstance.get('/pdf/getpdf');
                setData(response.data.result);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, []);

    return (
        <>
            <div>Your saved PDF</div>
            <div>
                <ul>

                    {data.map((item) => (
                        <li key={item._id}>
                            <a href={item.source} target="_blank">{item.name}</a>
                        </li>
                    ))}
                </ul>
            </div>
        </>
    )
}

export default Home