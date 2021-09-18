import axios from 'axios';
import helpers from './helpers';

const API = '/api';
const MAX_CACHE_SERVE_COUNT = 20;
let cache = {
  timezones: { list: null, serve_count: 0 },
};

function userToken() {
  return localStorage.getItem('token');
}

function commonHeaders() {
  return {
    Accept: 'application/json',
    Authorization: `Bearer: ${userToken()}`
  };
}

const headers = () => Object.assign(commonHeaders(), { 'Content-Type': 'application/json' })
const multipart_headers = () => Object.assign(commonHeaders(), { 'Content-Type': 'multipart/form-data' })

function queryString(params) {
  const query = Object.keys(params)
    .map(k => `${encodeURIComponent(k)}=${encodeURIComponent(params[k])}`)
    .join('&');
  return `${query.length ? '?' : ''}${query}`;
}

function cachedList(urlPath, key = null) {
  if (key === null) key = urlPath;
  if (cache[key].list !== null && cache[key].serve_count < MAX_CACHE_SERVE_COUNT) {
    cache[key].serve_count += 1;
    return new Promise(((resolve, reject) => {
      resolve(cache[key].list);
    }));
  }
  return axios.get(`${API}/${urlPath}`, { headers: headers() })
    .then((response) => {
      cache[key].list = response.data.list;
      cache[key].serve_count = 0;
      return cache[key].list;
    }).catch(helpers.catchHandler);
}

export default {
  fetch(url, params = {}) {
    return axios.get(`${API}/${url}${queryString(params)}`, { headers: headers() });
  },

  upload(verb, url, data) {
    switch (verb.toLowerCase()) {
      case 'post':
        return axios.post(`${API}/${url}`, data, { headers: headers() });
      case 'put':
        return axios.put(`${API}/${url}`, data, { headers: headers() });
      case 'patch':
        return axios.patch(`${API}/${url}`, data, { headers: headers() });
    }
  },

  post(url, data) {
    return axios.post(`${API}/${url}`, data, { headers: headers() });
  },

  put(url, data) {
    return axios.put(`${API}/${url}`, data, { headers: headers() });
  },

  patch(url, data) {
    return axios.patch(`${API}/${url}`, data, { headers: headers() });
  },

  delete(url) {
    return axios.delete(`${API}/${url}`, { headers: headers() });
  },

  post_form_data(url, formData) {
    return axios.post(`${API}/${url}`, formData, { headers: multipart_headers() });
  },

  put_form_data(url, formData) {
    return axios.put(`${API}/${url}`, formData, { headers: multipart_headers() });
  },

  userToken() {
    return userToken();
  },

  timezoneList() { return cachedList('timezones'); },
  errorHandler(error) { console.error('api error catch:', error) }
};
