import { useLoaderData } from 'react-router-dom';
import Storages from './Storages';

function StoragesList() {
    const data = useLoaderData();

    return <Storages storages={data} />;
}

export default StoragesList;
