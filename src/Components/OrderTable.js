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
    Button,
    Card,
} from '@mui/material';
import PropTypes from 'prop-types';
import { useLoaderData, useNavigate } from 'react-router-dom';
import { useState, useEffect, Fragment } from 'react';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import TablePaginationActions from './TablePaginationActions';
import StyledTableRow from './StyledTableRow';
import StyledTableCell from './StyledTableCell';
// import orderData from '../TestData/tilaus.json';

// replace this with apiCall later on
// const orderFind = (id) => orderData[id];

function OrderTable({ page, rowsPerPage, setUsedParams }) {
    const [isOpen, setIsOpen] = useState({});
    const navigate = useNavigate();

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
    let orderList = [];

    order.productList.forEach((entry) => {
        try {
            const newEntry = entry.data;
            sourceStates[entry.data.id] = false;
            newEntry.count = 1;
            newEntry.id = entry.data.id;
            newEntry.items = [newEntry];
            orderList.forEach((each) => {
                if (each.barcode === newEntry.barcode) {
                    newEntry.count += each.count;
                    newEntry.items = newEntry.items.concat(each.items);
                    const index = orderList.findIndex((key) => key.id === each.id);
                    orderList = [...orderList.slice(0, index), ...orderList.slice(index + 1)];
                }
            });
            orderList.push(newEntry);
        } catch {
            orderList.push({
                name: 'Tuotetta ei olemassa',
                id: entry.data.id,
                barcode: '-',
                count: 0,
                category: '-',
                storages: '-',
                items: [],
                measurements: '-',
                weight: '-',
                shelf_id: '-',
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
        <>
            <Card>
                <h2 align="center">Tilauksen lisätieto</h2>
                <p align="center">{order.order_info}</p>
            </Card>
            <h2 align="center">Tilauksen tuotteet</h2>
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
                            <StyledTableCell align="right">Varasto</StyledTableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {(rowsPerPage > 0
                            ? orderList.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                            : orderList
                        ).map((value) => (
                            <Fragment key={value.id}>
                                <StyledTableRow>
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
                                    <TableCell align="right">{value.storages}</TableCell>
                                </StyledTableRow>
                                <TableRow>
                                    <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={7}>
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
                                                            <TableCell align="right">Mitat</TableCell>
                                                            <TableCell align="right">Paino</TableCell>
                                                            <TableCell align="right">Hylly id</TableCell>
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
                                                                <TableCell align="right">{item.measurements}</TableCell>
                                                                <TableCell align="right">{item.weight}</TableCell>
                                                                <TableCell align="right">{item.shelf_id}</TableCell>
                                                            </TableRow>
                                                        ))}
                                                    </TableBody>
                                                </Table>
                                            </Box>
                                        </Collapse>
                                    </TableCell>
                                </TableRow>
                            </Fragment>
                        ))}
                        {emptyRows > 0 && (
                            <StyledTableRow style={{ height: 53 * emptyRows }}>
                                <StyledTableCell colSpan={7} />
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
            <Button
                sx={{ margin: '2rem' }}
                onClick={() => navigate(`/varasto/tilaus/${order.id}/muokkaa`, { state: orderList })}
            >
                Muokkaa tilausta
            </Button>
        </>
    );
}

OrderTable.propTypes = {
    page: PropTypes.number.isRequired,
    setUsedParams: PropTypes.func.isRequired,
    rowsPerPage: PropTypes.number.isRequired,
};

export default OrderTable;
