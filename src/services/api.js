import axios from "../utils/axios-customize";

export const callRegister = (data) => {
  return axios.post("/api/v1/user/register", data);
};

export const callLogin = (data) => {
  return axios.post("/api/v1/auth/login", data);
};

export const callFetchAccount = () => {
  return axios.get("/api/v1/auth/account");
};

export const callLogout = () => {
  return axios.post("/api/v1/auth/logout");
};

export const callFetchListUser = (query) => {
  return axios.get(`/api/v1/user?${query}`);
};

export const callCreateAUser = (data) => {
  return axios.post("/api/v1/user", data);
};

export const callBulkCreateUser = (data) => {
  return axios.post("/api/v1/user/bulk-create", data);
};

export const callUpdateUser = (data) => {
  return axios.put(`/api/v1/user`, data);
};

export const callDeleteUser = (id) => {
  return axios.delete(`/api/v1/user/${id}`);
};

export const callFetchlistBook = (query) => {
  return axios.get(`/api/v1/book?${query}`);
};

export const callFetchCategory = () => {
  return axios.get(`/api/v1/database/category`);
};

export const callCreateABook = (data) => {
  return axios.post(`/api/v1/book`, data);
};

export const callUploadBookImg = (fileImg) => {
  const bodyFormData = new FormData();
  bodyFormData.append("fileImg", fileImg);
  return axios({
    method: "post",
    url: "/api/v1/file/upload",
    data: bodyFormData,
    headers: {
      "Content-Type": "multipart/form-data",
      "upload-type": "book",
    },
  });
};

export const callEditBook = (id, data) => {
  return axios.put(`/api/v1/book/${id}`, data);
};

export const callDeleteBook = (id) => {
  return axios.delete(`/api/v1/book/${id}`);
};

export const callFetchBookById = (id) => {
  return axios.get(`/api/v1/book/${id}`);
};

export const callPlaceOrder = (data) => {
  return axios.post(`/api/v1/order`, { ...data });
};

export const callFetchlistDeliver = (query) => {
  return axios.get(`/api/v1/order?${query}`);
};

export const callOrderHistory = () => {
  return axios.get(`/api/v1/history`);
};

export const callUploadAvatar = (fileImg) => {
  const bodyFormData = new FormData();
  bodyFormData.append("fileImg", fileImg);
  return axios({
    method: "post",
    url: "/api/v1/file/upload",
    data: bodyFormData,
    headers: {
      "Content-Type": "multipart/form-data",
      "upload-type": "avatar",
    },
  });
};

export const callUploadUserInfo = (_id, phone, fullName, avatar) => {
  return axios.put(`/api/v1/user`, { _id, phone, fullName, avatar });
};

export const callChangePassword = (email, oldpass, newpass) => {
  return axios.post(`/api/v1/user/change-password`, {
    email,
    oldpass,
    newpass,
  });
};

export const callFetchlistOrder = (email, oldpass, newpass) => {
  return axios.post(`/api/v1/user/change-password`, {
    email,
    oldpass,
    newpass,
  });
};
