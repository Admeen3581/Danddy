"use client"

import { getDnDAPI } from '@/utils/httpRequester';
import useLocalStore from '@/utils/store';
import { useEffect, useRef } from 'react';

const charactercreation = () => {
    const { classesJson, setClassesJson } = useLocalStore();
    const fetchedData = useRef<JSON[]>([]); // Initialize as an empty array
    const loading = false;

    useEffect(() => {
        const fetchClasses = async () => {
            getDnDAPI("classes")
                .then((results) => {
                    console.log(results);
                    fetchedData.current = [results]
                });
            ;
        };

        fetchClasses();
    }, []);

    const handleClassChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        console.log('Selected class:', e.target.value);
    };

    return (
        <div style={{ display: 'flex' }}>
            {/* Side Menu */}
            <div style={{
                width: '250px',
                padding: '20px',
                backgroundColor: '#f4f4f4',
                boxShadow: '2px 0 5px rgba(0,0,0,0.1)'
            }}>
                <h2>Select a Class</h2>
                <select onChange={handleClassChange} disabled={loading}>
                    <option value="" disabled>Select a class</option>
                    {fetchedData.current.map((dndClass) => (
                        <option key={dndClass.parse("index")} value={dndClass.parse("index")}>
                            {dndClass.parse("name")}
                        </option>
                    ))}
                </select>
            </div>

            {/* Main Content Area */}
            <div style={{
                flex: 1,
                padding: '20px',
                backgroundImage: 'url(https://external-preview.redd.it/u0bZOwzMBYZ7vvp8lJ0U_VeonHAIvX87SS_vGDe0Y-M.jpg?width=1080&crop=smart&auto=webp&s=87214f42d64b1a5b87859bfee903080fdd3f9330)', // Replace with your image path
                backgroundSize: 'cover',
                backgroundPosition: 'center'
            }}>
                <h1>Welcome to the D&D Character Selector!</h1>
                {/* Future image or content can go here */}
            </div>
        </div>
    );
};

export default charactercreation;
