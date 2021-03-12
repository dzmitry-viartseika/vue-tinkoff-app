import CURRENT_SERVER from '@/api/domain';

const axios = require('axios');

export default {
  login(user) {
    const instCred = axios.create({
      baseURL: CURRENT_SERVER,
    });
    return instCred.post('application/login', user);
  },
  createApplication(application) {
    const instCred = axios.create({
      baseURL: CURRENT_SERVER,
    });
    return instCred.post('application/newApplication/', application);
  },
  getApplicationById(id) {
    console.log('id', id);
    const token = JSON.parse(localStorage.getItem('token'));
    const instCred = axios.create({
      baseURL: CURRENT_SERVER,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return instCred.get(`application/getApplicationById/${id}`);
  },
  getAllApplications(limit, skip, search = '', status = '') {
    const token = JSON.parse(localStorage.getItem('token'));
    const instCred = axios.create({
      baseURL: CURRENT_SERVER,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    if (status && search) {
      return instCred.get(`application/getApplications?page=${skip}&limit=${limit}
      &status=${status}&search=${search}`);
    }
    if (search) {
      return instCred.get(`application/getApplications?page=${skip}&limit=${limit}
      &search=${search}`);
    }
    if (status) {
      return instCred.get(`application/getApplications?page=${skip}&limit=${limit}
      &status=${status}`);
    }
    return instCred.get(`application/getApplications?page=${skip}&limit=${limit}`);
  },
};
