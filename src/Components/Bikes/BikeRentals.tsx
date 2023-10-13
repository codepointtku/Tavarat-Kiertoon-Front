import {
    Paper,
    TableContainer,
    Table,
    TableHead,
    TableRow,
    TableCell,
    TableBody,
    Typography,
    Box,
    IconButton,
    TextField,
    MenuItem,
} from '@mui/material';
import { useLoaderData } from 'react-router';
import StyledTableCell from '../StyledTableCell';
import { GridDeleteIcon } from '@mui/x-data-grid';
import { useState } from 'react';
import type { bikeRentalLoader } from '../../Router/loaders';
import { useSubmit, useNavigate } from 'react-router-dom';

// interface Rental {
//     id: number;
//     start_date: string;
//     end_date: string;
//     state: string;
//     delivery_address: string;
//     pickup: boolean;
//     contact_name: string;
//     contact_phone_number: string;
//     extra_info: string;
//     user: number;
//     bike_stock: number[];
// }

function getYearAndMonth(dateString: string) {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const day = date.getDate();
    const month = date.getMonth() + 1; // add 1 since getMonth() returns 0-indexed months
    return date.toLocaleDateString('FI-fi');
}

export default function BikeRentals() {

    const dataRental = useLoaderData() as Awaited<ReturnType<typeof bikeRentalLoader>>;
    const dataRentalCopy = useLoaderData() as Awaited<ReturnType<typeof bikeRentalLoader>>;
    const navigate = useNavigate()
    const submit = useSubmit();
    
    const [data, setData] = useState(dataRental.results);

    const handleRemoveOrder = (id: number) => {
        const updatedData = data?.filter((rental) => rental.id !== id);
        setData(updatedData);
        submit({ id: String(id) }, { method: 'delete', action: '/pyorat/pyoravarasto/pyoratilaukset/' });
    };

    if(dataRental.results?.length === 0) {
        return <Typography variant="h6" margin="auto">ei tilauksia</Typography>
    }

    return (
        <Box width="100%">
            <Typography variant="h3" align="center" color="primary.main" width="100%" sx={{margin: "0 0 1rem 0"}}>
                Tilaukset{' '}
            </Typography>
            <TableContainer component={Paper} sx={{ padding: '2rem' }}>
                <Table sx={{ minWidth: 700 }} aria-label="customized table">
                    <TableHead>
                        <TableRow>
                            <StyledTableCell align="right">Aloituspäivä</StyledTableCell>
                            <StyledTableCell align="right">Lopetuspäivä</StyledTableCell>
                            <StyledTableCell align="right">Tila</StyledTableCell>
                            <StyledTableCell align="right">Osoite</StyledTableCell>
                            <StyledTableCell align="right">Nouto</StyledTableCell>
                            <StyledTableCell align="right">Tilaaja</StyledTableCell>
                            <StyledTableCell align="right">Puh</StyledTableCell>
                            <StyledTableCell align="right">lisätiedot</StyledTableCell>
                            <StyledTableCell align="right">Remove</StyledTableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {data?.map((rental) => (
                            <TableRow
                                key={rental.id}
                                style={{ cursor: 'pointer' }}
                                hover
                                onClick={() => navigate(`/pyorat/pyoravarasto/pyoratilaukset/${rental.id}`)}
                            >
                                <TableCell align="right">{getYearAndMonth(rental.start_date)}</TableCell>
                                <TableCell align="right">{getYearAndMonth(rental.end_date)}</TableCell>
                                <TableCell align="right">{rental.state}</TableCell>
                                <TableCell align="right">{rental.delivery_address}</TableCell>
                                <TableCell align="right">{rental.pickup ? 'Kyllä' : 'Ei'}</TableCell>
                                <TableCell align="right">{rental.contact_name}</TableCell>
                                <TableCell align="right">{rental.contact_phone_number}</TableCell>
                                <TableCell align="right">{rental.extra_info}</TableCell>
                                <TableCell align="right">
                                    <IconButton onClick={() => handleRemoveOrder(rental.id)}>
                                        <GridDeleteIcon />
                                    </IconButton>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </Box>
    );
}
