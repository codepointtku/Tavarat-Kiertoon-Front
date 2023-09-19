import { useLoaderData, useNavigate } from 'react-router-dom';

import { Box, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';

import StyledTableCell from '../StyledTableCell';
import SortByMenu from '../SortByMenu';
import Pagination from '../Pagination';
import { type ordersListLoader } from '../../Router/loaders';

function OrderListTable() {
    const { results: orders, count } = useLoaderData() as Awaited<ReturnType<typeof ordersListLoader>>;
    const navigate = useNavigate();

    return (
        <>
            <TableContainer sx={{ paddingY: '2rem' }}>
                <Table sx={{ minWidth: 700 }} aria-label="customized table">
                    <TableHead>
                        <TableRow>
                            <StyledTableCell>
                                Tilaus (ID) <SortByMenu />
                            </StyledTableCell>
                            <StyledTableCell align="right">Tila</StyledTableCell>
                            <StyledTableCell align="right">Toimitusosoite</StyledTableCell>
                            <StyledTableCell align="right">Tilaaja</StyledTableCell>
                            <StyledTableCell align="right">Yhteystiedot</StyledTableCell>
                            <StyledTableCell align="right">Päivämäärä</StyledTableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {orders?.map((row) => (
                            <TableRow
                                key={row.id}
                                style={{ cursor: 'pointer' }}
                                hover
                                onClick={() => navigate(`/varasto/tilaukset/${row.id}`)}
                            >
                                <TableCell component="th" scope="row">
                                    {row.id}
                                </TableCell>
                                <TableCell align="right">{row.status}</TableCell>
                                <TableCell align="right">{row.delivery_address}</TableCell>
                                <TableCell align="right">{row.user}</TableCell>
                                <TableCell align="right">{row.contact}</TableCell>
                                <TableCell align="right">
                                    {row.creation_date ? new Date(row.creation_date).toLocaleDateString('fi-FI') : '-'}
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
            <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                <Pagination count={count} itemsText="Tilauksia" />
            </Box>
        </>
    );
}

export default OrderListTable;
