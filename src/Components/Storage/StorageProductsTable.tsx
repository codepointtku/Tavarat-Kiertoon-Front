/* eslint-disable react/jsx-props-no-spreading */
import { useState } from 'react';
import {
    Form,
    Link,
    useLoaderData,
    useRouteLoaderData,
    useSearchParams,
    type URLSearchParamsInit,
} from 'react-router-dom';
import { useForm } from 'react-hook-form';
import {
    Table,
    TableBody,
    TableContainer,
    TableHead,
    TableCell,
    TableFooter,
    TablePagination,
    Collapse,
    TableRow,
    Paper,
    TextField,
    IconButton,
    Button,
    Typography,
    Box,
} from '@mui/material';
// import QrCodeScannerIcon from '@mui/icons-material/QrCodeScanner';

import ClearIcon from '@mui/icons-material/Clear';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';

import TablePaginationActions from '../TablePaginationActions';
import StyledTableCell from '../StyledTableCell';
import StyledTableRow from '../StyledTableRow';

import { type storageProductsLoader, type rootLoader } from '../../Router/loaders';
import { Fragment } from 'react';
import Tooltip from '../Tooltip';
import { AddCircle } from '@mui/icons-material';

interface Search {
    searchString: string | null;
}

// interface Product {
//     id: number;
//     name: string;
//     barcode: string;
//     category: number;
//     storage: number;
//     amount: number;
//     storage_name: string;
//     created: string;
//     modified_date: string;
// }

export type StorageProductsLoaderType = Awaited<ReturnType<typeof storageProductsLoader>>;

