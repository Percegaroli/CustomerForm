import { CustomerForm } from '../../model/Customer/interface';

export type ICustomerFormValidation = {
  [k in keyof CustomerForm]: CustomerFormValidationFunction;
};

type CustomerFormValidationFunction = (
  state: CustomerForm, key: keyof CustomerForm) => string
