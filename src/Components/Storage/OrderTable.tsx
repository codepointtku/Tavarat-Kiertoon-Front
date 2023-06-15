import { useLoaderData, Link } from 'react-router-dom';
import { useState, useEffect, Fragment } from 'react';

import {
    Table,
    TableBody,
    TableHead,
    TableCell,
    TableRow,
    IconButton,
    Box,
    Typography,
    Collapse,
    Button,
} from '@mui/material';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';

import StyledTableRow from '../StyledTableRow';
import StyledTableCell from '../StyledTableCell';
import { type orderViewLoader } from '../../Router/loaders';

export type OrderViewLoaderType = Awaited<ReturnType<typeof orderViewLoader>>;

/**
 * Render to view if Order is not found
 *
 * @returns
 */
function NoOrders() {
    return (
        <TableRow>
            <TableCell component="th" scope="row">
                <h1>Tilausnumeroa ei löytynyt</h1>
            </TableCell>
        </TableRow>
    );
}

/**
 * List of the products of an individual order
 *
 * @returns
 */
function OrderTable() {
    // data from backend
    const order = useLoaderData() as OrderViewLoaderType;

    // state to control product info collapse field
    const [isOpen, setIsOpen] = useState<boolean[]>([]);

    // array with an array for each unique product_item.product.id and all products with that id
    const productRenderItems: OrderViewLoaderType['product_items'][] = [];
    order.product_items.forEach((productItem) => {
        // check if array already contains an item.product.id array
        const productIndex = productRenderItems.findIndex((index) => index[0]?.product.id === productItem.product.id);
        if (productIndex < 0) {
            // if not, push a new array with this item as its first object
            productRenderItems.push([productItem]);
        } else {
            // if yes, push this item to that array
            productRenderItems[productIndex].push(productItem);
        }
    });

    // fill states for collapse field for each product
    useEffect(() => {
        if (isOpen.length === 0) {
            setIsOpen(new Array(productRenderItems.length).fill(false));
        }
    }, [isOpen.length, productRenderItems.length]);

    // Parse Date objects from backend data string
    const dateParse = (value: string) => {
        const date = new Date(value);
        const dateString = `${date.getDate()}.${date.getMonth()}.${date.getFullYear()}`;
        return dateString;
    };

    // RENDER
    return (
        <>
            {order ? (
                <>
                    <Box
                        sx={{
                            gap: 2,
                            margin: '2rem',
                            backgroundColor: '#fdfdfd',
                            boxShadow:
                                '0px 2px 1px -1px rgb(0 0 0 / 20%), 0px 1px 1px 0px rgb(0 0 0 / 14%), 0px 1px 3px 0px rgb(0 0 0 / 12%)',
                        }}
                    >
                        <h2 style={{ textAlign: 'center' }}>{`Tilauksen ${order.id} tiedot`}</h2>
                        <Box
                            sx={{
                                display: 'flex',
                                gap: 2,
                                justifyContent: 'space-between',
                                ml: '2rem',
                                mr: '2rem',
                                backgroundColor: '#fdfdfd',
                            }}
                        >
                            <h4>Toimitusosoite</h4>
                            <h4>Status</h4>
                        </Box>
                        <Box
                            sx={{
                                display: 'flex',
                                gap: 2,
                                justifyContent: 'space-between',
                                ml: '2rem',
                                mr: '2rem',
                                mb: '2rem',
                                backgroundColor: '#fdfdfd',
                            }}
                        >
                            <Typography>{order.delivery_address}</Typography>
                            <Typography>{order.status}</Typography>
                        </Box>
                        <Box
                            sx={{
                                display: 'flex',
                                gap: 2,
                                justifyContent: 'space-between',
                                ml: '2rem',
                                mr: '2rem',
                                backgroundColor: '#fdfdfd',
                            }}
                        >
                            <h4>Yhteystiedot</h4>
                            <h4>Päivämäärä</h4>
                        </Box>
                        <Box
                            sx={{
                                display: 'flex',
                                gap: 2,
                                justifyContent: 'space-between',
                                ml: '2rem',
                                mr: '2rem',
                                mb: '2rem',
                                backgroundColor: '#fdfdfd',
                            }}
                        >
                            <Typography>{order.contact}</Typography>
                            <Typography>{dateParse(order?.creation_date as string)}</Typography>
                        </Box>
                        <Box
                            sx={{
                                display: 'flex',
                                gap: 2,
                                justifyContent: 'space-between',
                                ml: '2rem',
                                mr: '2rem',
                                backgroundColor: '#fdfdfd',
                            }}
                        >
                            <h4>Tilaajan nimi</h4>
                        </Box>
                        <Box
                            sx={{
                                display: 'flex',
                                gap: 2,
                                justifyContent: 'space-between',
                                ml: '2rem',
                                mr: '2rem',
                                mb: '2rem',
                                backgroundColor: '#fdfdfd',
                            }}
                        >
                            <Typography>{order.user}</Typography>
                        </Box>
                        <Box
                            sx={{
                                display: 'flex',
                                gap: 2,
                                justifyContent: 'space-between',
                                ml: '2rem',
                                mr: '2rem',
                                backgroundColor: '#fdfdfd',
                            }}
                        >
                            <h4>Lisätiedot</h4>
                        </Box>
                        <Box
                            sx={{
                                display: 'flex',
                                gap: 2,
                                justifyContent: 'space-between',
                                ml: '2rem',
                                mr: '2rem',
                                backgroundColor: '#fdfdfd',
                            }}
                        >
                            <Typography>{order.order_info}</Typography>
                        </Box>
                        <br />
                    </Box>
                    <Box
                        sx={{
                            pb: '2rem',
                            pr: '2rem',
                            pl: '2rem',
                            gap: 2,
                            margin: '2rem',
                            backgroundColor: '#fdfdfd',
                            boxShadow:
                                '0px 2px 1px -1px rgb(0 0 0 / 20%), 0px 1px 1px 0px rgb(0 0 0 / 14%), 0px 1px 3px 0px rgb(0 0 0 / 12%)',
                        }}
                    >
                        <h2 style={{ textAlign: 'center' }}>Tilauksen tuotteet</h2>
                        <Table sx={{ minWidth: 650 }} aria-label="collapsible table">
                            <TableHead>
                                <TableRow>
                                    <StyledTableCell> </StyledTableCell>
                                    <StyledTableCell>Viivakoodi</StyledTableCell>
                                    <StyledTableCell>Tuotenimi</StyledTableCell>
                                    <StyledTableCell align="right">Kappalemäärä</StyledTableCell>
                                    {/* <StyledTableCell align="right">Tuotenumero</StyledTableCell> */}
                                    {/* <StyledTableCell align="right">Kategoria</StyledTableCell> */}
                                    <StyledTableCell align="right">Varasto</StyledTableCell>
                                </TableRow>
                            </TableHead>
                            {/*
                             */}
                            <TableBody>
                                {productRenderItems.map((itemArray, index) => (
                                    <Fragment key={itemArray[0].id}>
                                        <StyledTableRow>
                                            <TableCell>
                                                <IconButton
                                                    aria-label="expand row"
                                                    size="small"
                                                    onClick={() => {
                                                        setIsOpen((prev) =>
                                                            prev.map((currentState, idx) =>
                                                                idx === index ? !currentState : currentState
                                                            )
                                                        );
                                                    }}
                                                >
                                                    {isOpen[index] ? (
                                                        <KeyboardArrowUpIcon />
                                                    ) : (
                                                        <KeyboardArrowDownIcon />
                                                    )}
                                                </IconButton>
                                            </TableCell>
                                            <TableCell>{itemArray[0].barcode}</TableCell>
                                            <TableCell component="th" scope="row">
                                                {itemArray[0].product.name}
                                            </TableCell>
                                            <TableCell align="right">{itemArray.length}</TableCell>
                                            {/* <TableCell align="right">{itemArray[0].product.id}</TableCell> */}
                                            {/* <TableCell align="right">{itemArray[0].product.category}</TableCell> */}
                                            <TableCell align="right">{itemArray[0].storage.name}</TableCell>
                                        </StyledTableRow>
                                        <TableRow>
                                            <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={7}>
                                                <Collapse in={isOpen[index]} timeout="auto" unmountOnExit>
                                                    {/* <Collapse in={true} timeout="auto" unmountOnExit> */}
                                                    <Box sx={{ margin: 1 }}>
                                                        <Typography variant="h6" gutterBottom component="div">
                                                            Tuotteet
                                                        </Typography>
                                                        <Table size="small">
                                                            <TableHead>
                                                                <TableRow>
                                                                    {/* <TableCell component="th" scope="row">
                                                                        Tuotenumero
                                                                    </TableCell> */}
                                                                    <TableCell align="right">Viivakoodi</TableCell>
                                                                    <TableCell align="right">Tuotenimi</TableCell>
                                                                    {/* <TableCell align="right">Kategoria</TableCell> */}
                                                                    {/* <TableCell align="right">Väri</TableCell> */}
                                                                    <TableCell align="right">Mitat</TableCell>
                                                                    <TableCell align="right">Paino</TableCell>
                                                                    <TableCell align="right">Hylly id</TableCell>
                                                                </TableRow>
                                                            </TableHead>
                                                            <TableBody>
                                                                {itemArray.map((item) => (
                                                                    <TableRow key={item.id}>
                                                                        {/* <TableCell component="th" scope="row">
                                                                            {item.id}
                                                                        </TableCell> */}
                                                                        <TableCell align="right">
                                                                            {item.barcode}
                                                                        </TableCell>
                                                                        <TableCell align="right">
                                                                            {item.product.name}
                                                                        </TableCell>
                                                                        {/* <TableCell align="right">
                                                                            {item.product.category}
                                                                        </TableCell>
                                                                        <TableCell align="right">
                                                                            {item.product.color}
                                                                        </TableCell> */}
                                                                        <TableCell align="right">
                                                                            {item.product.measurements}
                                                                        </TableCell>
                                                                        <TableCell align="right">
                                                                            {item.product.weight}
                                                                        </TableCell>
                                                                        <TableCell align="right">
                                                                            {item.shelf_id}
                                                                        </TableCell>
                                                                    </TableRow>
                                                                ))}
                                                            </TableBody>
                                                        </Table>
                                                    </Box>
                                                </Collapse>
                                            </TableCell>
                                        </TableRow>
                                    </Fragment>
                                ))}
                            </TableBody>
                            {/*
                             */}
                        </Table>
                    </Box>
                    <Button sx={{ margin: '2rem' }} to={`/varasto/tilaus/${order.id}/muokkaa`} component={Link}>
                        Muokkaa tilausta
                    </Button>
                    <Button color="error" to={`/varasto/pdf/${order.id}`} component={Link}>
                        Luo tulostettava PDF
                    </Button>
                </>
            ) : (
                <NoOrders />
            )}
        </>
    );
}

export default OrderTable;
