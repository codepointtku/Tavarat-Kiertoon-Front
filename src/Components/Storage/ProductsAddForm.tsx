import { useLoaderData, useNavigation, useActionData } from 'react-router';
import { type productItemsReturnLoader } from '../../Router/loaders';
import { useForm, type FieldValues } from 'react-hook-form';
import { Form, useSubmit } from 'react-router-dom';
import { Button, TextField, Typography } from '@mui/material';
import { type returnProductsAction } from '../../Router/actions';
import AlertBox from '../AlertBox';
import { useProduct } from './StorageProductsTable';
import axios from 'axios';

function ProductsReturnForm() {
    const navigation = useNavigation();
    //  // custom hook for accessing the context value and getting nice typings, recommended by react-router-dom docs:
    const { product } = useProduct();
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
        formState: { errors },
        reset,
        getValues,
    } = useForm({ mode: 'onTouched' });

    const onSubmit = (event) => {
        event.preventDefault();
        const { id } = product;
        const amount = getValues('amount');
        axios.post(`products/${id}/add/`, { amount: amount });
        reset();
    };

    return (
        <>
            <Typography variant="subtitle1">Lisättävät tuotteet:</Typography>
            <Form>
                <TextField
                    {...register('amount', {
                        required: { value: true, message: 'Syötä määrä' },
                        min: { value: 1, message: 'Vähintään 1 kpl' },
                        disabled: navigation.state === 'loading' || navigation.state === 'submitting',
                    })}
                    type="number"
                    error={!!errors.amount}
                    helperText={errors?.amount?.message?.toString() || 'Syötä varastolle lisättävä määrä'}
                />
                <Button
                    onClick={onSubmit}
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
