import axios from 'axios';

const apiCall = async (auth, setAuth, path, method, data, options) => {
    axios.defaults.xsrfCookieName = 'csrftoken';
    axios.defaults.xsrfHeaderName = 'X-CSRFToken';
    axios.defaults.withCredentials = true;
    const result = await axios({
        method,
        url: `http://localhost:8000${path}`,
        data,
        options: { ...options },
    });
    Object.keys(auth).forEach((each) => {
        if (result.data.authorization?.contains(each)) {
            if (auth[each] === false) {
                setAuth({ ...auth, [each]: true });
            }
        } else if (auth[each] === true) {
            setAuth({ ...auth, [each]: false });
        }
    });

    return result;
};

export default apiCall;
