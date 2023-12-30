import { useState, useEffect, useRef } from 'react';

const TimeCounter = ({ dateTimeString, goalTimeInMinutes = 60 }) => {
  const [timePassed, setTimePassed] = useState(0); // time passed in seconds
  const [clickTime, setClickTime] = useState('');
  const [isAboveGoalTime, setIsAboveGoalTime] = useState(false);
  const intervalRef = useRef(null); // Ref to track the interval ID

  useEffect(() => {
    clearInterval(intervalRef.current); // Clear the existing interval

    if (dateTimeString && !clickTime) {
      intervalRef.current = setInterval(() => {
        const now = new Date();
        const inputDateTime = new Date(dateTimeString);
        const diffInSeconds = Math.floor((now.getTime() - inputDateTime.getTime()) / 1000);
        setTimePassed(diffInSeconds);

        if (diffInSeconds / 60 > goalTimeInMinutes) {
          setIsAboveGoalTime(true);
        }
      }, 1000);
    }
    // Clear interval on component unmount
    return () => clearInterval(intervalRef.current);
  }, [dateTimeString, clickTime, goalTimeInMinutes]);

  const handleClick = () => {
    const now = new Date();
    clearInterval(intervalRef.current); // Clear the interval using the ref
    setClickTime(now.toLocaleTimeString());
  };

  const minutes = Math.floor(timePassed / 60);
  const seconds = timePassed % 60;
  const timeDifference = minutes - goalTimeInMinutes;

  return (
    <div className={`flex flex-col items-center justify-center space-y-4 p-4 rounded-lg shadow-md ${isAboveGoalTime ? 'bg-red-500' : 'bg-green-500'}`}>
      <p onClick={handleClick} className="text-lg font-bold cursor-pointer">
        Time passed since input time: {clickTime || `${minutes} minutes and ${seconds} seconds`}
      </p>
      {clickTime && (
        <p className="text-sm">
          Stopped at: {clickTime}. {Math.abs(timeDifference)} minutes {timeDifference < 0 ? 'under' : 'over'} goal time.
        </p>
      )}
    </div>
  );
}

export default TimeCounter;
