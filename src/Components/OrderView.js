import {
    Table,
    TableBody,
    TableContainer,
    TableHead,
    TableCell,
    TableRow,
    Paper,
    IconButton,
    Box,
    Typography,
    Collapse,
} from '@mui/material';
import { useSearchParams, useParams } from 'react-router-dom';
import { useState } from 'react';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import StyledTableRow from './StyledTableRow';
import StyledTableCell from './StyledTableCell';
import productData from '../TestData/tuote.json';
import orderData from '../TestData/tilaus.json';

// replace this with apiCall later on
const orderFind = (id) => orderData[id];

// replace this with apiCall later on
const productFind = (id) => productData[id];

const detailRow = (value) => {
    const [isOpen, setIsOpen] = useState(false);
    return (
        <>
            <StyledTableRow key={value.id}>
                <TableCell>
                    <IconButton
                        aria-label="expand row"
                        size="small"
                        onClick={() => {
                            setIsOpen(!isOpen);
                        }}
                    >
                        {isOpen ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
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
                    <Collapse in={isOpen} timeout="auto" unmountOnExit>
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
    );
};

const cellRow = () => {
    let order = '';
    const { id } = useParams();
    const [searchParams] = useSearchParams();
    console.log(searchParams);
    try {
        order = orderFind(id).products;
    } catch (error) {
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
    order.forEach((entry) => {
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

    /* Finds unique barcodes in the items under the each product. Move to sub-table as mapping later.
    orderList.forEach((entry, key) => {
        orderList[key].items = entry.items
            .map((obj) => obj.barcode)
            .filter((item, index, arr) => arr.indexOf(item) === index);
    });
    */

    return orderList.map((value) => detailRow(value));
};

function OrderView() {
    return (
        <TableContainer component={Paper}>
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
                <TableBody>{cellRow()}</TableBody>
            </Table>
        </TableContainer>
    );
}

export default OrderView;
