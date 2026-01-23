import { Configuration } from './client/configuration';

function getCookie(name: string): string | undefined {
    return document.cookie
        .split('; ')
        .find((row) => row.startsWith(name + '='))
        ?.split('=')[1];
}

const configuration = new Configuration({
    basePath: `${window.location.protocol}//${window.location.hostname}:8000`,
    baseOptions: {
        withCredentials: true,
        headers: {
            'X-CSRFToken': getCookie('csrftoken'),
        },
    },
});

export default configuration;
