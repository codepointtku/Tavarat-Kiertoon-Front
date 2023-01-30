import { useEffect, useState } from 'react';
import { useLocation, useNavigate, generatePath } from 'react-router';
import { Box, Tab } from '@mui/material';
import { TabContext, TabList, TabPanel } from '@mui/lab';

function AddItem() {
    // empty location.state when item is finally added and site navigates away!
    const location = useLocation();
    const navigate = useNavigate();
    const [item, setItem] = useState();
    const [tab, setTab] = useState('1');

    useEffect(() => {
        if (location.state) {
            setItem(location.state);
        } else {
            setItem({
                name: '',
                id: '',
                barcode: '',
                category: '',
                location: '',
                oldItem: false,
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

    console.log(item);

    return (
        <>
            <button
                type="button"
                onClick={() => navigate(generatePath('/varasto/koodinlukija'), { state: { ...item } })}
            >
                Lue viivakoodi
            </button>
            <h1>Add items</h1>
            <Box sx={{ width: '100%', typography: 'body1' }}>
                <TabContext value={tab}>
                    <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                        <TabList onChange={tabChange} aria-label="lab API tabs example">
                            <Tab label="Item One" value="1" />
                            <Tab label="Item Two" value="2" />
                            <Tab label="Item Three" value="3" />
                        </TabList>
                    </Box>
                    <TabPanel value="1">Item One</TabPanel>
                    <TabPanel value="2">Item Two</TabPanel>
                    <TabPanel value="3">Item Three</TabPanel>
                </TabContext>
            </Box>
        </>
    );
}

export default AddItem;
