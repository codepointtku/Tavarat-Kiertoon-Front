import { useEffect } from 'react';
import PropTypes from 'prop-types';
import {
    Table,
    TableBody,
    TableContainer,
    TableHead,
    TableFooter,
    TablePagination,
    TableRow,
    Paper,
} from '@mui/material';
import { Link } from 'react-router-dom';
import TablePaginationActions from './TablePaginationActions';
import StyledTableCell from './StyledTableCell';
import StyledTableRow from './StyledTableRow';
import SortByMenu from './SortByMenu';

function OrderListTable({ page, rowsPerPage, setUsedParams, rows }) {
    // Avoid a layout jump when reaching the last page with empty rows.
    const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows.length) : 0;

    const handleChangePage = (event, newPage) => {
        setUsedParams('page', newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setUsedParams('rows', parseInt(event.target.value, 10));
        setUsedParams('page', 0);
    };

    useEffect(() => {
        if (page > Math.floor(rows.length / rowsPerPage)) {
            setUsedParams('page', Math.floor(rows.length / rowsPerPage));
        } else if (page < 0) {
            setUsedParams('page', 0);
        }
    }, [page]);

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
                        <StyledTableCell align="right">Päivämäärä</StyledTableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {(rowsPerPage > 0 ? rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage) : rows).map(
                        (row) => (
                            <StyledTableRow key={row.id}>
                                <StyledTableCell component="th" scope="row">
                                    <Link to={`/varasto/tilaus/${row.id}?page=0&rows=5`}>{row.id}</Link>
                                </StyledTableCell>
                                <StyledTableCell align="right">{row.status}</StyledTableCell>
                                <StyledTableCell align="right">{row.delivery_address}</StyledTableCell>
                                <StyledTableCell align="right">{row.contact}</StyledTableCell>
                                <StyledTableCell align="right">{row.delivery_date}</StyledTableCell>
                            </StyledTableRow>
                        )
                    )}

                    {emptyRows > 0 && (
                        <StyledTableRow style={{ height: 53 * emptyRows }}>
                            <StyledTableCell colSpan={6} />
                        </StyledTableRow>
                    )}
                </TableBody>
                <TableFooter>
                    <TableRow>
                        <TablePagination
                            rowsPerPageOptions={[5, 10, 25, 100]}
                            colSpan={3}
                            count={rows.length}
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
                </TableFooter>
            </Table>
        </TableContainer>
    );
}

OrderListTable.propTypes = {
    page: PropTypes.number.isRequired,
    setUsedParams: PropTypes.func.isRequired,
    rowsPerPage: PropTypes.number.isRequired,
    rows: PropTypes.arrayOf(
        PropTypes.shape({
            id: PropTypes.number,
            status: PropTypes.string,
            address: PropTypes.string,
            recipient: PropTypes.string,
            date: PropTypes.string,
            products: PropTypes.arrayOf(PropTypes.string),
        })
    ).isRequired,
};

export default OrderListTable;
