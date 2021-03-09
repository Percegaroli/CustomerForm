import React from 'react';
import styles from './Step.module.css';

interface Props {
  active: boolean;
  className?: string;
}

const Step = (props: Props) => {
  const { active, className } = props;
  return (
    <div
      className={`${className} ${styles.Step} ${active ? styles.Active : ''}`}
    />
  );
};

Step.defaultProps = {
  className: '',
};

export default Step;
