import { useLoaderData } from 'react-router-dom';
import Storages from './Storages';

function StoragesList() {
    const data = useLoaderData();
    if (!data) {
        return <>Varastoja ei löydy</>;
    }

    return <Storages storages={data} />;
}

export default StoragesList;
