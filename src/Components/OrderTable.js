import {
    Table,
    TableBody,
    TableContainer,
    TableHead,
    TableCell,
    TableRow,
    TableFooter,
    Paper,
    IconButton,
    Box,
    Typography,
    Collapse,
    TablePagination,
} from '@mui/material';
import PropTypes from 'prop-types';
import { useLoaderData } from 'react-router-dom';
import { useState, useEffect } from 'react';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import TablePaginationActions from './TablePaginationActions';
import StyledTableRow from './StyledTableRow';
import StyledTableCell from './StyledTableCell';
import productData from '../TestData/tuote.json';
// import orderData from '../TestData/tilaus.json';

// replace this with apiCall later on
// const orderFind = (id) => orderData[id];

// replace this with apiCall later on
const productFind = (id) => productData[id];

function OrderTable({ page, rowsPerPage, setUsedParams }) {
    const [isOpen, setIsOpen] = useState({});

    const order = useLoaderData();
    if (order === null) {
        return (
            <TableRow>
                <TableCell component="th" scope="row">
                    <h1>Tilausnumeroa ei löytynyt</h1>
                </TableCell>
            </TableRow>
        );
    }
    const sourceStates = {};
    const orderList = [];

    order.products.forEach((entry) => {
        try {
            const newEntry = productFind(entry);
            sourceStates[entry] = false;
            newEntry.count = 1;
            newEntry.id = entry;
            newEntry.items = [newEntry];
            orderList.forEach((each, key) => {
                if (each.barcode === newEntry.barcode) {
                    newEntry.count += each.count;
                    newEntry.items = newEntry.items.concat(each.items);
                    orderList.pop(key);
                }
            });
            orderList.push(newEntry);
        } catch {
            orderList.push({
                name: 'Tuotetta ei olemassa',
                id: entry,
                barcode: '-',
                count: 0,
                category: '-',
                location: '-',
                items: [],
            });
        }
    });

    const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - orderList.length) : 0;

    const handleChangePage = (event, newPage) => {
        setUsedParams('page', newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setUsedParams('rows', parseInt(event.target.value, 10));
        setUsedParams('page', 0);
    };

    useEffect(() => {
        if (page > Math.floor(orderList.length / rowsPerPage)) {
            setUsedParams('page', Math.floor(orderList.length / rowsPerPage));
        } else if (page < 0) {
            setUsedParams('page', 0);
        }
    }, [page]);

    useEffect(() => {
        setIsOpen({ sourceStates });
    }, []);

    return (
        <TableContainer component={Paper} sx={{ padding: '2rem' }}>
            <Table sx={{ minWidth: 650 }} aria-label="collapsible table">
                <TableHead>
                    <TableRow>
                        <StyledTableCell> </StyledTableCell>
                        <StyledTableCell>Tuotenimi</StyledTableCell>
                        <StyledTableCell align="right">Saldo</StyledTableCell>
                        <StyledTableCell align="right">Viivakoodi</StyledTableCell>
                        <StyledTableCell align="right">Tuotenumero</StyledTableCell>
                        <StyledTableCell align="right">Kategoria</StyledTableCell>
                        <StyledTableCell align="right">Sijainti</StyledTableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {(rowsPerPage > 0
                        ? orderList.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                        : orderList
                    ).map((value) => (
                        <>
                            <StyledTableRow key={value.id}>
                                <TableCell>
                                    <IconButton
                                        aria-label="expand row"
                                        size="small"
                                        onClick={() => {
                                            setIsOpen((prev) => ({ ...prev, [value.id]: !isOpen[value.id] }));
                                        }}
                                    >
                                        {isOpen[value.id] ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
                                    </IconButton>
                                </TableCell>
                                <TableCell component="th" scope="row">
                                    {value.name}
                                </TableCell>
                                <TableCell align="right">{value.count}</TableCell>
                                <TableCell align="right">{value.barcode}</TableCell>
                                <TableCell align="right">{value.id}</TableCell>
                                <TableCell align="right">{value.category}</TableCell>
                                <TableCell align="right">{value.location}</TableCell>
                            </StyledTableRow>
                            <TableRow>
                                <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
                                    <Collapse in={isOpen[value.id]} timeout="auto" unmountOnExit>
                                        <Box sx={{ margin: 1 }}>
                                            <Typography variant="h6" gutterBottom component="div">
                                                Tuotteet
                                            </Typography>
                                            <Table size="small">
                                                <TableHead>
                                                    <TableRow>
                                                        <TableCell component="th" scope="row">
                                                            Tuotenumero
                                                        </TableCell>
                                                        <TableCell align="right">Tuotenimi</TableCell>
                                                        <TableCell align="right">Viivakoodi</TableCell>
                                                        <TableCell align="right">Kategoria</TableCell>
                                                        <TableCell align="right">Väri</TableCell>
                                                    </TableRow>
                                                </TableHead>
                                                <TableBody>
                                                    {value.items.map((item) => (
                                                        <TableRow key={item.id}>
                                                            <TableCell component="th" scope="row">
                                                                {item.id}
                                                            </TableCell>
                                                            <TableCell align="right">{item.name}</TableCell>
                                                            <TableCell align="right">{item.barcode}</TableCell>
                                                            <TableCell align="right">{item.category}</TableCell>
                                                            <TableCell align="right">{item.color}</TableCell>
                                                        </TableRow>
                                                    ))}
                                                </TableBody>
                                            </Table>
                                        </Box>
                                    </Collapse>
                                </TableCell>
                            </TableRow>
                        </>
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
                            count={orderList.length}
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

OrderTable.propTypes = {
    page: PropTypes.number.isRequired,
    setUsedParams: PropTypes.func.isRequired,
    rowsPerPage: PropTypes.number.isRequired,
};

export default OrderTable;
