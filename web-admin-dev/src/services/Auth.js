import axios from 'axios';

axios.interceptors.response.use((response) => {
  return response;
}, (error) => {
  if (error.status == 401) {
    Auth.logout();
  }
});

export const Auth = {
  authenticated() {
    return !!localStorage.getItem('token');
  },

  login({email, password}) {
    return axios.post(`http://localhost:3030/api/users/auth`, {email, password})
    .then((res) => {
      if (res.status === 200 && res.data.token) {
        let {token, user} = res.data;
        localStorage.setItem('profile', JSON.stringify(user));
        localStorage.setItem('token', token);
        axios.interceptors.request.use((config) => {
          config.headers['authorization'] = `Bearer ${token}`;
          return config;
        });
      } else {
        return res.data
      }
    })
    .catch((err) => {
      console.log('Auth err', err)
    })
  },

  logout() {
    localStorage.removeItem('profile');
    localStorage.removeItem('token');
    axios.interceptors.request.use((config) => {
      delete config.headers['authorization'];
      return config;
    });
    window.location = '/#/login';
  }
};
