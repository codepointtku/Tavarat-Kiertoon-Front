import { Button, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import StyledTableCell from '../StyledTableCell';
import { useLoaderData } from 'react-router';
import { Link } from 'react-router-dom';

export default function BikePackets() {
    const loaderData = useLoaderData();
    // console.log('###', loaderData);

    const packages = loaderData.packet;

    return (
        <TableContainer component={Paper} sx={{ padding: '2rem' }}>
            <Table sx={{ minWidth: 700 }} aria-label="customized table">
                <TableHead>
                    <TableRow>
                        <StyledTableCell align="right">ID</StyledTableCell>
                        <StyledTableCell align="right">Paketin nimi</StyledTableCell>
                        <StyledTableCell align="right">Muokkaa</StyledTableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {packages.map((packet) => (
                        <TableRow key={packet.id}>
                            <TableCell align="right"> {packet.id} </TableCell>
                            <TableCell align="right"> {packet.name} </TableCell>
                            <TableCell align="right">
                                <Button
                                    color="primary"
                                    to={`/pyorat/pyoravarasto/muokkaapaketti/${packet.id}`}
                                    component={Link}
                                >
                                    Muokkaa
                                </Button>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
}
