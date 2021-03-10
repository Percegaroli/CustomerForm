import React, { useState, useEffect } from 'react';
import SnackBar from '../../components/UI/SnackBar';
import styles from './UseSnackBar.module.css';

interface Config {
  messages: Array<string>,
  time: number,
  isError?: boolean
}

const UseSnackBar = () => {
  const [messages, setMessages] = useState<Array<string>>([]);
  const [time, setTime] = useState(0);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    setTimeout(resetSnackBar, time * 1000);
  }, [time]);

  const resetSnackBar = () => {
    setIsError(false);
    setTime(0);
    setMessages([]);
  };

  const configSnackBar = (config: Config) => {
    setMessages(config.messages);
    setTime(config.time);
    setIsError(config.isError ?? false);
  };

  const renderSnackBar = () => (
    <div className={styles.Container}>
      {messages.map((message) => (
        <SnackBar
          isShowing={time !== 0}
          message={message}
          isError={isError}
          className={styles.Snackbar}
        />
      ))}
    </div>
  );

  return { renderSnackBar, configSnackBar };
};

export default UseSnackBar;
