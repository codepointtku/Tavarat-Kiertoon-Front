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
import { Form, useSubmit, useNavigate } from 'react-router-dom';
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
    return date.toLocaleDateString('FI-fi');
}

export default function BikeRentals() {
    const currentRentalStatus = ['ACTIVE', 'FINISHED', 'WAITING'];

    const dataRental = useLoaderData() as Awaited<ReturnType<typeof bikeRentalLoader>>;
    const dataRentalCopy = useLoaderData() as Awaited<ReturnType<typeof bikeRentalLoader>>;
    const navigate = useNavigate()
    const submit = useSubmit();
    const onSubmit = (data: any) => {
        console.log('data', data);
        submit(data, { method: 'put', action: '/pyorat/pyoravarasto/pyoratilaukset/' });
    };

    // const [data, setData] = useState<Rental[]>(dataRental.results);
    const [data, setData] = useState(dataRental.results);
    const { formState, handleSubmit, register, watch, setValue } = useForm({
        defaultValues: { bikeRentalState: dataRental.results[0]?.state },
    });
    const { errors } = formState;

    const handleRemoveOrder = (id: number) => {
        const updatedData = data?.filter((rental) => rental.id !== id);
        setData(updatedData);
        submit({ id: String(id) }, { method: 'delete', action: '/pyorat/pyoravarasto/pyoratilaukset/' });
    };

    const handleStatusChange = (id: number, status: string) => {
        setValue(`bikeRentalState${id}`, status);
    };

    if(dataRental.results?.length === 0) {
        return <Typography variant="h6" margin="auto">ei tilauksia</Typography>
    }

    return (
        <Box component={Form} onSubmit={handleSubmit(onSubmit)} width="100%">
            <Typography variant="h3" align="center" color="primary.main" width="100%">
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
                                <TableCell align="right">
                                    <TextField
                                        select
                                        label="Valitse pyörän tila"
                                        {...register(`bikeRentalState${rental.id}`, {
                                            required: 'Pakollinen tieto puuttuu',
                                        })}
                                        value={watch(`bikeRentalState${rental.id}`, rental.state)}
                                        fullWidth
                                        inputProps={{ required: false }}
                                        required
                                        color={errors[`bikeRentalState${rental.id}`] ? 'error' : 'primary'}
                                        error={!!errors[`bikeRentalState${rental.id}`]}
                                        helperText={errors[`bikeRentalState${rental.id}`]?.message || ' '}
                                        sx={{ marginBottom: '-1rem' }}
                                        onChange={(event) => handleStatusChange(rental.id, event.target.value)}
                                    >
                                        {currentRentalStatus?.map((status) => (
                                            <MenuItem key={status} value={status}>
                                                {status}
                                            </MenuItem>
                                        ))}
                                    </TextField>
                                </TableCell>
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
