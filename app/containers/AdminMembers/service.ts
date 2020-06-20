import AxiosService from 'commons/axiosService';
const endpointAdminMembers = 'admin/users';


export const loadListMember = token => {
  const Authorization = `Bearer ${token}`;
  return AxiosService.getWithHeader(`${process.env.BASE_URL}/${endpointAdminMembers}`, {
    headers: { Authorization },
  });
}



export const toggleStatus =(id:string, token) => {
  const Authorization = `Bearer ${token}`;
  return AxiosService.putWithHeader(`${process.env.BASE_URL}/${endpointAdminMembers}/${id}/toggle-status`, {
    headers: { Authorization },},
);
}


export const toggleRole =(id:string, token) => {
  const Authorization = `Bearer ${token}`;
  return AxiosService.putWithHeader(`${process.env.BASE_URL}/${endpointAdminMembers}/${id}/toggle-role`, {
    headers: { Authorization },},
);
}
