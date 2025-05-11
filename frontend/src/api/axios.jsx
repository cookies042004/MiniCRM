import axios from 'axios';

export default axios.create({
  baseURL: 'https://minicrm-1-zxyz.onrender.com/api',
  headers: {
    'Content-Type': 'application/json',
  },
});
