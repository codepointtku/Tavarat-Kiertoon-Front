import { useState, Fragment } from 'react';
import { useLoaderData, Link } from 'react-router-dom';

import {
    Table,
    TableBody,
    TableHead,
    TableCell,
    TableRow,
    IconButton,
    Box,
    Collapse,
    Button,
    Stack,
    Container,
    Grid,
} from '@mui/material';

import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';

import StyledTableRow from '../StyledTableRow';
import StyledTableCell from '../StyledTableCell';
import TypographyTitle from '../TypographyTitle';
import BackButton from '../BackButton';
import Tooltip from '../Tooltip';
import HasRole from '../../Utils/HasRole';

import type { orderViewLoader } from '../../Router/loaders';

export type OrderViewLoaderType = Awaited<ReturnType<typeof orderViewLoader>>;

interface Props {
    isAdmin: boolean;
}

function OrderView({ isAdmin }: Props) {
    const order = useLoaderData() as OrderViewLoaderType;
    // state to control product info collapse field
    const [isOpen, setIsOpen] = useState<number>();

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

    // Parse Date objects from backend data string
    const dateParse = (value: string) => {
        const date = new Date(value);
        const dateString = `${date.getDate()}.${date.getMonth()}.${date.getFullYear()}`;
        return dateString;
    };

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

                <Box id="order-info-main-wrapper" sx={{ margin: '2rem 0 1rem 0' }}>
                    <Table id="order-info-table">
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
                                <TableCell>
                                    <HasRole role="admin_group">
                                        <Button
                                            component={Link}
                                            to={`/admin/tilaukset/${order.id}/muokkaa`}
                                            // leaving this here incase storage needs to have the ability to edit orders
                                            // to={
                                            //     isAdmin
                                            //         ? `/admin/tilaukset/${order.id}/muokkaa`
                                            //         : `/varasto/tilaukset/${order.id}/muokkaa`
                                            // }
                                        >
                                            Muokkaa tilausta
                                        </Button>
                                    </HasRole>
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
                                        {isAdmin ? 'Luo PDF' : 'Tulosta'}
                                    </Button>
                                </TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell sx={{ fontWeight: 'bold' }}>Lisätiedot:</TableCell>
                                <TableCell colSpan={3} sx={{ wordBreak: 'break-all', whiteSpace: 'pre-wrap' }}>
                                    {order.order_info}
                                </TableCell>
                            </TableRow>
                        </TableBody>
                    </Table>

                    <Table id="orders-products-table" aria-label="collapsible table" sx={{ margin: '1rem 0 1rem 0' }}>
                        <TableHead>
                            <TableRow>
                                <StyledTableCell>Tuotteet:</StyledTableCell>
                                <StyledTableCell>Viivakoodi</StyledTableCell>
                                <StyledTableCell>Tuotenimi</StyledTableCell>
                                <StyledTableCell>Kappalemäärä</StyledTableCell>
                                <StyledTableCell>Tuotetunniste</StyledTableCell>
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
                                                    isOpen === index ? setIsOpen(undefined) : setIsOpen(index);
                                                }}
                                            >
                                                {isOpen === index ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
                                            </IconButton>
                                        </TableCell>
                                        <TableCell>{itemArray[0].barcode}</TableCell>
                                        <TableCell component="th" scope="row">
                                            <Tooltip title={itemArray[0].product.free_description}>
                                                <Box
                                                    component={Link}
                                                    // to do: link to = adminview | storageview product editview, not defaults
                                                    to={`/tuotteet/${itemArray[0].product.id}`}
                                                >
                                                    {itemArray[0].product.name}
                                                </Box>
                                            </Tooltip>
                                        </TableCell>
                                        <TableCell>{itemArray.length}</TableCell>
                                        <TableCell>{itemArray[0].product.id}</TableCell>
                                        <TableCell>{itemArray[0].storage.name}</TableCell>
                                    </StyledTableRow>
                                    <TableRow>
                                        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
                                            <Collapse in={isOpen === index} timeout="auto" unmountOnExit>
                                                <Box
                                                    id="product-detail-indent-box"
                                                    sx={{ margin: '0.4rem 1rem -0.1rem 1rem' }}
                                                >
                                                    <Table size="small">
                                                        <TableHead>
                                                            <TableRow>
                                                                <TableCell align="right">Mitat</TableCell>
                                                                <TableCell align="right">Paino</TableCell>
                                                                <TableCell align="right">
                                                                    Yksittäisen tuotteen tunnistenumero
                                                                </TableCell>
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
                                                                    <TableCell align="right">{item.id}</TableCell>
                                                                    <TableCell align="right">{item.shelf_id}</TableCell>
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
            </Stack>
        </Container>
    );
}

export default OrderView;
