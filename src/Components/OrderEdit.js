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
import { useState } from 'react';
import { useLoaderData, useNavigate, generatePath, useActionData } from 'react-router';
import { useSubmit } from 'react-router-dom';
import StyledTableRow from './StyledTableRow';
import StyledTableCell from './StyledTableCell';

function OrderEdit() {
    const orderData = useLoaderData();
    const navigate = useNavigate();
    const responseStatus = useActionData();
    console.log(responseStatus);
    const [orderState, setOrderState] = useState(orderData);
    const [orderItems, setOrderItems] = useState({});

    const handleChange = (key, event) => {
        setOrderState({ ...orderState, [key]: event.target.value });
    };

    const handleItems = (id, event) => {
        setOrderItems({ ...orderItems, [id]: event.target.value });
        console.log(orderItems);
    };

    const checkChange = (key) => {
        if (orderData[key] === orderState[key]) {
            return false;
        }
        return true;
    };

    const revertChange = (key) => {
        setOrderState({ ...orderState, [key]: orderData[key] });
    };

    let orderList = [];

    orderData.products.forEach((entry) => {
        try {
            const newEntry = entry;
            newEntry.count = 1;
            newEntry.id = entry.id;
            newEntry.items = [newEntry];
            orderList.forEach((each) => {
                if (each.barcode === newEntry.barcode) {
                    newEntry.count += each.count;
                    newEntry.items = newEntry.items.concat(each.items);
                    const index = orderList.findIndex((key) => key.id === each.id);
                    orderList = [...orderList.slice(0, index), ...orderList.slice(index + 1)];
                }
            });
            orderList.push(newEntry);
        } catch {
            orderList.push({
                name: 'Tuotetta ei olemassa',
                id: entry.id,
                barcode: '-',
                count: 0,
                category_name: '-',
                storage_name: '-',
                items: [],
                measurements: '-',
                weight: '-',
                shelf_id: '-',
            });
        }
    });

    const addItem = () => {
        // add here apiCall to find item by ID
        console.log(orderData.newItem);
    };

    const submit = useSubmit();

    const deleteItem = (id, items) => {
        if (items.length > 1) {
            for (let index = 0; index < orderItems[id]; index += 1) {
                submit({ type: 'delete', product: items.at(index).id, productId: orderData.id }, { method: 'post' });
            }
        } else {
            submit({ type: 'delete', product: items.at(-1).id, productId: orderData.id }, { method: 'post' });
        }
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
                // onChange={(event) => {
                //     handleChange('newItem', event);
                // }}
                defaultValue={orderData.newItem}
            />

            <Button onClick={() => addItem()}>Lisää esine ID:n perusteella</Button>

            <h1 align="center">Muokkaa Tilausta {orderState.id}</h1>
            <Box align="center">
                <div>
                    <h5>
                        <TextField disabled defaultValue={orderData.contact} label="Alkuperäinen yhteystieto" />
                        <TextField
                            focused={checkChange('contact')}
                            label="Muokkaa yhteystietoa"
                            onChange={(event) => {
                                handleChange('contact', event);
                            }}
                            value={orderState.contact}
                        />
                        <Button
                            sx={{ mt: '8px', ml: '1rem' }}
                            onClick={() => {
                                revertChange('contact');
                            }}
                        >
                            Peruuta muutokset
                        </Button>
                    </h5>
                </div>
                <div>
                    <h5>
                        <TextField disabled defaultValue={orderData.delivery_address} label="Alkuperäinen osoite" />
                        <TextField
                            focused={checkChange('delivery_address')}
                            label="Muokkaa toimitusosoitetta"
                            onChange={(event) => {
                                handleChange('delivery_address', event);
                            }}
                            value={orderState.delivery_address}
                        />
                        <Button
                            sx={{ mt: '8px', ml: '1rem' }}
                            onClick={() => {
                                revertChange('delivery_address');
                            }}
                        >
                            Peruuta muutokset
                        </Button>
                    </h5>
                </div>
                <div>
                    <h5>
                        <TextField disabled defaultValue={orderData.status} label="Alkuperäinen status" />
                        <TextField
                            focused={checkChange('status')}
                            label="Muokkaa statusta"
                            onChange={(event) => {
                                handleChange('status', event);
                            }}
                            value={orderState.status}
                        />
                        <Button
                            sx={{ mt: '8px', ml: '1rem' }}
                            onClick={() => {
                                revertChange('status');
                            }}
                        >
                            Peruuta muutokset
                        </Button>
                    </h5>
                </div>
                <div>
                    <h5>
                        <TextField disabled defaultValue={orderData.order_info} label="Alkuperäinen lisätieto" />
                        <TextField
                            focused={checkChange('order_info')}
                            label="Muokkaa lisätietoa"
                            onChange={(event) => {
                                handleChange('order_info', event);
                            }}
                            value={orderState.order_info}
                        />
                        <Button
                            sx={{ mt: '8px', ml: '1rem' }}
                            onClick={() => {
                                revertChange('order_info');
                            }}
                        >
                            Peruuta muutokset
                        </Button>
                    </h5>
                </div>
            </Box>
            <h2 align="center">Poista tilauksen tuotteita.</h2>
            <TableContainer sx={{ padding: '2rem' }}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <StyledTableCell>Tuotenimi</StyledTableCell>
                            <StyledTableCell>Tuotenumero</StyledTableCell>
                            <StyledTableCell>Viivakoodi</StyledTableCell>
                            <StyledTableCell>Saldo</StyledTableCell>
                            <StyledTableCell align="right">Poistettavat tuotteet</StyledTableCell>
                            <StyledTableCell> </StyledTableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {orderList.map((item) => (
                            <StyledTableRow key={item.id}>
                                <TableCell>{item.name}</TableCell>
                                <TableCell>{item.id}</TableCell>
                                <TableCell>{item.barcode}</TableCell>
                                <TableCell>{item.items.length}</TableCell>
                                {item.items.length > 1 ? (
                                    <TableCell align="right">
                                        <TextField
                                            type="number"
                                            size="small"
                                            defaultValue={1}
                                            InputProps={{ inputProps: { min: 1, max: item.items.length } }}
                                            onChange={(event) => {
                                                handleItems(item.id, event);
                                            }}
                                        />
                                    </TableCell>
                                ) : (
                                    <TableCell align="right">
                                        <TextField
                                            disabled
                                            type="number"
                                            size="small"
                                            defaultValue={1}
                                            InputProps={{ inputProps: { min: 1, max: item.items.length } }}
                                        />
                                    </TableCell>
                                )}
                                <TableCell align="right">
                                    <Button
                                        onClick={() => {
                                            deleteItem(item.id, item.items);
                                        }}
                                    >
                                        Poista tuote.
                                    </Button>
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
