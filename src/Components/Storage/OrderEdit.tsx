import {
    Button,
    Box,
    Paper,
    TextField,
    TableCell,
    TableContainer,
    Table,
    TableHead,
    TableRow,
    TableBody,
    Typography,
} from '@mui/material';
// import { useState, useRef } from 'react';
import { useLoaderData, useNavigate, generatePath, useActionData } from 'react-router';
import { Form, useSubmit } from 'react-router-dom';
// import AlertBox from '../AlertBox';
import StyledTableRow from '../StyledTableRow';
import StyledTableCell from '../StyledTableCell';
// import ConfirmWindow from '../Admin/ConfirmWindow';
import { useForm, useFieldArray } from 'react-hook-form';
import { type orderEditLoader } from '../../Router/loaders';
// import { CenterFocusStrong } from '@mui/icons-material';

export type OrderEditLoaderType = Awaited<ReturnType<typeof orderEditLoader>>;

type FormValues = {
    orderEditModifyContact: OrderEditLoaderType['contact'];
    orderEditModifyNumber: OrderEditLoaderType['phone_number'];
    orderEditModifyAddress: OrderEditLoaderType['delivery_address'];
    orderEditModifyStatus: OrderEditLoaderType['status'];
    orderEditModifyOrderInfo: OrderEditLoaderType['order_info'];
    orderEditProductItems: OrderEditLoaderType['product_items'][];
};

/**
 * Edit an existing order
 *
 * @returns JSX Element
 */
