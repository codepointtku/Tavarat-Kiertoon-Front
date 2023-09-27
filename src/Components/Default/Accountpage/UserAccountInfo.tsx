import { useForm } from 'react-hook-form';
import { Form, Link, useSubmit, useRouteLoaderData, useActionData } from 'react-router-dom';

import {
    TextField,
    Typography,
    Button,
    Container,
    Stack,
    Box,
    Card,
    CardContent,
    CardActions,
    Divider,
} from '@mui/material';

import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';

import AlertBox from '../../AlertBox';
import HeroText from '../../HeroText';
import TypographyHeading from '../../TypographyHeading';

import type { userInfoLoader } from '../../../Router/loaders';
import type { userAccountPageAction } from '../../../Router/actions';
import type { SubmitHandler, FieldValues } from 'react-hook-form/dist/types';

interface FormData extends SubmitHandler<FieldValues> {
    [key: string]: string | null;
    username: string;
    first_name: string;
    last_name: string;
    phone_number: string | null;
    email: string;
    userAddress: string;
}

type SubmitTarget =
    | HTMLFormElement
    | {
          [name: string]: string;
      }
    | null;

interface GroupObject {
    id: number;
    name: string;
}

interface AddressObject {
    id: number;
    address: string;
    zip_code: string;
    city: string;
    user: number;
}

const groupNames = {
    user_group: 'oikeus tilata tuotteita',
    admin_group: 'ylläpitäjän oikeudet',
    storage_group: 'varastotyöntekijän oikeudet',
    bicycle_group: 'oikeus tilata pyöriä',
};

function UserAccountInfo() {
    const { userInfo } = useRouteLoaderData('account') as Awaited<ReturnType<typeof userInfoLoader>>;
    const responseStatus = useActionData() as Awaited<ReturnType<typeof userAccountPageAction>>;

    const creationDate = new Date(userInfo.creation_date).toLocaleDateString('fi-FI');

    const lastLoginDateInfo = [];
    const lastLoginDate = new Date(userInfo.last_login!);
    lastLoginDateInfo.push(lastLoginDate.toLocaleDateString('fi-FI'));
    lastLoginDateInfo.push(lastLoginDate.toLocaleTimeString('fi-FI'));

    const userGroups = userInfo.groups
        .map((group: GroupObject) => groupNames[group.name as keyof typeof groupNames])
        .join(', ');

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
            email: userInfo.email,
        },
    });

    const submit = useSubmit();

    const onSubmit = (data: FormData) => {
        const formData = { ...data };
        Object.assign(formData, { id: userInfo.id });
        submit(formData as SubmitTarget, { method: 'put', action: '/tili' });
        reset(formData);
    };

    const onClickLogOut = () => {
        submit(null, {
            method: 'post',
            action: '/',
        });
    };

    return (
        <>
            {responseStatus?.status && responseStatus.type === 'userinfoupdated' && (
                <AlertBox text="Käyttäjätiedot päivitetty onnistuneesti." status="success" />
            )}

            <Container id="acc-info-container" maxWidth="md">
                <HeroText
                    title={`Hei, ${userInfo.username}`}
                    subtext2={
                        userInfo.last_login
                            ? `Kirjauduit viimeksi ${lastLoginDateInfo[0]} kello ${lastLoginDateInfo[1]}`
                            : 'Tervetuloa tilin hallinnointi-sivulle.'
                    }
                />
                <Box id="user-common-info">
                    <Typography variant="body2">Käyttäjänimi: {userInfo.username}</Typography>
                    <Typography variant="body2">Tilin sähköposti: {userInfo.email}</Typography>
                    <Typography variant="body2">Rekisteröitymispäivämäärä: {creationDate}</Typography>
                    <Divider sx={{ margin: '1rem 0 1rem 0' }} />
                    <Typography variant="body2">Tilillä on {userGroups}</Typography>
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

                        <Button
                            type="submit"
                            disabled={!isDirty || !isValid}
                            sx={{
                                '&:hover': {
                                    backgroundColor: 'success.dark',
                                },
                            }}
                        >
                            Vahvista muutokset
                        </Button>
                    </Stack>
                </Box>

                {/* Address stuff */}
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
                        {userInfo.address_list.map((item: AddressObject) => (
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

                        <Button id="logout-btn" variant="outlined" onClick={onClickLogOut}>
                            Kirjaudu ulos
                        </Button>
                    </Stack>
                </Stack>
            </Container>
        </>
    );
}

export default UserAccountInfo;
