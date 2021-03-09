import React from 'react';
import styles from './Button.module.css';

interface Props {
  onClick: () => void;
  text: string;
  variant?: 'filled' | 'outlined';
  className?: string;
  disabled?: boolean;
}

const Button = (props: Props) => {
  const {
    onClick, text, variant, className, disabled,
  } = props;

  const returnButtonClassName = () => {
    const buttonVariante = variant === 'filled' ? styles.Filled : styles.Outlined;
    const disableVariant = disabled ? styles.Disabled : '';
    return `${styles.Button} ${buttonVariante} ${className} ${disableVariant}`;
  };

  return (
    <button
      type="button"
      className={returnButtonClassName()}
      onClick={onClick}
      disabled={disabled}
    >
      {text}
    </button>
  );
};

Button.defaultProps = {
  className: '',
  variant: 'filled',
  disabled: false,
};

export default Button;
