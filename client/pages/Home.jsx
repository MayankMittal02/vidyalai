import axiosInstance from '../apicalls';
import React, { useEffect, useState } from 'react'
import Uploadpdf from './Uploadpdf.jsx';
import { Navigate } from 'react-router-dom';

function Home() {

    const isAuthenticated = localStorage.getItem('token');

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
            {isAuthenticated ? <div>< Uploadpdf ></Uploadpdf >
                <div>Your saved PDF</div>
                <div>
                    <ul>
                        {data.map((item) => (
                            <li key={item._id}>
                                <a href={item.source} target="_blank">{item.name}</a>
                            </li>
                        ))}
                    </ul>
                </div></div> : <Navigate to="/login"/>}
        </>
    )

}

export default Home