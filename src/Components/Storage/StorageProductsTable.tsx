/* eslint-disable react/jsx-props-no-spreading */
import { Form, Link, useLoaderData, useSearchParams, createSearchParams } from 'react-router-dom';
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
} from '@mui/material';

import ClearIcon from '@mui/icons-material/Clear';

import Pagination from '../Pagination';
import StyledTableCell from '../StyledTableCell';
import StyledTableRow from '../StyledTableRow';

import { type storageProductsLoader } from '../../Router/loaders';

interface Search {
    searchString: string | null;
}

export type StorageProductsLoaderType = Awaited<ReturnType<typeof storageProductsLoader>>;

function StorageProductsTable() {
    const [searchParams, setSearchParams] = useSearchParams();
    const { categories, products } = useLoaderData() as StorageProductsLoaderType;
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

    return (
        <>
            <TableContainer component={Box} sx={{ mt: '3rem' }}>
                {/* todo: näytä varastokohtaisesti, tai kaikki tuotteet kaikissa varastoissa */}
                <Table sx={{ minWidth: 700 }} aria-label="customized table">
                    <TableHead>
                        <TableRow>
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
                            <StyledTableCell align="right">Tuotenimi</StyledTableCell>
                            <StyledTableCell align="right">Määrä</StyledTableCell>
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
                            {products?.results?.map((product) => (
                                <StyledTableRow key={product.id}>
                                    <StyledTableCell component="th" scope="row">
                                        <Link to={`/varasto/tuotteet/${product.id}`}>
                                            {/* TODO: support multiple barcodes */}
                                            {product.product_items[0].barcode}
                                        </Link>
                                    </StyledTableCell>
                                    <StyledTableCell>
                                        <Button
                                            component={Link}
                                            to={`/varasto/tuotteet/${product.id}/muokkaa`}
                                            variant="outlined"
                                            color="primary"
                                            sx={{ paddingRight: 6, paddingLeft: 6 }}
                                        >
                                            Muokkaa
                                        </Button>
                                    </StyledTableCell>
                                    <StyledTableCell align="right">
                                        {/* todo: link to working product page with storage related info and edit functionality */}
                                        <Link to={`/varasto/tuotteet/${product.id}`}>{product.name}</Link>
                                    </StyledTableCell>
                                    <StyledTableCell align="right">{product.product_items.length}</StyledTableCell>
                                    <StyledTableCell align="right">
                                        {/* TODO: show multiple storages for products */}
                                        {product.product_items[0].storage.name}
                                    </StyledTableCell>
                                    <StyledTableCell align="left">{product.product_items[0]?.shelf_id}</StyledTableCell>
                                    <StyledTableCell align="right">
                                        {product.category ? categories[product.category]?.name : ''}
                                    </StyledTableCell>
                                    <StyledTableCell align="right">
                                        {/* TODO: show most recent modified date of product_items. backend change needed? */}
                                        {new Date(product.product_items[0].modified_date).toLocaleDateString('fi-FI') +
                                            ', klo ' +
                                            new Date(product.product_items[0].modified_date).toLocaleTimeString(
                                                'fi-FI',
                                                {
                                                    hour: '2-digit',
                                                    minute: '2-digit',
                                                }
                                            )}
                                    </StyledTableCell>
                                </StyledTableRow>
                            ))}
                        </TableBody>
                    )}
                </Table>
            </TableContainer>
            <Pagination count={products.count} itemsText="Tuotetta" />
        </>
    );
}

export default StorageProductsTable;
