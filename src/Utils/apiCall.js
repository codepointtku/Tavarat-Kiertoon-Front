import axios from 'axios';

const apiCall = async (auth, setAuth, path, data) => {
    const result = await axios.get(`http://localhost:8000${path}`, data, { withCredentials: true });
    console.log(result);

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
