import React from 'react';
import Step from '../../UI/Step';
import styles from './StepsIndicator.module.css';

interface Props {
  activeStep: number;
}

const StepsIndicator = (props: Props) => {
  const { activeStep } = props;
  return (
    <div className={styles.Container}>
      <Step
        active={activeStep === 1}
        className={styles.Step}
      />
      <Step
        active={activeStep === 2}
        className={styles.Step}
      />
    </div>
  );
};

export default StepsIndicator;
