import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate, useRouteLoaderData } from 'react-router-dom';
import { useStateMachine } from 'little-state-machine';

import { Typography, TextField, MenuItem, Box, Button, Stack, Card, CardActionArea } from '@mui/material';

import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';
import MailOutlineIcon from '@mui/icons-material/MailOutline';
import PhoneIcon from '@mui/icons-material/Phone';

import CartButtons from './CartButtons';
import Update from './Update';

import TypographyTitle from '../../TypographyTitle';
import TypographyHeading from '../../TypographyHeading';

import type { shoppingProcessLoader } from '../../../Router/loaders';
import type { SubmitHandler, FieldValues } from 'react-hook-form/dist/types';

import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { isWeekend, isPast, parse, format, isValid } from 'date-fns';
import { fi } from 'date-fns/locale';
import Holidays from 'date-holidays';
import Toaster from '../../Toaster';

export interface CartFormData {
    recipient: string;
    recipient_phone_number: string;
    deliveryAddress: string;
    zip_code: string;
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

    const { actions, state } = useStateMachine({ Update }) as unknown as {
        actions: StateMachineActions;
        state: CartFormData;
    };

    const currentDate = new Date(Date.now());
    const maxDate = new Date().setDate(currentDate.getDate() + 64);
    const hd = new Holidays('FI');
    const holidaysCurrentYear = hd.getHolidays();
    const holidaysNextYear = hd.getHolidays(new Date().getFullYear() + 1);

