import React, { useState, useEffect } from 'react';
import '../Pages/Style.css';

function Stopwatch({ onStopwatchChange }) {
  const [time, setTime] = useState(0);
  const [lapTimes, setLapTimes] = useState([]);
  const [isRunning, setIsRunning] = useState(false);

  useEffect(() => {
    let interval;
    if (isRunning) {
      interval = setInterval(() => {
        setTime(prevTime => prevTime + 1);
      }, 1000);
    } else {
      clearInterval(interval);
    }

    return () => clearInterval(interval);
  }, [isRunning]);

  const startStopwatch = () => {
    setIsRunning(true);
  };

  const stopStopwatch = () => {
    setIsRunning(false);
  };

  const resetStopwatch = () => {
    setTime(0);
    setLapTimes([]);
    setIsRunning(false);
  };

  const lapStopwatch = () => {
    if (lapTimes.length === 0) {
      setLapTimes([time]);
    } else {
      setLapTimes([...lapTimes, time - lapTimes.reduce((a, b) => a + b, 0)]);
    }
  };

  const calculateAverageLapTime = () => {
    if (lapTimes.length === 0) return 0;

    const totalLapTime = lapTimes.reduce((acc, lapTime) => acc + lapTime, 0);
    const averageTime = totalLapTime / lapTimes.length;
    const adjustedTime = averageTime * 1.1;
    return adjustedTime;
  };

  const calculatePiecesPerHour = () => {
    const adjustedAverageLapTime = calculateAverageLapTime();
    if (adjustedAverageLapTime === 0) return 0;

    const piecesPerHour = 3600 / adjustedAverageLapTime;
    return piecesPerHour.toFixed(0);
  };

  useEffect(() => {
    const adjustedTime = calculateAverageLapTime();
    const piecesPerHour = calculatePiecesPerHour();
     onStopwatchChange(adjustedTime, piecesPerHour);
  }, [lapTimes]);

  return (
    <div className="stopwatch">
      <h1 >{formatTime(time)}</h1>
      <button onClick={startStopwatch} class="btn btn-outline-light ">Start</button>
      <button onClick={stopStopwatch} class="btn btn-outline-light ">Stop</button>
      <button onClick={resetStopwatch} class="btn btn-outline-light ">Reset</button>
      <button onClick={lapStopwatch} class="btn btn-outline-light">Lap</button>
      <ul>
        {lapTimes.map((lapTime, index) => (
          <li key={index}>{`Lap ${index + 1}: ${formatTime(lapTime)}`}</li>
        ))}
      </ul>
       <p ><b>Average Lap Time (with 10%): {formatTime(calculateAverageLapTime())}</b></p>
      <p><b>Pieces per Hour: {calculatePiecesPerHour()}</b></p>
    </div>
  );
}

function formatTime(time) {
  const minutes = Math.floor(time / 60);
  const seconds = time % 60;
  return `${minutes < 10 ? '0' : ''}${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
}

export default Stopwatch;