function StorageProductsTable() {
    // state to control product info collapse field
    const [isOpen, setIsOpen] = useState<number>();
    const [searchParams, setSearchParams] = useSearchParams();
    // const { categories } = useRouteLoaderData('root') as Awaited<ReturnType<typeof rootLoader>>;
    const { categories, productItems } = useLoaderData() as StorageProductsLoaderType;
    const { register, handleSubmit, watch } = useForm({ defaultValues: { searchString: searchParams.get('search') } });
    // todo: fill search field with search param if scanned with qrcodescanner or entered with link

    console.log('categories:', categories);
    // console.log('storages:', storages);
    // console.log('products:', products);
    // console.log('products.results:', products?.results);
    console.log('productItems.results:', productItems?.results);
    // const search = watch('searchString');

    const handleBarcodeSearch = (formData: Search) => {
        console.log('handleBarcodeSearch', formData);
        // TODO: search from all products, not just available products
        setSearchParams({ search: formData.searchString as string });
    };

    // array with an array for each unique product_item.product.id and all products with that id
    const productRenderItems: StorageProductsLoaderType['productItems'][] = [];
    productItems?.results?.map((productItem) => {
        // check if array already contains an item.barcode array
        const productIndex = productRenderItems.findIndex((index) => index[0]?.barcode === productItem.barcode);
        if (productIndex < 0) {
            // if not, push a new array with this item as its first object
            productRenderItems.push([productItem]);
        } else {
            // if yes, push this item to that array
            productRenderItems[productIndex].push(productItem);
        }
        return null;
    });

    // todo: count rows of productRenderItems and use that fo page size?

    console.log('productRenderItems:', productRenderItems);

    return (
        <TableContainer component={Paper} sx={{ padding: '2rem' }}>
            {/* todo: näytä varastokohtaisesti, tai kaikki tuotteet kaikissa varastoissa */}
            <Table sx={{ minWidth: 700 }} aria-label="customized table">
                <TableHead>
                    <TableRow>
                        <StyledTableCell>Viivakoodi</StyledTableCell>
                        <StyledTableCell>
                            {/* Viivakoodi */}
                            {/* todo: searchbar peruskomponentti tuotteiden hakua varten */}
                            <Form onSubmit={handleSubmit(handleBarcodeSearch)}>
                                {/* todo: näytä vain hakuikoni kunnes painetaan, jolloin tekstikenttä laajenee/aktivoituu? */}
                                <TextField
                                    type="search"
                                    {...register('searchString')}
                                    placeholder="Viivakoodi / tuoteID / nimi"
                                    sx={{ backgroundColor: 'white' }}
                                    size="medium"
                                >
                                    <IconButton children={<ClearIcon />} />
                                </TextField>
                                <Button
                                    type="submit"
                                    variant="contained"
                                    color="primary"
                                    size="large"
                                    sx={{ marginLeft: 1, padding: 1.5 }}
                                >
                                    Hae
                                </Button>
                            </Form>
                        </StyledTableCell>
                        <StyledTableCell align="right">Tuotenimi</StyledTableCell>
                        <StyledTableCell align="right">Määrä</StyledTableCell>
                        <StyledTableCell align="right">Varasto</StyledTableCell>
                        {/* TODO: add storage filter option */}
                        <StyledTableCell align="right">Kategoria</StyledTableCell>
                        <StyledTableCell align="right">Viimeksi muokattu</StyledTableCell>
                        {/* <StyledTableCell align="right">Varastopaikka</StyledTableCell> */}
                    </TableRow>
                </TableHead>
                {/* todo: näytä nollasaldoiset tuotteet -ruksi */}
                {/* todo: näytä tilauksille varatut tuotteet ja kplmäärä? */}
                {productItems?.results?.length === 0 ? (
                    // todo: tyylittely
                    <Typography padding={3} fontSize={24}>
                        Ei hakutuloksia...
                    </Typography>
                ) : (
                    <TableBody>
                        {productRenderItems.map((itemArray, index) => (
                            <Fragment key={itemArray[0].id}>
                                <StyledTableRow>
                                    {/* <StyledTableCell>
                                        <IconButton
                                            aria-label="expand row"
                                            size="small"
                                            onClick={() => {
                                                isOpen === index ? setIsOpen(undefined) : setIsOpen(index);
                                            }}
                                        >
                                            {isOpen === index ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
                                        </IconButton>
                                    </StyledTableCell> */}
                                    <StyledTableCell>{itemArray[0].barcode}</StyledTableCell>
                                    <StyledTableCell>
                                        <Button
                                            component={Link}
                                            to={`/varasto/tuotteet/${itemArray[0].product.id}/muokkaa`}
                                            variant="outlined"
                                            color="primary"
                                            sx={{ paddingRight: 6, paddingLeft: 6 }}
                                        >
                                            Muokkaa
                                        </Button>
                                    </StyledTableCell>
                                    <StyledTableCell align="right" component="th" scope="row">
                                        <Tooltip title={itemArray[0].product.free_description}>
                                            <Box
                                                component={Link}
                                                // to do: link to = adminview | storageview product editview, not defaults
                                                to={`/tuotteet/${itemArray[0].product.id}`}
                                            >
                                                {itemArray[0].product.name}
                                            </Box>
                                        </Tooltip>
                                    </StyledTableCell>
                                    <StyledTableCell align="right">
                                        <IconButton color="primary">
                                            {itemArray.length} {/* TODO: Add/return products (to same storage) logic */}
                                            <AddCircle />
                                        </IconButton>
                                    </StyledTableCell>
                                    {/* todo: show some symbol[!] if there are multiple storages for these products? */}
                                    <StyledTableCell align="right">{itemArray[0].storage.name}</StyledTableCell>
                                    {/* <StyledTableCell>{itemArray[0].product.id}</StyledTableCell> */}
                                    <StyledTableCell align="right">
                                        {itemArray[0].product.category
                                            ? categories[itemArray[0].product.category]?.name
                                            : 'ei kategoriaa'}
                                    </StyledTableCell>
                                    <StyledTableCell align="right">
                                        {new Date(itemArray[0].modified_date).toLocaleDateString('fi-FI') +
                                            ', klo ' +
                                            new Date(itemArray[0].modified_date).toLocaleTimeString('fi-FI', {
                                                hour: '2-digit',
                                                minute: '2-digit',
                                            })}
                                    </StyledTableCell>
                                </StyledTableRow>
                                <StyledTableRow>
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
                                                            <TableCell align="right">Hyllynumero</TableCell>
                                                        </TableRow>
                                                    </TableHead>
                                                    <TableBody>
                                                        {/* todo: why type does not flow? */}
                                                        {itemArray.map((item: any) => (
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
                                </StyledTableRow>
                            </Fragment>
                        ))}
                    </TableBody>
                )}
                {/* <TableFooter>
                    <TableRow>
                        <TablePagination
                            rowsPerPageOptions={[5, 10, 25, 100]}
                            colSpan={7}
                            count={products.results.length}
                            rowsPerPage={rowsPerPage}
                            page={page}
                            SelectProps={{
                                inputProps: {
                                    'aria-label': 'rows per page',
                                },
                                native: true,
                            }}
                            onPageChange={handleChangePage}
                            onRowsPerPageChange={handleChangeRowsPerPage}
                            ActionsComponent={TablePaginationActions}
                        />
                    </TableRow>
                </TableFooter> */}
            </Table>
        </TableContainer>
    );
}

export default StorageProductsTable;
