import { useState, useEffect } from 'react';
import { useLoaderData, useNavigate, generatePath, useLocation } from 'react-router';
import { Button, Box, TextField } from '@mui/material';

function OrderEdit() {
    const loader = useLoaderData();
    const location = useLocation();
    const navigate = useNavigate();
    const [orderData, setOrderData] = useState(loader);

    const handleChange = (key, event) => {
        setOrderData({ ...orderData, [key]: event.target.value });
    };

    useEffect(() => {
        if (location.state) {
            location.state.returnpath = null;
            // add here apiCall to find item by barCode
            setOrderData(location.state);
        }
    }, []);

    const addItem = () => {
        // add here apiCall to find item by ID
        console.log(orderData.newItem);
    };

    console.log(orderData);

    return (
        <>
            <Button
                onClick={() =>
                    navigate(generatePath('/varasto/koodinlukija'), {
                        state: { ...orderData, returnpath: `/varasto/tilaus/${orderData.id}/muokkaa` },
                    })
                }
            >
                Lisää esine viivakoodin perusteella
            </Button>
            <TextField
                label="Esine-ID"
                onChange={(event) => {
                    handleChange('newItem', event);
                }}
                defaultValue={orderData.newItem}
            />

            <Button onClick={() => addItem()}>Lisää esine ID:n perusteella</Button>

            <h1 align="center">Muokkaa Tilausta {orderData.id}</h1>
            <Box align="center">
                <div>
                    <h5>
                        <TextField disabled defaultValue={orderData.recipient} label="Alkuperäinen nimi" />
                        <TextField
                            label="Muokkaa tilaajan nimeä"
                            onChange={(event) => {
                                handleChange('recipient', event);
                            }}
                            defaultValue={orderData.recipient}
                        />
                    </h5>
                </div>
                <div>
                    <h5>
                        <TextField disabled defaultValue={orderData.address} label="Alkuperäinen osoite" />
                        <TextField
                            label="Muokkaa toimitusosoitetta"
                            onChange={(event) => {
                                handleChange('address', event);
                            }}
                            defaultValue={orderData.address}
                        />
                    </h5>
                </div>
                <div>
                    <h5>
                        <TextField disabled defaultValue={orderData.status} label="Alkuperäinen status" />
                        <TextField
                            label="Muokkaa statusta"
                            onChange={(event) => {
                                handleChange('status', event);
                            }}
                            defaultValue={orderData.status}
                        />
                    </h5>
                </div>
            </Box>
            {/* Items will be added here somewhere? */}
            <h5 align="center">
                <Button>Tallenna tilauksen tiedot</Button>
            </h5>
        </>
    );
}

export default OrderEdit;
