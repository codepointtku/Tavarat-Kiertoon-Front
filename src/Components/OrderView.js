import { Table, TableBody, TableContainer, TableHead, TableCell, TableRow, Paper } from '@mui/material';
import { useSearchParams } from 'react-router-dom';
import productData from '../TestData/tuote.json';
import orderData from '../TestData/tilaus.json';

const cellRow = () => {
    let order = '';
    const [searchParams] = useSearchParams();
    try {
        const orderId = searchParams.get('id');
        order = orderData[orderId].products;
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

    order.forEach((value) => {
        if (Object.keys(productData).includes(value)) {
            if (orderList.some((key) => orderList[key].location !== productData[value].location)) {
                orderList[value].count += 1;
            } else {
                const targetOrder = productData[value];
                targetOrder.count = 1;
                orderList.push(targetOrder);
            }
        }
    });

    console.log(orderList);

    return order.map((value) => {
        if (Object.keys(productData).includes(value)) {
            return (
                <TableRow key={value}>
                    <TableCell component="th" scope="row">
                        {productData[value].name}
                    </TableCell>
                    <TableCell align="right">1</TableCell>
                    <TableCell align="right">{value}</TableCell>
                    <TableCell align="right">{productData[value].category}</TableCell>
                    <TableCell align="right">{productData[value].location}</TableCell>
                </TableRow>
            );
        }
        return (
            <TableRow>
                <TableCell component="th" scope="row">
                    Tuotenumerolla {value} ei löytynyt tuotetta.
                </TableCell>
            </TableRow>
        );
    });
};

function OrderView() {
    return (
        <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
                <TableHead>
                    <TableRow>
                        <TableCell>Tuotenimi</TableCell>
                        <TableCell align="right">Saldo</TableCell>
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
