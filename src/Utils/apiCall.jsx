import axios from 'axios';

const apiCall = (auth, setAuth, path, method, data, options) =>
    axios({
        method,
        url: path,
        baseURL: `${window.location.protocol}//${window.location.hostname}:8000`,
        data,
        options: { ...options },
    });

export default apiCall;
