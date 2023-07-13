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
        mode: 'onTouched',
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
                            ? 'Osoite luotu onnistuneesti. Sinut ohjataan pian takaisin profiilisivulle.'
                            : 'Osoitteen tietoja muokattu onnistuneesti. Sinut ohjataan pian takaisin profiilisivulle.'
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
                        {...register('address', {
                            required: 'Tämä kenttä on täytettävä',
                            minLength: { value: 2, message: 'Sisältö on liian lyhyt' },
                            maxLength: { value: 255, message: 'Sisältö on liian pitkä' },
                        })}
                        label="Osoite"
                        placeholder="Osoite"
                        error={!!errors.address}
                        helperText={errors.address?.message?.toString() || ' '}
                        sx={{ width: '150%' }}
                    />
                </Grid>
                <Grid item>
                    <TextField
                        {...register('city', {
                            required: 'Tämä kenttä on täytettävä',
                            minLength: { value: 2, message: 'Sisältö on liian lyhyt' },
                            maxLength: { value: 255, message: 'Sisältö on liian pitkä' },
                        })}
                        label="Kaupunki"
                        placeholder="Kaupunki"
                        error={!!errors.city}
                        helperText={errors.city?.message?.toString() || ' '}
                        sx={{ width: '150%' }}
                    />
                </Grid>
                <Grid item>
                    <TextField
                        {...register('zip_code', {
                            required: 'Tämä kenttä on täytettävä',
                            minLength: { value: 2, message: 'Sisältö on liian lyhyt' },
                            maxLength: { value: 10, message: 'Sisältö on liian pitkä' },
                            pattern: { value: /^\d+$/, message: 'Sisällön täytyy koostua vain numeroista' },
                        })}
                        label="Postinumero"
                        placeholder="Postinumero"
                        error={!!errors.zip_code}
                        helperText={errors.zip_code?.message?.toString() || ' '}
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
