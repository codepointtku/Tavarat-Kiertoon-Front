import { useState } from 'react';
import { Form, useSubmit, useLoaderData, Link,  } from 'react-router-dom';
import type { bikeRentalViewLoader } from '../../Router/loaders';
import { useForm } from 'react-hook-form';

import {
    Table,
    TableBody,
    TableHead,
    TableCell,
    TableRow,
    TextField,
    IconButton,
    Box,
    Collapse,
    Button,
    Stack,
    Container,
    Grid,
    Link as MuiLink,
    Paper,
    Typography,
    Checkbox,
    MenuItem
} from '@mui/material';

export default function BikeRentalView() {
    const rental = useLoaderData() as Awaited<ReturnType<typeof bikeRentalViewLoader>>
    const currentRentalStatus = ['WAITING', 'ACTIVE', 'FINISHED'];

    const submit = useSubmit()
    const onSubmit = (data: any) => {
        console.log('data', data);
        console.log('products', data.bikeStock)
        submit(data, { method: 'put', action: `/pyorat/pyoravarasto/pyoratilaukset/${rental.id}`});
    };

    const { formState, handleSubmit, register, watch, setValue } = useForm({
        defaultValues: {
            startDate: rental?.start_date,
            endDate: rental?.end_date,
            state: rental?.state,
            deliveryAddress: rental?.delivery_address,
            pickup: rental?.pickup,
            contact: rental?.contact_name,
            contactPhoneNumber: rental?.contact_phone_number,
            extraInfo: rental?.extra_info,
            user: rental?.user,
            bikeStock: JSON.stringify(rental?.bike_stock)
        }
    });

    const { errors } = formState;

    const handleStatusChange = (status: string) => {
        setValue('state', status);
    };

    // Parse Date objects from backend data string
    const dateParse = (value: string) => {
        const date = new Date(value);
        const dateString = `${date.getDate()}.${date.getMonth() + 1}.${date.getFullYear()}`;
        return dateString;
    };
    
    return (
        <>
            <Typography variant="h3" align="center" color="primary.main" mb="2rem" width="100%">
                {`Tilaus #${rental.id}`}
            </Typography>
            <Container maxWidth="xl" component={Paper}>
                <Box component={Form} onSubmit={handleSubmit(onSubmit)} id="bike-rental-info" sx={{ margin: '2rem 0 1rem 0'}}>
                    <Table id="bike-rental-state-table">
                        <TableBody>
                            <TableRow>
                                <TableCell align="right" width="50%" sx={{ fontWeight: 'bold', fontSize: '20px' }}>
                                    Tila:
                                </TableCell>
                                <TableCell width="20%">
                                    <TextField
                                        select
                                        label="Muuta tilaa"
                                        {...register('state', {
                                            required: 'Pakollinen tieto puuttuu',
                                        })}
                                        value={watch('state')}
                                        fullWidth
                                        inputProps={{ required: false }}
                                        required
                                        onChange={(event) => handleStatusChange(event.target.value)}
                                    >
                                        {currentRentalStatus?.map((status) => (
                                            <MenuItem key={status} value={status}>
                                                {status}
                                            </MenuItem>
                                        ))}
                                    </TextField>
                                </TableCell>
                                <TableCell width="30%">
                                    <button>Päivitä tila</button>
                                </TableCell>
                            </TableRow>
                        </TableBody>
                    </Table>
                    <Table id="bike-rental-info-table">
                        <TableBody>
                            <TableRow>
                                <TableCell width="20%" sx={{ fontWeight: 'bold' }}>
                                    Alkamispäivä:
                                </TableCell>
                                <TableCell>
                                    {dateParse(rental?.start_date as string)}
                                </TableCell>
                                <TableCell width="20%" sx={{ fontWeight: 'bold' }}>
                                    Päättymispäivä:
                                </TableCell>
                                <TableCell>
                                {dateParse(rental?.end_date as string)}
                                </TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell width="20%" sx={{ fontWeight: 'bold' }}>
                                    Tilaaja:
                                </TableCell>
                                <TableCell width="30%">
                                    {rental.user}
                                </TableCell>
                                <TableCell width="20%" sx={{ fontWeight: 'bold' }}>
                                    Tilausnumero:
                                </TableCell>
                                <TableCell width="30%">
                                    {rental.id}
                                </TableCell>
                            </TableRow>
                        </TableBody>
                    </Table>            
                </Box>
                <div>Tilausnumero: {rental.id}</div>
                <div>Pyörät: {rental.bike_stock}</div>
                <div>Vastaanottaja: {rental.contact_name}</div>
                <div>Vastaanottajan puh.nro.: {rental.contact_phone_number}</div>
                <div>Toimitusosoite: {rental.delivery_address}</div>
                <div>Alkamispäivä: {rental.start_date}</div>
                <div>Loppumispäivä: {rental.end_date}</div>
                <div>Nouto: {rental.pickup ? 'Kyllä' : 'Ei'}</div>
                <div>
                    {currentRentalStatus?.map((status) => (
                        <MenuItem key={status} value={status}>
                            {status}
                        </MenuItem>
                    ))}
                </div>
            </Container>
        </>
    )
}