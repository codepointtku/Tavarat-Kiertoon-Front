import { useState } from 'react';
import { Form, useSubmit, useLoaderData, useActionData, Link } from 'react-router-dom';

import { useForm } from 'react-hook-form';

import {
    Accordion,
    AccordionSummary,
    AccordionDetails,
    Divider,
    Table,
    TableBody,
    TableHead,
    TableCell,
    TableRow,
    TextField,
    Box,
    Button,
    Container,
    Grid,
    Paper,
    Typography,
    MenuItem,
    Stack,
    IconButton,
} from '@mui/material';

import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

import AddBoxIcon from '@mui/icons-material/AddBox';
import AlertBox from '../AlertBox';

import DeleteBikeRentalModal from './DeleteBikeRentalModal';
import type { bikeRentalViewLoader } from '../../Router/loaders';
import type { bikeOrderEditAction } from '../../Router/actions';
import type { BikeStockDetail } from '../../api';
import IndeterminateCheckBoxIcon from '@mui/icons-material/IndeterminateCheckBox';
import UpdateBikeRentalModal from './UpdateBikeRentalModal';

export default function BikeRentalView() {
    const rental = useLoaderData() as Awaited<ReturnType<typeof bikeRentalViewLoader>>;
    const response = useActionData() as Awaited<ReturnType<typeof bikeOrderEditAction>>;
    const currentRentalStatus = ['WAITING', 'ACTIVE', 'FINISHED'];

    const [renderDeleteBikeRentalModal, setRenderDeleteBikeRentalModal] = useState(false);
    const [renderUpdateBikeRentalModal, setRenderUpdateBikeRentalModal] = useState(false);
    const [rentalBikeStock, setRentalBikeStock] = useState(rental.bike_stock.map((item) => item.id));
    const submit = useSubmit();
    const onSubmit = (data: any) => {
        data['bikeStock'] = JSON.stringify(rentalBikeStock);
        console.log(rentalBikeStock.length);

        if (rentalBikeStock.length == 0) setRenderDeleteBikeRentalModal(true);
        //submit(null, { method: 'delete', action: `/pyorat/pyoravarasto/pyoratilaukset/${rental.id}/poista` });
        else submit(data, { method: 'put', action: `/pyorat/pyoravarasto/pyoratilaukset/${rental.id}` });
        setRenderUpdateBikeRentalModal(false);
    };

    const { handleSubmit, register, watch } = useForm({
        defaultValues: {
            startDate: rental?.start_date,
            endDate: rental?.end_date,
            state: rental?.state,
            deliveryAddress: rental?.delivery_address,
            contact: rental?.contact_name,
            contactPhoneNumber: rental?.contact_phone_number,
            extraInfo: rental?.extra_info,
            user: rental?.user?.id,
            bikeStock: JSON.stringify(rentalBikeStock),
        },
    });

    const bikeModels = rental?.bike_stock.map((item) => item.bike.id);

    const bikeModelData: (BikeStockDetail | undefined)[] = bikeModels
        .filter((item, index) => bikeModels.indexOf(item) === index)
        .map((bikeId: number) => rental?.bike_stock.find((item) => item.bike.id === bikeId));

    const [newBikeModels, setNewBikeModels] = useState(
        Object.fromEntries(
            bikeModels
                .filter((item, index) => bikeModels.indexOf(item) === index)
                .map((bikeId: number) => [bikeId, rental?.bike_stock.filter((item) => item.bike.id === bikeId)])
        )
    );
    const [newBikeModels2, setNewBikeModels2] = useState(
        Object.fromEntries(
            bikeModels
                .filter((item, index) => bikeModels.indexOf(item) === index)
                .map((bikeId: number) => [bikeId, rental?.bike_stock.filter((item) => item.bike.id === bikeId)])
        )
    );

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

    const modifyBikeStockAmounts = (index: number | undefined, min: number, max: number, id: number) => {
        const regex = /^[0-9\b]+$/;
        const newValue = [...rentalBikeStock];
        console.log('jippiiiii', index);
        console.log(rental?.bike_stock.filter((bikeItem) => bikeItem.bike.id === index));

        console.log('jepjep');
        rental?.bike_stock
            .filter((bikeItem) => bikeItem.bike.id === id)
            .some((item) => {
                console.log('haaaaaa', newValue, item.id);
                if (newValue.indexOf(item.id) < 0) {
                    console.log('waaaa', newValue, item.id);
                    newValue.push(item.id);
                    for (const i in newBikeModels2) {
                        console.log(newBikeModels2[i], item.id);
                        console.log(
                            'daaa',
                            newBikeModels2[i].filter((bikeItem) => bikeItem.id === item.id)
                        );
                        newBikeModels[id].push(newBikeModels2[id].filter((bikeItem) => bikeItem.id === item.id)[0]);
                        return true;
                    }
                    return true;
                }
            });

        console.log(newValue);
        console.log('uusi', newBikeModels);

        setNewBikeModels(newBikeModels);
        setRentalBikeStock(newValue);
    };

    const modifyBikeStockAmounts2 = (index: number, min: number, max: number) => {
        if (newBikeModels[index].length > 0) {
            console.log(newBikeModels[index]);
            const regex = /^[0-9\b]+$/;
            console.log(newBikeModels2);
            console.log(newBikeModels);
            let newValue = [...rentalBikeStock];
            const ID = newBikeModels[index].pop().id;

            newValue = newValue.filter((item) => item !== ID);

            setNewBikeModels(newBikeModels);
            setRentalBikeStock(newValue);
        }
    };
    return (
        <>
            {response?.status === 200 && (
                <AlertBox text="Tila päivitetty" status="success" timer={3000} response={response} />
            )}
            <Grid id="rental-header" sx={{ display: 'flex', alignItems: 'center', margin: '0 0 1rem 0' }} container>
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
                <Box
                    component={Form}
                    onSubmit={handleSubmit(onSubmit)}
                    id="bike-rental-info"
                    sx={{ margin: '1rem 0 1rem 0' }}
                >
                    <Table id="bike-rental-state-table">
                        <TableBody>
                            <TableRow sx={{ borderBottom: 1, borderColor: 'grey.300' }}>
                                <TableCell width="20%">
                                    <Accordion>
                                        <AccordionSummary
                                            aria-controls="panel1d-content"
                                            id="panel1d-header"
                                            expandIcon={<ExpandMoreIcon />}
                                        >
                                            <Typography>Tilaajan tiedot</Typography>
                                        </AccordionSummary>
                                        <Divider />
                                        <AccordionDetails>
                                            <Typography>Tunnistenumero: {rental.user.id}</Typography>
                                            <Typography>
                                                Nimi: {rental.user.first_name} {rental.user.last_name}
                                            </Typography>
                                            <Typography>Puhelinnumero: {rental.user.phone_number}</Typography>
                                            <Typography>Sähköposti: {rental.user.email}</Typography>
                                        </AccordionDetails>
                                    </Accordion>
                                </TableCell>
                                <TableCell align="right" width="10%" sx={{ fontWeight: 'bold', fontSize: '20px' }}>
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
                                    >
                                        {currentRentalStatus?.map((status) => (
                                            <MenuItem key={status} value={status}>
                                                {statusTranslate(status)}
                                            </MenuItem>
                                        ))}
                                    </TextField>
                                </TableCell>
                                <TableCell width="10%">
                                    <Button id="submit-button" onClick={() => setRenderUpdateBikeRentalModal(true)}>
                                        Päivitä tilaus
                                    </Button>
                                </TableCell>
                                <TableCell width="10%">
                                    <Button
                                        color="info"
                                        onClick={window.print}
                                        sx={{
                                            '&:hover': {
                                                backgroundColor: 'success.dark',
                                            },
                                        }}
                                    >
                                        {'Tulosta'}
                                    </Button>
                                </TableCell>
                                <TableCell align="right">
                                    <Button
                                        id="delete-button"
                                        type="button"
                                        color="error"
                                        onClick={() => setRenderDeleteBikeRentalModal(true)}
                                    >
                                        Poista tilaus
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
                                <TableCell width="30%">{dateParse(rental?.start_date as string)}</TableCell>
                                <TableCell width="20%" sx={{ fontWeight: 'bold' }}>
                                    Päättymispäivä:
                                </TableCell>
                                <TableCell width="30%">{dateParse(rental?.end_date as string)}</TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell sx={{ fontWeight: 'bold' }}>Vastaanottaja:</TableCell>
                                <TableCell>{rental.contact_name}</TableCell>
                                <TableCell sx={{ fontWeight: 'bold' }}>Peräkärry:</TableCell>
                                <TableCell>
                                    {rental.bike_trailer ? rental.bike_trailer.register_number : 'Ei'}
                                </TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell sx={{ fontWeight: 'bold' }}>Vastaanottajan puhelinnumero:</TableCell>
                                <TableCell>{rental.contact_phone_number}</TableCell>
                                <TableCell sx={{ fontWeight: 'bold' }}>Toimitusosoite:</TableCell>
                                <TableCell>{rental.delivery_address}</TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell sx={{ fontWeight: 'bold' }}>Lisätiedot:</TableCell>
                                <TableCell colSpan={3} sx={{ wordBreak: 'break-all', whiteSpace: 'pre-wrap' }}>
                                    {rental.extra_info}
                                </TableCell>
                            </TableRow>
                        </TableBody>
                    </Table>
                </Box>
                <DeleteBikeRentalModal
                    renderModal={renderDeleteBikeRentalModal}
                    setRenderModal={setRenderDeleteBikeRentalModal}
                    rentalId={rental.id}
                />
                <UpdateBikeRentalModal
                    renderModal={renderUpdateBikeRentalModal}
                    setRenderModal={setRenderUpdateBikeRentalModal}
                    rentalId={rental.id}
                    rentalBikeStock={rentalBikeStock}
                    setRenderDeleteBikeRentalModal={setRenderDeleteBikeRentalModal}
                    rental={rental}
                    handleSubmit={handleSubmit}
                    onSubmit={onSubmit}
                />
                <Box sx={{ margin: '0 0 1rem 0' }}>
                    <Table id="bike-rental-bikes-table">
                        <TableHead sx={{ borderBottom: 2, borderBottomColor: 'grey.300' }}>
                            <TableRow sx={{ fontWeight: 'bold', fontSize: '16px', backgroundColor: 'primary.main' }}>
                                <TableCell
                                    sx={{ fontWeight: 'bold', fontSize: '16px', color: 'common.white' }}
                                    align="center"
                                >
                                    Pyörämalli
                                </TableCell>
                                <TableCell
                                    sx={{ fontWeight: 'bold', fontSize: '16px', color: 'common.white' }}
                                    align="center"
                                >
                                    Määrä
                                </TableCell>
                                <TableCell
                                    sx={{ fontWeight: 'bold', fontSize: '16px', color: 'common.white' }}
                                    align="center"
                                >
                                    Pyörien tiedot
                                </TableCell>
                            </TableRow>
                        </TableHead>
                        {bikeModelData && (
                            <TableBody id="bike-rental-bikes-content" sx={{ backgroundColor: 'grey.100' }}>
                                {bikeModelData.map((item, index) => (
                                    <TableRow key={item?.bike.id}>
                                        <TableCell
                                            align="center"
                                            width="20%"
                                            sx={{ borderBottom: 0, fontWeight: 'bold', fontSize: '16px' }}
                                        >
                                            <img
                                                src={`${window.location.protocol}//${window.location.hostname}:8000/media/${item?.bike.picture.picture_address}`}
                                                alt="bike-model"
                                            />
                                            <Typography textAlign="center">{item?.bike.name}</Typography>
                                        </TableCell>
                                        <TableCell
                                            width="10%"
                                            sx={{ textAlign: 'center', borderBottom: 0, fontSize: '16px' }}
                                        >
                                            <Stack justifyContent="center" alignItems="center" direction="row">
                                                <IconButton
                                                    size="large"
                                                    color="primary"
                                                    onClick={(event) => {
                                                        const newAmounts = [...rentalBikeStock];
                                                        modifyBikeStockAmounts2(
                                                            item.bike.id,
                                                            0,
                                                            newBikeModels[item.bike.id].length - 1
                                                        );
                                                    }}
                                                    sx={{ m: 0, p: 0 }}
                                                >
                                                    <IndeterminateCheckBoxIcon
                                                        sx={{ fontSize: '2.5rem', m: 0, p: 0 }}
                                                    />
                                                </IconButton>
                                                <TextField
                                                    size="small"
                                                    value={newBikeModels[item.bike.id].length}
                                                    InputProps={{ inputProps: { style: { textAlign: 'center' } } }}
                                                    sx={{ width: '4rem', m: 0, p: 0 }}
                                                />
                                                <IconButton
                                                    size="large"
                                                    color="primary"
                                                    onClick={(event) => {
                                                        const newAmounts = [...rentalBikeStock];
                                                        modifyBikeStockAmounts(
                                                            index,
                                                            0,
                                                            newBikeModels2[item.bike.id].length,
                                                            item.bike.id
                                                        );
                                                    }}
                                                    sx={{ m: 0, p: 0 }}
                                                    disabled={
                                                        newBikeModels[item.bike.id].length >=
                                                        rental?.bike_stock.filter(
                                                            (bikeItem) => bikeItem.bike.id === item?.bike.id
                                                        ).length
                                                    }
                                                >
                                                    <AddBoxIcon sx={{ fontSize: '2.5rem', m: 0, p: 0 }} />
                                                </IconButton>
                                            </Stack>
                                            {'x '}{' '}
                                            {
                                                rental?.bike_stock.filter(
                                                    (bikeItem) => bikeItem.bike.id === item?.bike.id
                                                ).length
                                            }
                                        </TableCell>
                                        <TableCell sx={{ borderBottom: 0 }}>
                                            <Table>
                                                <TableHead>
                                                    <TableRow sx={{ borderBottom: 2, borderBottomColor: 'grey.500' }}>
                                                        <TableCell width="50%" sx={{ fontWeight: 'bold' }}>
                                                            Pyörän numero
                                                        </TableCell>
                                                        <TableCell
                                                            align="right"
                                                            sx={{ fontWeight: 'bold', fontSize: '14px' }}
                                                        >
                                                            Pyörän väri
                                                        </TableCell>
                                                    </TableRow>
                                                </TableHead>
                                                <TableBody>
                                                    {rental?.bike_stock
                                                        .filter((bikeItem) => bikeItem.bike.id === item?.bike.id)
                                                        .map((filteredItem) => (
                                                            <TableRow key={filteredItem.id}>
                                                                <TableCell sx={{ borderLeftColor: 'grey.300' }}>
                                                                    {filteredItem.number}
                                                                </TableCell>
                                                                <TableCell align="right">
                                                                    {filteredItem.color.name}
                                                                </TableCell>
                                                            </TableRow>
                                                        ))}
                                                </TableBody>
                                            </Table>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        )}
                    </Table>
                </Box>
            </Container>
        </>
    );
}
