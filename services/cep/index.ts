import Axios from 'axios';
import { GetAddressByCepAPIResponse } from './interface';

export const consultarEnderecoPeloCep = (cep: string) => Axios.get<GetAddressByCepAPIResponse>(
  `https://brasilapi.com.br/api/cep/v1/${cep}`,
);

export default {};
