import React, { useEffect, useState } from 'react';
import axios from 'axios';

interface BackendData {
    message: string;
}

const BackendData: React.FC = () => {
    const [data, setData] = useState<BackendData | null>(null);
    const [error, setError] = useState<string>('');
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                console.log('Attempting to fetch data from backend...');
                const response = await axios.get<BackendData>('http://localhost:8000/api/', {
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json',
                    },
                });
                console.log('Response received:', response.data);
                setData(response.data);
                setLoading(false);
            } catch (err: any) {
                console.error('Error details:', err);
                setError(err.response
                    ? `Error ${err.response.status}: ${err.response.data?.message || err.message}`
                    : 'Error when receiving data from the server');
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    if (loading) {
        return (
            <div className="flex justify-center items-center p-4">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
            </div>
        );
    }

    return (
        <div className="p-4">
            {error && (
                <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4">
                    <strong className="font-bold">Error: </strong>
                    <span className="block sm:inline">{error}</span>
                </div>
            )}
            {data && (
                <div className="bg-white shadow-lg rounded-lg p-6">
                    <h2 className="text-2xl font-bold mb-4">Message from the server:</h2>
                    <p className="text-gray-700">{data.message}</p>
                </div>
            )}
        </div>
    );
};

export default BackendData; 