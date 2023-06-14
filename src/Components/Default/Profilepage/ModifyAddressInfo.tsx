import { useLocation, Form, useSubmit } from 'react-router-dom';
import { useForm } from 'react-hook-form';

import { Box, TextField, Grid, Button } from '@mui/material';
import HeroHeader from '../../HeroHeader';
import HeroText from '../../HeroText';
import BusinessIcon from '@mui/icons-material/Business';
import { SubmitHandler, FieldValues } from 'react-hook-form/dist/types';

interface Data extends SubmitHandler<FieldValues> {
    address: string;
    city: string;
    zip_code: string;
}

function ModifyAddressInfo() {
    const submit = useSubmit();
    const { state: addressInfo } = useLocation();
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();

    function onSubmit(data: Data) {
        console.log(data);
    }

    return (
        <Box sx={{ p: 2 }}>
            <HeroHeader Icon={<BusinessIcon />} />
            <HeroText title="Luo uusi osoite" />
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
                        {...register('zip_code', { required: true, minLength: 1, maxLength: 255 })}
                        label="Postinumero"
                        placeholder="Postinumero"
                        sx={{ width: '150%' }}
                    />
                </Grid>
                <Grid item>
                    <Button type="submit" fullWidth>
                        Luo uusi osoite
                    </Button>
                </Grid>
            </Grid>
        </Box>
    );
}

export default ModifyAddressInfo;
