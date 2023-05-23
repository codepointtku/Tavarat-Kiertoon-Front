import { useState, useRef } from 'react';

import { useLoaderData, useActionData } from 'react-router';
import { Form, useSubmit } from 'react-router-dom';

import { useForm } from 'react-hook-form';

import { Box, Button, Container, Checkbox, FormControlLabel, Stack, TextField } from '@mui/material';

import AlertBox from '../AlertBox';
import ConfirmWindow from './ConfirmWindow';
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
    const groups = loaderData[1];

    const {
        register,
        handleSubmit: createHandleSubmit,
        formState,
    } = useForm({
        mode: 'onTouched',
        defaultValues: {
            ...userInfo,
            groups: { user_group: true },
        },
    });

    const submit = useSubmit();

    const handleSubmit = createHandleSubmit((data) => {
        const formData = { ...data };
        submit(formData, {
            method: 'post',
            action: '/jokuURL',
        });
    });

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

    const responseStatus = useActionData();

    const [isOpen, setIsOpen] = useState(false);
    const [userState, setUserState] = useState(loaderData[0]);
    const eventRef = useRef();

    const checkChange = (key) => {
        if (userState[key] === loaderData[0][key]) {
            return false;
        }
        return true;
    };

    const revertChange = (key) => {
        setUserState({ ...userState, [key]: loaderData[0][key] });
    };

    const handleConfirm = (confirm) => {
        if (confirm) {
            submit(eventRef.current, { method: 'post' });
        }
        setIsOpen(false);
    };

    return (
        <>
            {responseStatus?.type === 'update' && !responseStatus?.status && (
                <AlertBox text="Käyttäjätietojen tallennus epäonnistui. Lataa sivu uudestaan." status="error" />
            )}
            {responseStatus?.type === 'update' && responseStatus?.status && (
                <AlertBox text="Käyttäjätiedot tallennettu onnistuneesti" status="success" />
            )}

            <ConfirmWindow
                open={isOpen}
                onConfirm={handleConfirm}
                title="Tallennetaanko käyttäjän tiedot?"
                content={loaderData[0].name}
            />

            <Container id="user-edit-form-container-x-center" maxWidth="sm">
                <Stack id="user-edit-stack-column">
                    <TypographyTitle text="Muokkaa käyttäjän x tietoja" />
                    <Box id="user-edition-wrapper-form-component" component={Form} onSubmit={handleSubmit}>
                        <Stack id="user-edition-fields-stack-column" sx={{ padding: '1rem' }}>
                            <TextField
                                id="textfield-fname"
                                type="text"
                                label="Etunimi"
                                placeholder="Käyttäjän etunimi"
                                {...register('first_name', {
                                    required: { value: true, message: 'Käyttäjän nimi ei voi olla tyhjä' },
                                    maxLength: { value: 50, message: 'Etunimi on liian pitkä, maksimi 50 merkkiä' },
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
                                    maxLength: { value: 50, message: 'Sukunimi on liian pitkä, maksimi 50 merkkiä' },
                                })}
                                inputProps={{ required: false }}
                                required
                                error={!!formState.errors.last_name}
                                helperText={formState.errors.last_name?.message || ' '}
                            />

                            <TextField
                                id="phone_number"
                                type="text"
                                label="Puhelinnumero"
                                placeholder="Käyttäjän puhelinnumero"
                                {...register('phone_number', {
                                    required: { value: true, message: 'Käyttäjän puhelinnumero ei voi olla tyhjä' },
                                    maxLength: { value: 30, message: 'Puhelinnumero ei oo noi pitkä hei' },
                                    minLength: { value: 3, message: 'Puhelinnnumero ei oo kyl ton pitune oikeesti' },
                                })}
                                inputProps={{ required: false }}
                                required
                                error={!!formState.errors.phone_number}
                                helperText={formState.errors.phone_number?.message}
                            />

                            {/* <FormControl sx={{ mt: 1 }} variant="outlined" fullWidth>
                                <InputLabel htmlFor="user-edition-field-username">Muokkaa käyttäjänimeä</InputLabel>
                                <OutlinedInput
                                    {...register('username')}
                                    id="user-edition-field-username"
                                    type="text"
                                    label="Käyttäjänimi"
                                    placeholder="joku@turku.fi"
                                    endAdornment={
                                        <InputAdornment position="end">
                                            <DriveFileRenameOutlineIcon />
                                        </InputAdornment>
                                    }
                                />
                            </FormControl>

                            <FormControl sx={{ mt: 1 }} variant="outlined">
                                <InputLabel htmlFor="user-edition-field-email">Muokkaa sähköpostiosoitetta</InputLabel>
                                <OutlinedInput
                                    {...register('email')}
                                    id="user-edition-field-email"
                                    type="text"
                                    label="Sähköpostiosoite"
                                    placeholder="joku@turku.fi"
                                    endAdornment={
                                        <InputAdornment position="end">
                                            <DriveFileRenameOutlineIcon />
                                        </InputAdornment>
                                    }
                                />
                            </FormControl>

                            <FormControl sx={{ mt: 1 }} variant="outlined" fullWidth>
                                <InputLabel htmlFor="user-edition-field-address">Muokkaa osoitetta</InputLabel>
                                <OutlinedInput
                                    {...register('address_list.0.address')}
                                    id="user-edition-field-address"
                                    type="text"
                                    label="Tavaran vastaanotto-osoite"
                                    placeholder="Katu 123"
                                    endAdornment={
                                        <InputAdornment position="end">
                                            <DriveFileRenameOutlineIcon />
                                        </InputAdornment>
                                    }
                                />
                            </FormControl> */}
                        </Stack>
                        <Stack id="usergroups-edit-stack-column">
                            <TypographyHeading text="Käyttäjän käyttöoikeudet" />
                            {/* <Box id="user-edition-checkboxes"> */}
                            {groups.map((group) => (
                                <FormControlLabel
                                    sx={{ border: '1px solid black' }}
                                    name={`groups.${group.name}`}
                                    key={group.id}
                                    {...register(`groups.${group.name}`)}
                                    // onChange={(event) => {
                                    //     handleChange('groups', event, group);
                                    // }}
                                    // checked={userState.groups.includes(group.id)}
                                    control={<Checkbox />}
                                    label={groupNames[group.name]}
                                    value={group.name}
                                />
                            ))}
                            {/* </Box> */}
                            <Button sx={{ mt: 3, mb: 3 }} fullWidth type="submit">
                                Hyväksy ja tallenna muutokset
                            </Button>
                        </Stack>
                    </Box>
                </Stack>
            </Container>
        </>
    );
}

export default UserEdit;
