import axios from "axios";
// console.log("REACT_APP_API_BASE_URL----------->>",process.env.REACT_APP_API_BASE_URL);

const axiosInstance = axios.create();
axiosInstance.defaults.withCredentials=true
axiosInstance.defaults.baseURL=process.env.REACT_APP_API_BASE_URL; 
export default axiosInstance;