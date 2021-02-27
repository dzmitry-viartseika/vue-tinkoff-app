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
    console.log('application', application);
    const instCred = axios.create({
      baseURL: CURRENT_SERVER,
    });
    return instCred.post('application/newApplication/', application);
  },
  getAllApplications() {
    const token = JSON.parse(localStorage.getItem('token'));
    const instCred = axios.create({
      baseURL: CURRENT_SERVER,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return instCred.get('application/getApplications');
  },
};
