import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import StyledTableCell from '../StyledTableCell';

export default function ModifyBikeOrder() {
    // const loaderData = useLoaderData();

    // const packet = loaderData.packages;

    // console.log(packet);

    return (
        <TableContainer component={Paper} sx={{ padding: '2rem' }}>
            <Table sx={{ minWidth: 700 }} aria-label="customized table">
                <TableHead>
                    <TableRow>
                        <StyledTableCell align="right">nimi</StyledTableCell>
                        <StyledTableCell align="right">merkki</StyledTableCell>
                        <StyledTableCell align="right">tyyppi</StyledTableCell>
                        <StyledTableCell align="right">koko</StyledTableCell>
                        <StyledTableCell align="right">väri</StyledTableCell>
                        <StyledTableCell align="right">kuvaus</StyledTableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {/* {packages.map((packet) => ( */}
                    <TableRow>
                        <TableCell align="right"> placeholder </TableCell>
                        <TableCell align="right"> place </TableCell>
                        <TableCell align="right">holder</TableCell>
                        <TableCell align="right">holder</TableCell>
                        <TableCell align="right">holder</TableCell>
                        <TableCell align="right">holder</TableCell>
                    </TableRow>

                    {/* ))} */}
                </TableBody>
            </Table>
        </TableContainer>
    );
}
