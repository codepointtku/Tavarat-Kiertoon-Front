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
    Paper,
    Stack,
    Container,
    Grid,
} from '@mui/material';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';

import StyledTableRow from '../StyledTableRow';
import StyledTableCell from '../StyledTableCell';
import { type orderViewLoader } from '../../Router/loaders';
import TypographyHeading from '../TypographyHeading';
import TypographyTitle from '../TypographyTitle';
import BackButton from '../BackButton';

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
                <TypographyHeading text="Tilausnumeroa ei löytynyt" />
            </TableCell>
        </TableRow>
    );
}

function OrderTable() {
    // data from backend
    const order = useLoaderData() as OrderViewLoaderType;
    console.log(order);

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
        <Container maxWidth="xl">
            <Stack id="order-info-container-main-stack" sx={{ padding: '1rem 0 1rem 0' }}>
                <Grid
                    id="header-grid-container"
                    container
                    sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}
                >
                    <Grid item xs={4} justifyContent="flex-start">
                        <BackButton />
                    </Grid>
                    <Grid item xs={4}>
                        <TypographyTitle text={`Tilausnumero #${order.id}`} />
                    </Grid>
                    <Grid item xs={4} />
                </Grid>

                {order ? (
                    <>
                        <Box id="order-info-main-wrapper" sx={{ margin: '2rem 0 1rem 0' }}>
                            <Table id="order-info-table" sx={{ margin: '0rem 0 0rem 0' }}>
                                <TableBody>
                                    <TableRow>
                                        <TableCell width="20%" sx={{ fontWeight: 'bold' }}>
                                            Tilaaja:
                                        </TableCell>
                                        <TableCell width="30%">
                                            {order.user.first_name} {order.user.last_name}
                                        </TableCell>
                                        <TableCell width="20%" sx={{ fontWeight: 'bold' }}>
                                            Tilaus tehty:
                                        </TableCell>
                                        <TableCell width="30%">{dateParse(order?.creation_date as string)}</TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell sx={{ fontWeight: 'bold' }}>Tilauksen toimitusosoite:</TableCell>
                                        <TableCell>{order.delivery_address}</TableCell>
                                        <TableCell sx={{ fontWeight: 'bold' }}>Toivottu toimitusaika:</TableCell>
                                        {order.delivery_date ? (
                                            <TableCell>{dateParse(order?.delivery_date as string)}</TableCell>
                                        ) : (
                                            <TableCell>-</TableCell>
                                        )}
                                    </TableRow>
                                    <TableRow>
                                        <TableCell sx={{ fontWeight: 'bold' }}>Vastaanottajan yhteystiedot:</TableCell>
                                        <TableCell>{order.contact}</TableCell>
                                        <TableCell sx={{ fontWeight: 'bold' }}>Tilauksen tila:</TableCell>
                                        <TableCell>{order.status}</TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell sx={{ fontWeight: 'bold' }}>Vastaanottajan puhelinnumero:</TableCell>
                                        <TableCell>{order.phone_number}</TableCell>

                                        {/* // Conditionalize btn visibility for storage_group (?) */}
                                        <TableCell>
                                            <Button to={`/varasto/tilaus/${order.id}/muokkaa`} component={Link}>
                                                Muokkaa tilausta
                                            </Button>
                                        </TableCell>
                                        <TableCell>
                                            <Button
                                                color="error"
                                                to={`/varasto/pdf/${order.id}`}
                                                component={Link}
                                                sx={{
                                                    '&:hover': {
                                                        backgroundColor: 'success.dark',
                                                    },
                                                }}
                                            >
                                                Luo tulostettava PDF
                                            </Button>
                                        </TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell sx={{ fontWeight: 'bold' }}>Lisätiedot:</TableCell>
                                        <TableCell colSpan={3}>{order.order_info}</TableCell>
                                    </TableRow>
                                </TableBody>
                            </Table>

                            <Table
                                id="orders-products-table"
                                aria-label="collapsible table"
                                sx={{ margin: '1rem 0 1rem 0' }}
                            >
                                <TableHead>
                                    <TableRow>
                                        <StyledTableCell>Tuotteet:</StyledTableCell>
                                        <StyledTableCell>Viivakoodi</StyledTableCell>
                                        <StyledTableCell>Tuotenimi</StyledTableCell>
                                        <StyledTableCell>Kappalemäärä</StyledTableCell>
                                        <StyledTableCell>Varasto</StyledTableCell>
                                    </TableRow>
                                </TableHead>

                                <TableBody id="orders-products-tablebody">
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
                                                    <Box component={Link} to={`/tuotteet/${itemArray[0].product.id}`}>
                                                        {itemArray[0].product.name}
                                                    </Box>
                                                </TableCell>
                                                <TableCell>{itemArray.length}</TableCell>
                                                <TableCell>{itemArray[0].storage.name}</TableCell>
                                            </StyledTableRow>
                                            <TableRow>
                                                <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={7}>
                                                    <Collapse in={isOpen[index]} timeout="auto" unmountOnExit>
                                                        <Box id="product-detail-indent-box" sx={{ margin: '1rem' }}>
                                                            <Table size="small">
                                                                <TableHead>
                                                                    <TableRow>
                                                                        <TableCell align="right">Mitat</TableCell>
                                                                        <TableCell align="right">Paino</TableCell>
                                                                        <TableCell align="right">Tuotekuvaus</TableCell>
                                                                        <TableCell align="right">Tuotenumero</TableCell>
                                                                        <TableCell align="right">Hyllynumero</TableCell>
                                                                    </TableRow>
                                                                </TableHead>
                                                                <TableBody>
                                                                    {itemArray.map((item) => (
                                                                        <TableRow key={item.id}>
                                                                            <TableCell align="right">
                                                                                {item.product.measurements}
                                                                            </TableCell>
                                                                            <TableCell align="right">
                                                                                {item.product.weight}
                                                                            </TableCell>
                                                                            <TableCell align="right">
                                                                                {item.product.free_description}
                                                                            </TableCell>
                                                                            <TableCell align="right">
                                                                                {item.product.id}
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
                            </Table>
                        </Box>
                    </>
                ) : (
                    <NoOrders />
                )}
            </Stack>
        </Container>
    );
}

export default OrderTable;
