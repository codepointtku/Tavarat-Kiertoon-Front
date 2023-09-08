import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate, useRouteLoaderData } from 'react-router-dom';
import { useStateMachine } from 'little-state-machine';
import { Typography, TextField, Grid, MenuItem, Box, Button, Stack } from '@mui/material';

import CartButtons from './CartButtons';
import Update from './Update';

import type { shoppingProcessLoader } from '../../../Router/loaders';
import type { SubmitHandler, FieldValues } from 'react-hook-form/dist/types';

import TypographyTitle from '../../TypographyTitle';
import TypographyHeading from '../../TypographyHeading';
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { isWeekend, isPast, parse, format, isValid } from 'date-fns';
import { fi } from 'date-fns/locale';
import Holidays from 'date-holidays';

export interface CartFormData {
    firstName: string;
    lastName: string;
    email: string;
    phoneNumber: string;
    deliveryAddress: string;
    zipcode: string;
    city: string;
    deliveryRequired: string;
    fetchDate?: string | Date;
    orderInfo?: string;
}

export type StateMachineActions = {
    Update: (state: CartFormData | undefined, actions?: CartFormData) => { data: CartFormData };
    ClearInfo: () => {};
};

function ContactsAndDelivery() {
    const user = useRouteLoaderData('shoppingCart') as Awaited<ReturnType<typeof shoppingProcessLoader>>;
    // const [selectedAddress, setSelectedAddress] = useState(
    //     Object.keys(JSON.parse(String(sessionStorage.getItem('__LSM__')))).length !== 0
    //         ? JSON.parse(String(sessionStorage.getItem('__LSM__'))).deliveryAddress
    //         : user.address_list[0]?.address || ''
    // );
    const [selectedMethod, setSelectedMethod] = useState(
        Object.keys(JSON.parse(String(sessionStorage.getItem('__LSM__')))).length !== 0
            ? JSON.parse(String(sessionStorage.getItem('__LSM__'))).deliveryRequired
            : 'true'
    );
    const currentDate = new Date(Date.now());
    const [fetchDate, setFetchDate] = useState(
        Object.keys(JSON.parse(String(sessionStorage.getItem('__LSM__')))).length !== 0
            ? parse(JSON.parse(String(sessionStorage.getItem('__LSM__'))).fetchDate, 'd.M.yyyy', new Date())
            : currentDate
    );
    const maxDate = new Date().setDate(currentDate.getDate() + 64);
    const { actions, state } = useStateMachine({ Update }) as unknown as {
        actions: StateMachineActions;
        state: CartFormData;
    };
    const hd = new Holidays('FI');
    const finnishHolidays = hd.getHolidays();
    // const correctAddress = user.address_list?.filter(
    //     (address: { address: string }) => address.address === selectedAddress
    // );
    const {
        register,
        handleSubmit,
        formState: { errors },
        setValue,
        getValues,
        clearErrors,
    } = useForm({
        mode: 'onTouched',
        defaultValues: {
            firstName: state.firstName ? state.firstName : '',
            lastName: state.lastName ? state.lastName : '',
            email: state.email ? state.email : '',
            phoneNumber: state.phoneNumber ? state.phoneNumber : '',
            // deliveryAddress: state.deliveryAddress ? state.deliveryAddress : correctAddress[0].address,
            deliveryAddress: 'votti',
            // zipcode: state.zipcode ? state.zipcode : correctAddress[0].zip_code,
            zipcode: '12312',
            // city: state.city ? state.city : correctAddress[0].city,
            city: 'pasq',
            // deliveryRequired: state.deliveryRequired ? state.deliveryRequired : 'true',
            deliveryRequired: 'true',
            fetchDate: state.fetchDate ? state.fetchDate : currentDate,
            orderInfo: state.orderInfo ? state.orderInfo : '',
        },
    });

    const navigate = useNavigate();
    const onSubmit = (data: CartFormData) => {
        if (fetchDate.setHours(0, 0, 0, 0) === currentDate.setHours(0, 0, 0, 0) && selectedMethod === 'false') {
            return null;
        }
        actions.Update(data);
        navigate('/ostoskori/vaihe3');
    };

    function handleClick() {
        setValue('firstName', user.first_name);
        setValue('lastName', user.last_name);
        setValue('email', user.email);
        setValue('phoneNumber', user.phone_number as string);
    }

    // useEffect(() => {
    //     setValue('zipcode', correctAddress[0]?.zip_code);
    //     setValue('city', correctAddress[0]?.city);
    // }, [selectedAddress, correctAddress, setValue]);

    function disableDate(date: Date) {
        const dateIsHoliday = finnishHolidays.some((holiday) => String(holiday.start) === String(date));
        const disabledDatesMessages = [
            {
                value: date >= new Date(maxDate),
                message: 'Päivämäärä on yli maksimin.',
            },
            { value: dateIsHoliday, message: 'Juhlapäiviä ei sallita noutopäiviksi.' },
            {
                value: isPast(date),
                message: 'Menneitä päiviä ei sallita noutopäiviksi.',
            },
            { value: isWeekend(date), message: 'Viikonloppuja ei sallita noutopäiviksi.' },
            { value: isValid(date), message: 'Noutoajat ma-pe 9-16' },
        ];

        const errorFound = disabledDatesMessages.find((dateErrObj) => dateErrObj.value) as {
            value: boolean;
            message: string;
        };

        errorFound && sessionStorage.setItem('dateErrorObj', JSON.stringify(errorFound));

        return (
            disabledDatesMessages[0].value ||
            disabledDatesMessages[1].value ||
            disabledDatesMessages[2].value ||
            disabledDatesMessages[3].value
        );
    }

    function handleDateChange(value: Date) {
        sessionStorage.setItem(
            'dateErrorObj',
            JSON.stringify({ value: isValid(value), message: 'Noutoajat ma-pe 9-16' })
        );
        clearErrors('fetchDate');
        const date = isValid(value) && format(value, 'd.M.yyyy');
        date && setValue('fetchDate', date);
        setFetchDate(value);
    }

    const dateErrorObj = JSON.parse(sessionStorage.getItem('dateErrorObj') as string);

    return (
        <form onSubmit={handleSubmit(onSubmit as SubmitHandler<FieldValues> & CartFormData)}>
            <Box
                sx={{
                    p: '2rem',
                    mt: '-2rem',
                    mb: '2rem',
                    border: '1px solid #bfe6f6',
                    borderRadius: '1rem',
                    display: 'flex',
                    justifyContent: 'center',
                }}
            >
                <Stack>
                    <TypographyTitle text="Tilaajan yhteystiedot" />
                    <Grid container direction="row" gap={2} sx={{ mt: '1rem' }}>
                        <Stack direction="row" gap={1}>
                            <Typography variant="h6">Etunimi:</Typography>
                            <Typography sx={{ display: 'flex', alignSelf: 'center' }}>{user.first_name}</Typography>
                        </Stack>
                        <Stack direction="row" gap={1}>
                            <Typography variant="h6">Sukunimi:</Typography>
                            <Typography sx={{ display: 'flex', alignSelf: 'center' }}> {user.last_name}</Typography>
                        </Stack>
                        <Stack direction="row" gap={1}>
                            <Typography variant="h6">Sähköposti: </Typography>
                            <Typography sx={{ display: 'flex', alignSelf: 'center' }}>{user.email}</Typography>
                        </Stack>
                        <Stack direction="row" gap={1}>
                            <Typography variant="h6">Puh. numero: </Typography>
                            <Typography sx={{ display: 'flex', alignSelf: 'center' }}>{user.phone_number}</Typography>
                        </Stack>
                    </Grid>
                </Stack>
            </Box>

            <Box
                sx={{
                    p: '2rem',
                    mb: '2rem',
                    border: '1px solid #bfe6f6',
                    borderRadius: '1rem',
                }}
            >
                <TypographyTitle text="Vastaanottajan yhteystiedot" />
                <Grid container margin="2rem 0 2rem 0">
                    <Grid item xs={4}>
                        <TypographyHeading text="Vastaanottaja sama kuin tilaaja?" />
                    </Grid>
                    <Grid item xs={4} sx={{ display: 'flex', justifyContent: 'center' }}>
                        <Button onClick={() => handleClick()}>Täytä tiedot samoina</Button>
                    </Grid>
                    <Grid item xs={4} />
                </Grid>

                <Grid id="receiver-input-fields-grid-container" container spacing={2} mb="2rem">
                    {/* <Grid item>
                        <TextField
                            label="Etunimi"
                            placeholder="Etunimi"
                            variant="outlined"
                            InputLabelProps={{ shrink: true }}
                            {...register('firstName', {
                                required: 'Tämä kenttä on täytettävä',
                                maxLength: { value: 255, message: 'Sisältö on liian pitkä' },
                            })}
                            error={!!errors.firstName}
                            helperText={errors.firstName?.message?.toString() || ' '}
                            inputProps={{ required: false }}
                            required
                        />
                    </Grid>
                    <Grid item>
                        <TextField
                            label="Sukunimi"
                            placeholder="Sukunimi"
                            variant="outlined"
                            InputLabelProps={{ shrink: true }}
                            {...register('lastName', {
                                required: 'Tämä kenttä on täytettävä',
                                maxLength: { value: 255, message: 'Sisältö on liian pitkä' },
                            })}
                            error={!!errors.lastName}
                            helperText={errors.lastName?.message?.toString() || ' '}
                            inputProps={{ required: false }}
                            required
                        />
                    </Grid> */}
                    <Grid item>
                        <TextField
                            label="Vastaanottaja"
                            placeholder="Vastaanottajan nimi"
                            variant="outlined"
                            InputLabelProps={{ shrink: true }}
                            {...register('email', {
                                maxLength: { value: 50, message: 'Sisältö on liian pitkä' },
                            })}
                            error={!!errors.email}
                            helperText={errors.email?.message?.toString() || ' '}
                            required
                        />
                    </Grid>
                    <Grid item>
                        <TextField
                            label="Vastaanottajan puhelinnumero"
                            placeholder="Puhelinnumero"
                            variant="outlined"
                            InputLabelProps={{ shrink: true }}
                            {...register('phoneNumber', {
                                required: 'Tämä kenttä on täytettävä',
                                pattern: { value: /^[0-9]+$/, message: 'Sisällön täytyy koostua vain numeroista' },
                                maxLength: { value: 11, message: 'Numerosarja on liian pitkä' },
                            })}
                            error={!!errors.phoneNumber}
                            helperText={errors.phoneNumber?.message?.toString() || ' '}
                            inputProps={{ required: false }}
                            required
                        />
                    </Grid>
                </Grid>

                {/* //// */}

                <TypographyHeading text="Toimitusosoitetiedot" />
                <Grid id="delivery-fields-grid-container" container margin="2rem 0 1rem 0">
                    <Grid item mr="1rem">
                        <TextField
                            label="Toimitusosoite"
                            variant="outlined"
                            // value={selectedAddress}
                            {...register('deliveryAddress', {
                                required: 'Tämä kenttä on täytettävä',
                                maxLength: { value: 50, message: 'Sisältö on liian pitkä' },
                            })}
                            // onChange={(SelectChangeEvent) => {
                            //     setSelectedAddress(SelectChangeEvent.target.value);
                            // }}
                            inputProps={{ required: false }}
                            error={!!errors.deliveryAddress}
                            helperText={errors.deliveryAddress?.message?.toString() || ' '}
                            fullWidth
                            // select
                            required
                        />
                        {/* {user.address_list?.map((a: { address: string; id: number }) => (
                                <MenuItem value={a.address} key={a.id}>
                                    {a.address}
                                </MenuItem>
                            ))} */}
                        {/* </TextField> */}
                    </Grid>
                    {/* {selectedAddress && ( */}
                    {/* // <> */}
                    <Grid item mr="1rem">
                        <TextField
                            label="Postinumero"
                            variant="outlined"
                            // value={correctAddress[0]?.zip_code}
                            {...register('zipcode')}
                            // sx={{ opacity: 0.7 }}
                            // disabled
                        />
                    </Grid>
                    <Grid item mr="1rem">
                        <TextField
                            label="Kaupunki"
                            variant="outlined"
                            // value={correctAddress[0]?.city}
                            {...register('city')}
                            // sx={{ opacity: 0.7 }}
                            // disabled
                        />
                    </Grid>
                    {/* </> */}
                    {/* // )} */}
                    <Grid item xs={2} mr="1rem">
                        <TextField
                            {...register('deliveryRequired')}
                            label="Toimitustapa"
                            variant="outlined"
                            value={selectedMethod}
                            onChange={(SelectChangeEvent) => {
                                setSelectedMethod(SelectChangeEvent.target.value);
                            }}
                            fullWidth
                            select
                            error={!!errors.deliveryRequired}
                            helperText={errors.deliveryRequired?.message?.toString() || ' '}
                            inputProps={{ required: false }}
                            required
                        >
                            <MenuItem value="true">Kuljetus</MenuItem>
                            <MenuItem value="false">Nouto</MenuItem>
                        </TextField>
                    </Grid>
                    {selectedMethod === 'false' && (
                        <Grid item>
                            <LocalizationProvider adapterLocale={fi} dateAdapter={AdapterDateFns}>
                                <DatePicker
                                    label="Noutoaika"
                                    value={fetchDate}
                                    onChange={(value) => handleDateChange(value as Date)}
                                    renderInput={(props) => (
                                        <TextField
                                            {...props}
                                            {...register('fetchDate', {
                                                required: 'Noutoa ei voi valita tilauspäiväksi.',
                                                validate: (dateString) => {
                                                    const date = parse(String(dateString), 'd.M.yyyy', new Date());
                                                    return !disableDate(date);
                                                },
                                                pattern: {
                                                    value: /^([1-9]|0[1-9]|[12][0-9]|3[01])[-.]([1-9]|0[1-9]|1[012])[-.](19|20)\d\d$/,
                                                    message: 'Sisällön täytyy olla muotoa p.k.vvvv',
                                                },
                                            })}
                                            autoFocus
                                            error={
                                                (dateErrorObj?.message !== 'Noutoajat ma-pe 9-16' ||
                                                    errors.fetchDate?.type === 'required' ||
                                                    errors.fetchDate?.type === 'pattern') &&
                                                !!errors.fetchDate
                                            }
                                            helperText={
                                                errors.fetchDate?.message?.toString() ||
                                                dateErrorObj?.message ||
                                                'Noutoajat ma-pe 9-16'
                                            }
                                        />
                                    )}
                                    shouldDisableDate={disableDate}
                                    maxDate={new Date(maxDate)}
                                    PaperProps={{
                                        sx: {
                                            '& .MuiPickersDay-root': {
                                                '&.Mui-disabled': {
                                                    opacity: 0.5,
                                                },
                                            },
                                        },
                                    }}
                                    disablePast
                                    disableMaskedInput
                                />
                            </LocalizationProvider>
                        </Grid>
                    )}
                </Grid>
            </Box>
            {/* ////// */}
            <TypographyTitle text="Lisätietoja / Viesti" />

            <TextField
                {...register('orderInfo', {
                    maxLength: { value: 500, message: 'Maksimi merkkimäärä on rajattu 500 merkkiin' },
                })}
                error={!!errors.orderInfo}
                helperText={errors.orderInfo?.message?.toString() || ' '}
                placeholder="Lisätietoa toimituksesta..."
                fullWidth
                multiline
                rows={5}
                sx={{ marginTop: '2rem' }}
            />
            <Box
                sx={{
                    p: 5,
                    fontWeight: 'bold',
                    fontSize: '22px',
                    marginTop: 5,
                    borderStyle: 'solid',
                    borderWidth: 5,
                    borderColor: 'secondary.dark',
                }}
            >
                Toimituksessa kestää keskimäärin 1-2 viikkoa.
            </Box>

            <CartButtons backText="Takaisin" forwardText="Seuraava" actions={actions} formData={getValues()} />
        </form>
    );
}

export default ContactsAndDelivery;
