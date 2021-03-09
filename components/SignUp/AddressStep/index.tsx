import React from 'react';
import CustomerFormFieldsLabel from '../../../enum/CustomerForm/FormFieldsLabel';
import { CustomerFormFieldsPlaceholder } from '../../../enum/CustomerForm/FormFieldsPlaceholder';
import { CustomerForm } from '../../../model/Customer/interface';
import { consultarEnderecoPeloCep } from '../../../services/cep';
import Input from '../../UI/Input';
import styles from '../SignUp.module.css';
import { postalCodeValidation } from '../../../util/FormValidation/CustomerForm';

interface Props {
  state: CustomerForm;
  setState: (newState: CustomerForm) => void;
  onChangeInput: (key: keyof CustomerForm, value: string) => void;
  error: CustomerForm;
  validateFields: (field: keyof CustomerForm) => void
}

const AddressStep = (props: Props) => {
  const {
    state, onChangeInput, error, setState, validateFields,
  } = props;

  const onBlurAction = (field: keyof CustomerForm) => {
    if (field === 'postalCode') {
      getAddress();
    } else {
      validateFields(field);
    }
  };

  const getAddress = async () => {
    if (!postalCodeValidation(state.postalCode)) {
      try {
        const { data } = await consultarEnderecoPeloCep(state.postalCode);
        const {
          city, neighborhood, state: estado, street,
        } = data;
        setState({
          ...state,
          city,
          neighborhood,
          streetName: street,
          state: estado,
        });
      } catch (err) {

      }
    }
  };

  const renderInputElement = (formFieldKey: keyof CustomerForm) => {
    const enumKey = formFieldKey.toUpperCase();
    return (
      <Input
        label={CustomerFormFieldsLabel[enumKey]}
        onChange={(event) => onChangeInput(formFieldKey, event.target.value)}
        onBlur={() => onBlurAction(formFieldKey)}
        value={state[formFieldKey]}
        error={error[formFieldKey]}
        placeholder={CustomerFormFieldsPlaceholder[enumKey]}
        classes={{ container: styles.CustomerFormInput }}
      />
    );
  };

  return (
    <>
      {renderInputElement('postalCode')}
      {renderInputElement('state')}
      {renderInputElement('city')}
      {renderInputElement('streetName')}
      {renderInputElement('neighborhood')}
    </>
  );
};

export default AddressStep;
