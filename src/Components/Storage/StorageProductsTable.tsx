/* eslint-disable react/jsx-props-no-spreading */
import { useState, Fragment, useEffect } from 'react';
import {
    Form,
    Link,
    useLoaderData,
    useSearchParams,
    createSearchParams,
    Outlet,
    useOutletContext,
    useParams,
} from 'react-router-dom';
import { useForm } from 'react-hook-form';
import {
    Table,
    TableBody,
    TableContainer,
    TableHead,
    TableRow,
    TextField,
    IconButton,
    Button,
    Typography,
    Box,
    TableCell,
    Collapse,
    TableSortLabel,
} from '@mui/material';

import ClearIcon from '@mui/icons-material/Clear';
// import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
// import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import SearchIcon from '@mui/icons-material/Search';

import Pagination from '../Pagination';
import StyledTableCell from '../StyledTableCell';
import StyledTableRow from '../StyledTableRow';

import type { storageProductsLoader } from '../../Router/loaders';
import { type ProductStorageResponse } from '../../api';

interface Search {
    searchString: string | null;
}

export type StorageProductsLoaderType = Awaited<ReturnType<typeof storageProductsLoader>>;

//  // custom hook type for accessing the context value, recommended by react-router-dom docs
type ContextType = { product: ProductStorageResponse | null };

