import { useEffect, useState } from 'react';
import { useLocation } from 'react-router';
import { Box, Tab } from '@mui/material';
import { TabContext, TabList, TabPanel } from '@mui/lab';
import imageCompression from 'browser-image-compression';

import AddExistingItem from './AddExistingItem';
import AddNewItem from './AddNewItem';

function AddItem() {
    // empty location.state when item is finally added and site navigates away!
    const location = useLocation();
    const [item, setItem] = useState();
    const [tab, setTab] = useState('1');

    useEffect(() => {
        if (location.state) {
            location.state.returnpath = null;
            setItem(location.state);
            location.state = null;
        } else {
            setItem({
                available: false,
                barcode: '',
                group_id: '',
                name: '',
                price: null,
                shelf_id: null,
                free_description: '',
                measurements: '',
                weight: null,
                category: null,
                storages: null,
                color: null,
                pictures: [],
            });
        }
        if (location.state && location.state.oldItem) {
            // setItem to oldItem when barcode scanning is used to add existing item
            // add call here to back-end to bring in item details
            console.log('oldItem');
        }
    }, [location]);

    const tabChange = (event, newValue) => {
        setTab(newValue);
    };

    const uploadFile = async (files) => {
        const options = {
            maxSizeMB: 1,
            useWebWorker: true,
        };

        const uploads = await Promise.all(Object.values(files).map(async (file) => imageCompression(file, options)));

        // bring images to back-end with a call, then setItems into images brought back.
        console.log(uploads);
    };

    return (
        <Box sx={{ width: '100%', typography: 'body1' }}>
            <TabContext value={tab}>
                <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                    <TabList onChange={tabChange} aria-label="lab API tabs example">
                        <Tab label="Lisää uusi tuote" value="1" />
                        <Tab label="Lisää olemassaolevaan" value="2" />
                    </TabList>
                </Box>
                <TabPanel value="1">
                    {item ? (
                        <AddNewItem item={item} setItem={setItem} uploadFile={uploadFile} />
                    ) : (
                        <h1>Tonipal kahville</h1>
                    )}
                </TabPanel>
                <TabPanel value="2">
                    {item ? <AddExistingItem item={item} setTab={setTab} /> : <h1>Tonipal Kahville nyt!</h1>}
                </TabPanel>
            </TabContext>
        </Box>
    );
}

export default AddItem;
