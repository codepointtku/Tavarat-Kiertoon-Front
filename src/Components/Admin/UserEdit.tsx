import { useLoaderData, useActionData } from 'react-router';
import { Form, useSubmit, Link } from 'react-router-dom';

import { useForm } from 'react-hook-form';

import {
    Box,
    Button,
    Checkbox,
    FormControlLabel,
    Stack,
    TextField,
    Typography,
    Grid,
    Container,
    Card,
    CardContent,
    CardActions,
    MenuItem,
} from '@mui/material';

import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import DoNotDisturbIcon from '@mui/icons-material/DoNotDisturb';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';

import AlertBox from '../AlertBox';
import TypographyHeading from '../TypographyHeading';
import HeroHeader from '../HeroHeader';
import HeroText from '../HeroText';

import type { userEditAction } from '../../Router/actions';
import type { userEditLoader } from '../../Router/loaders';
import Tooltip from '../Tooltip';

const groupNames = {
    user_group: 'Käyttäjä',
    admin_group: 'Ylläpitäjä',
    storage_group: 'Varastotyöntekijä',
    bicycle_group: 'Pyörävaltuutettu',
};

function UserEdit() {
    const { userInfo, userAuthGroups } = useLoaderData() as Awaited<ReturnType<typeof userEditLoader>>;
    const actionData = useActionData() as Awaited<ReturnType<typeof userEditAction>>;

    const creationDateInfo = [];
    const creationDate = new Date(userInfo.creation_date);
    creationDateInfo.push(creationDate.toLocaleDateString());
    creationDateInfo.push(creationDate.toLocaleTimeString());

    const lastLoginDateInfo = [];
    const lastLoginDate = new Date(userInfo.last_login!);
    lastLoginDateInfo.push(lastLoginDate.toLocaleDateString());
    lastLoginDateInfo.push(lastLoginDate.toLocaleTimeString());

    const {
        register,
        handleSubmit: createHandleSubmit,
        formState: { errors: formStateErrors, isDirty, dirtyFields, isValid },
    } = useForm({
        mode: 'all',
        defaultValues: {
            ...userInfo,
            // groups: userInfo.groups.map((group) => group.id),
        },
    });

    const submit = useSubmit();

    const handleSubmit = createHandleSubmit((data) => {
        // console.log('%c Submitissa menevä tieto', 'color: blue', data);
        console.log(data.group);
        submit(
            {
                first_name: data.first_name,
                last_name: data.last_name,
                phone_number: data.phone_number!,
                group: data.group,
            },
            {
                method: 'put',
            }
        );
    });

    return (
        <>
            {actionData?.type === 'userdataupdate' && actionData?.status === false && (
                <AlertBox text="Käyttäjätietojen tallennus epäonnistui" status="error" />
            )}

            {actionData?.type === 'userdataupdate' &&
                actionData?.status === false &&
                actionData.responseMsg === 'admins cannot edit their own permissions' && (
                    <AlertBox text="Ylläpitäjä ei voi muokata omia käyttöoikeuksiaan" status="warning" />
                )}

            {actionData?.type === 'userdataupdate' && actionData?.status && (
                <AlertBox
                    text="Käyttäjätiedot tallennettu onnistuneesti."
                    status="success"
                    timer={3000}
                    redirectUrl="/admin/kayttajat"
                />
            )}

            <Container maxWidth="xl">
                <HeroHeader Icon={<AccountCircleIcon />} hideInAdmin />
                <HeroText title={`Käyttäjä ${userInfo.email}`} />

                <Box id="user-edit-wrapper-form-component" component={Form} onSubmit={handleSubmit}>
                    <Stack id="stack-main">
                        <Grid container flexWrap="wrap">
                            {/* Common info */}
                            <Grid item xs={6}>
                                <Box
                                    sx={{
                                        display: 'flex',
                                        flexDirection: 'column',
                                    }}
                                >
                                    <Box id="user-common-info" sx={{ margin: '1rem 0 1rem 0' }}>
                                        <Typography>Käyttäjänimi: {userInfo.username}</Typography>
                                        <Typography>Käyttäjän tunnistenumero: {userInfo.id}</Typography>
                                        <Typography>
                                            Viimeisin sisäänkirjautuminen:{' '}
                                            {userInfo.last_login
                                                ? `${lastLoginDateInfo[0]} / ${lastLoginDateInfo[1]}`
                                                : 'Ei koskaan'}
                                        </Typography>
                                        <Typography>
                                            Rekisteröitymisaika: {creationDateInfo[0]} / {creationDateInfo[1]}
                                        </Typography>
                                        <Stack direction="row" sx={{ display: 'flex', alignItems: 'center' }}>
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
                                            // 'required: false' to disable browser error message
                                            inputProps={{ required: false }}
                                            required
                                            error={!!formStateErrors.first_name}
                                            helperText={formStateErrors.first_name?.message?.toString() || ' '}
                                            color={dirtyFields.first_name ? 'warning' : 'primary'}
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
                                            helperText={formStateErrors.last_name?.message?.toString() || ' '}
                                            color={dirtyFields.last_name ? 'warning' : 'primary'}
                                            fullWidth
                                        />
                                    </Stack>

                                    <TextField
                                        id="phone_number"
                                        type="text"
                                        label="Puhelinnumero"
                                        placeholder="Käyttäjän puhelinnumero, muodossa 0401234567"
                                        {...register('phone_number', {
                                            required: { value: true, message: 'Puhelinnumero on pakollinen' },
                                            minLength: { value: 7, message: 'Vähintään 7 merkkiä' },
                                            maxLength: { value: 15, message: 'Enintään 15 merkkiä' },
                                            pattern: {
                                                value: /^[0-9]+$/,
                                                message: 'Sisällön tulee koostua vain numeroista',
                                            },
                                        })}
                                        inputProps={{ required: false }}
                                        required
                                        error={!!formStateErrors.phone_number}
                                        helperText={formStateErrors.phone_number?.message?.toString() || ' '}
                                        color={dirtyFields.phone_number ? 'warning' : 'primary'}
                                    />
                                </Stack>
                            </Grid>

                            {/* Address stuff */}
                            <Grid item xs={6} sx={{ padding: '0 2rem 0 0' }}>
                                <Box id="user-address-info-wrapper" marginBottom="1rem">
                                    <TypographyHeading text="Osoitteet" />
                                    <Stack
                                        id="address-boxes"
                                        direction="row"
                                        gap={1}
                                        justifyContent="flex-start"
                                        alignItems="center"
                                        flexWrap="wrap"
                                        sx={{ margin: '1rem 0 0 0' }}
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
                                                        <Button
                                                            component={Link}
                                                            to={`/admin/kayttajat/${userInfo.id}/osoitteet/${item.id}`}
                                                        >
                                                            Muokkaa
                                                        </Button>
                                                    </CardActions>
                                                </Card>
                                            </Box>
                                        ))}
                                    </Stack>
                                </Box>
                                <Button
                                    component={Link}
                                    to={`/admin/kayttajat/${userInfo.id}/osoitteet/luo`}
                                    variant="text"
                                    size="small"
                                    startIcon={<AddCircleOutlineIcon />}
                                >
                                    Lisää osoite
                                </Button>
                            </Grid>

                            {/* Auth groups */}
                            <Grid item xs={6}>
                                <Box id="user-edition-checkboxes-wrapper">
                                    <TypographyHeading text="Käyttäjän käyttöoikeudet" />
                                    <Stack id="usergroups-checkboxes-stack-column" margin={'1rem 0 0 0'}>
                                        <TextField
                                            select
                                            defaultValue={''}
                                            required
                                            {...register('group', {
                                                required: {
                                                    value: true,
                                                    message: 'Käyttäjälle on valittava käyttöoikeus',
                                                },
                                            })}
                                        >
                                            {userAuthGroups.map((group) => (
                                                <MenuItem key={group.id} value={group.name}>
                                                    {group.name}
                                                </MenuItem>
                                            ))}
                                        </TextField>
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
                                disabled={!isDirty || !isValid}
                            >
                                Hyväksy ja tallenna muutokset
                            </Button>
                            <Stack direction="row" justifyContent="space-between">
                                <Tooltip title="Takaisin käyttäjät-listaukseen">
                                    <Button
                                        id="cancel-btn"
                                        size="small"
                                        component={Link}
                                        to="/admin/kayttajat/"
                                        startIcon={<ArrowBackIcon />}
                                        sx={{ margin: '2rem 0 1rem 0' }}
                                    >
                                        Poistu tallentamatta
                                    </Button>
                                </Tooltip>
                                <Tooltip title="Siirry poistamaan käyttäjä järjestelmästä">
                                    <Button
                                        id="cancel-btn"
                                        size="small"
                                        color="error"
                                        component={Link}
                                        to={`/admin/kayttajat/${userInfo.id}/poista/`}
                                        endIcon={<DeleteForeverIcon />}
                                        sx={{ margin: '2rem 0 1rem 0' }}
                                    >
                                        Käyttäjän poistonäkymä
                                    </Button>
                                </Tooltip>
                            </Stack>
                        </Stack>
                    </Stack>
                </Box>
            </Container>
        </>
    );
}

export default UserEdit;
