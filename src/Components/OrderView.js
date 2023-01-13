import { Table, TableBody, TableContainer, TableHead, TableCell, TableRow, Paper } from '@mui/material';
import productData from '../TestData/tuote.json';
import orderData from '../TestData/tilaus.json';

function OrderView() {
    return (
        <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
                <TableHead>
                    <TableRow>
                        <TableCell>Tuotenimi</TableCell>
                        <TableCell align="right">Tuotenumero</TableCell>
                        <TableCell align="right">Kategoria</TableCell>
                        <TableCell align="right">Väri</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {orderData.order.products.map((value) => {
                        if (Object.keys(productData).includes(value)) {
                            return (
                                <TableRow key={value}>
                                    <TableCell component="th" scope="row">
                                        {productData[value].name}
                                    </TableCell>
                                    <TableCell align="right">{value}</TableCell>
                                    <TableCell align="right">{productData[value].category}</TableCell>
                                    <TableCell align="right">{productData[value].color}</TableCell>
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
                    })}
                </TableBody>
            </Table>
        </TableContainer>
    );
}

export default OrderView;
