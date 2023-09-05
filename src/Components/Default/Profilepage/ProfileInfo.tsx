import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Form, Link, useSubmit, useRouteLoaderData, useActionData } from 'react-router-dom';

import {
    Grid,
    TextField,
    Typography,
    MenuItem,
    Button,
    Container,
    Stack,
    Box,
    Card,
    CardContent,
    CardActions,
    Link as MuiLink,
    Divider,
} from '@mui/material';

import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';

import AlertBox from '../../AlertBox';

import type { userInfoLoader } from '../../../Router/loaders';
import { SubmitHandler, FieldValues } from 'react-hook-form/dist/types';
import TypographyTitle from '../../TypographyTitle';
import TypographyHeading from '../../TypographyHeading';
import HeroText from '../../HeroText';

interface FormData extends SubmitHandler<FieldValues> {
    [key: string]: string | null;
    username: string;
    first_name: string;
    last_name: string;
    phone_number: string | null;
    email: string;
    userAddress: string;
}

interface ResponseStatus {
    type: string;
    status: number;
}

type SubmitTarget =
    | HTMLFormElement
    | {
          [name: string]: string;
      }
    | null;

function ProfileInfo() {
    const { userInfo } = useRouteLoaderData('account') as Awaited<ReturnType<typeof userInfoLoader>>;
    // console.log(userInfo);

    const creationDateInfo = [];
    const creationDate = new Date(userInfo.creation_date);
    creationDateInfo.push(creationDate.toLocaleDateString('fi-FI'));
    creationDateInfo.push(creationDate.toLocaleTimeString('fi-FI'));

    const lastLoginDateInfo = [];
    const lastLoginDate = new Date(userInfo.last_login!);
    lastLoginDateInfo.push(lastLoginDate.toLocaleDateString('fi-FI'));
    lastLoginDateInfo.push(lastLoginDate.toLocaleTimeString('fi-FI'));

    const userGroups = userInfo.groups.map((group) => group.name);

    const responseStatus = useActionData() as ResponseStatus;

    // const address = userInfo.address_list.map((item) => item.address);
    // const [selectedAddress, setSelectedAddress] = useState(address[0]);

    const {
        register,
        reset,
        handleSubmit,
        formState: { isDirty, dirtyFields, isValid, errors },
    } = useForm({
        mode: 'all',
        defaultValues: {
            username: userInfo.username,
            first_name: userInfo.first_name,
            last_name: userInfo.last_name,
            phone_number: userInfo.phone_number,
            // userAddress: address[0],
            email: userInfo.email,
        },
    });

    const submit = useSubmit();

    const onSubmit = (data: FormData) => {
        const formData = { ...data };
        Object.assign(formData, { id: userInfo.id });
        submit(formData as SubmitTarget, { method: 'put', action: '/profiili' });
        reset(formData);
    };

    // const selectedAddressInfo = userInfo.address_list.filter(
    //     (addressInfo: { address: string }) => addressInfo.address === selectedAddress
    // );

    return (
        <>
            {responseStatus?.status && <AlertBox text="Käyttäjätiedot päivitetty onnistuneesti." status="success" />}

            <Container maxWidth="md">
                <HeroText title={`Hei, ${userInfo.username}`} />
                <Box id="user-common-info" sx={{ margin: '1rem 0 1rem 0' }}>
                    <Typography>Käyttäjänimi: {userInfo.username}</Typography>
                    <Typography>Tilin sähköposti: {userInfo.email}</Typography>
                    <Divider sx={{ margin: '1rem 0 1rem 0' }} />
                    <Typography>Tilillä on seuraavat käyttöoikeudet. {userGroups}</Typography>
                    <Divider sx={{ margin: '1rem 0 1rem 0' }} />
                    <Typography>
                        Viimeisin sisäänkirjautuminen:{' '}
                        {userInfo.last_login ? `${lastLoginDateInfo[0]} / ${lastLoginDateInfo[1]}` : 'Ei koskaan'}
                    </Typography>
                    <Typography>
                        Rekisteröitymisaika: {creationDateInfo[0]} / {creationDateInfo[1]}
                    </Typography>
                    {/* <Stack direction="row" sx={{ display: 'flex', alignItems: 'center' }}>
                        <Typography>Tili aktivoitu: </Typography>
                        {userInfo.is_active ? (
                            <CheckCircleOutlineIcon color="success" fontSize="small" sx={{ marginLeft: '0.4rem' }} />
                        ) : (
                            <DoNotDisturbIcon color="error" fontSize="small" sx={{ marginLeft: '0.4rem' }} />
                        )}
                    </Stack> */}
                </Box>

                <Box id="user-edit-form-component" component={Form} onSubmit={handleSubmit(onSubmit as FormData)}>
                    <Stack id="user-common-info-stack" sx={{ margin: '2rem 0 2rem 0' }}>
                        <Stack id="fname-lname-stacker" direction="row" spacing={1}>
                            <TextField
                                id="textfield-fname"
                                type="text"
                                label="Etunimi"
                                {...register('first_name', {
                                    required: { value: true, message: 'Käyttäjän nimi ei voi olla tyhjä' },
                                    maxLength: { value: 50, message: 'Maksimipituus 50 merkkiä' },
                                })}
                                inputProps={{ required: false }}
                                required
                                error={!!errors.first_name}
                                helperText={errors.first_name?.message?.toString() || ' '}
                                color={dirtyFields.first_name ? 'warning' : 'primary'}
                                fullWidth
                            />

                            <TextField
                                id="textfield-lname"
                                type="text"
                                label="Sukunimi"
                                {...register('last_name', {
                                    required: {
                                        value: true,
                                        message: 'Käyttäjän sukunimi ei voi olla tyhjä',
                                    },
                                    maxLength: { value: 50, message: 'Maksimipituus 50 merkkiä' },
                                })}
                                inputProps={{ required: false }}
                                required
                                error={!!errors.last_name}
                                helperText={errors.last_name?.message?.toString() || ' '}
                                color={dirtyFields.last_name ? 'warning' : 'primary'}
                                fullWidth
                            />
                        </Stack>

                        <TextField
                            id="phone_number"
                            label="Puhelinnumero"
                            {...register('phone_number', {
                                required: {
                                    value: true,
                                    message: 'Käyttäjän puhelinnumero ei voi olla tyhjä',
                                },
                                minLength: {
                                    value: 10,
                                    message: 'Puhelinnumero on 10 merkkiä pitkä, muodossa 0401234567',
                                },
                                maxLength: { value: 10, message: 'Puhelinnumero on liian pitkä' },
                                pattern: { value: /^\d+$/, message: 'Sisällön täytyy koostua vain numeroista' },
                            })}
                            inputProps={{ required: false }}
                            required
                            error={!!errors.phone_number}
                            helperText={errors.phone_number?.message?.toString() || ' '}
                            color={dirtyFields.phone_number ? 'warning' : 'primary'}
                            fullWidth
                        />

                        <Button type="submit" disabled={!isDirty || !isValid}>
                            Vahvista muutokset
                        </Button>
                    </Stack>
                </Box>

                {/* Address stuff */}
                {/* <Stack direction="row" spacing={1}>
                        <TextField
                            {...register('userAddress', { required: 'Tämä kenttä on täytettävä' })}
                            value={selectedAddress}
                            label="Osoitteet"
                            onChange={(event) => setSelectedAddress(event.target.value)}
                            select
                        >
                            {userInfo.address_list?.map((a) => (
                                <MenuItem key={a.id} value={a.address}>
                                    {a.address}
                                </MenuItem>
                            ))}
                        </TextField>

                        <Button
                            component={Link}
                            to={`osoitetiedot/${selectedAddressInfo[0].id}`}
                            state={{ ...selectedAddressInfo[0], action: 'modify' }}
                        >
                            Muokkaa
                        </Button>

                        <Button
                            component={Link}
                            to={`osoitetiedot/${selectedAddressInfo[0].id}`}
                            state={{ ...selectedAddressInfo[0], action: 'create' }}
                        >
                            Luo uusi
                        </Button>
                    </Stack> */}

                <Box id="user-address-boxes-wrapper" marginBottom="2rem">
                    <TypographyHeading text="Tavaran vastaanotto-osoitteet" />
                    <Stack
                        id="address-boxes"
                        direction="row"
                        gap={1}
                        justifyContent="flex-start"
                        alignItems="center"
                        flexWrap="wrap"
                        sx={{ margin: '1rem 0 1rem 0' }}
                    >
                        {userInfo.address_list.map((item) => (
                            <Box className="address-box" key={item.id}>
                                <Card sx={{ minWidth: 160 }}>
                                    <CardContent>
                                        <Typography variant="body2">{item.address}</Typography>
                                        <Typography variant="body2">{item.city}</Typography>
                                        <Typography variant="body2">{item.zip_code}</Typography>
                                    </CardContent>
                                    <CardActions>
                                        <Button variant="outlined" component={Link} to={`/tili/osoitteet/${item.id}`}>
                                            Muokkaa
                                        </Button>
                                    </CardActions>
                                </Card>
                            </Box>
                        ))}
                    </Stack>
                    <Button
                        component={Link}
                        to={`/tili/osoitteet/uusi/`}
                        variant="text"
                        size="small"
                        startIcon={<AddCircleOutlineIcon />}
                    >
                        Lisää osoite
                    </Button>
                </Box>

                {/* Account actions stuff */}
                <Stack id="account-actions-section-wrapper" spacing="1rem" margin="1rem 0 1rem 0">
                    <TypographyHeading text="Toiminnot" />
                    <Stack direction="row" justifyContent="space-between" alignItems="center">
                        <Button size="small" component={Link} to="/sahkopostinvaihto">
                            Tilin sähköpostin päivitys
                        </Button>

                        <Button size="small" component={Link} to="/salasananvaihto">
                            Salasanan vaihto
                        </Button>

                        <Button variant="text" component={Link} to="/salasananvaihto">
                            Salasana unohtunut?
                        </Button>
                    </Stack>
                </Stack>
                {/* <Button size="small" sx={{ margin: '1rem 0 1rem 0' }}>
                    Kirjaudu ulos järjestelmästä
                </Button> */}
            </Container>
        </>
    );
}

export default ProfileInfo;
