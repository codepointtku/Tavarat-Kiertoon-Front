import { useState } from 'react';

import { useLoaderData, useActionData } from 'react-router';
import { Form, useSubmit, Link } from 'react-router-dom';

import { useForm } from 'react-hook-form';

import { Box, Button, Checkbox, FormControlLabel, Stack, TextField, Typography, Grid } from '@mui/material';

import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import DoNotDisturbIcon from '@mui/icons-material/DoNotDisturb';

import AlertBox from '../AlertBox';
import TypographyTitle from '../TypographyTitle';
import TypographyHeading from '../TypographyHeading';

const groupNames = {
    user_group: 'Käyttäjä',
    admin_group: 'Ylläpitäjä',
    storage_group: 'Varastotyöntekijä',
    bicycle_group: 'Pyörävaltuutettu',
};

function UserEdit() {
    // todo:
    // - helpertexts indicating edited fields
    // - address edit id render bug fix

    const loaderData = useLoaderData();
    // loaderData === [{}, []]
    const userInfo = loaderData[0];
    const allGroups = loaderData[1];

    const responseStatus = useActionData();

    const creationDateInfo = [];
    const creationDate = new Date(userInfo.creation_date);
    creationDateInfo.push(creationDate.toLocaleDateString());
    creationDateInfo.push(creationDate.toLocaleTimeString());

    const lastLoginDateInfo = [];
    const lastLoginDate = new Date(userInfo.last_login);
    lastLoginDateInfo.push(lastLoginDate.toLocaleDateString());
    lastLoginDateInfo.push(lastLoginDate.toLocaleTimeString());

    const [showAddressEditFields, setShowAddressEditFields] = useState({ aid: null, aindex: null });
    console.log('%c Steitissä oleva aid:', 'color: red', showAddressEditFields.aid);
    let addressId = showAddressEditFields.aid;

    const {
        register,
        handleSubmit: createHandleSubmit,
        reset,
        formState: { errors: formStateErrors, isDirty, dirtyFields },
    } = useForm({
        mode: 'all',
        defaultValues: {
            ...userInfo,
        },
    });

    const handleAddressEdit = (aid, aindex) => {
        // console.log('%c Klikattiin osoitetta', 'color: red; font-weight: bold', 'address id:', aid, 'index:', aindex);
        setShowAddressEditFields({ aid: aid, aindex: aindex });
    };

    const closeAddressEdit = () => {
        setShowAddressEditFields({ aid: null, aindex: null });
        reset();
    };

    const submit = useSubmit();

    const handleSubmit = createHandleSubmit((data) => {
        // console.log('%c Submitissa menevä tieto', 'color: blue', data);
        submit(data, {
            method: 'put',
        });
    });

    return (
        <>
            {responseStatus?.type === 'update' && !responseStatus?.status && (
                <AlertBox text="Käyttäjätietojen tallennus epäonnistui. Lataa sivu uudestaan." status="error" />
            )}
            {responseStatus?.type === 'update' && responseStatus?.status && (
                <AlertBox text="Käyttäjätiedot tallennettu onnistuneesti" status="success" />
            )}

            <Box id="user-edit-wrapper-form-component" component={Form} onSubmit={handleSubmit}>
                <Stack id="stack-main">
                    <Grid container>
                        {/* Common info */}
                        <Grid item xs={6}>
                            <Box
                                sx={{
                                    display: 'flex',
                                    flexDirection: 'column',
                                    // justifyContent: 'flex-start',
                                    // alignItems: 'center',
                                }}
                            >
                                <TypographyTitle text={`Käyttäjä ${userInfo.email}`} />
                                <Box id="user-common-info" sx={{ margin: '1rem 0 1rem 0' }}>
                                    <Typography>
                                        Rekisteröitymispäivämäärä: {creationDateInfo[0]} / {creationDateInfo[1]}
                                    </Typography>
                                    <Stack direction="row">
                                        <Typography>Tili aktivoitu: </Typography>
                                        {userInfo.is_active ? (
                                            <CheckCircleOutlineIcon
                                                color="success"
                                                fontSize="small"
                                                sx={{ marginLeft: '0.4rem' }}
                                            />
                                        ) : (
                                            <DoNotDisturbIcon
                                                color="error"
                                                fontSize="small"
                                                sx={{ marginLeft: '0.4rem' }}
                                            />
                                        )}
                                    </Stack>
                                    <Typography>
                                        Viimeisin sisäänkirjautuminen:{' '}
                                        {userInfo.last_login
                                            ? `${lastLoginDateInfo[0]} / ${lastLoginDateInfo[1]}`
                                            : 'Ei koskaan'}
                                    </Typography>
                                    <Typography>Käyttäjän tunnistenumero: {userInfo.id}</Typography>
                                </Box>
                            </Box>
                        </Grid>

                        {/* Name, phone */}
                        <Grid item xs={6}>
                            <Stack id="user-edition-fields-stack-column" sx={{ marginTop: '1rem' }}>
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
                                                message: 'Maksimipituus 50 merkkiä',
                                            },
                                        })}
                                        // Needs to be 'required: false' to disable browser error message
                                        inputProps={{ required: false }}
                                        required
                                        error={!!formStateErrors.first_name}
                                        helperText={formStateErrors.first_name?.message || ' '}
                                        color={dirtyFields.first_name && 'warning'}
                                        fullWidth
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
                                                message: 'Maksimi 50 merkkiä',
                                            },
                                        })}
                                        inputProps={{ required: false }}
                                        required
                                        error={!!formStateErrors.last_name}
                                        helperText={formStateErrors.last_name?.message || ' '}
                                        color={dirtyFields.last_name && 'warning'}
                                        fullWidth
                                    />
                                </Stack>

                                <TextField
                                    id="phone_number"
                                    type="text"
                                    label="Puhelinnumero"
                                    placeholder="Käyttäjän puhelinnumero, muodossa 0401234567"
                                    {...register('phone_number', {
                                        required: { value: true, message: 'Käyttäjän puhelinnumero ei voi olla tyhjä' },
                                        maxLength: { value: 11, message: 'Puhelinnumero on liian pitkä' },
                                        minLength: {
                                            value: 10,
                                            message: 'Puhelinnumero on 10 merkkiä pitkä, muodossa 0401234567',
                                        },
                                    })}
                                    inputProps={{ required: false }}
                                    required
                                    error={!!formStateErrors.phone_number}
                                    helperText={formStateErrors.phone_number?.message || ' '}
                                    color={dirtyFields.phone_number && 'warning'}
                                />
                            </Stack>
                        </Grid>

                        {/* Address stuff */}
                        <Grid item xs={6} sx={{ padding: '0 1rem 0 0' }}>
                            <Box id="user-address-info-wrapper">
                                <TypographyHeading text="Osoitetiedot" />

                                {showAddressEditFields.aid ? (
                                    <Box sx={{ margin: '1rem 0 1rem 0' }}>
                                        <Typography variant="body2" gutterBottom>
                                            Osoitteen muokkaus:
                                        </Typography>

                                        <input value={addressId} {...register('aid')} type="hidden" />

                                        <TextField
                                            id={`useraddress-${showAddressEditFields.aid}`}
                                            type="text"
                                            label="Osoite"
                                            placeholder="Tavaran vastaanotto-osoite"
                                            {...register('address', {
                                                required: { value: true, message: 'Osoite ei voi olla tyhjä' },
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
                                            color={dirtyFields.address && 'warning'}
                                            fullWidth
                                            sx={{ marginTop: '1rem' }}
                                        />

                                        <Stack direction="row" spacing={1}>
                                            <TextField
                                                id="addresscity"
                                                type="text"
                                                label="Kaupunki"
                                                placeholder="Kaupunki"
                                                {...register('city', {
                                                    required: { value: true, message: 'Kaupunki ei voi olla tyhjä' },
                                                    maxLength: { value: 50, message: 'Kaupungin nimi on liian pitkä' },
                                                    minLength: {
                                                        value: 1,
                                                        message: 'Osoitteen kaupunki on vaadittu',
                                                    },
                                                })}
                                                inputProps={{ required: false }}
                                                required
                                                error={!!formStateErrors.city}
                                                helperText={formStateErrors.city?.message || ' '}
                                                color={dirtyFields.city && 'warning'}
                                                fullWidth
                                            />

                                            <TextField
                                                id="addresszipcode"
                                                type="text"
                                                label="Postinumero"
                                                placeholder="Postinumero"
                                                {...register('zip_code', {
                                                    required: { value: true, message: 'Postinumero ei voi olla tyhjä' },
                                                    maxLength: { value: 5, message: 'Postinumero on liian pitkä' },
                                                    minLength: {
                                                        value: 1,
                                                        message: 'Osoitteen postinumero on vaadittu',
                                                    },
                                                })}
                                                inputProps={{ required: false }}
                                                required
                                                error={!!formStateErrors.zip_code}
                                                helperText={formStateErrors.zip_code?.message || ' '}
                                                color={dirtyFields.zip_code && 'warning'}
                                                fullWidth
                                            />
                                        </Stack>
                                        <Button fullWidth onClick={closeAddressEdit}>
                                            Peruuta
                                        </Button>
                                    </Box>
                                ) : (
                                    <Stack
                                        id="address-boxes"
                                        direction="row"
                                        spacing={2}
                                        justifyContent="space-evenly"
                                        alignItems="center"
                                        sx={{ margin: '1rem 0 1rem 0' }}
                                    >
                                        {userInfo.address_list.map((item, index) => (
                                            <Box className="address-box" key={index}>
                                                <Typography>{item.address}</Typography>
                                                <Typography>{item.city}</Typography>
                                                <Typography>{item.zip_code}</Typography>
                                                <Typography>{item.id}</Typography>
                                                <Button
                                                    sx={{ marginTop: '1rem' }}
                                                    onClick={() => handleAddressEdit(item.id, index)}
                                                >
                                                    Muokkaa
                                                </Button>
                                            </Box>
                                        ))}
                                    </Stack>
                                )}
                            </Box>
                        </Grid>

                        {/* Auth groups */}
                        <Grid item xs={6}>
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
                                                        paddingLeft: 0,
                                                    }}
                                                    defaultChecked={userInfo.groups.includes(group.id)}
                                                    {...register('groups', { type: 'checkbox' })}
                                                    value={group.id}
                                                />
                                            }
                                            label={groupNames[group.name]}
                                            // onClick={() => console.log(`clicked checkboxs value: ${group.id}`)}
                                            sx={{ margin: 0, borderBottom: '1px solid #e0e0e0' }}
                                        />
                                    ))}
                                </Stack>
                            </Box>
                        </Grid>
                    </Grid>

                    {/* Btns */}
                    <Stack>
                        <Button
                            id="save-changes-btn"
                            type="submit"
                            sx={{
                                margin: '1rem 0 1rem 0',
                                '&:hover': {
                                    backgroundColor: 'success.dark',
                                },
                            }}
                            disabled={!isDirty}
                            onClick={() => setShowAddressEditFields({ aid: null, index: null })}
                        >
                            Hyväksy ja tallenna muutokset
                        </Button>
                        <Button id="cancel-btn" component={Link} to="/admin/kayttajat/" color="error">
                            Poistu tallentamatta
                        </Button>
                    </Stack>
                </Stack>
            </Box>
        </>
    );
}

export default UserEdit;
