import React from 'react';
import styles from './SnackBar.module.css';

interface Props {
  message: string,
  isError?: boolean,
  isShowing: boolean
  className?: string
}

const SnackBar = (props: Props) => {
  const {
    message, isError, isShowing, className,
  } = props;

  return isShowing ? (
    <div className={`${styles.Container} ${className}`}>
      <div className={`${styles.SnackBar} ${isError ? styles.Error : ''}`}>
        <h4 className={styles.Message}>{message}</h4>
      </div>
    </div>
  ) : null;
};

SnackBar.defaultProps = {
  isError: false,
  className: '',
};

export default SnackBar;
