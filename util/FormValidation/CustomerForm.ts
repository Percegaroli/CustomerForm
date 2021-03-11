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
  return Number.isNaN(date.getTime()) ? 'Insira uma data de nascimento válida' : '';
};

export const postalCodeValidation = (postalCode: string) => {
  const postalCodeFormatted = postalCode.replace('-', '');
  return postalCodeFormatted.length !== 8 ? 'Insira um Cep valido' : '';
};

const stateValidation = (state: string) => {
  if (state === '') return '';
  return state.length !== 2 ? 'Insira um Estado válido' : '';
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
  postalCode: fieldNotValidated,
  streetName: fieldNotValidated,
  neighborhood: fieldNotValidated,
  city: fieldNotValidated,
  state: (state, key) => stateValidation(state[key]),
};
