import { CustomerForm } from '../../model/Customer/interface';

export type ICustomerFormMask = {
  [k in keyof CustomerForm]: (value: string) => string
}
