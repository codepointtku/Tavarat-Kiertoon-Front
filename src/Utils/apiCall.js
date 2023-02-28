import axios from 'axios';

const apiCall = async (auth, setAuth, path, method, data) => {
    const result = await axios({
        method,
        url: `http://localhost:8000${path}`,
        data,
        options: { withCredentials: true },
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
