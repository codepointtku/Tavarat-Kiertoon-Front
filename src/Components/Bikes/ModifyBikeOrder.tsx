import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import StyledTableCell from '../StyledTableCell';
import { Button } from '@mui/material';
import { useLoaderData } from 'react-router';

export default function ModifyBikeOrder() {
    const { packet, models } = useLoaderData();

    // const packet = loaderData.packages;

    // console.log(packet, models);

    return (
        <TableContainer component={Paper} sx={{ padding: '2rem' }}>
            <Table sx={{ minWidth: 700 }} aria-label="customized table">
                <Button> muokkaa </Button>
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
                {/* <TableBody> */}
                {/* {packages.map((packet) => ( */}
                {/* <TableRow>
                        <TableCell align="right"> </TableCell>
                        <TableCell align="right"> place </TableCell>
                        <TableCell align="right">holder</TableCell>
                        <TableCell align="right">holder</TableCell>
                        <TableCell align="right">holder</TableCell>
                        <TableCell align="right">holder</TableCell>
                    </TableRow> */}
                {/* ))} */}
                {/* </TableBody> */}
            </Table>
        </TableContainer>
    );
}
