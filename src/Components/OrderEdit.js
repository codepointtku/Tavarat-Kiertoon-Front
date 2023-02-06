import { Button, Box, TextField } from '@mui/material';
import { useState } from 'react';
import { useLoaderData } from 'react-router';

function OrderEdit() {
    const loader = useLoaderData();
    const [orderData, setOrderData] = useState(loader);

    const handleChange = (key, event) => {
        setOrderData({ ...orderData, [key]: event.target.value });
    };

    return (
        <>
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
