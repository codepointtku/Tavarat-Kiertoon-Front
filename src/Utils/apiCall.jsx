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
    if (path === '/users/login') {
        console.log('@ apiCall, login data', result.data);
    }

    if (path === '/users/login/') {
        // auth on objekti { user_group: false, storage_group: false, admin_group: false }
        Object.keys(auth).forEach((each) => {
            // each on joko user_group, storage_group tai admin_group
            // result.data.group on array, joka sisältää käyttäjän ryhmät [user_group:false, storage_group:false, admin_group:false]
            if (result.data.groups?.includes(each)) {
                // esim. jos auth[user_group] on false, eli käyttäjällä ei ole vielä oikeuksia, asetetaan oikeudet
                if (auth[each] === false) {
                    setAuth({ ...auth, [each]: true });
                }
                // jos on ylimääräisiä oikeuksia, ne poistetaan
            } else if (auth[each] === true) {
                setAuth({ ...auth, [each]: false });
            }
        });
    }

    return result;
};

export default apiCall;
