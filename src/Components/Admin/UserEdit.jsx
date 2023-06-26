import { useState } from 'react';

import { useLoaderData, useActionData } from 'react-router';
import { Form, useSubmit, Link } from 'react-router-dom';

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
    // todo: re-render after submit, helpertexts indicating edited fields

    const loaderData = useLoaderData();
    // loaderData === [{}, []]
    const userInfo = loaderData[0];
    const allGroups = loaderData[1];

    const responseStatus = useActionData();

    const {
        register,
        handleSubmit: createHandleSubmit,
        formState: { errors: formStateErrors, isDirty, dirtyFields },
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

    const [showAddressEditFields, setShowAddressEditFields] = useState({ aid: null, aindex: null });

    const handleAddressEdit = (aid, aindex) => {
        setShowAddressEditFields({ aid: aid, aindex: aindex });
    };

    const AddressEdit = () => {
        // todo:
        // register fields with index
        // fix input focus bug
        // create functionality to modify only one field at a time
        // cancel button
        // go minigolfing
        // eat some pizza
        // fix the world
        // profit

        return (
            <Box sx={{ margin: '1rem 0 1rem 0' }}>
                <Typography variant="body2" gutterBottom>
                    Osoitteen muokkaus:
                </Typography>
                <TextField
                    // id={`useraddress-${showAddressEditFields.aid}`}
                    type="text"
                    label="Osoite"
                    placeholder="Tavaran vastaanotto-osoite"
                    fullWidth
                    // {...register(`address_list[${showAddressEditFields.aindex}].address`, {
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
                    sx={{ marginTop: '1rem' }}
                />
                <Stack direction="row" spacing={1}>
                    <TextField
                        id="addresscity"
                        type="text"
                        label="Kaupunki"
                        placeholder="Kaupunki"
                        // {...register(`address_list[${showAddressEditFields.aindex}].city`, {
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
                    />

                    <TextField
                        id="addresszipcode"
                        type="text"
                        label="Postinumero"
                        placeholder="Postinumero"
                        // {...register(`address_list[${showAddressEditFields.aindex}].zip_code`, {
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
                        error={!!formStateErrors.zipcode}
                        helperText={formStateErrors.zipcode?.message || ' '}
                        color={dirtyFields.zip_code && 'warning'}
                    />
                </Stack>
            </Box>
        );
    };

    const creationDateInfo = [];
    const creationDate = new Date(userInfo.creation_date);
    creationDateInfo.push(creationDate.toLocaleDateString());
    creationDateInfo.push(creationDate.toLocaleTimeString());

    const lastLoginDateInfo = [];
    const lastLoginDate = new Date(userInfo.last_login);
    lastLoginDateInfo.push(lastLoginDate.toLocaleDateString());
    lastLoginDateInfo.push(lastLoginDate.toLocaleTimeString());

    return (
        <>
            {responseStatus?.type === 'update' && !responseStatus?.status && (
                <AlertBox text="Käyttäjätietojen tallennus epäonnistui. Lataa sivu uudestaan." status="error" />
            )}
            {responseStatus?.type === 'update' && responseStatus?.status && (
                <AlertBox text="Käyttäjätiedot tallennettu onnistuneesti" status="success" />
            )}

            <Container id="user-edit-form-container-x-center" maxWidth="xs">
                <TypographyTitle text={`Käyttäjä ${userInfo.email}`} />
                <Box id="user-common-info" sx={{ margin: '1rem 0 1rem 0' }}>
                    <Typography>
                        Rekisteröitymispäivämäärä: {creationDateInfo[0]} / {creationDateInfo[1]}
                    </Typography>
                    <Stack direction="row">
                        <Typography>Tili aktivoitu: </Typography>
                        {userInfo.creation_date ? (
                            <CheckCircleOutlineIcon color="success" fontSize="small" sx={{ marginLeft: '0.4rem' }} />
                        ) : (
                            <DoNotDisturbIcon color="error" fontSize="small" sx={{ marginLeft: '0.4rem' }} />
                        )}
                    </Stack>
                    <Typography>
                        Viimeisin sisäänkirjautuminen:{' '}
                        {userInfo.last_login ? `${lastLoginDateInfo[0] / lastLoginDateInfo[1]}` : 'Ei koskaan'}
                    </Typography>
                    <Typography>Käyttäjän tunnistenumero: {userInfo.id}</Typography>
                </Box>
                {/* User info form */}
                <Box
                    id="user-edition-wrapper-form-component"
                    component={Form}
                    onSubmit={handleSubmit}
                    sx={{ margin: '2rem 0 1rem 0' }}
                >
                    <Stack id="user-edition-fields-stack-column">
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
                                // Needs to be required: false to disable browser error message
                                inputProps={{ required: false }}
                                required
                                error={!!formStateErrors.first_name}
                                helperText={formStateErrors.first_name?.message || ' '}
                                color={dirtyFields.first_name && 'warning'}
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
                            />
                        </Stack>

                        <TextField
                            id="phone_number"
                            type="text"
                            label="Puhelinnumero"
                            placeholder="Käyttäjän puhelinnumero, muodossa 0401234567"
                            {...register('phone_number', {
                                required: { value: true, message: 'Käyttäjän puhelinnumero ei voi olla tyhjä' },
                                maxLength: { value: 30, message: 'Puhelinnumero on liian pitkä' },
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

                        <Box id="user-address-info-wrapper">
                            <TypographyHeading text="Käyttäjän osoitetiedot" />
                            {showAddressEditFields.aid ? (
                                <AddressEdit />
                            ) : (
                                <Stack
                                    id="address-boxes"
                                    direction="row"
                                    spacing={2}
                                    justifyContent="space-between"
                                    alignItems="center"
                                    sx={{ margin: '1rem 0 1rem 0' }}
                                >
                                    {userInfo.address_list.map((item, index) => (
                                        <Box className="address-box" key={index} sx={{ padding: '0 0 1rem 0' }}>
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
                        onClick={() => setShowAddressEditFields({ aid: null, index: null })}
                    >
                        Hyväksy ja tallenna muutokset
                    </Button>
                </Box>
                <Button id="cancel-btn" component={Link} to="/admin/kayttajat/" fullWidth color="error">
                    Poistu tallentamatta
                </Button>
            </Container>
        </>
    );
}

export default UserEdit;
