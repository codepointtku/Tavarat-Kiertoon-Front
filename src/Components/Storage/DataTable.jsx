import { useLoaderData, useNavigate } from 'react-router-dom';
// import PropTypes from 'prop-types';

import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';

import StyledTableCell from '../StyledTableCell';
import SortByMenu from '../SortByMenu';

function OrderListTable() {
    const { results: orders } = useLoaderData();
    const navigate = useNavigate();

    const dateParse = (value) => {
        const date = new Date(value);
        const dateString = `${date.getDate()}.${date.getMonth() + 1}.${date.getFullYear()}`;
        return dateString;
    };

    return (
        <TableContainer component={Paper} sx={{ padding: '2rem' }}>
            <Table sx={{ minWidth: 700 }} aria-label="customized table">
                <TableHead>
                    <TableRow>
                        <StyledTableCell>
                            Tilaus (ID) <SortByMenu />
                        </StyledTableCell>
                        <StyledTableCell align="right">Status</StyledTableCell>
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
                            onClick={() => navigate(`/varasto/tilaus/${row.id}`)}
                        >
                            <TableCell component="th" scope="row">
                                {row.id}
                            </TableCell>
                            <TableCell align="right">{row.status}</TableCell>
                            <TableCell align="right">{row.delivery_address}</TableCell>
                            <TableCell align="right">{row.user}</TableCell>
                            <TableCell align="right">{row.contact}</TableCell>
                            <TableCell align="right">
                                {row.creation_date ? dateParse(row.creation_date) : '-'}
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
}

// OrderListTable.propTypes = {
//     page: PropTypes.number.isRequired,
//     setUsedParams: PropTypes.func.isRequired,
//     rowsPerPage: PropTypes.number.isRequired,
// };

export default OrderListTable;
