"use client"
import { useState, useEffect } from 'react';
import styles from './page.module.css'; // assuming styles is defined in this file
import TimeCounter from './TimeCounter.js'; // adjust the path as needed

export default function Home() {
  const [inputDateTime, setInputDateTime] = useState('');

  // Function to format the date in local timezone and in the expected format
  const toLocalISOString = (date) => {
    const tzOffset = date.getTimezoneOffset() * 60000; // offset in milliseconds
    const localISOTime = (new Date(date - tzOffset)).toISOString().slice(0, -1);
    return localISOTime.substring(0, 16);
  };

  // Set initial date and time on component mount
  useEffect(() => {
    const now = new Date();
    const localDateTimeString = toLocalISOString(now);
    setInputDateTime(localDateTimeString);
  }, []);

  return (
    <main className={styles.main}>
      <div className={styles.description}>
        <div className="w-1/2 mt-32 mx-auto bg-blue-900 p-10">
          <p className="m-4 text-gray-200">
            <input 
              type="datetime-local" 
              value={inputDateTime} 
              onChange={(e) => setInputDateTime(e.target.value)} 
              className="mt-2 p-2 border rounded-md" 
            />
          </p>
          <TimeCounter dateTimeString={inputDateTime + ':00'} />
        </div>
      </div>
    </main>
  );
}
