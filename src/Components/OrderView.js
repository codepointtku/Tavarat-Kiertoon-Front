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
                    {productData.product.id === orderData.order.products.product.id ? (
                        <TableRow key={productData.product.id}>
                            <TableCell component="th" scope="row">
                                {productData.product.name}
                            </TableCell>
                            <TableCell align="right">{productData.product.id}</TableCell>
                            <TableCell align="right">{productData.product.category}</TableCell>
                            <TableCell align="right">{productData.product.color}</TableCell>
                        </TableRow>
                    ) : (
                        <TableCell>Tonipal kahville</TableCell>
                    )}
                </TableBody>
            </Table>
        </TableContainer>
    );
}

export default OrderView;