function OrderEdit() {
    // data from backend
    const orderData = useLoaderData() as OrderEditLoaderType;

    // array with an array for each unique product_item.product.id and all products with that id
    const productRenderItems: OrderEditLoaderType['product_items'][] = [];
    orderData.product_items.forEach((productItem) => {
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
    // console.log('### OrderEdit: productRenderItems', productRenderItems);

    // hook form functions and default values
    const { control, formState, register, watch } = useForm<FormValues>({
        mode: 'onTouched',
        defaultValues: {
            orderEditModifyContact: orderData.contact,
            orderEditModifyNumber: orderData.phone_number,
            orderEditModifyAddress: orderData.delivery_address,
            orderEditModifyStatus: orderData.status,
            orderEditModifyOrderInfo: orderData.order_info,
            orderEditProductItems: productRenderItems,
        },
    });

    // field array functions
    // NOTE! fields should be the same as productRenderItems i.e. array of arrays of objects [ [{},{}],[{},{}] ]
    //       but for some reason useFieldsArray makes it to array of objects of objects [{ {},{} },{ {},{} }]
    //       so in mapping "Object.keys(productItemGroup).length - 1" is used instead of "productItemGroup.length"
    //       - JTo -
    const { fields } = useFieldArray({
        name: 'orderEditProductItems',
        control,
    });

    // error messages
    const { errors } = formState;

    // navigation for QRcodereader
    const navigate = useNavigate();

    // Add new product/productItem handler
    const addProduct = () => {
        // add here apiCall to find item by ID
        console.log('### orderEdit: addProduct');
    };

    // Remove product handler
    const removeProduct = (val: number) => {
        console.log('### orderEdit: removeProduct', val);
    };

    // Moify the number of productItems
    const modifyProductItemAmounts = (id: number, event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        console.log('### orderEdit: modifyProductItemAmounts', id, event.target.value);
    };

    console.log('### orderData', orderData);
    console.log('### productRenderItems', productRenderItems);
    console.log('### fields', fields);

    // RENDER
    return (
        <>
            <Typography variant="h3" align="center" color="primary.main" my="2rem" width="100%">
                {`Muokkaa tilausta ${orderData.id}`}
            </Typography>
            {orderData && (
                <>
                    <Box component={Form}>
                        <TableContainer
                            component={Paper}
                            sx={{
                                display: 'flex',
                                padding: '2rem',
                                marginBottom: '2rem',
                                textAlign: 'center',
                                alignItems: 'center',
                                flexDirection: 'column',
                            }}
                        >
                            {/*
                             * Contact area
                             */}
                            <Box width="75%">
                                <Table>
                                    <TableBody>
                                        <TableRow>
                                            <TableCell sx={{ fontWeight: 'bold' }}>Yhteystieto:</TableCell>
                                            <TableCell>
                                                <TextField
                                                    label="Muokka yhteystietoa"
                                                    value={watch('orderEditModifyContact')}
                                                    {...register('orderEditModifyContact', {
                                                        required: 'Pakollinen kenttä',
                                                    })}
                                                    fullWidth
                                                    color={errors.orderEditModifyContact ? 'error' : 'primary'}
                                                    error={!!errors.orderEditModifyContact}
                                                    helperText={
                                                        errors.orderEditModifyContact?.message?.toString() || ' '
                                                    }
                                                    required
                                                    sx={{ marginBottom: '-1rem' }}
                                                />
                                            </TableCell>
                                            <TableCell sx={{ fontWeight: 'bold' }}>Puhelinnumero:</TableCell>
                                            <TableCell>
                                                <TextField
                                                    label="Muokkaa puhelinnumeroa"
                                                    value={watch('orderEditModifyNumber')}
                                                    {...register('orderEditModifyNumber', {
                                                        required: 'Pakollinen kenttä',
                                                    })}
                                                    fullWidth
                                                    color={errors.orderEditModifyNumber ? 'error' : 'primary'}
                                                    error={!!errors.orderEditModifyNumber}
                                                    helperText={
                                                        errors.orderEditModifyNumber?.message?.toString() || ' '
                                                    }
                                                    required
                                                    sx={{ marginBottom: '-1rem' }}
                                                />
                                            </TableCell>
                                        </TableRow>
                                        <TableRow>
                                            <TableCell sx={{ fontWeight: 'bold' }}>Osoite:</TableCell>
                                            <TableCell>
                                                <TextField
                                                    label="Muokkaa osoitetta"
                                                    value={watch('orderEditModifyAddress')}
                                                    {...register('orderEditModifyAddress', {
                                                        required: 'Pakollinen kenttä',
                                                    })}
                                                    fullWidth
                                                    color={errors.orderEditModifyAddress ? 'error' : 'primary'}
                                                    error={!!errors.orderEditModifyAddress}
                                                    helperText={
                                                        errors.orderEditModifyAddress?.message?.toString() || ' '
                                                    }
                                                    required
                                                    sx={{ marginBottom: '-1rem' }}
                                                />
                                            </TableCell>
                                            <TableCell sx={{ fontWeight: 'bold' }}>Tila:</TableCell>
                                            <TableCell>
                                                <TextField
                                                    label="Muokkaa tilaa"
                                                    value={watch('orderEditModifyStatus')}
                                                    {...register('orderEditModifyStatus', {
                                                        required: 'Pakollinen kenttä',
                                                    })}
                                                    fullWidth
                                                    color={errors.orderEditModifyStatus ? 'error' : 'primary'}
                                                    error={!!errors.orderEditModifyStatus}
                                                    helperText={
                                                        errors.orderEditModifyStatus?.message?.toString() || ' '
                                                    }
                                                    required
                                                    sx={{ marginBottom: '-1rem' }}
                                                />
                                            </TableCell>
                                        </TableRow>
                                        <TableRow>
                                            <TableCell sx={{ fontWeight: 'bold', border: 'none' }}>
                                                Lisätieto:
                                            </TableCell>
                                            <TableCell colSpan={3} sx={{ border: 'none' }}>
                                                <TextField
                                                    label="Muokkaa lisätietoa"
                                                    value={watch('orderEditModifyOrderInfo')}
                                                    {...register('orderEditModifyOrderInfo', {
                                                        required: 'Pakollinen kenttä',
                                                    })}
                                                    fullWidth
                                                    color={errors.orderEditModifyOrderInfo ? 'error' : 'primary'}
                                                    error={!!errors.orderEditModifyOrderInfo}
                                                    helperText={
                                                        errors.orderEditModifyOrderInfo?.message?.toString() || ' '
                                                    }
                                                    required
                                                    multiline
                                                    sx={{ marginBottom: '-1rem' }}
                                                />
                                            </TableCell>
                                        </TableRow>
                                    </TableBody>
                                </Table>
                            </Box>
                            {/*
                             * Add product area
                             */}
                            <Box paddingTop="2rem" borderTop="2px solid rgba(0,0,0,0.1)" width="100%">
                                <Button
                                    onClick={() =>
                                        navigate(generatePath('/varasto/koodinlukija'), {
                                            state: {
                                                ...orderData,
                                                returnpath: `/varasto/tilaus/${orderData.id}/muokkaa`,
                                            },
                                        })
                                    }
                                >
                                    Lisää esine viivakoodin perusteella
                                </Button>
                                <TextField
                                    label="Esine-ID"
                                    size="small"
                                    // onChange={(event) => {
                                    //     handleChange('newItem', event);
                                    // }}
                                    // defaultValue={orderData.newItem}
                                />

                                <Button onClick={() => addProduct()}>Lisää esine ID:n perusteella</Button>
                            </Box>
                            {/*
                             * List products area
                             */}
                            <Box marginTop="2rem" width="100%">
                                <Table>
                                    <TableHead>
                                        <TableRow>
                                            <StyledTableCell>Tuotenimi</StyledTableCell>
                                            <StyledTableCell>Tuotenumero</StyledTableCell>
                                            <StyledTableCell>Viivakoodi</StyledTableCell>
                                            <StyledTableCell>Saldo</StyledTableCell>
                                            <StyledTableCell>max</StyledTableCell>
                                            <StyledTableCell align="right">Tuotteet</StyledTableCell>
                                            <StyledTableCell> </StyledTableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {/*
                                         *
                                         *
                                         *
                                         * ProductItemGroup map
                                         *
                                         *
                                         *
                                         */}
                                        {fields.map((productItemGroup, index) => (
                                            <StyledTableRow key={productItemGroup[0].id}>
                                                <TableCell>{productItemGroup[0].product.name}</TableCell>
                                                <TableCell>{productItemGroup[0].id}</TableCell>
                                                <TableCell>{productItemGroup[0].barcode}</TableCell>
                                                <TableCell>{Object.keys(productItemGroup).length - 1}</TableCell>
                                                <TableCell>
                                                    {Object.keys(productItemGroup).length -
                                                        1 +
                                                        productItemGroup[0].product.amount}
                                                </TableCell>
                                                <TableCell align="right">
                                                    {/* Tuotteet */}
                                                    <TextField
                                                        type="number"
                                                        size="small"
                                                        defaultValue={Object.keys(productItemGroup).length - 1}
                                                        InputProps={{
                                                            inputProps: {
                                                                min: 0,
                                                                max:
                                                                    Object.keys(productItemGroup).length -
                                                                    1 +
                                                                    productItemGroup[0].product.amount,
                                                            },
                                                        }}
                                                        onChange={(event) => {
                                                            modifyProductItemAmounts(productItemGroup[0].id, event);
                                                        }}
                                                    />
                                                </TableCell>
                                                <TableCell align="right">
                                                    <Button
                                                        onClick={() => {
                                                            removeProduct(productItemGroup.length);
                                                        }}
                                                    >
                                                        Poista tuote.
                                                    </Button>
                                                </TableCell>
                                            </StyledTableRow>
                                        ))}
                                        {/* {productRenderItems.map((productItemGroup, index) => (
                                            <StyledTableRow key={productItemGroup[0].id}>
                                                <TableCell>{productItemGroup[0].product.name}</TableCell>
                                                <TableCell>{productItemGroup[0].id}</TableCell>
                                                <TableCell>{productItemGroup[0].barcode}</TableCell>
                                                <TableCell>{productItemGroup.length}</TableCell>
                                                <TableCell>
                                                    {productItemGroup.length + productItemGroup[0].product.amount}
                                                </TableCell>
                                                <TableCell align="right">
                                                    <TextField
                                                        type="number"
                                                        size="small"
                                                        defaultValue={productItemGroup.length}
                                                        InputProps={{
                                                            inputProps: {
                                                                min: 0,
                                                                max:
                                                                    productItemGroup.length +
                                                                    productItemGroup[0].product.amount,
                                                            },
                                                        }}
                                                        onChange={(event) => {
                                                            modifyProductItemAmounts(productItemGroup[0].id, event);
                                                        }}
                                                    />
                                                </TableCell>
                                                <TableCell align="right">
                                                    <Button
                                                        onClick={() => {
                                                            removeProduct(productItemGroup.length);
                                                        }}
                                                    >
                                                        Poista tuote.
                                                    </Button>
                                                </TableCell>
                                            </StyledTableRow>
                                        ))} */}
                                    </TableBody>
                                </Table>
                            </Box>
                            <Box width="100%" display="flex" justifyContent="space-evenly" marginTop="3rem">
                                <Button>Palaa tallentamatta</Button>
                                <Button color="error">Tallenna muutokset</Button>
                            </Box>
                        </TableContainer>
                    </Box>
                </>
            )}
        </>
    );
}

export default OrderEdit;
