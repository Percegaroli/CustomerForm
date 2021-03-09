import React, { useState, useEffect } from 'react';
import SnackBar from '../components/UI/SnackBar';

interface Config {
  message: string,
  time: number,
  isError?: boolean
}

const UseSnackBar = () => {
  const [message, setMessage] = useState('');
  const [time, setTime] = useState(0);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    setTimeout(resetSnackBar, time * 1000);
  }, [time]);

  const resetSnackBar = () => {
    setIsError(false);
    setTime(0);
    setMessage('');
  };

  const configSnackBar = (config: Config) => {
    setMessage(config.message);
    setTime(config.time);
    setIsError(config.isError ?? false);
  };

  const renderSnackBar = () => (
    <SnackBar
      isShowing={time !== 0}
      message={message}
      isError={isError}
    />
  );

  return { renderSnackBar, configSnackBar };
};

export default UseSnackBar;
