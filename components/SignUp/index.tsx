import React, { useState } from 'react';
import Card from '../UI/Card';
import styles from './SignUp.module.css';
import { CustomerForm } from '../../model/Customer/interface';
import StepsIndicator from './StepsIndicator/index';
import Button from '../UI/Button/Index';
import AddressStep from './AddressStep';
import { CustomerFormValidation } from '../../util/FormValidation/CustomerForm';
import { CustomerFormMaskInput } from '../../util/FormFieldMask/CustomerForm';
import PersonalDataStep from './PersonalDataStep';
import { postNewCustomer } from '../../services/customer';

const initialState: CustomerForm = {
  name: '',
  email: '',
  birthDate: '',
  phone: '',
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
  const [activeStep, setActiveStep] = useState(1);

  const changeFormField = (field: keyof CustomerForm, newValue: string) => {
    const valueWithMask = CustomerFormMaskInput[field](newValue);
    const newState = {
      ...formState,
      [field]: valueWithMask,
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

  const validateFields = (field: keyof CustomerForm) => {
    const errorMessage = CustomerFormValidation[field](formState, field);
    if (errorMessage) {
      setFieldErrors({
        ...fieldErrors,
        [field]: errorMessage,
      });
    }
  };

  const submitForm = async () => {
    const newState: CustomerForm = {
      ...formState,
      birthDate: formState.birthDate.replace(/\D/g, ''),
      phone: formState.phone.replace(/\D/g, ''),
      postalCode: formState.postalCode.replace(/\D/g, ''),
    };
    try {
      await postNewCustomer(newState);
    } catch (error) {

    }
  };

  const renderButtons = () => (
    <div className={styles.ButtonsContainer}>
      <Button
        text="Back"
        disabled={activeStep === 1}
        onClick={() => setActiveStep(1)}
        variant="outlined"
      />
      <Button text="Next" onClick={() => setActiveStep(2)} variant="filled" />
    </div>
  );

  const renderActiveStep = () => (activeStep === 1 ? (
    <PersonalDataStep
      error={fieldErrors}
      onChangeInput={changeFormField}
      state={formState}
      validateFields={validateFields}
    />
  ) : (
    <AddressStep
      error={fieldErrors}
      onChangeInput={changeFormField}
      setState={setFormState}
      state={formState}
      validateFields={validateFields}
    />
  ));

  return (
    <div className={styles.Container}>
      <Card className={styles.FormCard}>
        <h1 className={styles.Title}>Join Us</h1>
        {renderActiveStep()}
        <StepsIndicator activeStep={activeStep} />
        {renderButtons()}
      </Card>
    </div>
  );
};

export default SignUp;
