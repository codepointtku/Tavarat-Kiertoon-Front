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
    if (path === '/users/login/' || path === '/users/login/refresh/') {
        console.log(result);
        if (result.status === 204) {
            return null;
        }
        // auth on objekti { user_group: false, storage_group: false, admin_group: false }
        // luo iniAuthin authin pohjalta, jota muokataan alempana
        const iniAuth = auth;
        // tallentaa käyttäjänimen login.tiedoista
        iniAuth.username = result?.data?.username;
        Object.keys(auth).forEach((each) => {
            // each on joko user_group, storage_group tai admin_group
            // result.data.group on array, joka sisältää käyttäjän ryhmät [user_group:false, storage_group:false, admin_group:false]
            if (result.data.groups?.includes(each)) {
                // esim. jos auth[user_group] on false, eli käyttäjällä ei ole vielä oikeuksia, asetetaan oikeudet
                if (auth[each] === false) {
                    iniAuth[each] = true;
                }
                // jos on ylimääräisiä oikeuksia, ne poistetaan
            } else if (auth[each] === true) {
                iniAuth[each] = false;
            }
        });
        // jos muokattu iniAuth eroaa authista, muutetaan auth iniAuthiksi
        if (iniAuth !== auth) {
            setAuth(iniAuth);
        }
        setTimeout(() => {
            apiCall(auth, setAuth, '/users/login/refresh/', 'post');
        }, 10000);
    }
    console.log('test111111');
    return result;
};

export default apiCall;
