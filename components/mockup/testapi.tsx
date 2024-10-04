"use client"

import React, { useEffect, useState } from 'react';
import { fetchClasses } from "./dndclass"

// based on the Api provided
interface Class {
  index: string;
  name: string;
}

const TestApi = () => {
  const [classes, setClasses] = useState<Class[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const getClasses = async () => {
      try {
        const data = await fetchClasses();
        setClasses(data.results);
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      } catch (err) {
        setError('Failed to fetch classes');
      } finally {
        setLoading(false);
      }
    };

    getClasses();
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;
  

  return (
    <ul>
      {classes.map((classes_data) => (
        <li key={classes_data.index}>{classes_data.name}</li>
      ))}
    </ul>
  );
};

export default TestApi;
