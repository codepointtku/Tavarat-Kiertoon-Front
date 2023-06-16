import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Form, Link, useSubmit, useRouteLoaderData } from 'react-router-dom';
import { Grid, TextField, Typography, MenuItem, Button } from '@mui/material';
import type { userInfoLoader } from '../../../Router/loaders';
import { SubmitHandler } from 'react-hook-form/dist/types';

interface FormData {
    [key: string]: string;
    username: string;
    first_name: string;
    last_name: string;
    phone_number: string;
    email: string;
    userAddress: string;
}

// interface Submit extends SubmitHandler<FormData> {
//     first_name: string;
//     last_name: string;
//     phone_number: string;
// }

function ProfileInfo() {
    const { userInfo } = useRouteLoaderData('profile') as Awaited<ReturnType<typeof userInfoLoader>>;
    const submit = useSubmit();
    const address = userInfo.address_list.map((item) => item.address);
    const [selectedAddress, setSelectedAddress] = useState(address[0]);

    const {
        register,
        handleSubmit,
        formState: { isDirty },
    } = useForm({
        defaultValues: {
            username: userInfo.username,
            first_name: userInfo.first_name,
            last_name: userInfo.last_name,
            phone_number: userInfo.phone_number,
            userAddress: address[0],
            email: userInfo.email,
        },
    });

    const onSubmit = (data: FormData) => {
        const formData = { ...data };
        Object.assign(formData, { id: userInfo.id });
        submit(data, { method: 'put', action: '/profiili' });
    };

    const selectedAddressInfo = userInfo.address_list.filter((addressInfo) => addressInfo.address === selectedAddress);

    // Submit ei toimi | Typescript error

    return (
        <Grid container component={Form} onSubmit={handleSubmit(() => onSubmit)} justifyContent="center" sx={{ p: 2 }}>
            <Typography variant="h5" color="primary.main" sx={{ mb: 2 }}>
                Käyttäjäprofiilin tiedot
            </Typography>
            <Grid container id="user-info-container" direction="row" justifyContent="space-evenly" sx={{ mb: 5 }}>
                <Grid container direction="column" alignContent="center" xs={6} gap={2}>
                    <Grid item>
                        <TextField {...register('username')} label="Käyttäjänimi" placeholder="Käyttäjänimi" />
                    </Grid>
                    <Grid item>
                        <TextField {...register('first_name')} label="Etunimi" placeholder="Etunimi" />
                    </Grid>
                    <Grid item>
                        <TextField {...register('last_name')} label="Sukunimi" placeholder="Sukunimi" />
                    </Grid>
                </Grid>
                <Grid container direction="column" alignItems="center" xs={6} gap={2}>
                    <Grid item>
                        <TextField {...register('phone_number')} label="Puhelin numero" placeholder="Puhelin numero" />
                    </Grid>
                    <Grid item sx={{ ml: '13.25rem' }}>
                        <TextField
                            {...register('userAddress')}
                            value={selectedAddress}
                            label="Osoitteet"
                            placeholder="Osoitteet"
                            onChange={(event) => setSelectedAddress(event.target.value)}
                            sx={{ minWidth: 210 }}
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
                            state={selectedAddressInfo[0]}
                            sx={{ ml: 2, p: 2 }}
                        >
                            Muokkaa
                        </Button>
                        <Button
                            component={Link}
                            to={`osoitetiedot/${selectedAddressInfo[0].id}`}
                            state={selectedAddressInfo[0]}
                            sx={{ ml: 2, p: 2 }}
                        >
                            Luo uusi
                        </Button>
                    </Grid>
                    <Grid item sx={{ ml: 13.5 }}>
                        <TextField {...register('email')} label="Sähköposti" placeholder="Sähköposti" disabled />
                        <Button component={Link} to="/sahkopostinvaihto" sx={{ ml: 2, p: 2 }}>
                            Muokkaa
                        </Button>
                    </Grid>
                </Grid>
            </Grid>
            {isDirty && (
                <Button sx={{ width: 200, p: 2 }} type="submit">
                    Vahvista muutokset
                </Button>
            )}
        </Grid>
    );
}

export default ProfileInfo;
