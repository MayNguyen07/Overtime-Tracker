import AxiosService from 'commons/axiosService';
import { LoginRequest } from './types';

const endPointLogin = 'admin/login';

export const authAdminLoginServices = (data: LoginRequest) => {
  return AxiosService.post(`${process.env.BASE_URL}/${endPointLogin}`, {
    email: data.email,
    password: data.password,
  });
};
