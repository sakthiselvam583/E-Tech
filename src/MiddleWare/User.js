import http from './httpMiddleWare';
import { ACCESS_POINT } from '../config';

const userInsert = async userArray => {

  const result = await http.post(ACCESS_POINT + `/user`, userArray);
  return result;
};

const adminuserInsert = async (tableName, formdata) => {

  const result = await http.post(ACCESS_POINT + `/user/uplods/${tableName}`, formdata, {
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  });

  return result;
};

const updateadminuserInsert = async (userId, formdata, extra = 0) => {

  const result = await http.post(ACCESS_POINT + `/user/updateuplods/${userId}?status=${extra}`, formdata, {
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  });

  return result;
};

const userEmailCheck = async email => {
  const result = await http.get(ACCESS_POINT + `/user/emailCheck/${email}`);
  return result;
};

const userMobileCheck = async mobileNumber => {
  const result = await http.get(ACCESS_POINT + `/user/mobileCheck/${mobileNumber}`);
  return result;
};

const getAllUser = async customerId => {
  const result = await http.get(ACCESS_POINT + `/user/companyCheck/${customerId}`);
  return result;
};

const getUservalue = async customerId => {
  const result = await http.get(ACCESS_POINT + `/user/getUservalue/${customerId}`);
  return result;
};

const deleteSelectedUser = async userId => {
  const result = await http.delete(ACCESS_POINT + `/user/${userId}`);
  return result;
};

const editSelectedUser = async (userId, userArray) => {

  const result = await http.put(ACCESS_POINT + `/user/${userId}`, userArray);
  return result;
};

const editSelectedUsers = async (userId, userArray) => {

  const result = await http.put(ACCESS_POINT + `/user/updateUsers/${userId}`, userArray);
  return result;
};

const customerIdFullList = async (customerId, userType, serviceId) => {
  const result = await http.get(ACCESS_POINT + `/user/customerFullList/${customerId}/${userType}/${serviceId}`);
  return result;
};

const customerIdFullLists = async (customerId, userType, serviceId) => {
  const result = await http.get(ACCESS_POINT + `/user/customerFullLists/${customerId}/${userType}/${serviceId}`);
  return result;
};

const customerIdForSelect = async (customerId, userType) => {
  const result = await http.get(ACCESS_POINT + `/user/customerIdSelect/${customerId}/${userType}`);
  return result;
};

const getUserById = async getUserById => {
  const result = await http.get(ACCESS_POINT + `/user/${getUserById}`);
  return result;
};

export default {
  userInsert,
  userEmailCheck,
  userMobileCheck,
  getAllUser,
  deleteSelectedUser,
  editSelectedUser,
  customerIdFullList,
  customerIdFullLists,
  customerIdForSelect,
  getUservalue,
  editSelectedUsers,
  adminuserInsert,
  updateadminuserInsert,
  getUserById
};
