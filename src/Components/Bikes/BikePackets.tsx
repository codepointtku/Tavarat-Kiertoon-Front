import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import StyledTableCell from '../StyledTableCell';

export default function BikePackets() {
    return (
        <TableContainer component={Paper} sx={{ padding: '2rem' }}>
            <Table sx={{ minWidth: 700 }} aria-label="customized table">
                <TableHead>
                    <TableRow>
                        <StyledTableCell></StyledTableCell>
                        <StyledTableCell align="right">asd</StyledTableCell>
                        <StyledTableCell align="right">asdasd</StyledTableCell>
                        <StyledTableCell align="right">asdasdasd</StyledTableCell>
                        <StyledTableCell align="right">asdasdasdasd</StyledTableCell>
                        <StyledTableCell align="right">asdasdasdasdad</StyledTableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    <TableRow>
                        <StyledTableCell component="th" scope="row">
                            asdasd
                        </StyledTableCell>
                        <StyledTableCell align="right">asdasd</StyledTableCell>
                        <StyledTableCell align="right">asdasd</StyledTableCell>
                        <StyledTableCell align="right">asdasd</StyledTableCell>
                        <StyledTableCell align="right">asdasd</StyledTableCell>
                        <StyledTableCell align="right">asdasd</StyledTableCell>
                    </TableRow>
                </TableBody>
            </Table>
        </TableContainer>
    );
}
