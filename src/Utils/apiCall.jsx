import axios from 'axios';

const apiCall = (auth, setAuth, path, method, data, options) =>
    axios({
        method,
        url: path,
        baseURL: `${window.location.protocol}//${window.location.hostname}/api`,
        data,
        options: { ...options },
    });

export default apiCall;
