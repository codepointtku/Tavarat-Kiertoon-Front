// import { useState, useRef } from 'react';
import { Fragment } from 'react';

import { useLoaderData, useActionData } from 'react-router';
import { Form, useSubmit } from 'react-router-dom';

import { useForm } from 'react-hook-form';

import { Box, Button, Container, Checkbox, FormControlLabel, Stack, TextField, Typography } from '@mui/material';

import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import DoNotDisturbIcon from '@mui/icons-material/DoNotDisturb';

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

    const responseStatus = useActionData();

    // const [confirmWindowOpen, setConfirmWindowOpen] = useState(false);
    // const [userState, setUserState] = useState(loaderData[0]);
    // const eventRef = useRef();

    const {
        register,
        handleSubmit: createHandleSubmit,
        formState: { errors: formStateErrors, isDirty },
    } = useForm({
        mode: 'onTouched',
        defaultValues: {
            ...userInfo,
        },
    });

    const submit = useSubmit();

    const handleSubmit = createHandleSubmit((data) => {
        submit(data, {
            method: 'put',
        });
    });

    // console.log(userAddressList);

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
                <Box id="user-common-info" sx={{ margin: '1rem 0 1rem 0' }}>
                    <Typography>Käyttäjän rekisteröitymispäivämäärä: {userInfo.creation_date}</Typography>
                    <Stack direction="row">
                        <Typography>Käyttäjätili aktivoitu: </Typography>
                        {userInfo.creation_date ? (
                            <CheckCircleOutlineIcon color="success" fontSize="small" sx={{ marginLeft: '0.4rem' }} />
                        ) : (
                            <DoNotDisturbIcon color="error" fontSize="small" sx={{ marginLeft: '0.4rem' }} />
                        )}
                    </Stack>
                    <Typography>
                        Käyttäjä viimeisin sisäänkirjautuminen:{' '}
                        {userInfo.last_login ? `${userInfo.last_login}` : 'Ei koskaan'}
                    </Typography>
                </Box>
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
                                error={!!formStateErrors.first_name}
                                helperText={formStateErrors.first_name?.message || ' '}
                                color={isDirty ? 'warning' : 'primary'}
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
                                error={!!formStateErrors.last_name}
                                helperText={formStateErrors.last_name?.message || ' '}
                                color={isDirty ? 'warning' : 'primary'}
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
                            error={!!formStateErrors.phone_number}
                            helperText={formStateErrors.phone_number?.message || ' '}
                            color={isDirty ? 'warning' : 'primary'}
                        />

                        <Box id="user-address-info-wrapper">
                            <TypographyHeading text="Käyttäjän osoitetiedot" />
                            {userInfo.address_list.map((address, index) => (
                                <Fragment key={index}>
                                    <TextField
                                        id={`userid-${address.user}-useraddress-${address.id}`}
                                        type="text"
                                        label="Osoite"
                                        placeholder="Tavaran vastaanotto-osoite"
                                        fullWidth
                                        {...register(`address_list[${index}].address`, {
                                            required: { value: true, message: 'Käyttäjän osoite ei voi olla tyhjä' },
                                            maxLength: { value: 100, message: 'Osoite on liian pitkä' },
                                            minLength: {
                                                value: 1,
                                                message: 'Tavaran vastaanotto-osoite on vaadittu',
                                            },
                                        })}
                                        inputProps={{ required: false }}
                                        required
                                        error={!!formStateErrors.address}
                                        helperText={formStateErrors.address?.message || ' '}
                                        color={isDirty ? 'warning' : 'primary'}
                                        sx={{ marginTop: '1rem' }}
                                    />
                                    <Stack direction="row" spacing={1}>
                                        <TextField
                                            id={`userid-${address.user}-addresscity-${address.city}`}
                                            type="text"
                                            label="Kaupunki"
                                            placeholder="Kaupunki"
                                            {...register(`address_list[${index}].city`, {
                                                required: { value: true, message: 'Kaupunki ei voi olla tyhjä' },
                                                maxLength: { value: 100, message: 'Kaupungin nimi on liian pitkä' },
                                                minLength: {
                                                    value: 1,
                                                    message: 'Osoitteen kaupunki on vaadittu',
                                                },
                                            })}
                                            inputProps={{ required: false }}
                                            required
                                            error={!!formStateErrors.city}
                                            helperText={formStateErrors.city?.message || ' '}
                                            color={isDirty ? 'warning' : 'primary'}
                                        />

                                        <TextField
                                            id={`userid-${address.user}-zipcode-${address.zip_code}`}
                                            type="text"
                                            label="Postinumero"
                                            placeholder="Postinumero"
                                            {...register(`address_list[${index}].zip_code`, {
                                                required: { value: true, message: 'Postinumero ei voi olla tyhjä' },
                                                maxLength: { value: 5, message: 'Postinumero on liian pitkä' },
                                                minLength: {
                                                    value: 1,
                                                    message: 'Osoitteen postinumero on vaadittu',
                                                },
                                            })}
                                            inputProps={{ required: false }}
                                            required
                                            error={!!formStateErrors.zipcode}
                                            helperText={formStateErrors.zipcode?.message || ' '}
                                            color={isDirty ? 'warning' : 'primary'}
                                        />
                                    </Stack>
                                </Fragment>
                            ))}

                            <Button sx={{ mb: '1rem' }}>Lisää uusi osoite</Button>
                        </Box>
                    </Stack>

                    {/* User auth groups form */}
                    <Box id="user-edition-checkboxes-wrapper">
                        <TypographyHeading text="Käyttäjän käyttöoikeudet" />
                        <Stack id="usergroups-checkboxes-stack-column">
                            {/* Checkboxes, mapped: */}
                            {allGroups.map((group) => (
                                <FormControlLabel
                                    key={group.id}
                                    control={
                                        <Checkbox
                                            sx={{
                                                '&.Mui-checked': {
                                                    color: 'success.dark',
                                                },
                                            }}
                                            defaultChecked={userInfo.groups.includes(group.id)}
                                            {...register('groups', { type: 'checkbox' })}
                                            value={group.id}
                                        />
                                    }
                                    label={groupNames[group.name]}
                                    // onClick={() => console.log(`clicked checkboxs value: ${group.id}`)}
                                    sx={{ margin: 0 }}
                                />
                            ))}
                        </Stack>
                    </Box>
                    <Button
                        id="save-changes-btn"
                        fullWidth
                        type="submit"
                        sx={{
                            marginTop: '1rem',
                            '&:hover': {
                                backgroundColor: 'success.dark',
                            },
                        }}
                        disabled={!isDirty}
                    >
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
