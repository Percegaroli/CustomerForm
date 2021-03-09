import React from 'react';
import styles from './Card.module.css';

interface Props {
  children?: React.ReactNode;
  className?: string;
}

const Card = (props: Props) => {
  const { children, className } = props;
  return (
    <div
      className={`${styles.Card} ${className}`}
    >
      {children}
    </div>
  );
};

Card.defaultProps = {
  children: null,
  className: '',
};

export default Card;
