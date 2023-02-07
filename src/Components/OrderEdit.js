import {
    Button,
    Box,
    TextField,
    TableCell,
    TableContainer,
    Table,
    TableHead,
    TableRow,
    TableBody,
} from '@mui/material';
import { useState, useEffect } from 'react';
import { useLoaderData, useLocation, useNavigate, generatePath } from 'react-router';
import StyledTableRow from './StyledTableRow';
import StyledTableCell from './StyledTableCell';

function OrderEdit() {
    const loader = useLoaderData();
    const navigate = useNavigate();
    const location = useLocation();
    const [orderData, setOrderData] = useState(loader);
    const [orderItems /* , setOrderItems */] = useState(location.state);

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
            <h2 align="center">Poista tilauksen tuotteita.</h2>
            <TableContainer sx={{ padding: '2rem' }}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <StyledTableCell>Tuotenimi</StyledTableCell>
                            <StyledTableCell>Tuotenumero</StyledTableCell>
                            <StyledTableCell>Viivakoodi</StyledTableCell>
                            <StyledTableCell>Saldo</StyledTableCell>
                            <StyledTableCell> </StyledTableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {orderItems.map((item) => (
                            <StyledTableRow key={item.id}>
                                <TableCell>{item.name}</TableCell>
                                <TableCell>{item.id}</TableCell>
                                <TableCell>{item.barcode}</TableCell>
                                <TableCell>{item.count}</TableCell>
                                <TableCell align="right">
                                    <Button>Poista tuote.</Button>
                                </TableCell>
                            </StyledTableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>

            <h5 align="center">
                <Button>Tallenna tilauksen tiedot</Button>
            </h5>
        </>
    );
}

export default OrderEdit;
