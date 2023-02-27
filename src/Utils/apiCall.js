import { useContext } from 'react';
import axios from 'axios';
import AuthContext from '../Context/AuthContext';

const { auth, setAuth } = useContext(AuthContext);

const apiCall = async (path, data) => {
    const result = await axios.get(`http://localhost:8000${path}`, data, { withCredentials: true });

    if (result?.authorization) {
        Object.keys(auth).forEach((each) => {
            if (result.authorization.contains(each)) {
                setAuth({ ...auth, [each]: true });
            } else {
                setAuth({ ...auth, [each]: false });
            }
        });
    }

    return result.data;
};

export default apiCall;