function StorageProductsTable() {
    // state to control product info collapse field:
    const [isOpen, setIsOpen] = useState<number>();
    const [searchParams, setSearchParams] = useSearchParams();
    const { products } = useLoaderData() as StorageProductsLoaderType;
    const { register, handleSubmit } = useForm({
        defaultValues: { searchString: searchParams.get('viivakoodi') },
    });
    const handleBarcodeSearch = (formData: Search) => {
        setSearchParams((prevParams) => {
            return createSearchParams({
                ...Object.fromEntries(prevParams.entries()),
                viivakoodi: formData.searchString as string,
                sivu: '1',
                // TODO: show also unavailable products in storage
                // all: true,
            });
        });
    };
    let spotId = useParams();
    useEffect(() => {
        setIsOpen(Number(spotId.id));
    }, [spotId]);
    return (
        <>
            <TableContainer component={Box} sx={{ mt: '3rem' }}>
                {/* todo: näytä varastokohtaisesti, tai kaikki tuotteet kaikissa varastoissa */}
                <Table sx={{ minWidth: 700 }} aria-label="customized table">
                    <TableHead>
                        <TableRow>
                            {/* TODO: Tablerow for search boxes, filters, etc. */}
                            {/* <StyledTableCell></StyledTableCell> */}
                            <StyledTableCell>Viivakoodi</StyledTableCell>
                            <StyledTableCell>
                                {/* todo: searchbar peruskomponentti tuotteiden hakua varten */}
                                <Form onSubmit={handleSubmit(handleBarcodeSearch)}>
                                    {/* todo: näytä vain hakuikoni kunnes painetaan, jolloin tekstikenttä laajenee/aktivoituu? */}
                                    <TextField
                                        type="search"
                                        {...register('searchString')}
                                        placeholder="Viivakoodihaku"
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
                            <StyledTableCell align="right">
                                Tuotenimi {/* Testing icon for sorting: */}
                                <TableSortLabel IconComponent={IconButton}>
                                    <SearchIcon></SearchIcon>
                                </TableSortLabel>
                            </StyledTableCell>
                            {/* // TODO change description after filtering added? */}
                            <StyledTableCell align="right">Määrä tilattavissa / Järjestelmässä</StyledTableCell>
                            <StyledTableCell align="right">Varasto</StyledTableCell>
                            {/* TODO: add storage filter option */}
                            <StyledTableCell align="left">Hylly/Paikka</StyledTableCell>
                            <StyledTableCell align="right">Kategoria</StyledTableCell>
                            <StyledTableCell align="right">Viimeksi muokattu</StyledTableCell>
                            {/* <StyledTableCell align="right">Varastopaikka</StyledTableCell> */}
                        </TableRow>
                    </TableHead>
                    {/* todo: näytä nollasaldoiset tuotteet -ruksi */}
                    {/* todo: näytä tilauksille varatut tuotteet ja kplmäärä? */}

                    {products?.results?.length === 0 ? (
                        // todo: tyylittely
                        <Typography padding={3} fontSize={24}>
                            Ei hakutuloksia...
                        </Typography>
                    ) : (
                        <TableBody>
                            {products?.results?.map((product, index) => (
                                <Fragment key={product.id}>
                                    <StyledTableRow key={product.id}>
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
                                        <StyledTableCell component="th" scope="row">
                                            <Link to={`/varasto/tuotteet/${product.id}`}>
                                                {/* TODO: support multiple barcodes */}
                                                {product.product_items[0]?.barcode}
                                            </Link>
                                        </StyledTableCell>
                                        <StyledTableCell>
                                            <Button
                                                component={Link}
                                                to={
                                                    isOpen === product.id
                                                        ? `/varasto/tuotteet/?${searchParams.toString()}`
                                                        : `/varasto/tuotteet/${
                                                              product.id
                                                          }/toiminnot?${searchParams.toString()}`
                                                }
                                                replace
                                                aria-label="expand row"
                                                variant="outlined"
                                                color="primary"
                                                sx={{ paddingRight: 6, paddingLeft: 6 }}
                                            >
                                                {isOpen === product.id ? 'Sulje' : 'Toiminnot'}
                                            </Button>
                                        </StyledTableCell>
                                        <StyledTableCell align="right">
                                            {/* todo: link to working product page with storage related info and edit functionality */}
                                            <Link to={`/tuotteet/${product.id}`}>{product.name}</Link>
                                        </StyledTableCell>
                                        <StyledTableCell align="right">
                                            {/* TODO: only show add button if there is a search or barcode search in searchParams? */}
                                            {/* <IconButton
                                                color="primary"
                                                aria-label="expand row"
                                                onClick={() => {
                                                    isOpen === index ? setIsOpen(undefined) : setIsOpen(index);
                                                }}
                                            > */}
                                            {
                                                // count product_items with status 'varastossa'
                                                product.product_items?.reduce(
                                                    (count, item) => count + (item.available ? 1 : 0),
                                                    0
                                                )
                                            }
                                            {/* // Todo show only those that are not status retired? backend? */}
                                            {`/${product.product_items?.length}`}
                                            {'  '}
                                            {/* TODO: Add/return products (to same storage) logic */}
                                            {/* <AddCircle />
                                            </IconButton> */}
                                        </StyledTableCell>
                                        <StyledTableCell align="right">
                                            {/* TODO: show multiple storages for products */}
                                            {product.product_items[0]?.storage.name}
                                        </StyledTableCell>
                                        <StyledTableCell align="left">
                                            {product.product_items[0]?.shelf_id}
                                        </StyledTableCell>
                                        <StyledTableCell align="right">{product.category_name}</StyledTableCell>
                                        <StyledTableCell align="right">
                                            {/* TODO: show most recent modified date of product_items. backend change needed? */}
                                            {new Date(product?.product_items[0]?.modified_date).toLocaleDateString(
                                                'fi-FI'
                                            ) +
                                                ', klo ' +
                                                new Date(product?.product_items[0]?.modified_date).toLocaleTimeString(
                                                    'fi-FI',
                                                    {
                                                        hour: '2-digit',
                                                        minute: '2-digit',
                                                    }
                                                )}
                                        </StyledTableCell>
                                    </StyledTableRow>
                                    <StyledTableRow>
                                        {/* TODO: fix styles, table row colors messed up after collapse was added */}
                                        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
                                            {/* TODO: Outlet for product info, picture and return items to storage / new item functionality, when search is active */}
                                            <Collapse in={isOpen === product.id} timeout="auto" unmountOnExit>
                                                {/* <Collapse in={id ? product.id === +id : false} timeout="auto" unmountOnExit> // too slow */}
                                                <Box
                                                    id="product-detail-indent-box"
                                                    sx={{ margin: '0.4rem 1rem -0.1rem 1rem' }}
                                                >
                                                    {/* custom typings for accessing the context value, recommended by
                                                    react-router-dom docs: */}
                                                    <Outlet context={{ product } satisfies ContextType} />
                                                    {/* <Outlet context={product} /> */}
                                                </Box>
                                            </Collapse>
                                        </TableCell>
                                    </StyledTableRow>
                                </Fragment>
                            ))}
                        </TableBody>
                    )}
                </Table>
            </TableContainer>
            <Pagination count={products.count} itemsText="Tuotetta" />
        </>
    );
}

// custom hook for accessing the context value, recommended by react-router-dom docs
export function useProduct() {
    return useOutletContext<ContextType>();
}

export default StorageProductsTable;
