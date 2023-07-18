import { useLoaderData, useActionData } from 'react-router';
import { Form, useSubmit, Link } from 'react-router-dom';

import { useForm } from 'react-hook-form';

import { Box, Button, Checkbox, FormControlLabel, Stack, TextField, Typography, Grid, Container } from '@mui/material';

import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import DoNotDisturbIcon from '@mui/icons-material/DoNotDisturb';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';

import AlertBox from '../AlertBox';
import TypographyHeading from '../TypographyHeading';
import HeroHeader from '../HeroHeader';
import HeroText from '../HeroText';

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

    const actionData = useActionData();
    console.log('sdfsf:', actionData);

    const creationDateInfo = [];
    const creationDate = new Date(userInfo.creation_date);
    creationDateInfo.push(creationDate.toLocaleDateString());
    creationDateInfo.push(creationDate.toLocaleTimeString());

    const lastLoginDateInfo = [];
    const lastLoginDate = new Date(userInfo.last_login);
    lastLoginDateInfo.push(lastLoginDate.toLocaleDateString());
    lastLoginDateInfo.push(lastLoginDate.toLocaleTimeString());

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

    const submit = useSubmit();

    const handleSubmit = createHandleSubmit((data) => {
        // console.log('%c Submitissa menevä tieto', 'color: blue', data);
        submit(data, {
            method: 'put',
        });
        reset();
    });

    return (
        <>
            {actionData?.type === 'update' && actionData?.status === false && (
                <AlertBox text="Käyttäjätietojen tallennus epäonnistui. Lataa sivu uudestaan." status="error" />
            )}
            {actionData?.type === 'update' && actionData?.status && (
                <AlertBox text="Käyttäjätiedot tallennettu onnistuneesti" status="success" />
            )}

            <Container maxWidth="lg">
                <HeroHeader Icon={<AccountCircleIcon />} />
                <HeroText title={`Käyttäjä ${userInfo.email}`} />

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
                                    {/* <TypographyTitle text={`Käyttäjä ${userInfo.email}`} /> */}
                                    <Box id="user-common-info" sx={{ margin: '1rem 0 1rem 0' }}>
                                        <Typography>
                                            Rekisteröitymisaika: {creationDateInfo[0]} / {creationDateInfo[1]}
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
                                                required: {
                                                    value: true,
                                                    message: 'Käyttäjän sukunimi ei voi olla tyhjä',
                                                },
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
                                            required: {
                                                value: true,
                                                message: 'Käyttäjän puhelinnumero ei voi olla tyhjä',
                                            },
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
                                    <TypographyHeading text="Osoitteet" />
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
                                                <Typography>Tunniste: {item.id}</Typography>
                                            </Box>
                                        ))}
                                    </Stack>
                                    <Button
                                        component={Link}
                                        to={`/admin/kayttajat/${userInfo.id}/osoitteenmuokkaus`}
                                        sx={{ marginTop: '1rem' }}
                                    >
                                        Osoitetietojen muokkaus
                                    </Button>
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
                                    margin: '4rem 0 1rem 0',
                                    '&:hover': {
                                        backgroundColor: 'success.dark',
                                    },
                                }}
                                disabled={!isDirty}
                            >
                                Hyväksy ja tallenna muutokset
                            </Button>
                            <Button id="cancel-btn" component={Link} to="/admin/kayttajat/" color="error">
                                Poistu tallentamatta
                            </Button>
                        </Stack>
                    </Stack>
                </Box>
            </Container>
        </>
    );
}

export default UserEdit;
