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
    return <div>Tilausnäkymä</div>;
}

export default OrderView;
