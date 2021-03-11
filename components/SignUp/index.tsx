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
import UseSnackBar from '../../hooks/UseSnackBar';
import { PostNewCustomerDTO } from '../../services/customer/interface';
import { postNewCustomerProxy } from '../../services/customer';

const initialState: CustomerForm = {
  name: '',
  email: '',
  birthDate: '',
  phone: '',
  city: '',
  neighborhood: '',
  postalCode: '',
  streetName: '',
  state: '',
};

const SignUp: React.FC = () => {
  const [formState, setFormState] = useState(initialState);
  const [fieldErrors, setFieldErrors] = useState(initialState);
  const [isFormEnable, setIsFormEnable] = useState(true);
  const [activeStep, setActiveStep] = useState(1);
  const { renderSnackBar, configSnackBar } = UseSnackBar();

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

  const validateField = (
    field: keyof CustomerForm,
  ) => CustomerFormValidation[field](formState, field);

  const validateFields = (field: keyof CustomerForm) => {
    const errorMessage = validateField(field);
    if (errorMessage) {
      setFieldErrors({
        ...fieldErrors,
        [field]: errorMessage,
      });
    }
  };

  const canAdvanceStep = () => {
    const stepOneFields: Array<keyof CustomerForm> = ['name', 'birthDate', 'phone', 'email'];
    const stepTwoFields: Array<keyof CustomerForm> = ['postalCode', 'city', 'state', 'streetName', 'neighborhood'];
    let canAdvance = false;
    if (activeStep === 1) {
      const validatedFields = stepOneFields.map((step) => validateField(step));
      const errorIndex = validatedFields.findIndex((field) => field !== '');
      const [
        name,
        birthDate,
        phone,
        email,
      ] = validatedFields;
      setFieldErrors({
        ...fieldErrors,
        name,
        birthDate,
        phone,
        email,
      });
      canAdvance = errorIndex === -1;
    } else {
      const validatedFields = stepTwoFields.map((step) => validateField(step));
      const errorIndex = validatedFields.findIndex((field) => field !== '');
      const [
        postalCode,
        city,
        state,
        streetName,
        neighborhood,
      ] = validatedFields;
      setFieldErrors({
        ...fieldErrors,
        postalCode,
        city,
        state,
        streetName,
        neighborhood,
      });
      canAdvance = errorIndex === -1;
    }
    return canAdvance;
  };

  const advanceButtonAction = () => {
    if (isFormEnable && canAdvanceStep()) {
      if (activeStep === 1) {
        setActiveStep(2);
      } else {
        submitForm();
      }
    }
  };

  const submitForm = async () => {
    setIsFormEnable(false);
    const newState: PostNewCustomerDTO = {
      name: formState.name.trim(),
      city: formState.city.trim(),
      email: formState.email.trim(),
      neighborhood: formState.neighborhood.trim(),
      state: formState.state.trim(),
      streetName: formState.streetName.trim(),
      birthDate: formState.birthDate.trim(),
      phone: formState.phone.replace(/\D/g, '').trim(),
      postalCode: formState.postalCode.replace(/\D/g, '').trim(),
    };
    try {
      await postNewCustomerProxy(newState);
      setFormState(initialState);
      setFieldErrors(initialState);
      setActiveStep(1);
      configSnackBar({
        messages: ['Cadastro realizado com sucesso'],
        time: 4,
        isError: false,
      });
    } catch (error) {
      if (error.response && error.response.data && error.response.data.details) {
        configSnackBar({
          messages: error.response.data.details.map((detail) => detail.message),
          time: 4,
          isError: true,
        });
      } else {
        configSnackBar({ messages: ['Houve um erro ao finalizar o cadastro. Tente novamente mais tarde'], time: 4, isError: true });
      }
    } finally {
      setIsFormEnable(true);
    }
  };

  const renderButtons = () => (
    <div className={styles.ButtonsContainer}>
      <Button
        text="Back"
        disabled={activeStep === 1 || !isFormEnable}
        onClick={() => setActiveStep(1)}
        variant="outlined"
      />
      <Button
        text="Next"
        onClick={advanceButtonAction}
        variant="filled"
        disabled={!isFormEnable}
      />
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
      setErrors={setFieldErrors}
      validateFields={validateFields}
      enableForm={setIsFormEnable}
      isFormEnabled={isFormEnable}
    />
  ));

  return (
    <div className={styles.Container}>
      <Card className={styles.FormCard}>
        <div className={styles.Bar} />
        <div className={styles.FormContainer}>
          <div className={styles.FormInputContainer}>
            <h1 className={styles.Title}>
              Faça seu cadastro.
            </h1>
            {renderActiveStep()}
          </div>
          <StepsIndicator activeStep={activeStep} />
          {renderButtons()}
        </div>

      </Card>
      {renderSnackBar()}
    </div>
  );
};

export default SignUp;
