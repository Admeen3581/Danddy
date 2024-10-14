"use client";

import { getDnDAPI } from '@/utils/httpRequester';
import useLocalStore from '@/utils/store';
import { useEffect, useState } from 'react';

const CharacterCreation = () => {
    const { classesJson, setClassesJson } = useLocalStore();
    const [fetchedData, setFetchedData] = useState<JSON[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchClasses = async () => {
            try {
                const results = await getDnDAPI("classes");
                setFetchedData(results.results || []);
                setLoading(false);
            } catch (error) {
                console.error("Error fetching classes:", error);
                setLoading(false);
            }
        };

        fetchClasses();
    }, []);

    const handleClassChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        console.log('Selected class:', e.target.value);
    };

    return (
        <div style={{ display: 'flex', height: '100vh', backgroundColor: 'black' }}>
            <div style={{
                flex: 1,
                padding: '20px',
                marginLeft: '-400px',
                backgroundImage: 'url(https://external-preview.redd.it/u0bZOwzMBYZ7vvp8lJ0U_VeonHAIvX87SS_vGDe0Y-M.jpg?width=1080&crop=smart&auto=webp&s=87214f42d64b1a5b87859bfee903080fdd3f9330)',
                backgroundSize: 'cover',
                backgroundPosition: 'left center',
                color: 'white',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexDirection: 'column',
                overflow: 'hidden',
            }}>
                <h1 style={{
                    textAlign: 'center',
                    fontFamily: 'Georgia, serif',
                    fontSize: '36px',
                    backgroundColor: 'rgba(0, 0, 0, 0.7)',
                    color: 'white',
                    padding: '10px 20px',
                    borderRadius: '10px',
                    marginLeft: '400px',
                }}>
                    Welcome to the D&D Character Creator!
                </h1>
            </div>

            <div style={{
                width: '400px',
                padding: '20px',
                backgroundColor: '#333333',
                boxShadow: '-2px 0 5px rgba(0,0,0,0.1)',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                color: 'white',
                flexShrink: 0,
            }}>
                <h2 style={{ fontFamily: 'Georgia, serif', fontSize: '24px', marginBottom: '10px' }}>
                    Select a Class
                </h2>
                <select
                    onChange={handleClassChange}
                    disabled={loading}
                    style={{
                        fontFamily: 'Georgia, serif',
                        fontSize: '16px',
                        backgroundColor: 'black',
                        color: 'white'
                    }}>
                    <option value="" disabled>Select a class</option>
                    {fetchedData.map((dndClass) => (
                        <option key={dndClass['index']} value={dndClass['index']}>
                            {dndClass['name']}
                        </option>
                    ))}
                </select>
            </div>
        </div>
    );
};

export default CharacterCreation;
