import React from 'react';
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
} from '@mui/material';
import { useLoaderData } from 'react-router';
import StyledTableCell from '../StyledTableCell';
import { GridDeleteIcon } from '@mui/x-data-grid';
import { useState } from 'react';
import { bikeRentalLoader } from '../../Router/loaders';
import { Form, useSubmit } from 'react-router-dom';
import { useForm } from 'react-hook-form';
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

function getYearAndMonth(dateString: string) {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const day = date.getDate();
    const month = date.getMonth() + 1; // add 1 since getMonth() returns 0-indexed months
    // return `${day}.${month}.${year}`;
    return date.toLocaleDateString('FI-fi');
    // return day.toString() + '.' + month.toString() + '.' + year.toString();
}

export default function BikeRentals() {
    const peruna = useLoaderData() as Awaited<ReturnType<typeof bikeRentalLoader>>; // useLoaderData() returns the data passed to it in the loader function

    console.log('kaka', peruna.results);

    const [data, setData] = useState<Rental[]>(peruna.results);

    const handleRemoveOrder = (id: number) => {
        // Filter the data array to remove the order with the specified id
        const updatedData = data?.filter((rental) => rental.id !== id);
        setData(updatedData);
        console.log('updatedData', updatedData);
    };

    return (
        <Box component={Form} width="100%">
            <Typography variant="h3" align="center" color="primary.main" width="100%">
                Tilaukset{' '}
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
                            <StyledTableCell align="right">Remove</StyledTableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {data?.map((rental) => {
                            return (
                                <TableRow key={rental.id} hover>
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
                            );
                        })}
                    </TableBody>
                </Table>
            </TableContainer>
        </Box>
    );
}
