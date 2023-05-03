/* eslint-disable react/jsx-props-no-spreading */
import { Form, Link, useLoaderData, useRouteLoaderData, useSearchParams } from 'react-router-dom';
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
} from '@mui/material';
import QrCodeScannerIcon from '@mui/icons-material/QrCodeScanner';
import TablePaginationActions from '../TablePaginationActions';
import StyledTableCell from '../StyledTableCell';
import StyledTableRow from '../StyledTableRow';

interface RouteLoaderData {
    categories: [
        {
            id: number;
            product_count: string;
            name: string;
            lft: number;
            rght: number;
            tree_id: number;
            level: number;
            parent: number;
        }
    ];
}

interface LoaderData {
    storages: string[];
    products: string[];
}

function StorageProductsTable() {
    const { categories } = useRouteLoaderData('root') as RouteLoaderData;
    const { storages, products } = useLoaderData() as LoaderData;
    const { register, handleSubmit, watch } = useForm();
    const [searchParams, setSearchParams] = useSearchParams();

    console.log('categories:', categories);
    console.log('storages:', storages);
    console.log('products:', products);
    console.log('products.results:', products?.results);

    // const search = watch('searchString');

    const handleBarcodeSearch = (formData) => {
        console.log('handleBarcodeSearch', formData);
        // setUsedParams(search);
        setSearchParams({ search: formData.searchString });
    };

    return (
        <TableContainer component={Paper} sx={{ padding: '2rem' }}>
            {/* todo: näytä varastokohtaisesti, tai kaikki tuotteet kaikissa varastoissa */}
            <Table sx={{ minWidth: 700 }} aria-label="customized table">
                <TableHead>
                    <TableRow>
                        <StyledTableCell>
                            {/* Viivakoodi */}
                            {/* todo: searchbar peruskomponentti tuotteiden hakua varten */}
                            <Form onSubmit={handleSubmit(handleBarcodeSearch)}>
                                {/* todo: näytä vain hakuikoni kunnes painetaan, jolloin tekstikenttä laajenee/aktivoituu */}
                                <TextField
                                    type="search"
                                    {...register('searchString')}
                                    placeholder="Viivakoodi / tuoteID / nimi"
                                    sx={{ backgroundColor: 'white' }}
                                    size="medium"
                                />
                                <Button
                                    type="submit"
                                    variant="contained"
                                    color="primary"
                                    size="large"
                                    sx={{ marginLeft: 1, padding: 1.5 }}
                                >
                                    Hae
                                </Button>
                                {/* todo:linkki viivakoodiskanneriin */}
                                {/* <IconButton fontSize="large" variant="contained" aria-label="barcode search">
                                    <QrCodeScannerIcon sx={{ color: 'white' }} />
                                </IconButton> */}
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
                {/* <TableBody>
                    {(rowsPerPage > 0
                        ? products.results.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                        : products.results
                    ).map((row) => (
                        <StyledTableRow key={row.id}>
                            <StyledTableCell component="th" scope="row">
                                <Link to={`/varasto/tilaus/${row.id}?page=0&rows=5`}>{row.id}</Link>
                            </StyledTableCell>
                            <StyledTableCell align="right">{row.status}</StyledTableCell>
                            <StyledTableCell align="right">{row.delivery_address}</StyledTableCell>
                            <StyledTableCell align="right">{row.user}</StyledTableCell>
                            <StyledTableCell align="right">{row.contact}</StyledTableCell>
                            <StyledTableCell align="right">{row.delivery_date}</StyledTableCell>
                        </StyledTableRow>
                    ))}

                    {emptyRows > 0 && (
                        <StyledTableRow style={{ height: 53 * emptyRows }}>
                            <StyledTableCell colSpan={6} />
                        </StyledTableRow>
                    )}
                </TableBody> */}

                {/* todo: näytä nollasaldoiset tuotteet -ruksi */}
                {/* todo: sama groupid- stackkaa tuotteet */}
                {/* todo: näytä tilauksille varatut tuotteet ja kplmäärä? */}
                <TableBody>
                    {products?.results?.map((product) => (
                        <StyledTableRow key={product.id}>
                            <StyledTableCell component="th" scope="row">
                                {/* TODO: varastopuolen tuotesivu, ProductDetails komponenttia hyödyntäen */}
                                <Link to={`/varasto/tuotteet/${product.id}/muokkaa`}>{product.barcode}</Link>
                                <Button variant="outlined" color="primary" sx={{ marginLeft: 2 }}>
                                    Muokkaa
                                </Button>
                            </StyledTableCell>
                            <StyledTableCell align="right">
                                {/* todo: link to working product page with storage related info and edit functionality */}
                                <Link to={`/varasto/tuotteet/${product.id}`}>{product.name}</Link>
                            </StyledTableCell>
                            <StyledTableCell align="right">{product.amount}</StyledTableCell>
                            <StyledTableCell align="right">{product.storage_name}</StyledTableCell>
                            <StyledTableCell align="right">{categories[product.category].name}</StyledTableCell>
                            <StyledTableCell align="right">
                                {new Date(product.modified_date).toLocaleDateString('fi-FI')}
                            </StyledTableCell>
                        </StyledTableRow>
                    ))}
                </TableBody>
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
