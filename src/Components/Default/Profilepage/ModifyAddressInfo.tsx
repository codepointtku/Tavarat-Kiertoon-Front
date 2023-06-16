import { useLocation, Form, useSubmit, useActionData } from 'react-router-dom';
import { useForm } from 'react-hook-form';

import { Box, TextField, Grid, Button } from '@mui/material';
import HeroHeader from '../../HeroHeader';
import HeroText from '../../HeroText';
import BusinessIcon from '@mui/icons-material/Business';
import { SubmitHandler, FieldValues } from 'react-hook-form/dist/types';

interface Data extends SubmitHandler<FieldValues> {
    [key: string]: string;
    address: string;
    city: string;
    zip_code: string;
}

function ModifyAddressInfo() {
    const submit = useSubmit();
    const { state: addressInfo } = useLocation();
    const responseStatus = useActionData();
    console.log('AddressInfo action: ', addressInfo.action);
    console.log(responseStatus);
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({
        defaultValues: {
            address: addressInfo.action === 'modify' ? addressInfo.address : '',
            city: addressInfo.action === 'modify' ? addressInfo.city : '',
            zip_code: addressInfo.action === 'modify' ? addressInfo.zip_code : '',
        },
    });

    function onSubmit(data: Data) {
        if (addressInfo.action === 'modify') {
            submit(data, { method: 'put', action: '/profiili/osoitetiedot/:id' });
        }
        const dataWithId = { ...data, id: addressInfo.id };
        submit(dataWithId, { method: 'post', action: '/profiili/osoitetiedot/:id' });
    }

    return (
        <Box sx={{ p: 2 }}>
            <HeroHeader Icon={<BusinessIcon />} />
            <HeroText title={addressInfo.action === 'create' ? 'Luo uusi osoite' : 'Muokkaa osoitetietoja'} />
            <Grid
                container
                component={Form}
                onSubmit={handleSubmit(onSubmit as Data)}
                direction="column"
                alignContent="center"
                gap={2}
            >
                <Grid item>
                    <TextField
                        {...register('address', { required: true, minLength: 1, maxLength: 255 })}
                        label="Osoite"
                        placeholder="Osoite"
                        sx={{ width: '150%' }}
                    />
                </Grid>
                <Grid item>
                    <TextField
                        {...register('city', { required: true, minLength: 1, maxLength: 255 })}
                        label="Kaupunki"
                        placeholder="Kaupunki"
                        sx={{ width: '150%' }}
                    />
                </Grid>
                <Grid item>
                    <TextField
                        {...register('zip_code', { required: true, minLength: 1, maxLength: 10 })}
                        label="Postinumero"
                        placeholder="Postinumero"
                        sx={{ width: '150%' }}
                    />
                </Grid>
                <Grid item>
                    <Button type="submit" fullWidth>
                        {addressInfo.action === 'create' ? 'Luo uusi osoite' : 'Muokkaa osoitetietoja'}
                    </Button>
                </Grid>
            </Grid>
        </Box>
    );
}

export default ModifyAddressInfo;
