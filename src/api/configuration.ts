import { Configuration } from './client/configuration';

const configuration = new Configuration({
    basePath: `${window.location.protocol}//${window.location.hostname}/api`,
});

export default configuration;
