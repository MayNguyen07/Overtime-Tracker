import AxiosService from '../../commons/axiosService';
import { BASE_URL_CLIENT } from '../../commons/configureURL';

export const getUserInformation = token => {
  const Authorization = `Bearer ${token}`;
  return AxiosService.getWithHeader(`${BASE_URL_CLIENT}/users`, {
    headers: { Authorization },
  });
};

export const postSubmission = (creator, member, approver, reason, token) => {
  const Authorization = `Bearer ${token}`;
  console.log('call service', approver);
  return AxiosService.post(
    `${BASE_URL_CLIENT}/store`,
    // { creator: creator, member: member, approver: approver, reason: reason },
    {
      headers: { Authorization },
    },
  );
};
