/* eslint-disable react/jsx-props-no-spreading */
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
    TableFooter,
    TablePagination,
    TableRow,
    Paper,
    TextField,
    IconButton,
    Button,
    Typography,
} from '@mui/material';
// import QrCodeScannerIcon from '@mui/icons-material/QrCodeScanner';
import ClearIcon from '@mui/icons-material/Clear';

import TablePaginationActions from '../TablePaginationActions';
import StyledTableCell from '../StyledTableCell';
import StyledTableRow from '../StyledTableRow';

import { type storageProductsLoader, type rootLoader } from '../../Router/loaders';

interface Search {
    searchString: string | null;
}

interface Product {
    id: number;
    name: string;
    barcode: string;
    category: number;
    storage: number;
    amount: number;
    storage_name: string;
    created: string;
    modified_date: string;
}

function StorageProductsTable() {
    const [searchParams, setSearchParams] = useSearchParams();
    const { categories } = useRouteLoaderData('root') as Awaited<ReturnType<typeof rootLoader>>;
    const { storages, products } = useLoaderData() as Awaited<ReturnType<typeof storageProductsLoader>>;
    const { register, handleSubmit, watch } = useForm({ defaultValues: { searchString: searchParams.get('search') } });
    // todo: fill search field with search param if scanned with qrcodescanner or entered with link

    // console.log('categories:', categories);
    // console.log('storages:', storages);
    // console.log('products:', products);
    // console.log('products.results:', products?.results);

    // const search = watch('searchString');

    const handleBarcodeSearch = (formData: Search) => {
        console.log('handleBarcodeSearch', formData);
        setSearchParams({ search: formData.searchString as string });
    };

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
                        <StyledTableCell align="right">Kategoria</StyledTableCell>
                        <StyledTableCell align="right">Luotu / Muokattu</StyledTableCell>
                        {/* <StyledTableCell align="right">Varastopaikka</StyledTableCell> */}
                    </TableRow>
                </TableHead>
                {/* todo: näytä nollasaldoiset tuotteet -ruksi */}
                {/* todo: näytä tilauksille varatut tuotteet ja kplmäärä? */}
                {products?.results.length === 0 ? (
                    // todo: tyylittely
                    <Typography padding={3} fontSize={24}>
                        Ei hakutuloksia...
                    </Typography>
                ) : (
                    <TableBody>
                        {products?.results?.map((product: Product) => (
                            <StyledTableRow key={product.id}>
                                <StyledTableCell component="th" scope="row">
                                    {/* TODO: varastopuolen tuotesivu, ProductDetails komponenttia hyödyntäen */}
                                    <Link to={`/varasto/tuotteet/${product.id}/muokkaa`}>{product.barcode}</Link>
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
                                    <Link to={`/varasto/tuotteet/${product.id}/muokkaa`}>{product.name}</Link>
                                </StyledTableCell>
                                <StyledTableCell align="right">{product.amount}</StyledTableCell>
                                <StyledTableCell align="right">{product.storage_name}</StyledTableCell>
                                <StyledTableCell align="right">{categories[product.category].name}</StyledTableCell>
                                <StyledTableCell align="right">
                                    {new Date(product.modified_date).toLocaleTimeString('fi-FI', {
                                        hour: '2-digit',
                                        minute: '2-digit',
                                    }) +
                                        '   ' +
                                        new Date(product.modified_date).toLocaleDateString('fi-FI')}
                                </StyledTableCell>
                            </StyledTableRow>
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
