import { Table, TableBody, TableContainer, TableHead, TableCell, TableRow, Paper } from '@mui/material';
import { useSearchParams } from 'react-router-dom';
import productData from '../TestData/tuote.json';
import orderData from '../TestData/tilaus.json';

// replace this with apiCall later on
const orderFind = (id) => orderData[id];

// replace this with apiCall later on
const productFind = (id) => productData[id];

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
            orderList.forEach((each, key) => {
                if (each.barcode === newEntry.barcode) {
                    newEntry.count += each.count;
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
            });
        }
    });

    return orderList.map((value) => (
        <TableRow key={value.id}>
            <TableCell component="th" scope="row">
                {value.name}
            </TableCell>
            <TableCell align="right">{value.count}</TableCell>
            <TableCell align="right">{value.barcode}</TableCell>
            <TableCell align="right">{value.id}</TableCell>
            <TableCell align="right">{value.category}</TableCell>
            <TableCell align="right">{value.location}</TableCell>
        </TableRow>
    ));
};

function OrderView() {
    return (
        <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
                <TableHead>
                    <TableRow>
                        <TableCell>Tuotenimi</TableCell>
                        <TableCell align="right">Saldo</TableCell>
                        <TableCell align="right">Viivakoodi</TableCell>
                        <TableCell align="right">Tuotenumero</TableCell>
                        <TableCell align="right">Kategoria</TableCell>
                        <TableCell align="right">Sijainti</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>{cellRow()}</TableBody>
            </Table>
        </TableContainer>
    );
}

export default OrderView;
