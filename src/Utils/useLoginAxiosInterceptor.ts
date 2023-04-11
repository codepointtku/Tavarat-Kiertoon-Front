import axios from 'axios';
import { useContext, useEffect } from 'react';
import AuthContext from '../Context/AuthContext';

axios.defaults.xsrfCookieName = 'csrftoken';
axios.defaults.xsrfHeaderName = 'X-CSRFToken';
axios.defaults.withCredentials = true;

export default function useLoginAxiosInterceptor() {
    const { auth, setAuth } = useContext(AuthContext);

    useEffect(() => {
        axios.interceptors.response.use(async function (response) {
            // checks if path if related to userlogin etc
            if (['/users/login/', '/users/login/refresh/', '/users/logout/'].includes(response.config.url!)) {
                // if refresh fails apiCalls to logout in order to remove the cookies
                if (response.status === 204) {
                    return axios.post('/users/logout/');
                }
                // auth is object { user_group: false, storage_group: false, admin_group: false }
                // loops trought the auth in order to save user_groups, saves only if there is a change
                const nextAuth = Object.fromEntries(
                    Object.keys(auth).map((key) =>
                        // key is "user_group", "storage_group" OR "admin_group"
                        // result.data.group is array, which contains ["user_group", "storage_group", "admin_group"]
                        [key, response.data.groups?.includes(key)]
                    )
                );
                // saves username from login and refresh, false in case of the logout
                nextAuth.username = response?.data?.username ?? false;
                // if there is difference in-between auth and nextAuth, auth is updated
                if (Object.keys(auth).some((key) => auth[key] !== nextAuth[key])) {
                    setAuth(nextAuth);
                }
                // if path is not logout, starts timer to refresh again
                if (response.config.url! !== '/users/logout/') {
                    setTimeout(() => {
                        axios.post('/users/login/refresh/');
                    }, 1000 * 120);
                }
            }
            return response;
        });
    }, [auth, setAuth]);
}
