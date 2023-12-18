import { useLoaderData, useNavigation, useActionData } from 'react-router';
import { useForm, type FieldValues } from 'react-hook-form';
import { Form, useSubmit } from 'react-router-dom';
import { Button, TextField, Typography } from '@mui/material';
import { type productItemsReturnLoader } from '../../Router/loaders';
import { type retireProductsAction } from '../../Router/actions';
import AlertBox from '../AlertBox';

function ProductsRetireForm() {
    const { product } = useLoaderData() as Awaited<ReturnType<typeof productItemsReturnLoader>>;
    const responseStatus = useActionData() as Awaited<ReturnType<typeof retireProductsAction>>;
    const navigation = useNavigation();

    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
    } = useForm({ mode: 'onTouched' });
    const submit = useSubmit();

    const onSubmit = (formData: FieldValues) => {
        console.log('submitting');
        submit(formData, { method: 'post' });
        reset();
    };

    return (
        <>
            {responseStatus?.type === 'retireProduct' && responseStatus?.status === false && (
                <AlertBox text="Toiminto epäonnistui" status="error" timer={5000} />
            )}
            {responseStatus?.type === 'retireProduct' && responseStatus?.status === true && (
                <AlertBox
                    text="Toiminto onnistui"
                    status="success"
                    redirectUrl={location.pathname.includes('admin') ? '/admin/tuotteet/' : '/varasto/tuotteet/'}
                    timer={2000}
                />
            )}
            <Typography variant="subtitle1">Poista tuotteita pysyvästi</Typography>
            {/* <Typography variant="subtitle1">Poistettavissa: {product.amount || '0'} kpl</Typography> */}
            <Form onSubmit={handleSubmit(onSubmit)}>
                <TextField
                    {...register('amount', {
                        required: { value: true, message: 'Syötä määrä' },
                        min: { value: 1, message: 'Vähintään 1 kpl' },
                        max: { value: product?.amount, message: `Poistettavissa ${product?.amount} kpl` },
                        disabled: navigation.state === 'loading' || navigation.state === 'submitting',
                    })}
                    type="number"
                    error={!!errors.amount}
                    helperText={errors?.amount?.message?.toString() || 'Syötä poistettava määrä'}
                />
                <Button
                    type="submit"
                    color="error"
                    size="large"
                    sx={{ marginLeft: 1, marginY: 0.6 }}
                    disabled={navigation.state === 'loading' || navigation.state === 'submitting'}
                >
                    Vahvista poisto
                </Button>
            </Form>
        </>
    );
}

export default ProductsRetireForm;
