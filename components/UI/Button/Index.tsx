import React from 'react';
import styles from './Button.module.css';

interface Props {
  onClick: () => void;
  text: string;
  variant?: 'filled' | 'outlined';
  className?: string;
}

const Button = (props: Props) => {
  const {
 onClick, text, variant, className, } = props;

  const returnButtonClassName = () => {
    const buttonVariante =      variant === 'filled' ? styles.Filled : styles.Outlined;
    return `${styles.Button} ${buttonVariante} ${className}`;
  };

  return (
    <button type="button" className={returnButtonClassName()} onClick={onClick}>
      {text}
    </button>
  );
};

Button.defaultProps = {
  className: '',
  variant: 'filled',
};

export default Button;
