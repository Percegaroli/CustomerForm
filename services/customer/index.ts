import Axios from 'axios';
import { PostNewCustomerDTO } from './interface';

export const postNewCustomer = (body: PostNewCustomerDTO) => Axios.post<any>('http://unicodesoftware-interno.ddns.net:3333/customer', body);

export default {};
