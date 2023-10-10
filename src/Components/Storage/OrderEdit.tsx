import { useState } from 'react';
import { useLoaderData, useNavigate, generatePath, Form, useSubmit, useActionData, Link } from 'react-router-dom';
import { useForm, useFieldArray, type FieldValues } from 'react-hook-form';

import {
    Button,
    Box,
    IconButton,
    MenuItem,
    Stack,
    TextField,
    TableCell,
    TableContainer,
    Table,
    TableHead,
    TableRow,
    TableBody,
    Container,
    Grid,
} from '@mui/material';

import AddBoxIcon from '@mui/icons-material/AddBox';
import IndeterminateCheckBoxIcon from '@mui/icons-material/IndeterminateCheckBox';
import RefreshIcon from '@mui/icons-material/Refresh';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';

import StyledTableRow from '../StyledTableRow';
import StyledTableCell from '../StyledTableCell';
import AlertBox from '../AlertBox';
import TypographyTitle from '../TypographyTitle';
import Tooltip from '../Tooltip';

import type { orderEditLoader } from '../../Router/loaders';
import type { orderEditAction } from '../../Router/actions';
import { type ProductItemResponse, productsApi } from '../../api';

export type OrderEditLoaderType = Awaited<ReturnType<typeof orderEditLoader>>;

