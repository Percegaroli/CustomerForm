import { ICustomerFormMask } from './interface';

const formatBirthDate = (birthDate: string) => {
  const birthDateNumbers = birthDate.trim().replace(/\D/g, '');
  let birthDateWithMask = birthDate;
  if (birthDateNumbers.length > 4) {
    const day = birthDateNumbers.slice(0, 2);
    const month = birthDateNumbers.slice(2, 4);
    const year = birthDateNumbers.slice(4, 8);
    birthDateWithMask = `${day}/${month}/${year}`;
  } else if (birthDateNumbers.length > 2) {
    const day = birthDateNumbers.slice(0, 2);
    const month = birthDateNumbers.slice(2);
    birthDateWithMask = `${day}/${month}`;
  }
  return birthDateWithMask;
};

const formatPhoneNumber = (phone: string) => {
  const phoneNumbers = phone.trim().replace(/\D/g, '');
  let phoneWithMask = phone;
  if (phoneNumbers.length >= 11) {
    const ddd = phoneNumbers.slice(0, 2);
    const fiveDigits = phoneNumbers.slice(2, 7);
    const fourDigits = phoneNumbers.slice(7, 11);
    phoneWithMask = `(${ddd}) ${fiveDigits}-${fourDigits}`;
  } else if (phoneNumbers.length > 6) {
    const ddd = phoneNumbers.slice(0, 2);
    const fourDigits = phoneNumbers.slice(2, 6);
    const leftovers = phoneNumbers.slice(6);
    phoneWithMask = `(${ddd}) ${fourDigits}-${leftovers}`;
  } else if (phoneNumbers.length > 2) {
    const ddd = phoneNumbers.slice(0, 2);
    const leftOvers = phoneNumbers.slice(2);
    phoneWithMask = `(${ddd}) ${leftOvers}`;
  }
  return phoneWithMask;
};

const formatPostalCode = (postalCode: string) => {
  const postalCodeNumber = postalCode.trim().replace(/\D/g, '');
  if (postalCodeNumber.length > 5) {
    const fiveDigits = postalCodeNumber.slice(0, 5);
    const leftOvers = postalCodeNumber.slice(5, 8);
    return `${fiveDigits}-${leftOvers}`;
  }
  return postalCodeNumber;
};

const formatState = (state: string) => state.trim().toUpperCase();

const identity = (value: string) => value;

export const CustomerFormMaskInput: ICustomerFormMask = {
  name: identity,
  birthDate: formatBirthDate,
  city: identity,
  email: identity,
  neighborhood: identity,
  password: identity,
  passwordConfirmation: identity,
  phone: formatPhoneNumber,
  postalCode: formatPostalCode,
  state: formatState,
  streetName: identity,
};

export default {};
