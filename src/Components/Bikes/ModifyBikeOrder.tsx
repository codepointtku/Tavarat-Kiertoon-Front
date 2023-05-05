import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import StyledTableCell from '../StyledTableCell';
import { useLoaderData } from 'react-router';
import { Button } from '@mui/material';

export default function ModifyBikeOrder() {
    const { packet, models } = useLoaderData();

    // const handleEditBike = (id) => {
    //     // Handle editing of a bike with the given id
    // };

    return (
        <TableContainer component={Paper} sx={{ padding: '2rem' }}>
            <Table sx={{ minWidth: 700 }} aria-label="customized table">
                <TableHead>
                    <TableRow>
                        <StyledTableCell align="right">nimi</StyledTableCell>
                        <StyledTableCell align="right">id</StyledTableCell>
                        <StyledTableCell align="right">kuvaus</StyledTableCell>
                        <StyledTableCell align="right">koko</StyledTableCell>
                        <StyledTableCell align="right">väri</StyledTableCell>
                        <StyledTableCell align="right">tyyppi</StyledTableCell>
                        <StyledTableCell align="right">muokkaa</StyledTableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {models.map((bike) => (
                        <TableRow key={bike.id}>
                            <TableCell align="right">{bike.name}</TableCell>
                            <TableCell align="right">{bike.id}</TableCell>
                            <TableCell align="right">{bike.description}</TableCell>
                            <TableCell align="right">{bike.size}</TableCell>
                            <TableCell align="right">{bike.color}</TableCell>
                            <TableCell align="right">{bike.type}</TableCell>
                            <TableCell align="right">
                                <Button onClick={() => handleEditBike(bike.id)}>Muokkaa</Button>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
}
