import { Table, TableBody, TableContainer, TableHead, TableCell, TableRow, Paper } from '@mui/material';

function orderData(name, category, date) {
    return { name, category, date };
}

// Test data
const rows = [
    orderData('Tuoli', 'furniture', '12.1.2023'),
    orderData('Tonipal kahville', 'inspirational quote', '12.1.2023'),
];

function OrderView() {
    return (
        <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
                <TableHead>
                    <TableRow>
                        <TableCell>Tuotenimi</TableCell>
                        <TableCell align="right">Kategoria</TableCell>
                        <TableCell align="right">Päivämäärä</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {rows.map((row) => (
                        <TableRow key={row.name}>
                            <TableCell component="th" scope="row">
                                {row.name}
                            </TableCell>
                            <TableCell align="right">{row.category}</TableCell>
                            <TableCell align="right">{row.date}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
}

export default OrderView;
