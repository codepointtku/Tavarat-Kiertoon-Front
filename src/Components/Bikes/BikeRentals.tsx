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
import { useNavigate, useSearchParams } from 'react-router-dom';
import Pagination from '../Pagination';

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

    const { results, count } = useLoaderData() as Awaited<ReturnType<typeof bikeRentalLoader>>;
    const navigate = useNavigate()

    console.log(results)

    const statusTranslate = (value: string) => {
        if (value === 'WAITING') {
            return 'Odottaa';
        }
        if (value === 'ACTIVE') {
            return 'Aktiivinen';
        }
        if (value === 'FINISHED') {
            return 'Päättynyt';
        }
    };

    if(results?.length === 0) {
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
                            <StyledTableCell align="right">Alkaa</StyledTableCell>
                            <StyledTableCell align="right">Päättyy</StyledTableCell>
                            <StyledTableCell align="right">Tila</StyledTableCell>
                            <StyledTableCell align="right">Toimitusosoite</StyledTableCell>
                            <StyledTableCell align="right">Nouto</StyledTableCell>
                            <StyledTableCell align="right">Tilaaja</StyledTableCell>
                            <StyledTableCell align="right">Puh</StyledTableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {results?.map((rental) => (
                            <TableRow
                                key={rental.id}
                                style={{ cursor: 'pointer' }}
                                hover
                                onClick={() => navigate(`/pyorat/pyoravarasto/pyoratilaukset/${rental.id}`)}
                            >
                                <TableCell align="right">{getYearAndMonth(rental.start_date)}</TableCell>
                                <TableCell align="right">{getYearAndMonth(rental.end_date)}</TableCell>
                                <TableCell align="right">{statusTranslate(rental.state)}</TableCell>
                                <TableCell align="right">{rental.delivery_address}</TableCell>
                                <TableCell align="right">{rental.pickup ? 'Kyllä' : 'Ei'}</TableCell>
                                <TableCell align="right">{rental.contact_name}</TableCell>
                                <TableCell align="right">{rental.contact_phone_number}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
            <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                <Pagination count={count} itemsText="Tilauksia" />
            </Box>
        </Box>
        
    );
}
