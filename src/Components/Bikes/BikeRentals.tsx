import { Paper, TableContainer, Table, TableHead, TableRow, TableCell, TableBody, Typography } from '@mui/material';
import { useLoaderData } from 'react-router';
import StyledTableCell from '../StyledTableCell';

interface Rental {
    id: number;
    start_date: string;
    end_date: string;
    state: string;
    delivery_address: string;
    pickup: boolean;
    contact_name: string;
    contact_phone_number: string;
    extra_info: string;
    user: number;
    bike_stock: number[];
}

export default function BikeRentals() {
    const data = useLoaderData() as Rental[]; // useLoaderData() returns the data passed to it in the loader function
    console.log(data);

    return (
        <div>
            <Typography variant="h3" align="center" color="primary.main" width="100%">
                Varaukset{' '}
            </Typography>

            <TableContainer component={Paper} sx={{ padding: '2rem' }}>
                <Table sx={{ minWidth: 700 }} aria-label="customized table">
                    <TableHead>
                        <TableRow>
                            <StyledTableCell align="right">Alotuspäivä</StyledTableCell>
                            <StyledTableCell align="right">Lopetuspäivä</StyledTableCell>
                            <StyledTableCell align="right">Status</StyledTableCell>
                            <StyledTableCell align="right">Osoite</StyledTableCell>
                            <StyledTableCell align="right">
                                <div>Nouto</div>
                            </StyledTableCell>
                            <StyledTableCell align="right">Tilaaja</StyledTableCell>
                            <StyledTableCell align="right">Puh</StyledTableCell>
                            <StyledTableCell align="right">extra info</StyledTableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {data?.map((rental) => {
                            return (
                                <TableRow key={rental.id} hover>
                                    <TableCell align="right">{rental.start_date}</TableCell>
                                    <TableCell align="right">{rental.end_date}</TableCell>
                                    <TableCell align="right">{rental.state}</TableCell>
                                    <TableCell align="right">{rental.delivery_address}</TableCell>
                                    <TableCell align="right">{rental.pickup ? 'Kyllä' : 'Ei'}</TableCell>
                                    <TableCell align="right">{rental.contact_name}</TableCell>
                                    <TableCell align="right">{rental.contact_phone_number}</TableCell>
                                    <TableCell align="right">{rental.extra_info}</TableCell>
                                </TableRow>
                            );
                        })}
                    </TableBody>
                </Table>
            </TableContainer>
        </div>
    );
}
