import { useState } from 'react';
import PropTypes from 'prop-types';
import { useTheme, styled } from '@mui/material/styles';
import {
    Box,
    Table,
    TableBody,
    TableContainer,
    TableHead,
    TableFooter,
    TablePagination,
    TableRow,
    Paper,
    IconButton,
} from '@mui/material';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import { KeyboardArrowLeft, KeyboardArrowRight } from '@mui/icons-material';
import LaunchIcon from '@mui/icons-material/Launch';
import LastPageIcon from '@mui/icons-material/LastPage';
import FirstPageIcon from '@mui/icons-material/FirstPage';
import { Link } from 'react-router-dom';

function TablePaginationActions({ count, page, rowsPerPage, onPageChange }) {
    const theme = useTheme();

    const handleFirstPageButtonClick = (event) => {
        onPageChange(event, 0);
    };

    const handleBackButtonClick = (event) => {
        onPageChange(event, page - 1);
    };

    const handleNextButtonClick = (event) => {
        onPageChange(event, page + 1);
    };

    const handleLastPageButtonClick = (event) => {
        onPageChange(event, Math.max(0, Math.ceil(count / rowsPerPage) - 1));
    };

    return (
        <Box sx={{ flexShrink: 0, ml: 2.5 }}>
            <IconButton onClick={handleFirstPageButtonClick} disabled={page === 0} aria-label="first page">
                {theme.direction === 'rtl' ? <LastPageIcon /> : <FirstPageIcon />}
            </IconButton>
            <IconButton onClick={handleBackButtonClick} disabled={page === 0} aria-label="previous page">
                {theme.direction === 'rtl' ? <KeyboardArrowRight /> : <KeyboardArrowLeft />}
            </IconButton>
            <IconButton
                onClick={handleNextButtonClick}
                disabled={page >= Math.ceil(count / rowsPerPage) - 1}
                aria-label="next page"
            >
                {theme.direction === 'rtl' ? <KeyboardArrowLeft /> : <KeyboardArrowRight />}
            </IconButton>
            <IconButton
                onClick={handleLastPageButtonClick}
                disabled={page >= Math.ceil(count / rowsPerPage) - 1}
                aria-label="last page"
            >
                {theme.direction === 'rtl' ? <FirstPageIcon /> : <LastPageIcon />}
            </IconButton>
        </Box>
    );
}

TablePaginationActions.propTypes = {
    count: PropTypes.number.isRequired,
    onPageChange: PropTypes.func.isRequired,
    page: PropTypes.number.isRequired,
    rowsPerPage: PropTypes.number.isRequired,
};

const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
        backgroundColor: theme.palette.success.dark,
        color: theme.palette.common.white,
    },
    [`&.${tableCellClasses.body}`]: {
        fontSize: 14,
    },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
    '&:nth-of-type(odd)': {
        backgroundColor: theme.palette.action.hover,
    },
    // hide last border
    '&:last-child td, &:last-child th': {
        border: 0,
    },
}));

function createData(id, status, address, recipient, date) {
    return { id, status, address, recipient, date };
}

// Change to handle actual orders data later
const rows = [
    createData(4128, 'käsittelyssä', 'Hämeenkatu 1', 'Matti Meikäläinen', '12.1.2023'),
    createData(4127, 'toimituksessa', 'Humalistonkatu 2', 'Maisa Mannerlaatta', '12.1.2023'),
    createData(4126, 'toimitettu', 'Eerikinkatu 3', 'Jaska Jokunen', '11.1.2023'),
    createData(4125, 'toimitettu', 'Eerikinkatu 3', 'Jaska Jokunen', '9.1.2023'),
    createData(4124, 'toimitettu', 'Hämeenkatu 1', 'Matti Meikäläinen', '7.1.2023'),
    createData(4123, 'toimitettu', 'Hämeenkatu 4', 'Kaisa Keihäs', '6.1.2023'),
    createData(4122, 'toimitettu', 'Hämeenkatu 1', 'Matti Meikäläinen', '6.1.2023'),
    createData(4121, 'toimitettu', 'Hämeenkatu 4', 'Kaisa Keihäs', '5.1.2023'),
    createData(4120, 'toimitettu', 'Eerikinkatu 3', 'Jaska Jokunen', '4.1.2023'),
    createData(4119, 'toimitettu', 'Humalistonkatu 2', 'Maisa Mannerlaatta', '4.1.2023'),
    createData(4118, 'toimitettu', 'Eerikinkatu 3', 'Jaska Jokunen', '3.1.2023'),
    createData(4117, 'toimitettu', 'Humalistonkatu 2', 'Maisa Mannerlaatta', '2.1.2023'),
];

export default function OrderListTable() {
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);

    // Avoid a layout jump when reaching the last page with empty rows.
    const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows.length) : 0;

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    return (
        <TableContainer component={Paper}>
            <Table sx={{ minWidth: 700 }} aria-label="customized table">
                <TableHead>
                    <TableRow>
                        <StyledTableCell>Tilaus (ID)</StyledTableCell>
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
                                    <Link to={`/varasto/tilaus?id=${row.id}`}>
                                        {row.id}
                                        <LaunchIcon fontSize="small" />
                                    </Link>
                                </StyledTableCell>
                                <StyledTableCell align="right">{row.status}</StyledTableCell>
                                <StyledTableCell align="right">{row.address}</StyledTableCell>
                                <StyledTableCell align="right">{row.recipient}</StyledTableCell>
                                <StyledTableCell align="right">{row.date}</StyledTableCell>
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
                            rowsPerPageOptions={[5, 10, 25, { label: 'All', value: -1 }]}
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
