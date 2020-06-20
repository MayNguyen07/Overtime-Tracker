import AxiosService from 'commons/axiosService';
const endPointLogin = 'login';

export const authLoginServices = token => {
  const Authorization = `Bearer ${token}`;

  return AxiosService.postWithHeader(
    `${process.env.BASE_URL}/${endPointLogin}`,
    {
      headers: { Authorization },
    },
  );
};
