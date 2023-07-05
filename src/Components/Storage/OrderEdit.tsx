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
import { useLoaderData, useNavigate, generatePath } from 'react-router';
import { Form, useSubmit } from 'react-router-dom';
import StyledTableRow from '../StyledTableRow';
import StyledTableCell from '../StyledTableCell';
import { useForm, useFieldArray, type FieldValues } from 'react-hook-form';
import { type orderEditLoader } from '../../Router/loaders';
import { useState } from 'react';
// import { productsApi } from '../../api';
import axios from 'axios';

export type OrderEditLoaderType = Awaited<ReturnType<typeof orderEditLoader>>;

type FormValues = {
    orderId: number;
    contact: OrderEditLoaderType['contact'];
    phoneNumber: OrderEditLoaderType['phone_number'];
    deliveryAddress: OrderEditLoaderType['delivery_address'];
    status: OrderEditLoaderType['status'];
    orderInfo: OrderEditLoaderType['order_info'];
    productItems: OrderEditLoaderType['product_items'];
    productRenderItems: OrderEditLoaderType['product_items'][];
};

/**
 * Edit an existing order
 *
 * @returns JSX Element
 */
function OrderEdit() {
    const orderData = useLoaderData() as OrderEditLoaderType;

    // array with an array for each unique product_item.product.id and all products with that id
    const productRenderItems: OrderEditLoaderType['product_items'][] = [];
    const productRenderItemAmounts: number[] = [];
    orderData.product_items.forEach((productItem) => {
        // check if array already contains an item.product.id array
        const productIndex = productRenderItems.findIndex((index) => index[0]?.product.id === productItem.product.id);
        if (productIndex < 0) {
            // if not, push a new array with this item as its first object
            productRenderItems.push([productItem]);
            productRenderItemAmounts.push(1);
        } else {
            // if yes, push this item to that array
            productRenderItems[productIndex].push(productItem);
            productRenderItemAmounts[productIndex]++;
        }
    });

    // keep track of new product amounts
    const [amounts, setAmounts] = useState<number[]>(productRenderItemAmounts);
    const [newProduct, setNewProduct] = useState<number>(0);

    // handler for adding product
    const newProductOnChangeHandler = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        event.preventDefault();
        // only allow numbers
        if (!isNaN(Number(event.target.value))) {
            setNewProduct(Number(event.target.value));
        }
    };

    // NOTE!!! Change axios to api call -JTo-
    // Add new product/productItem handler
    const addNewProduct = async () => {
        // console.log('### orderEdit: addNewProduct', newProduct);
        // console.log('###', productRenderItems);

        if (typeof newProduct === 'number' && newProduct !== 0) {
            const response = await axios.get(
                `http://localhost:8000/products/items/?product=${newProduct}&available=true`
            );
            // 'get' ok, return needed item ids
            if (response.status === 200) {
                const newItems = [...response.data.results];
                const firstItem = newItems[0];
                append([{ 0: firstItem }]);
                setAmounts([...amounts, 1]);
            }
        }
    };

    // hook form functions and default values
    const { control, formState, handleSubmit, register, watch } = useForm<FormValues>({
        mode: 'onTouched',
        defaultValues: {
            orderId: orderData.id,
            contact: orderData.contact,
            phoneNumber: orderData.phone_number,
            deliveryAddress: orderData.delivery_address,
            status: orderData.status,
            orderInfo: orderData.order_info,
            productItems: orderData.product_items,
            productRenderItems: productRenderItems,
        },
    });

    // field array functions
    // NOTE! fields should be the same as productRenderItems i.e. array of arrays of objects [ [{},{}],[{},{}] ].
    //       but for some reason useFieldArray makes it to array of objects of objects [{ {},{} },{ {},{} }].
    //       useFieldArray also adds an "id" field to the end so need to deduct 1 from length when using it.
    //        => in mapping "Object.keys(productItemGroup).length - 1" is used instead of "productItemGroup.length"
    //       - JTo -
    const { fields, append } = useFieldArray({
        name: 'productRenderItems',
        control,
    });

    const { errors } = formState;
    const navigate = useNavigate();

    // Remove product handler
    const removeProduct = (index: number) => {
        const newValue = [...amounts];
        newValue[index] = 0;
        setAmounts(newValue);
    };

    // Modify the number of productRenderItems
    const modifyProductItemAmounts = (
        id: number,
        event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
        index: number
    ) => {
        const newValue = [...amounts];
        newValue[index] = Number(event.target.value);
        setAmounts(newValue);
    };

    // NOTE!!! Change axios to api call -JTo-
    // add new productitems to an existing product
    const addNewItems = async (id: number, amount: number) => {
        // const response = await productsApi.productsList();
        const response = await axios.get(`http://localhost:8000/products/items/?product=${id}&available=true`);

        // 'get' ok, return needed item ids
        if (response.status === 200) {
            const newItems = [...response.data.results];
            newItems.splice(amount);
            return newItems;
        }
        // 'get' failed
        return [];
    };

    // submit
    const submit = useSubmit();
    const onSubmit = async (data: FieldValues) => {
        // Create new productItem list for each product
        console.log('### onSubmit: data:', data);

        const productItems: OrderEditLoaderType['product_items'][] = [];
        for (const [index, item] of data.productRenderItems.entries()) {
            // existing product
            if (Array.isArray(item)) {
                // reduce number of productItems
                if (item.length > amounts[index]) {
                    item.splice(item.length - (item.length - amounts[index]));
                    productItems.push(...item);
                }
                // add number of productItems
                else if (item.length < amounts[index]) {
                    productItems.push(...item);
                    const newItems = await addNewItems(item[0].product.id, amounts[index] - item.length);
                    productItems.push(...newItems);
                }
                // keep the numbeer of productItems the same
                else {
                    productItems.push(...item);
                }
            }
            // new product
            else {
                const itemValue = Object.values(item);
                productItems.push(...itemValue);
            }
        }
        // create array of product_item_ids for backend and submit data
        const productItemIds = productItems.map((item: OrderEditLoaderType['product_items'][number]) => item.id);
        console.log('### productItemIds', productItemIds);
        const formData = { ...data, productItems: JSON.stringify(productItemIds) };
        await submit(formData, {
            method: 'put',
            action: `/varasto/tilaus/${data.orderId}/muokkaa`,
        });
    };

    // fields.map((pig, index) => {
    //     console.log('### PRODUCTRENDERITEMS', index, pig);
    // });

    // console.log('### amounts', amounts);

    // RENDER
    return (
        <>
            <Typography variant="h3" align="center" color="primary.main" my="2rem" width="100%">
                {`Muokkaa tilausta ${orderData.id}`}
            </Typography>
            {orderData && (
                <>
                    <Box component={Form} onSubmit={handleSubmit(onSubmit)}>
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
                                                    value={watch('contact')}
                                                    {...register('contact', {
                                                        required: 'Pakollinen kenttä',
                                                    })}
                                                    fullWidth
                                                    color={errors.contact ? 'error' : 'primary'}
                                                    error={!!errors.contact}
                                                    helperText={errors.contact?.message?.toString() || ' '}
                                                    required
                                                    sx={{ marginBottom: '-1rem' }}
                                                />
                                            </TableCell>
                                            <TableCell sx={{ fontWeight: 'bold' }}>Puhelinnumero:</TableCell>
                                            <TableCell>
                                                <TextField
                                                    label="Muokkaa puhelinnumeroa"
                                                    value={watch('phoneNumber')}
                                                    {...register('phoneNumber', {
                                                        required: 'Pakollinen kenttä',
                                                    })}
                                                    fullWidth
                                                    color={errors.phoneNumber ? 'error' : 'primary'}
                                                    error={!!errors.phoneNumber}
                                                    helperText={errors.phoneNumber?.message?.toString() || ' '}
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
                                                    value={watch('deliveryAddress')}
                                                    {...register('deliveryAddress', {
                                                        required: 'Pakollinen kenttä',
                                                    })}
                                                    fullWidth
                                                    color={errors.deliveryAddress ? 'error' : 'primary'}
                                                    error={!!errors.deliveryAddress}
                                                    helperText={errors.deliveryAddress?.message?.toString() || ' '}
                                                    required
                                                    sx={{ marginBottom: '-1rem' }}
                                                />
                                            </TableCell>
                                            <TableCell sx={{ fontWeight: 'bold' }}>Tila:</TableCell>
                                            <TableCell>
                                                <TextField
                                                    label="Muokkaa tilaa"
                                                    value={watch('status')}
                                                    {...register('status', {
                                                        required: 'Pakollinen kenttä',
                                                    })}
                                                    fullWidth
                                                    color={errors.status ? 'error' : 'primary'}
                                                    error={!!errors.status}
                                                    helperText={errors.status?.message?.toString() || ' '}
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
                                                    value={watch('orderInfo')}
                                                    {...register('orderInfo', {
                                                        required: 'Pakollinen kenttä',
                                                    })}
                                                    fullWidth
                                                    color={errors.orderInfo ? 'error' : 'primary'}
                                                    error={!!errors.orderInfo}
                                                    helperText={errors.orderInfo?.message?.toString() || ' '}
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
                                    value={newProduct === 0 ? '' : newProduct}
                                    onChange={newProductOnChangeHandler}
                                    // onChange={(event) => {
                                    //     handleChange('newItem', event);
                                    // }}
                                    // defaultValue={orderData.newItem}
                                />

                                <Button onClick={() => addNewProduct()}>Lisää esine ID:n perusteella</Button>
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
                                        {/* ProductItemGroup map */}
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
                                                    <TextField
                                                        type="number"
                                                        size="small"
                                                        value={amounts[index]}
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
                                                            modifyProductItemAmounts(
                                                                productItemGroup[0].id,
                                                                event,
                                                                index
                                                            );
                                                        }}
                                                    />
                                                </TableCell>
                                                <TableCell align="right">
                                                    <Button
                                                        disabled={amounts[index] === 0 ? true : false}
                                                        onClick={() => {
                                                            removeProduct(index);
                                                        }}
                                                        sx={{ width: '120px' }}
                                                    >
                                                        {amounts[index] === 0 ? 'Poistettu' : 'Poista tuote.'}
                                                    </Button>
                                                </TableCell>
                                            </StyledTableRow>
                                        ))}
                                    </TableBody>
                                </Table>
                            </Box>
                            <Box width="100%" display="flex" justifyContent="space-evenly" marginTop="3rem">
                                <Button onClick={() => navigate(-1)}>Palaa tallentamatta</Button>
                                <Button
                                    color="error"
                                    // onClick={() => saveChanges()}
                                    type="submit"
                                >
                                    Tallenna muutokset
                                </Button>
                            </Box>
                        </TableContainer>
                    </Box>
                </>
            )}
        </>
    );
}

export default OrderEdit;
