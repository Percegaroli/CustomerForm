import Axios from 'axios';
import { PostNewCustomerDTO } from './interface';

export const postNewCustomer = (body: PostNewCustomerDTO) => Axios.post('http://unicodesoftware-interno.ddns.net:3333/customer', body);

export default {};
