import React from 'react';
import { CustomerFormFieldsLabel } from '../../../enum/CustomerForm/FormFieldsLabel';
import { CustomerFormFieldsPlaceholder } from '../../../enum/CustomerForm/FormFieldsPlaceholder';
import { CustomerForm } from '../../../model/Customer/interface';
import Input from '../../UI/Input';
import styles from '../SignUp.module.css';

interface Props {
  state: CustomerForm;
  onChangeInput: (key: keyof CustomerForm, value: string) => void;
  error: CustomerForm;
  validateFields: (field: keyof CustomerForm) => void
}

const PersonalDataStep = (props: Props) => {
  const {
    state, onChangeInput, error, validateFields,
  } = props;

  const renderInputElement = (
    formFieldKey: keyof CustomerForm,
    isPassword?: boolean,
  ) => {
    const enumKey = formFieldKey.toUpperCase();
    return (
      <Input
        label={CustomerFormFieldsLabel[enumKey]}
        onChange={(event) => onChangeInput(formFieldKey, event.target.value)}
        onBlur={() => validateFields(formFieldKey)}
        value={state[formFieldKey]}
        error={error[formFieldKey]}
        placeholder={CustomerFormFieldsPlaceholder[enumKey]}
        classes={{ container: styles.CustomerFormInput }}
        type={isPassword ? 'password' : 'text'}
      />
    );
  };

  return (
    <div>
      {renderInputElement('name')}
      {renderInputElement('email')}
      {renderInputElement('phone')}
      {renderInputElement('birthDate')}
      {renderInputElement('password', true)}
      {renderInputElement('passwordConfirmation', true)}
    </div>
  );
};

export default PersonalDataStep;
