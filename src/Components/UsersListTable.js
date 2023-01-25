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
import LaunchIcon from '@mui/icons-material/Launch';
import { Link } from 'react-router-dom';
import TablePaginationActions from './TablePaginationActions';
import StyledTableCell from './StyledTableCell';
import StyledTableRow from './StyledTableRow';
import userListData from '../TestData/user.json';

function UsersListTable({ page, rowsPerPage, setUsedParams }) {
    // Avoid a layout jump when reaching the last page with empty rows.
    const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - userListData.length) : 0;

    const handleChangePage = (event, newPage) => {
        setUsedParams('page', newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setUsedParams('rows', parseInt(event.target.value, 10));
        setUsedParams('page', 0);
    };

    useEffect(() => {
        if (page > Math.floor(userListData.length / rowsPerPage)) {
            setUsedParams('page', Math.floor(userListData.length / rowsPerPage));
        } else if (page < 0) {
            setUsedParams('page', 0);
        }
    }, [page]);

    return (
        <TableContainer component={Paper}>
            <Table sx={{ minWidth: 700 }} aria-label="customized table">
                <TableHead>
                    <TableRow>
                        <StyledTableCell>Käyttäjä (ID)</StyledTableCell>
                        <StyledTableCell align="right">Nimi</StyledTableCell>
                        <StyledTableCell align="right">Puhelinnumero</StyledTableCell>
                        <StyledTableCell align="right">Sähköposti</StyledTableCell>
                        <StyledTableCell align="right">Oikeudet</StyledTableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {(rowsPerPage > 0
                        ? userListData.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                        : userListData
                    ).map((row) => (
                        <StyledTableRow key={row.id}>
                            <StyledTableCell component="th" scope="row">
                                <Link to={`/varasto/tilaus/${row.id}?page=0&rows=5`}>
                                    {row.id}
                                    <LaunchIcon fontSize="small" />
                                </Link>
                            </StyledTableCell>
                            <StyledTableCell align="right">{row.name}</StyledTableCell>
                            <StyledTableCell align="right">{row.phone}</StyledTableCell>
                            <StyledTableCell align="right">{row.email}</StyledTableCell>
                            <StyledTableCell align="right">{row.roles}</StyledTableCell>
                        </StyledTableRow>
                    ))}

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
                            count={userListData.length}
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

UsersListTable.propTypes = {
    page: PropTypes.number.isRequired,
    setUsedParams: PropTypes.func.isRequired,
    rowsPerPage: PropTypes.number.isRequired,
};

export default UsersListTable;
