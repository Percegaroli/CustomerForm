import { CustomerForm } from '../../model/Customer/interface';
import { ICustomerFormValidation } from './interface';

const requiredFieldValidation = (value: string) => (value.trim() === '' ? 'Campo Obrigatório' : '');

const phoneValidation = (phone: string) => {
  const phoneNumber = phone.replace(/\D/g, '');
  return phoneNumber.length === 10 || phoneNumber.length === 11 ? '' : 'Insira um telefone válido';
};

const emailValidation = (email: string) => {
  const validEmailRegexp = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
  return validEmailRegexp.test(email) ? '' : 'Insira um Email valido';
};

const birthDateValidation = (birthDate: string) => {
  const date = new Date(birthDate);
  return !Number.isNaN(date) ? 'Insira uma data de nascimento válida' : '';
};

export const postalCodeValidation = (postalCode: string) => {
  const postalCodeFormatted = postalCode.replace('-', '');
  return postalCodeFormatted.length !== 8 ? 'Insira um Cep valido' : '';
};

const stateValidation = (state: string) => (state.length !== 2 ? 'Insira um Estado válido' : '');

const passwordValidation = (state: CustomerForm) => {
  const { password, passwordConfirmation } = state;
  const passwordFilledError = requiredFieldValidation(password);
  if (passwordFilledError) return passwordFilledError;
  if (passwordConfirmation !== '') {
    if (password !== passwordConfirmation) {
      return 'Password must match';
    }
  }
  return '';
};

const fieldNotValidated = () => '';

export const CustomerFormValidation: ICustomerFormValidation = {
  name: (state, key) => requiredFieldValidation(state[key]),
  phone: (state, key) => phoneValidation(state[key]),
  email: (state, key) => {
    const isEmailFilled = requiredFieldValidation(state[key]);
    return isEmailFilled || emailValidation(state[key]);
  },
  birthDate: (state, key) => birthDateValidation(state[key]),
  password: (state, _) => passwordValidation(state),
  passwordConfirmation: (state, _) => passwordValidation(state),
  postalCode: fieldNotValidated,
  streetName: fieldNotValidated,
  neighborhood: fieldNotValidated,
  city: fieldNotValidated,
  state: (state, key) => stateValidation(state[key]),
};
