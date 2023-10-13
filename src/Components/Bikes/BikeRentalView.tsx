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
            <Grid
                id="rental-header"
                sx={{ display: 'flex', alignItems: 'center', margin: "0 0 1rem 0" }}
                container
            >
                <Grid item xs={3}>
                    <Button
                        id="back-button"
                        size="medium"
                        variant="outlined"
                        component={Link}
                        to="/pyorat/pyoravarasto/pyoratilaukset/"
                    >
                        Takaisin
                    </Button>
                </Grid>
                <Grid item xs={6}>
                    <Typography variant="h3" align="center" color="primary.main">
                        {`Tilaus #${rental.id}`}
                    </Typography>
                </Grid>
            </Grid>
            <Container maxWidth="xl" component={Paper}>
                <Box component={Form} onSubmit={handleSubmit(onSubmit)} id="bike-rental-info" sx={{ margin: '0 0 1rem 0'}}>
                    <Table id="bike-rental-state-table">
                        <TableBody>
                            <TableRow>
                                <TableCell align="right" width="30%" sx={{ fontWeight: 'bold', fontSize: '20px' }}>
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
                                    <Button 
                                        id="submit-button"
                                        type="submit"
                                    >
                                        Päivitä tila
                                    </Button>
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
                                <TableCell width="30%">
                                    {dateParse(rental?.start_date as string)}
                                </TableCell>
                                <TableCell width="20%" sx={{ fontWeight: 'bold' }}>
                                    Päättymispäivä:
                                </TableCell>
                                <TableCell width="30%">
                                {dateParse(rental?.end_date as string)}
                                </TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell sx={{ fontWeight: 'bold' }}>
                                    Tilaaja:
                                </TableCell>
                                <TableCell colSpan={3}>
                                    {rental.user}
                                </TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell sx={{ fontWeight: 'bold' }}>
                                    Vastaanottaja:
                                </TableCell>
                                <TableCell>
                                    {rental.contact_name}
                                </TableCell>
                                <TableCell sx={{ fontWeight: 'bold' }}>
                                    Nouto:
                                </TableCell>
                                <TableCell>
                                    {rental.pickup ? 'Kyllä' : 'Ei'}
                                </TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell sx={{ fontWeight: 'bold' }}>
                                    Vastaanottajan puhelinnumero:
                                </TableCell>
                                <TableCell>
                                    {rental.contact_phone_number}
                                </TableCell>
                                <TableCell sx={{ fontWeight: 'bold' }}>
                                    Toimitusosoite:
                                </TableCell>
                                <TableCell>
                                    {rental.delivery_address}
                                </TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell sx={{ fontWeight: 'bold' }}>
                                    Lisätiedot:
                                </TableCell>
                                <TableCell colSpan={3}>
                                    {rental.extra_info}
                                </TableCell>
                            </TableRow>    
                        </TableBody>
                    </Table>            
                </Box>
            </Container>
        </>
    )
}