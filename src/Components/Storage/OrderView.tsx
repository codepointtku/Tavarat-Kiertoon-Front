import { useState, Fragment, useContext } from 'react';
import {
    useLoaderData,
    Link,
    useFetcher,
    useSubmit,
    useNavigate,
    useNavigation,
    useActionData,
} from 'react-router-dom';
import { usePDF } from '@react-pdf/renderer';
import PDFDocument from './PDFCreator';

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
    Link as MuiLink,
    TextField,
    MenuItem,
} from '@mui/material';

import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';

import StyledTableRow from '../StyledTableRow';
import StyledTableCell from '../StyledTableCell';
import TypographyTitle from '../TypographyTitle';
import Tooltip from '../Tooltip';
import HasRole from '../../Utils/HasRole';

import type { orderViewLoader } from '../../Router/loaders';
import BackButton from '../BackButton';
import AuthContext from '../../Context/AuthContext';
import AlertBox from '../AlertBox';
import { type FieldValues, useForm } from 'react-hook-form';
import { type ProductItemResponse } from '../../api';
import { type orderEditStatusAction } from '../../Router/actions';

export type OrderViewLoaderType = Awaited<ReturnType<typeof orderViewLoader>>;

type FormValues = {
    status: OrderViewLoaderType['status'];
};
function OrderView() {
    const order = useLoaderData() as OrderViewLoaderType;
    const response = useActionData() as Awaited<ReturnType<typeof orderEditStatusAction>>;
    const { auth } = useContext(AuthContext);
    // state to control product info collapse field
    const [isOpen, setIsOpen] = useState<number>();
    const navigate = useNavigate();
    const navigation = useNavigation();
    const currentStatus = ['Waiting', 'Processing', 'Finished'];
    // array with an array for each unique product_item.product.id and all products with that id
    const productRenderItems: OrderViewLoaderType['product_items'][] = [];
    order.product_items.forEach((productItem: ProductItemResponse) => {
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
        const dateString = `${date.getDate()}.${date.getMonth() + 1}.${date.getFullYear()}`;
        return dateString;
    };

    const {
        handleSubmit,
        register,
        formState: { isSubmitting, isSubmitSuccessful, defaultValues, isDirty, submitCount },
    } = useForm<FormValues>({
        mode: 'onTouched',
        defaultValues: {
            status: order.status,
        },
    });
    const submit = useSubmit();
    //const [instance] = usePDF({ document: <PDFDocument order={order} /> });

    const fetcher = useFetcher();
    const onSubmit = async (data: FieldValues) => {
        const productItemlist: number[] = [];
        productRenderItems.map((item) => {
            productItemlist.push(item[0].id);
        });
        await submit(
            {
                status: data.status,
                orderId: order.id.toString(),
                deliveryAddress: order.delivery_address,
                recipient: order.recipient,
                recipient_phone_number: order.recipient_phone_number,
                productItems: JSON.stringify(productItemlist),
            },
            {
                method: 'put',
            }
        );
    };
    const printPDF = async (data: FieldValues) => {
        if (order.status === 'Waiting') {
            // if order is not waiting, change status to processing, else don't change status, only navigate to pdf view
            const productItemlist: number[] = [];
            productRenderItems.map((item) => {
                productItemlist.push(item[0].id);
            });
            await submit(
                {
                    status: 'Processing',
                    orderId: order.id.toString(),
                    deliveryAddress: order.delivery_address,
                    recipient: order.recipient,
                    recipient_phone_number: order.recipient_phone_number,
                    productItems: JSON.stringify(productItemlist),
                },
                {
                    method: 'put',
                }
            );
        }

        navigate(`/varasto/pdf/${order.id}`);
    };

    const orderStatusTranslate = (value: string) => {
        if (value === 'Waiting') {
            return 'Odottaa käsittelyä';
        }
        if (value === 'Processing') {
            return 'Käsittelyssä';
        }
        if (value === 'Finished') {
            return 'Toimitettu';
        } else {
            return value;
        }
    };
    return (
        <>
            {response?.type === 'orderstatusupdate' && response?.status === false && (
                <AlertBox text="Tilan muuttaminen epäonnistui" status="error" timer={5000} />
            )}
            {response?.status !== false && navigation.state === 'idle' && isSubmitSuccessful && (
                <AlertBox text="Tila päivitetty" status="success" timer={2000} />
            )}
            <Container maxWidth="xl">
                <Stack id="order-info-container-main-stack" sx={{ padding: '1rem 0 1rem 0' }}>
                    <Grid
                        id="header-grid-container"
                        container
                        sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}
                    >
                        <Grid item xs={3} justifyContent="flex-start">
                            <BackButton />
                        </Grid>
                        <Grid item xs={6}>
                            <TypographyTitle text={`Tilaus #${order.id}`} />
                        </Grid>
                        <Grid item xs={3} />
                    </Grid>

                    <Box id="order-info-main-wrapper" sx={{ margin: '2rem 0 1rem 0' }}>
                        <Table id="order-info-table">
                            <TableBody>
                                <TableRow>
                                    <TableCell width="20%" sx={{ fontWeight: 'bold' }}>
                                        Tilaaja:
                                    </TableCell>
                                    <TableCell width="30%">
                                        {auth['admin_group'] ? (
                                            <MuiLink component={Link} to={`/admin/kayttajat/${order.user.id}`}>
                                                {order.user.first_name} {order.user.last_name}
                                            </MuiLink>
                                        ) : (
                                            <span>
                                                {order.user.first_name} {order.user.last_name}
                                            </span>
                                        )}
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
                                    <TableCell sx={{ fontWeight: 'bold' }}>Vastaanottaja:</TableCell>
                                    <TableCell>{order.recipient}</TableCell>
                                    <TableCell sx={{ fontWeight: 'bold' }}>Tilauksen tila:</TableCell>
                                    <TableCell>
                                        {auth['admin_group'] ? (
                                            <Container
                                                maxWidth="xs"
                                                component={fetcher.Form}
                                                onSubmit={handleSubmit(onSubmit)}
                                            >
                                                <Box
                                                    sx={{
                                                        display: 'flex',
                                                        justifyContent: 'flex-start',
                                                    }}
                                                >
                                                    <TextField
                                                        id="order-status-select"
                                                        select
                                                        size="small"
                                                        {...register('status', {
                                                            required: {
                                                                value: true,
                                                                message: 'Valitse tila',
                                                            },
                                                        })}
                                                        // value={watch('status')}
                                                        defaultValue={defaultValues?.status || ''}
                                                        required
                                                        inputProps={{ required: false }}
                                                        sx={{
                                                            width: '50%',
                                                        }}
                                                    >
                                                        {currentStatus?.map((status) => {
                                                            return (
                                                                <MenuItem
                                                                    id="order-status-item"
                                                                    className="order-status-select-item"
                                                                    key={status}
                                                                    value={status}
                                                                >
                                                                    {orderStatusTranslate(status)}
                                                                </MenuItem>
                                                            );
                                                        })}
                                                    </TextField>
                                                    <Button
                                                        id="submit-btn"
                                                        type="submit"
                                                        disabled={isSubmitting}
                                                        sx={{
                                                            marginLeft: '1rem',
                                                            display: isDirty || submitCount > 0 ? 'flex' : 'none',
                                                            // // animation for blinking button when unconfirmed changes. not used atm, but could be used for this or other buttons.
                                                            // animation: isDirty
                                                            //     ? 'blinker 1s linear infinite alternate'
                                                            //     : '',
                                                            // opacity: 1,
                                                            // '@keyframes blinker': {
                                                            //     '0%': {
                                                            //         opacity: 1,
                                                            //     },
                                                            //     '50%': {
                                                            //         opacity: 0.5,
                                                            //     },
                                                            //     '100%': {
                                                            //         opacity: 0,
                                                            //     },
                                                            // },
                                                        }}
                                                    >
                                                        Tallenna
                                                    </Button>
                                                </Box>
                                            </Container>
                                        ) : (
                                            order.status
                                        )}
                                    </TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell sx={{ fontWeight: 'bold' }}>Vastaanottajan puhelinnumero:</TableCell>
                                    <TableCell>{order.recipient_phone_number}</TableCell>
                                    <TableCell>
                                        <HasRole role="admin_group">
                                            <Button component={Link} to={`/admin/tilaukset/${order.id}/muokkaa`}>
                                                Muokkaa tilausta
                                            </Button>
                                        </HasRole>
                                    </TableCell>
                                    <TableCell>
                                        <HasRole role="admin_group">
                                            <Container
                                                maxWidth="xs"
                                                component={fetcher.Form}
                                                onSubmit={handleSubmit(printPDF)}
                                            >
                                                <Button
                                                    color="error"
                                                    //to={`/varasto/pdf/${order.id}`}
                                                    //to={instance.url}
                                                    //target="_blank"
                                                    //component={Link}
                                                    id="pdf-print"
                                                    type="submit"
                                                    sx={{
                                                        '&:hover': {
                                                            backgroundColor: 'success.dark',
                                                        },
                                                    }}
                                                >
                                                    Tulosta {order.status === 'Waiting' && 'ja ota käsittelyyn'}
                                                </Button>
                                            </Container>
                                        </HasRole>
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
                                    <StyledTableCell>Tuotetunniste</StyledTableCell>
                                    <StyledTableCell>Varasto</StyledTableCell>
                                </TableRow>
                            </TableHead>

                            <TableBody id="orders-products-tablebody">
                                {productRenderItems?.map((itemArray, index) => (
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
                                                    {isOpen === index ? (
                                                        <KeyboardArrowUpIcon />
                                                    ) : (
                                                        <KeyboardArrowDownIcon />
                                                    )}
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
                                            {/* todo: show some symbol[!] if there are multiple storages for these products? */}
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
                                                                    {/* Todo: add storage, to show product_items in multiple storages? */}
                                                                    {/* <TableCell align="right">Varasto</TableCell> */}
                                                                    <TableCell align="right">Varastopaikka</TableCell>
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
                </Stack>
            </Container>
        </>
    );
}

export default OrderView;
