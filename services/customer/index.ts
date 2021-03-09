import Axios from 'axios';
import { CustomerForm } from '../../model/Customer/interface';

export const postNewCustomer = (body: CustomerForm) => Axios.post('http://unicodesoftware-interno.ddns.net:3333', body);

export default {};
