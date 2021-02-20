import CURRENT_SERVER from '@/api/domain';

const axios = require('axios');

export default {
  login(user) {
    console.log('user', user);
    const instCred = axios.create({
      baseURL: CURRENT_SERVER,
    });
    return instCred.post('auth/login', user);
  },
  registration(user) {
    console.log('user', user);
    const instCred = axios.create({
      baseURL: CURRENT_SERVER,
    });
    return instCred.post('auth/signup', user);
  },
};
