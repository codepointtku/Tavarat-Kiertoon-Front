import {
    Table,
    TableBody,
    TableContainer,
    TableHead,
    TableCell,
    TableRow,
    Paper,
    tableCellClasses,
    styled,
    IconButton,
    Box,
    Typography,
    Collapse,
} from '@mui/material';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import { useSearchParams } from 'react-router-dom';
import { useState } from 'react';
import productData from '../TestData/tuote.json';
import orderData from '../TestData/tilaus.json';

// replace this with apiCall later on
const orderFind = (id) => orderData[id];

// replace this with apiCall later on
const productFind = (id) => productData[id];

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

const cellRow = () => {
    let order = '';
    const [searchParams] = useSearchParams();
    try {
        const orderId = searchParams.get('id');
        order = orderFind(orderId).products;
    } catch (error) {
        return (
            <TableRow>
                <TableCell component="th" scope="row">
                    <h1>Tilausnumeroa ei löytynyt</h1>
                </TableCell>
            </TableRow>
        );
    }

    const orderList = [];
    order.forEach((entry) => {
        try {
            const newEntry = productFind(entry);
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

    const [isOpen, setIsOpen] = useState(false);

    return orderList.map((value) => (
        <>
            <StyledTableRow key={value.id}>
                <IconButton aria-label="expand row" size="small" onClick={() => setIsOpen(!isOpen)}>
                    {isOpen ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
                </IconButton>
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
                            <Table size="small" aria-label="purchases">
                                <TableHead>
                                    <TableRow>
                                        <TableCell>Nimi</TableCell>
                                        <TableCell>Viivakoodi</TableCell>
                                        <TableCell align="right">Kategoria</TableCell>
                                        <TableCell align="right">Väri</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {value.items.map((item) => (
                                        <TableRow key={item.name}>
                                            <TableCell component="th" scope="row">
                                                {item.name}
                                            </TableCell>
                                            <TableCell>{item.barcode}</TableCell>
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
    ));
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
