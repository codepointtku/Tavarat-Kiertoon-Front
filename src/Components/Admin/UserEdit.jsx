import { useState, useRef } from 'react';

import { useLoaderData, useActionData } from 'react-router';
import { Form, useSubmit } from 'react-router-dom';

import { useForm } from 'react-hook-form';

import {
    TextField,
    Box,
    Button,
    Grid,
    Container,
    Checkbox,
    FormControlLabel,
    Typography,
    Stack,
    FormControl,
    InputLabel,
    OutlinedInput,
    InputAdornment,
} from '@mui/material';

import DriveFileRenameOutlineIcon from '@mui/icons-material/DriveFileRenameOutline';

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

function UserEditNew() {
    const loaderData = useLoaderData();
    // loaderData === [{}, []]
    const userInfo = loaderData[0];
    const groups = loaderData[1];

    //     {
    //     "id": 4,
    //     "address_list": [
    //         {
    //             "id": 4,
    //             "address": "Pythosentie 12",
    //             "zip_code": "22222",
    //             "city": "Lohja",
    //             "user": 4
    //         }
    //     ],
    //     "groups": [
    //         {
    //             "id": 1,
    //             "name": "user_group"
    //         }
    //     ],
    //     "last_login": null,
    //     "name": "Pekka Python",
    //     "email": "pekka.python@turku.fi",
    //     "creation_date": "2023-05-11T10:21:35.644039+03:00",
    //     "phone_number": "0401234567",
    //     "username": "pekka.python@turku.fi",
    //     "is_active": true
    // }

    const { register, handleSubmit: createHandleSubmit } = useForm({
        defaultValues: {
            ...userInfo,
            // groups: ['user_group'],
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

    return (
        <>
            {responseStatus?.type === 'update' && !responseStatus?.status && (
                <AlertBox text="Käyttäjätietojen tallennus epäonnistui. Lataa sivu uudestaan." status="error" />
            )}
            {responseStatus?.type === 'update' && responseStatus?.status && (
                <AlertBox text="Käyttäjätiedot tallennettu onnistuneesti" status="success" />
            )}

            <Container id="user-edit-form-container-x-center" maxWidth="sm">
                <Stack id="user-edit-stack-column">
                    <TypographyTitle text="Muokkaa käyttäjän x tietoja" />
                    <Box id="user-edition-wrapper-form-component" component={Form} onSubmit={handleSubmit}>
                        <Stack id="user-edition-fields-stack-column">
                            <FormControl sx={{ mt: 1 }} variant="outlined" fullWidth>
                                <InputLabel htmlFor="user-edition-field-name">Muokkaa nimeä</InputLabel>
                                <OutlinedInput
                                    {...register('name')}
                                    id="user-edition-field-name"
                                    type="text"
                                    label="Nimi"
                                    placeholder="etu suku"
                                    endAdornment={
                                        <InputAdornment position="end">
                                            <DriveFileRenameOutlineIcon />
                                        </InputAdornment>
                                    }
                                />
                            </FormControl>

                            <FormControl sx={{ mt: 1 }} variant="outlined" fullWidth>
                                <InputLabel htmlFor="user-edition-field-phonenumber">Muokkaa puhelinnumeroa</InputLabel>
                                <OutlinedInput
                                    {...register('phone_number')}
                                    id="user-edition-field-phonenumber"
                                    type="text"
                                    label="Puhelinnumero"
                                    placeholder="010 123 1234"
                                    endAdornment={
                                        <InputAdornment position="end">
                                            <DriveFileRenameOutlineIcon />
                                        </InputAdornment>
                                    }
                                />
                            </FormControl>

                            <FormControl sx={{ mt: 1 }} variant="outlined" fullWidth>
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
                            </FormControl>
                        </Stack>
                        <Stack id="usergroups-edit-stack-column">
                            {/* Tämä ei ole nyt Formin sisällä */}
                            <TypographyHeading text="Käyttäjän käyttöoikeudet" />
                            {/* <Box id="user-edition-checkboxes"> */}
                            {groups.map((group) => (
                                <FormControlLabel
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

function UserEdit() {
    const userData = useLoaderData();
    const [userState, setUserState] = useState(userData[0]);
    const groups = userData[1];

    const responseStatus = useActionData();

    const submit = useSubmit();

    const [isOpen, setIsOpen] = useState(false);

    const eventRef = useRef();
    console.log('eventRef:', eventRef);

    const handleChange = (key, event, group) => {
        if (key === 'groups') {
            if (event.target.checked) {
                setUserState({ ...userState, [key]: userState.groups.concat(group.id) });
            } else {
                setUserState({ ...userState, [key]: userState.groups.filter((group_) => group_ !== group.id) });
            }
        } else {
            setUserState({ ...userState, [key]: event.target.value });
        }
    };

    const checkChange = (key) => {
        if (userState[key] === userData[0][key]) {
            return false;
        }
        return true;
    };

    const revertChange = (key) => {
        setUserState({ ...userState, [key]: userData[0][key] });
    };

    const handleConfirm = (confirm) => {
        if (confirm) {
            submit(eventRef.current, { method: 'post' });
        }
        setIsOpen(false);
    };

    return (
        <Stack>
            <Box
                id="wanha-out-box"
                sx={{ border: '1px solid red', backgroundColor: 'lightcoral', marginBottom: '6rem' }}
            >
                <ConfirmWindow
                    open={isOpen}
                    onConfirm={handleConfirm}
                    title="Tallennetaanko käyttäjän tiedot?"
                    content={userData[0].name}
                />

                <Form
                    method="post"
                    onSubmit={(event) => {
                        event.preventDefault();
                        setIsOpen(true);
                        eventRef.current = event.currentTarget;
                    }}
                >
                    <h1 align="center">Muokkaa käyttäjää {userData[0].id}</h1>

                    <Box id="inner-box" sx={{ border: '1px solid blue' }}>
                        <Container id="container-inner" maxWidth="md" sx={{ border: '1rem solid pink' }}>
                            <Grid id="inner-grid" container sx={{ border: '1rem solid blue' }}>
                                <Grid item xs={4} sx={{ border: '1px solid cyan' }}>
                                    <TextField
                                        disabled
                                        fullWidth
                                        defaultValue={userData[0].name}
                                        label="Alkuperäinen nimi"
                                    />
                                </Grid>
                                <Grid item xs={4} sx={{ border: '1px solid cyan' }}>
                                    <TextField
                                        name="name"
                                        label="Muokkaa nimeä"
                                        fullWidth
                                        focused={checkChange('name')}
                                        onChange={(event) => {
                                            handleChange('name', event);
                                        }}
                                        value={userState.name}
                                    />
                                </Grid>
                                <Grid item xs={4} sx={{ border: '1px solid cyan' }}>
                                    <Button
                                        sx={{ mt: '8px', ml: '1rem' }}
                                        onClick={() => {
                                            revertChange('name');
                                        }}
                                    >
                                        Peruuta muutokset
                                    </Button>
                                </Grid>
                                <Grid item xs={4}>
                                    <TextField
                                        disabled
                                        fullWidth
                                        defaultValue={userData[0].username}
                                        label="Alkuperäinen käyttäjänimi"
                                    />
                                </Grid>
                                <Grid item xs={4}>
                                    <TextField
                                        name="username"
                                        label="Muokkaa käyttäjänimeä"
                                        fullWidth
                                        focused={checkChange('username')}
                                        onChange={(event) => {
                                            handleChange('username', event);
                                        }}
                                        value={userState.username}
                                    />
                                </Grid>
                                <Grid item xs={4}>
                                    <Button
                                        sx={{ mt: '8px', ml: '1rem' }}
                                        onClick={() => {
                                            revertChange('username');
                                        }}
                                    >
                                        Peruuta muutokset
                                    </Button>
                                </Grid>
                                <Grid item xs={4}>
                                    <TextField
                                        disabled
                                        fullWidth
                                        defaultValue={userData[0].phone_number}
                                        label="Alkuperäinen numero"
                                    />
                                </Grid>
                                <Grid item xs={4}>
                                    <TextField
                                        name="phone_number"
                                        label="Muokkaa puhelinnumeroa"
                                        fullWidth
                                        focused={checkChange('phone_number')}
                                        onChange={(event) => {
                                            handleChange('phone_number', event);
                                        }}
                                        value={userState.phone_number}
                                    />
                                </Grid>
                                <Grid item xs={4}>
                                    <Button
                                        sx={{ mt: '8px', ml: '1rem' }}
                                        onClick={() => {
                                            revertChange('phone_number');
                                        }}
                                    >
                                        Peruuta muutokset
                                    </Button>
                                </Grid>

                                <Grid item xs={4}>
                                    <TextField
                                        disabled
                                        fullWidth
                                        defaultValue={userData[0].email}
                                        label="Alkuperäinen sähköposti"
                                    />
                                </Grid>
                                <Grid item xs={4}>
                                    <TextField
                                        name="email"
                                        label="Muokkaa sähköpostia"
                                        fullWidth
                                        focused={checkChange('email')}
                                        onChange={(event) => {
                                            handleChange('email', event);
                                        }}
                                        value={userState.email}
                                    />
                                </Grid>
                                <Grid item xs={4}>
                                    <Button
                                        sx={{ mt: '8px', ml: '1rem' }}
                                        onClick={() => {
                                            revertChange('email');
                                        }}
                                    >
                                        Peruuta muutokset
                                    </Button>
                                </Grid>

                                <Grid item xs={8} sx={{ border: '4px solid lightgreen' }}>
                                    <Box sx={{ border: '6px solid black' }}>
                                        <Typography padding="0.5rem">Muokkaa käyttöoikeuksia</Typography>
                                        <Grid item xs={12} alignItems="start">
                                            {groups.map((group) => (
                                                <FormControlLabel
                                                    name="groups"
                                                    key={group.id}
                                                    onChange={(event) => {
                                                        handleChange('groups', event, group);
                                                    }}
                                                    checked={userState.groups.includes(group.id)}
                                                    control={<Checkbox />}
                                                    label={group.name}
                                                    value={group.id}
                                                />
                                            ))}
                                        </Grid>
                                    </Box>
                                </Grid>

                                <Grid item xs={4} sx={{ border: '4px solid lightgreen' }}>
                                    <Button
                                        sx={{ mt: '2.6rem', ml: '1rem' }}
                                        onClick={() => {
                                            revertChange('groups');
                                        }}
                                    >
                                        Peruuta muutokset
                                    </Button>
                                </Grid>
                            </Grid>
                        </Container>
                    </Box>

                    {responseStatus?.type === 'update' && !responseStatus?.status && (
                        <AlertBox
                            text="Käyttäjän tallennus epäonnistui! Lataa sivu uudestaan."
                            status="error"
                            timer={3000}
                        />
                    )}
                    {responseStatus?.type === 'update' && responseStatus?.status && (
                        <AlertBox text="Käyttäjän tallennus onnistui!" status="success" timer={3000} />
                    )}

                    <h5 align="center">
                        <Button type="submit">Tallenna käyttäjän tiedot</Button>
                    </h5>
                </Form>
            </Box>
            <UserEditNew />
        </Stack>
    );
}

export default UserEdit;
