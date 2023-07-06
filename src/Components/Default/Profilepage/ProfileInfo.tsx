import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Form, Link, useSubmit, useRouteLoaderData, useActionData } from 'react-router-dom';

import { Grid, TextField, Typography, MenuItem, Button } from '@mui/material';
import AlertBox from '../../AlertBox';

import type { userInfoLoader } from '../../../Router/loaders';
import { SubmitHandler, FieldValues } from 'react-hook-form/dist/types';

interface FormData extends SubmitHandler<FieldValues> {
    [key: string]: string | null;
    username: string;
    first_name: string;
    last_name: string;
    phone_number: string | null;
    email: string;
    userAddress: string;
}

interface ResponseStatus {
    type: string;
    status: number;
}

type SubmitTarget =
    | HTMLFormElement
    | {
          [name: string]: string;
      }
    | null;

function ProfileInfo() {
    const { userInfo } = useRouteLoaderData('profile') as Awaited<ReturnType<typeof userInfoLoader>>;
    const submit = useSubmit();
    const responseStatus = useActionData() as ResponseStatus;
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
        submit(formData as SubmitTarget, { method: 'put', action: '/profiili' });
    };

    const selectedAddressInfo = userInfo.address_list.filter(
        (addressInfo: { address: string }) => addressInfo.address === selectedAddress
    );

    return (
        <Grid
            container
            component={Form}
            onSubmit={handleSubmit(onSubmit as FormData)}
            justifyContent="center"
            sx={{ p: 2 }}
        >
            {responseStatus?.status && <AlertBox text="Käyttäjätiedot päivitetty onnistuneesti." status="success" />}
            <Typography variant="h5" color="primary.main" sx={{ mb: 2 }}>
                Käyttäjäprofiilin tiedot
            </Typography>
            <Grid container id="user-info-container" direction="row" justifyContent="space-evenly" sx={{ mb: 5 }}>
                <Grid container sx={{ width: '50%' }} direction="column" alignItems="center" gap={2}>
                    <Grid item>
                        <TextField {...register('first_name')} label="Etunimi" placeholder="Etunimi" />
                    </Grid>
                    <Grid item>
                        <TextField {...register('last_name')} label="Sukunimi" placeholder="Sukunimi" />
                    </Grid>
                    <Grid item>
                        <TextField {...register('phone_number')} label="Puhelin numero" placeholder="Puhelin numero" />
                    </Grid>
                </Grid>
                <Grid container sx={{ width: '50%' }} direction="column" gap={2}>
                    <Grid container direction="row" justifyContent="center" gap={1}>
                        <Grid item>
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
                        </Grid>
                        <Grid item>
                            <Button
                                component={Link}
                                to={`osoitetiedot/${selectedAddressInfo[0].id}`}
                                state={{ ...selectedAddressInfo[0], action: 'modify' }}
                                sx={{ p: 2 }}
                            >
                                Muokkaa
                            </Button>
                        </Grid>
                        <Grid item>
                            <Button
                                component={Link}
                                to={`osoitetiedot/${selectedAddressInfo[0].id}`}
                                state={{ ...selectedAddressInfo[0], action: 'create' }}
                                sx={{ p: 2 }}
                            >
                                Luo uusi
                            </Button>
                        </Grid>
                    </Grid>
                    <Grid container direction="row" justifyContent="center" gap={1}>
                        <Grid item>
                            <TextField {...register('email')} label="Sähköposti" placeholder="Sähköposti" disabled />
                        </Grid>
                        <Grid item>
                            <Button component={Link} to="/sahkopostinvaihto" sx={{ p: 2, mr: 13.5 }}>
                                Muokkaa
                            </Button>
                        </Grid>
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
