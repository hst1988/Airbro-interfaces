import axios from "axios";

const baseURL = "/";

axios.defaults.withCredentials = true;
axios.defaults.baseURL = baseURL;

export default axios;
