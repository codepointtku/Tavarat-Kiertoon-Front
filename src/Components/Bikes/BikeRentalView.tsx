import { useState } from 'react';
import { Form, useSubmit, useLoaderData, useActionData, Link } from 'react-router-dom';

import { useForm } from 'react-hook-form';

import {
    Table,
    TableBody,
    TableHead,
    TableCell,
    TableRow,
    TextField,
    Box,
    Collapse,
    Button,
    Stack,
    Container,
    Grid,
    Paper,
    Typography,
    Checkbox,
    MenuItem,
} from '@mui/material';

import AlertBox from '../AlertBox';

import DeleteBikeRentalModal from './DeleteBikeRentalModal';
import type { bikeRentalViewLoader } from '../../Router/loaders';
import type { bikeOrderEditAction } from '../../Router/actions';
import type { BikeRentalEnum } from '../../api';

export default function BikeRentalView() {
    const rental = useLoaderData() as Awaited<ReturnType<typeof bikeRentalViewLoader>>
    const response = useActionData() as Awaited<ReturnType<typeof bikeOrderEditAction>>;
    const currentRentalStatus = ['WAITING', 'ACTIVE', 'FINISHED'];

    const [renderDeleteBikeRentalModal, setRenderDeleteBikeRentalModal] = useState(false);

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

    const handleStatusChange = (status: BikeRentalEnum) => {
        setValue('state', status);
    };

    // const handleRemoveOrder = (id: number) => {
    //     // const updatedData = data?.filter((rental) => rental.id !== id);
    //     // setData(updatedData);
    //     submit({ id: String(id) }, { method: 'delete', action: `/pyorat/pyoravarasto/pyoratilaukset/${rental.id}/poista` });
    // };

    // Parse Date objects from backend data string
    const dateParse = (value: string) => {
        const date = new Date(value);
        const dateString = `${date.getDate()}.${date.getMonth() + 1}.${date.getFullYear()}`;
        return dateString;
    };
    
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
    console.log("ASDASD", response)

    return (
        <>  
            { response?.status === 200 && (
                <AlertBox text="Tila päivitetty" status="success" timer={3000} />
            )}
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
                                                {statusTranslate(status)}
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
                    <Grid
                        id="delete-grid"
                        sx={{ margin: "1rem 0 1rem 0" }}
                        container
                        justifyContent="flex-end"
                    >
                        <Button
                            id="delete-button"
                            type="button"
                            color="error"
                            onClick={() => setRenderDeleteBikeRentalModal(true)}
                        >
                            Poista tilaus
                        </Button>
                    </Grid>
                </Box>
                <DeleteBikeRentalModal
                    renderModal={renderDeleteBikeRentalModal}
                    setRenderModal={setRenderDeleteBikeRentalModal}
                    rentalId={rental.id}
                />
            </Container>
        </>
    )
}