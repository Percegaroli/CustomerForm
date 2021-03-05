import React, { useState } from 'react';
import Card from '../UI/Card';
import styles from './SignUp.module.css';
import Input from '../UI/Input';
import { CustomerFormFieldsLabel } from '../../enum/CustomerForm/FormFieldsLabel';
import { CustomerForm } from '../../model/Customer/interface';
import { CustomerFormFieldsPlaceholder } from '../../enum/CustomerForm/FormFieldsPlaceholder';

const initialState: CustomerForm = {
  name: '',
  email: '',
  password: '',
  passwordConfirmation: '',
  city: '',
  neighborhood: '',
  postalCode: '',
  streetName: '',
  state: '',
};

const SignUp: React.FC = () => {
  const [formState, setFormState] = useState(initialState);
  const [fieldErrors, setFieldErrors] = useState(initialState);

  const changeFormField = (field: keyof CustomerForm, newValue: string) => {
    const newState = {
      ...formState,
      [field]: newValue,
    };
    setFormState(newState);
    resetFieldError(field);
  };

  const resetFieldError = (field: keyof CustomerForm) => {
    const newError = {
      ...fieldErrors,
      [field]: '',
    };
    setFieldErrors(newError);
  };

  const validateField = (field: keyof CustomerForm) => {};

  const renderInputElement = (
    formFieldKey: keyof CustomerForm,
    isPassword?: boolean,
  ) => {
    const enumKey = formFieldKey.toUpperCase();
    return (
      <Input
        label={CustomerFormFieldsLabel[enumKey]}
        onChange={(event) => changeFormField(formFieldKey, event.target.value)}
        onBlur={() => validateField(formFieldKey)}
        value={formState[formFieldKey]}
        error={fieldErrors[formFieldKey]}
        placeholder={CustomerFormFieldsPlaceholder[enumKey]}
        classes={{ container: styles.CustomerFormInput }}
        type={isPassword ? 'password' : 'text'}
      />
    );
  };

  const renderFormFields = () => (
    <>
      {renderInputElement('name')}
      {renderInputElement('email')}
      {renderInputElement('password')}
      {renderInputElement('passwordConfirmation', true)}
    </>
  );

  return (
    <div className={styles.Container}>
      <Card className={styles.FormCard}>
        <h1 className={styles.Title}>Join Us</h1>
        {renderFormFields()}
      </Card>
    </div>
  );
};

export default SignUp;