    function disableDate(date: Date) {
        const dateIsHoliday =
            holidaysCurrentYear.some((holiday) => String(holiday.start) === String(date)) ||
            holidaysNextYear.some((holiday) => String(holiday.start) === String(date));
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
            { value: isValid(date), message: 'Noutoajat ma-pe 9-15' },
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
            JSON.stringify({ value: isValid(value), message: 'Noutoajat ma-pe 9-15' })
        );
        clearErrors('fetchDate');
        const date = isValid(value) && format(value, 'd.M.yyyy');
        date && setValue('fetchDate', date);
        setFetchDate(value);
    }

    const dateErrorObj = JSON.parse(sessionStorage.getItem('dateErrorObj') as string);

    const [fetchDate, setFetchDate] = useState(
        Object.keys(JSON.parse(String(sessionStorage.getItem('__LSM__')))).length !== 0
            ? parse(JSON.parse(String(sessionStorage.getItem('__LSM__'))).fetchDate, 'd.M.yyyy', new Date())
            : currentDate
    );

    const [showAddressList, setShowAddressList] = useState(false);
    const [collect, setCollect] = useState(false);
    const [selectedDeliveryMethod, setSelectedDeliveryMethod] = useState(
        Object.keys(JSON.parse(String(sessionStorage.getItem('__LSM__')))).length !== 0
            ? JSON.parse(String(sessionStorage.getItem('__LSM__'))).deliveryRequired
            : 'true'
    );

    const [selectedAddress, setSelectedAddress] = useState(
        Object.keys(JSON.parse(String(sessionStorage.getItem('__LSM__')))).length !== 0
            ? JSON.parse(String(sessionStorage.getItem('__LSM__'))).deliveryAddress
            : ''
    );

    const {
        register,
        handleSubmit,
        formState: { errors },
        setValue,
        getValues,
        clearErrors,
    } = useForm({
        mode: 'all',
        defaultValues: {
            recipient: state.recipient ? state.recipient : '',
            recipient_phone_number: state.recipient_phone_number ? state.recipient_phone_number : '',
            deliveryAddress: state.deliveryAddress ? state.deliveryAddress : '',
            zip_code: state.zip_code ? state.zip_code : '',
            city: state.city ? state.city : '',
            deliveryRequired: state.deliveryRequired ? state.deliveryRequired : 'true',
            fetchDate: state.fetchDate ? state.fetchDate : currentDate,
            orderInfo: state.orderInfo ? state.orderInfo : '',
        },
    });

    const AddressBoxes = () => {
        return (
            <Box id="user-address-boxes-wrapper">
                <Stack
                    id="address-boxes"
                    direction="row"
                    gap={1}
                    justifyContent="flex-start"
                    alignItems="center"
                    flexWrap="wrap"
                >
                    {user.address_list.map((item) => (
                        <Box className="address-box" key={item.id}>
                            <Card sx={{ minWidth: 160 }}>
                                <CardActionArea onClick={() => handleAddressSelect(item)}>
                                    <Stack padding={'1rem'}>
                                        <Typography variant="body2">{item.address}</Typography>
                                        <Typography variant="body2">{item.city}</Typography>
                                        <Typography variant="body2">{item.zip_code}</Typography>
                                        <Typography variant="caption" color="primary" sx={{ marginTop: '0.4rem' }}>
                                            Valitse
                                        </Typography>
                                    </Stack>
                                </CardActionArea>
                            </Card>
                        </Box>
                    ))}
                </Stack>
            </Box>
        );
    };

    const handleAddressSelect = (item: any) => {
        setValue('deliveryAddress', item.address);
        setValue('zip_code', item.zip_code);
        setValue('city', item.city);
        setSelectedAddress(item);
        setShowAddressList(false);
    };

    function handleAutoFillInformation() {
        // this means delivery_required === true
        if (selectedDeliveryMethod === 'true') {
            setValue('recipient', user.first_name + ' ' + user.last_name);
            setValue('recipient_phone_number', user.phone_number as string);

            if (user.address_list.length === 1) {
                setValue('deliveryAddress', user.address_list[0].address);
                setValue('zip_code', user.address_list[0].zip_code);
                setValue('city', user.address_list[0].city);
            } else {
                setShowAddressList(!showAddressList);
            }
        }
        // delivery_required === false, aka noutotilaus
        setValue('recipient', user.first_name + ' ' + user.last_name);
        setValue('recipient_phone_number', user.phone_number as string);
    }

    const onDeliveryMethodFalse = () => {
        setCollect(true);
    };
    const onDeliveryMethodTrue = () => {
        setCollect(false);
    };
    const navigate = useNavigate();

    const onSubmit = (data: CartFormData) => {
        if (fetchDate.setHours(0, 0, 0, 0) === currentDate.setHours(0, 0, 0, 0) && selectedDeliveryMethod === 'false') {
            console.log('mikäs tää on O_o');
            return null;
        }

        actions.Update(data);
        navigate('/ostoskori/vaihe3');
    };

    return (
        <>
            {!collect && showAddressList && selectedAddress === '' && (
                <Toaster text="Valitse tai kirjoita toimitusosoite, ole hyvä!" />
            )}

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
                        <Stack direction="row" gap={4} sx={{ mt: '1rem' }}>
                            <Stack direction="row" gap={1}>
                                <AccountCircleOutlinedIcon color="primary" />
                                <Typography aria-label="orderer username">
                                    {user.first_name} {user.last_name}
                                </Typography>
                            </Stack>
                            <Stack direction="row" gap={1}>
                                <MailOutlineIcon color="primary" />
                                <Typography aria-label="orderer user email">{user.email}</Typography>
                            </Stack>
                            <Stack direction="row" gap={1}>
                                <PhoneIcon color="primary" />
                                <Typography aria-label="orderer users phonenumber">{user.phone_number}</Typography>
                            </Stack>
                        </Stack>
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
                    {/* show autofill btn only for regular users */}
                    {user.username.includes('@') ? (
                        <Box sx={{ display: 'flex', justifyContent: 'center', margin: '2rem 0 2rem 0' }}>
                            <Button id="autofill-btn" onClick={() => handleAutoFillInformation()}>
                                Täytä tiedot automaattisesti
                            </Button>
                        </Box>
                    ) : (
                        <Box id="spacer-placeholder" margin="2rem"></Box>
                    )}
                    <Stack id="receiver-input-fields-container" direction="row" gap={2} justifyContent="center">
                        <TextField
                            label="Vastaanottaja"
                            placeholder="Vastaanottajan nimi"
                            variant="outlined"
                            InputLabelProps={{ shrink: true }}
                            {...register('recipient', {
                                maxLength: { value: 50, message: 'Sisältö on liian pitkä' },
                            })}
                            error={!!errors.recipient}
                            helperText={errors.recipient?.message?.toString() || ' '}
                            required
                        />

                        <TextField
                            label="Vastaanottajan puhelinnumero"
                            placeholder="Puhelinnumero"
                            variant="outlined"
                            InputLabelProps={{ shrink: true }}
                            {...register('recipient_phone_number', {
                                required: 'Tämä kenttä on täytettävä',
                                pattern: { value: /^[0-9]+$/, message: 'Sisällön täytyy koostua vain numeroista' },
                                maxLength: { value: 11, message: 'Numerosarja on liian pitkä' },
                            })}
                            error={!!errors.recipient_phone_number}
                            helperText={errors.recipient_phone_number?.message?.toString() || ' '}
                            inputProps={{ required: false }}
                            required
                        />
                    </Stack>

                    {/* //// */}

                    <TypographyHeading text="Toimitustiedot" />
                    <Button
                        variant="outlined"
                        onClick={() => setShowAddressList(!showAddressList)}
                        sx={{ marginTop: '1rem' }}
                        // i hate this, comparing to string instead of boolean >.>
                        disabled={selectedDeliveryMethod === 'false'}
                    >
                        {showAddressList ? 'Kirjoita osoite' : 'Valitse osoitelistasta'}
                    </Button>
                    <Stack id="delivery-fields-grid-container" direction="row" gap={2} margin="2rem 0 1rem 0">
                        <TextField
                            {...register('deliveryRequired')}
                            label="Toimitustapa"
                            variant="outlined"
                            value={selectedDeliveryMethod}
                            onChange={(SelectChangeEvent) => {
                                setSelectedDeliveryMethod(SelectChangeEvent.target.value);
                            }}
                            select
                            error={!!errors.deliveryRequired}
                            helperText={errors.deliveryRequired?.message?.toString()}
                            inputProps={{ required: false }}
                            required
                        >
                            <MenuItem value="true" onClick={onDeliveryMethodTrue}>
                                Kuljetus
                            </MenuItem>
                            <MenuItem value="false" onClick={onDeliveryMethodFalse}>
                                Nouto
                            </MenuItem>
                        </TextField>

                        {selectedDeliveryMethod === 'true' && !showAddressList && (
                            // free input text field
                            <>
                                <TextField
                                    // label="Toimitusosoite"
                                    placeholder="Toimitusosoite"
                                    variant="outlined"
                                    {...register('deliveryAddress', {
                                        required: { value: true, message: 'Tämä kenttä on täytettävä' },
                                        maxLength: { value: 80, message: 'Sisältö on liian pitkä' },
                                    })}
                                    inputProps={{ required: false }}
                                    error={!!errors.deliveryAddress}
                                    helperText={errors.deliveryAddress?.message?.toString() || ''}
                                    required
                                    disabled={collect}
                                />

                                <TextField
                                    // label="Postinumero"
                                    placeholder="Postinumero"
                                    variant="outlined"
                                    {...register('zip_code', {
                                        required: { value: true, message: 'Tämä kenttä on täytettävä' },
                                        maxLength: { value: 5, message: 'Sisältö on liian pitkä' },
                                    })}
                                    inputProps={{ required: false }}
                                    error={!!errors.zip_code}
                                    helperText={errors.zip_code?.message?.toString() || ''}
                                    required
                                    disabled={collect}
                                />

                                <TextField
                                    // label="Kaupunki"
                                    placeholder="Kaupunki"
                                    variant="outlined"
                                    {...register('city', {
                                        required: { value: true, message: 'Tämä kenttä on täytettävä' },
                                        maxLength: { value: 80, message: 'Sisältö on liian pitkä' },
                                    })}
                                    inputProps={{ required: false }}
                                    error={!!errors.deliveryAddress}
                                    helperText={errors.deliveryAddress?.message?.toString() || ''}
                                    required
                                    disabled={collect}
                                />
                            </>
                        )}

                        {selectedDeliveryMethod === 'true' && showAddressList && <AddressBoxes />}

                        {selectedDeliveryMethod === 'false' && (
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
                                                (dateErrorObj?.message !== 'Noutoajat ma-pe 9-15' ||
                                                    errors.fetchDate?.type === 'required' ||
                                                    errors.fetchDate?.type === 'pattern') &&
                                                !!errors.fetchDate
                                            }
                                            helperText={
                                                errors.fetchDate?.message?.toString() ||
                                                dateErrorObj?.message ||
                                                'Noutoajat ma-pe 9-15'
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
                        )}
                    </Stack>
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

                {selectedDeliveryMethod === 'true' && (
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
                )}

                <CartButtons
                    backText="Takaisin"
                    forwardText="Seuraava"
                    actions={actions}
                    formData={getValues()}
                    disableForwardBtn={!collect && showAddressList && selectedAddress === ''}
                />
            </form>
        </>
    );
}

export default ContactsAndDelivery;
