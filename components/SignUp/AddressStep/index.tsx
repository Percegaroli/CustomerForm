import React from 'react';
import CustomerFormFieldsLabel from '../../../enum/CustomerForm/FormFieldsLabel';
import { CustomerFormFieldsPlaceholder } from '../../../enum/CustomerForm/FormFieldsPlaceholder';
import { CustomerForm } from '../../../model/Customer/interface';
import { consultarEnderecoPeloCep } from '../../../services/cep';
import Input from '../../UI/Input';
import styles from '../SignUp.module.css';
import localStyles from './AddressStep.module.css';
import { postalCodeValidation } from '../../../util/FormValidation/CustomerForm';
import UseSnackBar from '../../../hooks/UseSnackBar';

interface Props {
  state: CustomerForm;
  setState: (newState: CustomerForm) => void;
  onChangeInput: (key: keyof CustomerForm, value: string) => void;
  error: CustomerForm;
  validateFields: (field: keyof CustomerForm) => void
  setErrors: (erros: CustomerForm) => void
  enableForm: (isEnable: boolean) => void
  isFormEnabled: boolean
}

const AddressStep = (props: Props) => {
  const {
    state, onChangeInput, error, setState, validateFields, setErrors, enableForm, isFormEnabled,
  } = props;
  const { configSnackBar, renderSnackBar } = UseSnackBar();

  const onBlurAction = (field: keyof CustomerForm) => {
    if (field === 'postalCode') {
      getAddress();
    } else {
      validateFields(field);
    }
  };

  const getAddress = async () => {
    if (!postalCodeValidation(state.postalCode)) {
      enableForm(false);
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
        setErrors({
          ...error,
          postalCode: '',
          city: '',
          neighborhood: '',
          streetName: '',
          state: '',
        });
      } catch (err) {
        configSnackBar({
          message: 'Falha ao consultar serviço de CEP. Por favor preencha seu endereço manualmente',
          time: 4,
          isError: true,
        });
      } finally {
        enableForm(true);
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
        disabled={!isFormEnabled}
      />
    );
  };

  return (
    <div className={localStyles.Container}>
      {renderInputElement('postalCode')}
      {renderInputElement('state')}
      {renderInputElement('city')}
      {renderInputElement('streetName')}
      {renderInputElement('neighborhood')}
      {renderSnackBar()}
    </div>
  );
};

export default AddressStep;
