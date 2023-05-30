// import { useState, useRef } from 'react';

import { useLoaderData, useActionData } from 'react-router';
import { Form, useSubmit } from 'react-router-dom';

import { useForm } from 'react-hook-form';

import { Box, Button, Container, Checkbox, FormControlLabel, Stack, TextField } from '@mui/material';

import AlertBox from '../AlertBox';
// import ConfirmWindow from './ConfirmWindow';
import TypographyTitle from '../TypographyTitle';
import TypographyHeading from '../TypographyHeading';

const groupNames = {
    user_group: 'Käyttäjä',
    admin_group: 'Ylläpitäjä',
    storage_group: 'Varastotyöntekijä',
    bicycle_group: 'Pyörävaltuutettu',
};

function UserEdit() {
    const loaderData = useLoaderData();
    // loaderData === [{}, []]
    const userInfo = loaderData[0];
    const allGroups = loaderData[1];

    // console.log('userinfo:', userInfo);
    console.log('allGroups:', allGroups);

    const responseStatus = useActionData();

    // const [confirmWindowOpen, setConfirmWindowOpen] = useState(false);
    // const [userState, setUserState] = useState(loaderData[0]);
    // const eventRef = useRef();

    const {
        watch,
        register,
        handleSubmit: createHandleSubmit,
        formState,
    } = useForm({
        mode: 'onTouched',
        defaultValues: {
            ...userInfo,
            address: userInfo.address_list[0].address,
            city: userInfo.address_list[0].city,
            zipcode: userInfo.address_list[0].zip_code,
            // groups: [],
            // groups: userInfo.groups,
            // groups: { user_group: 1, admin_group: 2, storage_group: 3, bicycle_group: 4 },
        },
    });

    const submit = useSubmit();

    const handleSubmit = createHandleSubmit((data) => {
        submit(data, {
            method: 'put',
        });
    });

    // old shizzleshabang related to ConfirmWindow-component:

    // const handleChange = (key, event, group) => {
    //     if (key === 'groups') {
    //         if (event.target.checked) {
    //             setUserState({ ...userState, [key]: userState.groups.concat(group.id) });
    //         } else {
    //             setUserState({ ...userState, [key]: userState.groups.filter((group_) => group_ !== group.id) });
    //         }
    //     } else {
    //         setUserState({ ...userState, [key]: event.target.value });
    //     }
    // };

    // const checkChange = (key) => {
    //     if (userState[key] === loaderData[0][key]) {
    //         return false;
    //     }
    //     return true;
    // };

    // const revertChange = (key) => {
    //     setUserState({ ...userState, [key]: loaderData[0][key] });
    // };

    // const handleConfirm = (confirm) => {
    //     if (confirm) {
    //         submit(eventRef.current, { method: 'post' });
    //     }
    //     setConfirmWindowOpen(false);
    // };

    return (
        <>
            {responseStatus?.type === 'update' && !responseStatus?.status && (
                <AlertBox text="Käyttäjätietojen tallennus epäonnistui. Lataa sivu uudestaan." status="error" />
            )}
            {responseStatus?.type === 'update' && responseStatus?.status && (
                <AlertBox text="Käyttäjätiedot tallennettu onnistuneesti" status="success" />
            )}

            {/* <ConfirmWindow
                open={confirmWindowOpen}
                onConfirm={handleConfirm}
                title="Tallennetaanko käyttäjän tiedot?"
                content={loaderData[0].name}
            /> */}

            <Container id="user-edit-form-container-x-center" maxWidth="xl">
                <TypographyTitle text="Käyttäjän tietojen muokkaus" />
                {/* User info form */}
                <Box
                    id="user-edition-wrapper-form-component"
                    component={Form}
                    onSubmit={handleSubmit}
                    sx={{ margin: '2rem 0 2rem 0' }}
                >
                    <Stack id="user-edition-fields-stack-column">
                        {/* these out-commented fields are not editable (in the BE) for the time being */}

                        {/* <TextField
                                id="textfield-username"
                                type="text"
                                label="Käyttäjätunnus"
                                placeholder="Käyttäjätunnus"
                                {...register('username', {
                                    required: { value: true, message: 'Käyttäjätunnus ei voi olla tyhjä' },
                                    maxLength: { value: 50, message: 'Tunnus on liian pitkä, maksimi 50 merkkiä' },
                                })}
                                // Needs to be required: false to disable browser error message
                                inputProps={{ required: false }}
                                required
                                error={!!formState.errors.username}
                                helperText={formState.errors.username?.message || ' '}
                            />

                            <TextField
                                id="textfield-useremail"
                                type="text"
                                label="Sähköpostiosoite"
                                placeholder="Sähköpostiosoite"
                                {...register('email', {
                                    required: { value: true, message: 'Sähköpostiosoite ei voi olla tyhjä' },
                                    maxLength: {
                                        value: 50,
                                        message: 'Sähköpostiosoite on liian pitkä, maksimi 50 merkkiä',
                                    },
                                })}
                                inputProps={{ required: false }}
                                required
                                error={!!formState.errors.email}
                                helperText={formState.errors.email?.message || ' '}
                            /> */}

                        <Stack id="fname-lname-stacker" direction="row" spacing={1}>
                            <TextField
                                id="textfield-fname"
                                type="text"
                                label="Etunimi"
                                placeholder="Käyttäjän etunimi"
                                {...register('first_name', {
                                    required: { value: true, message: 'Käyttäjän nimi ei voi olla tyhjä' },
                                    maxLength: {
                                        value: 50,
                                        message: 'Etunimi on liian pitkä, maksimi 50 merkkiä',
                                    },
                                })}
                                // Needs to be required: false to disable browser error message
                                inputProps={{ required: false }}
                                required
                                error={!!formState.errors.first_name}
                                helperText={formState.errors.first_name?.message || ' '}
                            />

                            <TextField
                                id="textfield-lname"
                                type="text"
                                label="Sukunimi"
                                placeholder="Käyttäjän sukunimi"
                                {...register('last_name', {
                                    required: { value: true, message: 'Käyttäjän sukunimi ei voi olla tyhjä' },
                                    maxLength: {
                                        value: 50,
                                        message: 'Sukunimi on liian pitkä, maksimi 50 merkkiä',
                                    },
                                })}
                                inputProps={{ required: false }}
                                required
                                error={!!formState.errors.last_name}
                                helperText={formState.errors.last_name?.message || ' '}
                            />
                        </Stack>

                        <TextField
                            id="phone_number"
                            type="text"
                            label="Puhelinnumero"
                            placeholder="Käyttäjän puhelinnumero, esim. 040 1234567"
                            {...register('phone_number', {
                                required: { value: true, message: 'Käyttäjän puhelinnumero ei voi olla tyhjä' },
                                maxLength: { value: 30, message: 'Puhelinnumero on liian pitkä' },
                                minLength: {
                                    value: 10,
                                    message: 'Puhelinnumero on 10 merkkiä pitkä, muodossa 040 1234567',
                                },
                            })}
                            inputProps={{ required: false }}
                            required
                            error={!!formState.errors.phone_number}
                            helperText={formState.errors.phone_number?.message || ' '}
                        />

                        <Box id="user-address-info-wrapper">
                            <TypographyHeading text="Käyttäjän osoitetiedot" />
                            <TextField
                                id="address"
                                type="text"
                                label="Käyttäjän ensimmäinen osoite"
                                placeholder="Käyttäjän osoite"
                                fullWidth
                                value={watch('address')}
                                {...register('address', {
                                    required: { value: true, message: 'Käyttäjän osoite ei voi olla tyhjä' },
                                    maxLength: { value: 100, message: 'Osoite on liian pitkä' },
                                    minLength: {
                                        value: 1,
                                        message: 'Tavaran vastaanotto-osoite on vaadittu',
                                    },
                                })}
                                inputProps={{ required: false }}
                                required
                                error={!!formState.errors.address}
                                helperText={formState.errors.address?.message || ' '}
                                sx={{ marginTop: '1rem' }}
                            />
                            <Stack direction="row" spacing={1}>
                                <TextField
                                    id="address"
                                    type="text"
                                    label="Kaupunki"
                                    placeholder="Kaupunki"
                                    value={watch('city')}
                                    {...register('city', {
                                        required: { value: true, message: 'Kaupunki ei voi olla tyhjä' },
                                        maxLength: { value: 100, message: 'Kaupunki on liian pitkä' },
                                        minLength: {
                                            value: 1,
                                            message: 'Tavaran vastaanotto-osoite on vaadittu',
                                        },
                                    })}
                                    inputProps={{ required: false }}
                                    required
                                    error={!!formState.errors.city}
                                    helperText={formState.errors.city?.message || ' '}
                                />

                                <TextField
                                    id="zipcode"
                                    type="text"
                                    label="Postinumero"
                                    placeholder="Postinumero"
                                    value={watch('zipcode')}
                                    {...register('zipcode', {
                                        required: { value: true, message: 'Postinumero ei voi olla tyhjä' },
                                        maxLength: { value: 5, message: 'Postinumero on liian pitkä' },
                                        minLength: {
                                            value: 1,
                                            message: 'Osoitteen postinumero on vaadittu',
                                        },
                                    })}
                                    inputProps={{ required: false }}
                                    required
                                    error={!!formState.errors.zipcode}
                                    helperText={formState.errors.zipcode?.message || ' '}
                                />
                            </Stack>
                        </Box>
                    </Stack>

                    {/* User auth groups form */}
                    <Box id="user-edition-checkboxes-wrapper">
                        <TypographyHeading text="Käyttäjän käyttöoikeudet" />
                        <Stack id="usergroups-checkboxes-stack-column">
                            {/* Checkboxes, mapped: */}
                            {allGroups.map((group) => (
                                <FormControlLabel
                                    sx={{ margin: 0 }}
                                    key={group.id}
                                    control={
                                        <Checkbox
                                            sx={{
                                                '&.Mui-checked': {
                                                    color: 'success.dark',
                                                },
                                            }}
                                        />
                                    }
                                    // name={`groups.${group.name}`}
                                    {...register('groups')}
                                    // onChange={(event) => {
                                    //     handleChange('groups', event, group);
                                    // }}
                                    // checked={userState.groups.includes(group.id)}
                                    label={groupNames[group.name]}
                                    value={group.id}
                                    onClick={() => console.log(`clicked checkboxs value: ${group.id}`)}
                                />
                            ))}
                        </Stack>
                    </Box>
                    <Button id="save-changes-btn" fullWidth type="submit" sx={{ marginTop: '1rem' }}>
                        Hyväksy ja tallenna muutokset
                    </Button>
                </Box>
                <Button id="cancel-btn" fullWidth color="error">
                    Poistu tallentamatta
                </Button>
            </Container>
        </>
    );
}

export default UserEdit;
