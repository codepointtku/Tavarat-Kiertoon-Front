import { useLocation, Form, useSubmit, useActionData } from 'react-router-dom';
import { useForm } from 'react-hook-form';

import { Box, TextField, Grid, Button } from '@mui/material';
import HeroHeader from '../../HeroHeader';
import HeroText from '../../HeroText';
import AlertBox from '../../AlertBox';
import BusinessIcon from '@mui/icons-material/Business';
import { SubmitHandler, FieldValues } from 'react-hook-form/dist/types';

interface Data extends SubmitHandler<FieldValues> {
    [key: string]: string;
    address: string;
    city: string;
    zip_code: string;
}

interface CurrAddressInfo {
    id: string;
    action: 'modify' | 'create';
    address: string;
    city: string;
    zip_code: string;
}

interface ResponseStatus {
    type: 'addressCreated' | 'addressModified';
    status: boolean;
}

function ModifyAddressInfo() {
    const submit = useSubmit();
    const { state: addressInfo } = useLocation();
    addressInfo !== null && localStorage.setItem('addressInfo', JSON.stringify(addressInfo));
    const currAddressInfo = JSON.parse(localStorage.getItem('addressInfo') as string) as unknown as CurrAddressInfo;
    const responseStatus = useActionData() as ResponseStatus;
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({
        defaultValues: {
            address: currAddressInfo.action === 'modify' ? currAddressInfo.address : '',
            city: currAddressInfo.action === 'modify' ? currAddressInfo.city : '',
            zip_code: currAddressInfo.action === 'modify' ? currAddressInfo.zip_code : '',
        },
    });

    function onSubmit(data: Data) {
        if (currAddressInfo.action === 'modify') {
            const dataWithId = { ...data, id: currAddressInfo.id };
            submit(dataWithId, { method: 'put', action: `/profiili/osoitetiedot/${currAddressInfo.id}` });
        } else {
            submit(data, { method: 'post', action: `/profiili/osoitetiedot/${currAddressInfo.id}` });
        }
    }

    return (
        <Box sx={{ p: 2 }}>
            {responseStatus?.status && (
                <AlertBox
                    text={
                        currAddressInfo.action === 'create'
                            ? 'Osoite luotu onnistuneesti'
                            : 'Osoitteen tietoja muokattu onnistuneesti'
                    }
                    status="success"
                    timer={5000}
                    redirectUrl="/profiili"
                />
            )}
            <HeroHeader Icon={<BusinessIcon />} />
            <HeroText title={currAddressInfo.action === 'create' ? 'Luo uusi osoite' : 'Muokkaa osoitetietoja'} />
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
                        {currAddressInfo.action === 'create' ? 'Luo uusi osoite' : 'Muokkaa osoitetietoja'}
                    </Button>
                </Grid>
            </Grid>
        </Box>
    );
}

export default ModifyAddressInfo;