type FormValues = {
    orderId: number;
    recipient: OrderEditLoaderType['recipient'];
    recipient_phone_number: OrderEditLoaderType['recipient_phone_number'];
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

    const actionData = useActionData() as Awaited<ReturnType<typeof orderEditAction>>;

    const currentStatus = ['Waiting', 'Processing', 'Finished'];

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

    // Add new product/productItem handler
    const addNewProduct = async () => {
        try {
            if (typeof newProduct === 'number' && newProduct !== 0) {
                const response = await productsApi.productsItemsList(true, undefined, undefined, undefined, [
                    newProduct,
                ]);
                // 'get' ok, return needed item ids
                if (response.status === 200) {
                    const newItems = response.data.results ? [...response.data.results] : [];
                    // are there possible new products
                    if (newItems.length > 0) {
                        const firstItem = newItems[0];

                        // check if product is already on the list (product id read from each products first productItem)
                        let oktogoon = 0;
                        for (const key in fields) {
                            if (Object.values(fields[key])[0].product.id === firstItem.product.id) {
                                oktogoon++;
                            }
                        }
                        // not on the list: add it
                        if (oktogoon === 0) {
                            // const appendItem: any = { 0: firstItem }; // works but could not figure out type
                            const appendItem: ProductItemResponse[][] = [[firstItem]];
                            append(appendItem);
                            setAmounts([...amounts, 1]);
                        }
                        // already on the list: show alert
                        else {
                            alert(
                                `### HUPSISTA ###\nOrderEdit: addNewProduct\n"${firstItem.product.name}" on jo listalla`
                            );
                        }
                    }
                    // no new products: show alert
                    else {
                        alert(
                            '### HUPSISTA ###\nOrderEdit: addNewProduct\nValitettavasti tuotteita ei ole tällä hetkellä vapaana'
                        );
                    }
                }
            }
        } catch (error: any) {
            alert(
                '### HUPSISTA ###\nOrderEdit: addNewProduct\n' +
                    error?.message +
                    '\n' +
                    error?.response?.data?.product[0] +
                    '\n'
            );
        }
        setNewProduct(0);
    };

    // hook form functions and default values
    const {
        control,
        handleSubmit,
        register,
        watch,
        reset,
        formState: { isSubmitting, isSubmitSuccessful, errors: formStateErrors },
    } = useForm<FormValues>({
        mode: 'onTouched',
        defaultValues: {
            orderId: orderData.id,
            recipient: orderData.recipient,
            recipient_phone_number: orderData.recipient_phone_number,
            deliveryAddress: orderData.delivery_address,
            status: orderData.status,
            orderInfo: orderData.order_info,
            productItems: orderData.product_items,
            productRenderItems: productRenderItems,
        },
    });

    const formReset = () => {
        reset();
        setAmounts(productRenderItemAmounts);
    };

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

    // const navigate = useNavigate();

    // Remove product handler
    const removeProduct = (index: number) => {
        const newValue = [...amounts];
        newValue[index] = 0;
        setAmounts(newValue);
    };

    // Modify the number of productRenderItems
    const modifyProductItemAmounts = (
        event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
        index: number,
        min: number,
        max: number
    ) => {
        const regex = /^[0-9\b]+$/;
        if (event.target.value === '' || regex.test(event.target.value)) {
            const newValue = [...amounts];
            const newNumber = Number(event.target.value);
            if (newNumber < min) newValue[index] = min;
            else if (newNumber > max) newValue[index] = max;
            else newValue[index] = Number(event.target.value);
            setAmounts(newValue);
        }
    };

    // add new productitems to an existing product
    const addNewItems = async (id: number, amount: number) => {
        try {
            const response = await productsApi.productsItemsList(true, undefined, undefined, undefined, [id]);

            // 'get' ok, return needed items
            if (response.status === 200) {
                const newItems = response.data.results ? [...response.data.results] : [];
                newItems.splice(amount);
                return newItems;
            }
        } catch (error: any) {
            alert(
                '### HUPSISTA ###\nOrderEdit: addNewItems\n' +
                    error.message +
                    '\n' +
                    error.response.data.product[0] +
                    '\n'
            );
        }
        // 'get' failed
        return [];
    };

    // submit
    const submit = useSubmit();
    const onSubmit = async (data: FieldValues) => {
        // Create new productItem list for each product
        const productItems: OrderEditLoaderType['product_items'] = [];
        for (const [index, item] of data.productRenderItems.entries()) {
            // existing product ( array(s) )
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
                // keep the number of productItems the same
                else {
                    productItems.push(...item);
                }
            }
            // new product ( object(s) )
            else {
                const newItems = await addNewItems(item[0].product.id, amounts[index]);
                productItems.push(...newItems);
            }
        }
        // create array of product_item_ids for backend and submit data
        const productItemIds = productItems.map((item) => item.id);
        const formData = { ...data, productItems: JSON.stringify(productItemIds) };
        await submit(formData, {
            method: 'put',
            // action: `/varasto/tilaukset/${data.orderId}/muokkaa`,
        });
    };

    return (
        <>
            {actionData?.type === 'orderupdate' && actionData?.status === false && (
                <AlertBox text="Tilauksen muokkaus epäonnistui" status="error" />
            )}

            {actionData?.type === 'orderupdate' && actionData?.status && (
                <AlertBox
                    text="Tilausta muokattu onnistuneesti. Uudelleenohjataan..."
                    status="success"
                    timer={3000}
                    redirectUrl={`/admin/tilaukset/${orderData.id}`}
                />
            )}

            <Container maxWidth="xl">
                <Stack id="order-info-container-main-stack" sx={{ padding: '1rem 0 1rem 0' }}>
                    <TypographyTitle text={`Tilauksen #${orderData.id} muokkaus`} />
                    <Box id="form-container" component={Form} onSubmit={handleSubmit(onSubmit)}>
                        <TableContainer
                            id="main-table-container"
                            sx={{
                                display: 'flex',
                                flexDirection: 'column',
                                margin: '2rem 0 2rem 0',
                            }}
                        >
                            {/*
                             * Contact area
                             */}
                            <Box id="order-contact-info-area-container" sx={{ margin: '0 0 1rem 0' }}>
                                <Table id="order-contact-info-textfields-table">
                                    <TableBody>
                                        <TableRow>
                                            <TableCell sx={{ fontWeight: 'bold' }}>Vastaanottaja:</TableCell>
                                            <TableCell>
                                                <TextField
                                                    id="textfield-contact"
                                                    value={watch('recipient')}
                                                    {...register('recipient', {
                                                        required: { value: true, message: 'Pakollinen kenttä' },
                                                        maxLength: {
                                                            value: 255,
                                                            message: 'Yhteystiedon maksimipituus 255 merkkiä',
                                                        },
                                                        // pattern: {
                                                        //     value: /.+@turku.fi$|.+@edu.turku.fi$/,
                                                        //     message: '...@turku.fi tai ...@edu.turku.fi',
                                                        // },
                                                    })}
                                                    required
                                                    inputProps={{ required: false }}
                                                    color={formStateErrors.recipient ? 'error' : 'primary'}
                                                    error={!!formStateErrors.recipient}
                                                    helperText={formStateErrors.recipient?.message?.toString() || ' '}
                                                    sx={{ marginBottom: '-1rem' }}
                                                    fullWidth
                                                />
                                            </TableCell>
                                            <TableCell sx={{ fontWeight: 'bold' }}>
                                                Vastaanottajan puhelinnumero:
                                            </TableCell>
                                            <TableCell>
                                                <TextField
                                                    id="textfield-phonenumber"
                                                    value={watch('recipient_phone_number')}
                                                    {...register('recipient_phone_number', {
                                                        required: {
                                                            value: true,
                                                            message: 'Puhelinnumero on pakollinen',
                                                        },
                                                    })}
                                                    required
                                                    inputProps={{ required: false }}
                                                    color={formStateErrors.recipient_phone_number ? 'error' : 'primary'}
                                                    error={!!formStateErrors.recipient_phone_number}
                                                    helperText={
                                                        formStateErrors.recipient_phone_number?.message?.toString() ||
                                                        ' '
                                                    }
                                                    sx={{ marginBottom: '-1rem' }}
                                                    fullWidth
                                                />
                                            </TableCell>
                                        </TableRow>
                                        <TableRow>
                                            <TableCell sx={{ fontWeight: 'bold' }}>Toimitusosoite:</TableCell>
                                            <TableCell>
                                                <TextField
                                                    id="textfield-address"
                                                    value={watch('deliveryAddress')}
                                                    {...register('deliveryAddress', {
                                                        required: {
                                                            value: true,
                                                            message: 'Tilauksen toimitusosoite on pakollinen',
                                                        },
                                                    })}
                                                    required
                                                    inputProps={{ required: false }}
                                                    color={formStateErrors.deliveryAddress ? 'error' : 'primary'}
                                                    error={!!formStateErrors.deliveryAddress}
                                                    helperText={
                                                        formStateErrors.deliveryAddress?.message?.toString() || ' '
                                                    }
                                                    sx={{ marginBottom: '-1rem' }}
                                                    fullWidth
                                                />
                                            </TableCell>
                                            <TableCell sx={{ fontWeight: 'bold' }}>Tilauksen tila:</TableCell>
                                            <TableCell>
                                                <TextField
                                                    id="order-status-select"
                                                    select
                                                    {...register('status', {
                                                        required: {
                                                            value: true,
                                                            message: 'Valitse tila',
                                                        },
                                                    })}
                                                    value={watch('status')}
                                                    required
                                                    inputProps={{ required: false }}
                                                    color={formStateErrors.status ? 'error' : 'primary'}
                                                    error={!!formStateErrors.status}
                                                    helperText={formStateErrors.status?.message?.toString() || ' '}
                                                    sx={{ marginBottom: '-1rem' }}
                                                    fullWidth
                                                >
                                                    {currentStatus?.map((status) => {
                                                        return (
                                                            <MenuItem
                                                                className="order-status-select-item"
                                                                key={status}
                                                                value={status}
                                                            >
                                                                {status}
                                                            </MenuItem>
                                                        );
                                                    })}
                                                </TextField>
                                            </TableCell>
                                        </TableRow>
                                        <TableRow>
                                            <TableCell sx={{ fontWeight: 'bold', border: 'none' }}>
                                                Lisätieto:
                                            </TableCell>
                                            <TableCell colSpan={3} sx={{ border: 'none' }}>
                                                <TextField
                                                    id="textfield-multiline-order-additional-info"
                                                    value={watch('orderInfo')}
                                                    {...register('orderInfo')}
                                                    color={formStateErrors.orderInfo ? 'error' : 'primary'}
                                                    error={!!formStateErrors.orderInfo}
                                                    helperText={formStateErrors.orderInfo?.message?.toString() || ' '}
                                                    sx={{ marginBottom: '-1rem' }}
                                                    multiline
                                                    fullWidth
                                                />
                                            </TableCell>
                                        </TableRow>
                                    </TableBody>
                                </Table>
                            </Box>
                            {/*
                             * Add product area
                             */}
                            <Stack
                                id="add-product-to-order-actions"
                                direction="row"
                                justifyContent="space-between"
                                sx={{ margin: '0 0 2rem 0' }}
                            >
                                <Stack id="add-new-product-by-barcode-action-container" direction="row" gap={'1rem'}>
                                    <TextField label="Kirjoita viivakoodi" size="small" />
                                    <Button
                                        size="small"
                                        // open barcode scanner view:
                                        // onClick={() =>
                                        //     navigate(generatePath('/varasto/koodinlukija'), {
                                        //         state: {
                                        //             ...orderData,
                                        //             returnpath: `/varasto/tilaukset/${orderData.id}/muokkaa`,
                                        //         },
                                        //     })
                                        // }
                                    >
                                        Lisää tuote viivakoodin perusteella
                                    </Button>
                                </Stack>

                                <Stack id="add-new-product-by-id-action-container" direction="row" gap={'1rem'}>
                                    <TextField
                                        label="Kirjoita tuotenumero"
                                        size="small"
                                        value={newProduct === 0 ? '' : newProduct}
                                        onChange={newProductOnChangeHandler}
                                    />
                                    <Button size="small" onClick={() => addNewProduct()}>
                                        Lisää tuote tuotenumeron perusteella
                                    </Button>
                                </Stack>
                            </Stack>
                            {/*
                             * List products area
                             */}
                            <Table id="products-table">
                                <TableHead>
                                    <TableRow>
                                        <StyledTableCell>Tuotenimi</StyledTableCell>
                                        <StyledTableCell>Viivakoodi</StyledTableCell>
                                        <StyledTableCell align="center">Kappalemäärä</StyledTableCell>
                                        <StyledTableCell>Määrä varastossa</StyledTableCell>
                                        <StyledTableCell> </StyledTableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {/* ProductItemGroup map */}
                                    {fields.map((productItemGroup, index) => (
                                        <StyledTableRow key={productItemGroup[0].id}>
                                            <TableCell>{productItemGroup[0].product.name}</TableCell>
                                            <TableCell>{productItemGroup[0].barcode}</TableCell>
                                            {/* <TableCell>{Object.keys(productItemGroup).length - 1}</TableCell> */}
                                            <TableCell align="right">
                                                {/* /// "Products in this order" amount action btns cell */}
                                                <Stack justifyContent="center" alignItems="center" direction="row">
                                                    <IconButton
                                                        size="large"
                                                        color="primary"
                                                        onClick={() => {
                                                            const newAmounts = [...amounts];
                                                            if (newAmounts[index] > 0) {
                                                                newAmounts[index]--;
                                                                setAmounts(newAmounts);
                                                            }
                                                        }}
                                                        sx={{ m: 0, p: 0 }}
                                                    >
                                                        <IndeterminateCheckBoxIcon
                                                            sx={{ fontSize: '2.5rem', m: 0, p: 0 }}
                                                        />
                                                    </IconButton>
                                                    <TextField
                                                        size="small"
                                                        value={amounts[index]}
                                                        InputProps={{
                                                            inputProps: {
                                                                style: { textAlign: 'center' },
                                                            },
                                                        }}
                                                        onChange={(event) => {
                                                            modifyProductItemAmounts(
                                                                event,
                                                                index,
                                                                0,
                                                                Object.keys(productItemGroup).length -
                                                                    1 +
                                                                    productItemGroup[0].product.amount -
                                                                    (productItemGroup[0].available ? 1 : 0)
                                                            );
                                                        }}
                                                        sx={{ width: '4rem', m: 0, p: 0 }}
                                                    />
                                                    <IconButton
                                                        color="primary"
                                                        onClick={() => {
                                                            const newAmounts = [...amounts];
                                                            if (
                                                                newAmounts[index] <
                                                                Object.keys(productItemGroup).length -
                                                                    1 +
                                                                    productItemGroup[0].product.amount -
                                                                    (productItemGroup[0].available ? 1 : 0)
                                                            ) {
                                                                newAmounts[index]++;
                                                                setAmounts(newAmounts);
                                                            }
                                                        }}
                                                        sx={{ m: 0, p: 0 }}
                                                    >
                                                        <AddBoxIcon sx={{ fontSize: '2.5rem', m: 0, p: 0 }} />
                                                    </IconButton>
                                                </Stack>
                                            </TableCell>
                                            <TableCell>
                                                {Object.keys(productItemGroup).length -
                                                    1 +
                                                    productItemGroup[0].product.amount -
                                                    (productItemGroup[0].available ? 1 : 0)}
                                            </TableCell>
                                            <TableCell align="right">
                                                <Button
                                                    disabled={amounts[index] === 0 ? true : false}
                                                    onClick={() => {
                                                        removeProduct(index);
                                                    }}
                                                    variant="outlined"
                                                    sx={{ width: '220px' }}
                                                >
                                                    {amounts[index] === 0 ? 'Poistettu' : 'Poista tuote tilaukselta'}
                                                </Button>
                                            </TableCell>
                                        </StyledTableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </TableContainer>

                        {/* /// */}
                        {/* &&& */}
                        <Box id="isolated-dev-box">
                            <Stack id="submit-reset-btns" direction="row" gap={2} justifyContent="center">
                                <Button
                                    id="submit-btn"
                                    type="submit"
                                    disabled={isSubmitting || isSubmitSuccessful}
                                    fullWidth
                                    sx={{
                                        '&:hover': {
                                            backgroundColor: 'success.dark',
                                        },
                                    }}
                                >
                                    Tallenna muutokset
                                </Button>
                                <Tooltip title="Palauta alkutilaan">
                                    <IconButton id="reset-form-btn" onClick={() => formReset()}>
                                        <RefreshIcon />
                                    </IconButton>
                                </Tooltip>
                            </Stack>

                            <Grid container>
                                <Grid item xs={4}>
                                    <Tooltip title="Takaisin tilaukset-listaukseen">
                                        <Button
                                            id="cancel-btn"
                                            size="small"
                                            component={Link}
                                            to="/admin/tilaukset/"
                                            startIcon={<ArrowBackIcon />}
                                            sx={{ margin: '4rem 0 1rem 0' }}
                                        >
                                            Poistu tallentamatta
                                        </Button>
                                    </Tooltip>
                                </Grid>
                                <Grid item xs={4} />

                                <Grid item xs={4} sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                                    <Tooltip title="Siirry poistamaan tilaus järjestelmästä">
                                        <Button
                                            id="initialize-deletion-process-btn"
                                            size="small"
                                            color="error"
                                            component={Link}
                                            to={`/admin/tilaukset/${orderData.id}/poista`}
                                            endIcon={<DeleteForeverIcon />}
                                            sx={{ margin: '4rem 0 1rem 0' }}
                                        >
                                            Tilauksen poistonäkymä
                                        </Button>
                                    </Tooltip>
                                </Grid>
                            </Grid>
                        </Box>
                        {/* /// */}
                        {/* &&& */}
                    </Box>
                </Stack>
            </Container>
        </>
    );
}

export default OrderEdit;
