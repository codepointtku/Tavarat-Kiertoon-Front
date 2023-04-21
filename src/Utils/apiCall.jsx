import axios from 'axios';

const apiCall = async (auth, setAuth, path, method, data, options) => {
    axios.defaults.xsrfCookieName = 'csrftoken';
    axios.defaults.xsrfHeaderName = 'X-CSRFToken';
    axios.defaults.withCredentials = true;
    const result = await axios({
        method,
        url: path,
        baseURL: `${window.location.protocol}//${window.location.hostname}:8000`,
        data,
        options: { ...options },
    });

    // checks if path if related to userlogin etc
    if (path === '/users/login/' || path === '/users/login/refresh/' || path === '/users/logout/') {
        // if refresh fails apiCalls to logout in order to remove the cookies
        if (result.status === 204) {
            apiCall(auth, setAuth, '/users/logout/', 'post');
            // NOTE: should this return result with status instead?
            return null;
        }
        // auth is object { user_group: false, storage_group: false, admin_group: false }
        // creates initialAuth in order to update auth data
        const iniAuth = auth;
        // saves username from login and refresh, false in case of the logout
        iniAuth.username = result?.data?.username || false;
        // loops trought the auth in order to save user_groups, saves only if there is a change
        Object.keys(auth).forEach((each) => {
            // each is user_group, storage_group tai admin_group
            // result.data.group is array, which contains [user_group:false, storage_group:false, admin_group:false]
            if (result.data.groups?.includes(each)) {
                if (auth[each] === false) {
                    iniAuth[each] = true;
                }
            } else if (auth[each] === true) {
                iniAuth[each] = false;
            }
        });
        // if there is difference in-between initAuth and auth, auth is updated
        if (iniAuth !== auth) {
            setAuth(iniAuth);
        }
        // if path is not logout starts timer to refresh again
        if (path !== '/users/logout/') {
            setTimeout(() => {
                apiCall(auth, setAuth, '/users/login/refresh/', 'post');
            }, 1000 * 120);
        }
    }
    return result;
};

export default apiCall;
