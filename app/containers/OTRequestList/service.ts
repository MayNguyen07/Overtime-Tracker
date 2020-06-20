import AxiosService from 'commons/axiosService';
const endpointListOT = 'admin/overtimes/0';

export const loadList = token => {
 
  const Authorization = `Bearer ${token}`;
  return AxiosService.getWithHeader(`${process.env.BASE_URL}/${endpointListOT}`, {
    headers: { Authorization },
  });
}

export const acceptRequest = (accept: boolean, id: string, token: string) => {
  const Authorization = `Bearer ${token}`;
  return AxiosService.putWithHeader(`${process.env.BASE_URL}/admin/update/${id}`, {
    headers: { Authorization },
  }, {
    status: accept ? 1 : 2
  });
}

export const denyRequest = (id: string, token: string, reason:string) => {
  const Authorization = `Bearer ${token}`;
  return AxiosService.putWithHeader(`${process.env.BASE_URL}/admin/update/${id}`, {
    headers: { Authorization },
  }, {
    status: 2,
    reasonDenied: reason
  });
}