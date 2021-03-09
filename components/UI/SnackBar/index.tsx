import React from 'react';
import styles from './SnackBar.module.css';

interface Props {
  message: string,
  isError?: boolean,
  isShowing: boolean
}

const SnackBar = (props: Props) => {
  const { message, isError, isShowing } = props;

  return isShowing ? (
    <div className={styles.Container}>
      <div className={`${styles.SnackBar} ${isError ? styles.Error : ''}`}>
        <h4 className={styles.Message}>{message}</h4>
      </div>
    </div>
  ) : null;
};

SnackBar.defaultProps = {
  isError: false,
};

export default SnackBar;
