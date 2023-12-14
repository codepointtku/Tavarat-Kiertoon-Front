import axios from 'axios';
import { useContext, useEffect } from 'react';
import AuthContext from '../Context/AuthContext';
import { usersApi } from '../api';

axios.defaults.xsrfCookieName = 'csrftoken';
axios.defaults.xsrfHeaderName = 'X-CSRFToken';
axios.defaults.withCredentials = true;
axios.defaults.baseURL = `${window.location.protocol}//${window.location.hostname}:8000`;

const axiosWithoutInterceptor = axios.create();
axiosWithoutInterceptor.defaults.xsrfCookieName = 'csrftoken';
axiosWithoutInterceptor.defaults.xsrfHeaderName = 'X-CSRFToken';
axiosWithoutInterceptor.defaults.withCredentials = true;
axiosWithoutInterceptor.defaults.baseURL = `${window.location.protocol}//${window.location.hostname}:8000`;

export default function useLoginAxiosInterceptor() {
    useRefreshInterval();
    useAxiosInterceptAuthAPICalls();
}

function useAxiosInterceptAuthAPICalls() {
    const { auth, setAuth } = useContext(AuthContext);

    useEffect(() => {
        const interceptor = axios.interceptors.response.use(async function (response) {
            const url = new URL(response.config.url!);

            if (['/users/login/', '/users/logout/', '/users/login/refresh/'].includes(url.pathname)) {
                // if refresh fails apiCalls to logout in order to remove the cookies
                if (response.status === 204) {
                    // remove user goups from auth object
                    setAuth({
                        user_group: false,
                        storage_group: false,
                        admin_group: false,
                        bicycle_group: false,
                        bicycle_admin_group: false,
                        username: false,
                    });
                    // use different axios instance to avoid infinite loop
                    return axiosWithoutInterceptor.post('/users/logout/');
                }
                // auth is object { user_group: false, storage_group: false, admin_group: false, bicycle_group: false, username: false }
                // loops trought the auth-object, updates the object only if there is a change
                const nextAuth = Object.fromEntries(
                    Object.keys(auth).map((key) =>
                        // key is "user_group", "storage_group", "admin_group", "bicycle_group"
                        // result.data.group is array, which contains ["user_group", "storage_group", "admin_group", "bicycle_group"]
                        [key, response.data.groups?.includes(key)]
                    )
                );
                // saves username from login and refresh, false in case of the logout
                nextAuth.username = response?.data?.username ?? false;
                // if there is difference in-between auth and nextAuth, auth is updated
                if (Object.keys(auth).some((key) => auth[key] !== nextAuth[key])) {
                    setAuth(nextAuth);
                }
            }

            return response;
        });
        // useEffect cleanup function to remove interceptor when component unmounts or dependencies change
        return () => {
            axios.interceptors.response.eject(interceptor);
        };
    }, [auth, setAuth]);
}

// Refreshes the login token every 2 minutes
function useRefreshInterval() {
    const { auth } = useContext(AuthContext);

    const { username } = auth;

    useEffect(() => {
        let interval: NodeJS.Timeout;

        if (username) {
            interval = setInterval(() => {
                usersApi.usersLoginRefreshCreate();
            }, 1000 * 120);
        } else {
            // initial refresh when page is loaded and tokens possibly in browser storage
            usersApi.usersLoginRefreshCreate();
        }

        return () => {
            clearInterval(interval);
        };
    }, [username]);
}
