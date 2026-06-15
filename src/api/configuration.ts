import { Configuration } from './client/configuration';

const configuration = new Configuration({
    basePath: `${window.location.protocol}//${window.location.hostname}:8000`,
});

export default configuration;
