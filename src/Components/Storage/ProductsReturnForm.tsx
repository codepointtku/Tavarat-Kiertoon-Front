import { useLoaderData, useNavigation, useActionData } from 'react-router';
import { type productItemsReturnLoader } from '../../Router/loaders';
import { useForm, type FieldValues } from 'react-hook-form';
import { Form, useSubmit } from 'react-router-dom';
import { Button, TextField, Typography } from '@mui/material';
import { returnProductsAction } from '../../Router/actions';
import AlertBox from '../AlertBox';

function ProductsReturnForm() {
    const { amountData } = useLoaderData() as Awaited<ReturnType<typeof productItemsReturnLoader>>;
    const responseStatus = useActionData() as Awaited<ReturnType<typeof returnProductsAction>>;
    const navigation = useNavigation();
    //  // custom hook for accessing the context value and getting nice typings, recommended by react-router-dom docs:
    // const { product } = useProduct();
    // const {
    //     name,
    //     free_description,
    //     amount,
    //     measurements,
    //     weight,
    //     colors,
    //     product_items,
    //     pictures,
    //     price,
    //     // category_name,
    //     category,

    // } = product;
    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
    } = useForm({ mode: 'onTouched' });
    const submit = useSubmit();

    const onSubmit = (formData: FieldValues) => {
        // const {id} = product
        console.log('submitting');
        submit(formData, { method: 'post' });
        reset();
    };

    return (
        <>
            {/* {responseStatus?.type === 'returnProduct' && !responseStatus?.status && (
                <AlertBox text="Palautus epäonnistui" status="error" timer={5000} />
            )}
            {responseStatus?.type === 'returnProduct' && responseStatus?.status && (
                <AlertBox text="Palautus onnistui" status="success" timer={2000} />
            )} */}
            <Typography variant="subtitle1">Palautettavissa: {amountData[0].amount || '0'} kpl</Typography>
            <Form onSubmit={handleSubmit(onSubmit)}>
                <TextField
                    {...register('amount', {
                        required: { value: true, message: 'Syötä määrä' },
                        min: { value: 1, message: 'Vähintään 1 kpl' },
                        max: { value: amountData[0].amount, message: `Palautettavissa ${amountData[0].amount} kpl` },
                        disabled: navigation.state === 'loading' || navigation.state === 'submitting',
                    })}
                    type="number"
                    error={!!errors.amount}
                    helperText={errors?.amount?.message?.toString() || 'Syötä varastolle palaava määrä'}
                />
                <Button
                    type="submit"
                    size="large"
                    sx={{ marginLeft: 1, marginY: 0.6 }}
                    disabled={navigation.state === 'loading' || navigation.state === 'submitting'}
                >
                    Vahvista
                </Button>
            </Form>
        </>
    );
}

export default ProductsReturnForm;
