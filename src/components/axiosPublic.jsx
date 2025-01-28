// src/api/axiosPublic.js

import axios from 'axios';

// Create an axios instance with the base URL for your API
const axiosPublic = axios.create({
  baseURL: 'https://product-hunt-client-server-lowdsrgf0-imtiazs-projects-e3424ac1.vercel.app', // Replace with the base URL of your API
});

export default axiosPublic;
