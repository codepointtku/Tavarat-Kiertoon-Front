import { useNavigation, useNavigate } from 'react-router';
import { useForm, type FieldValues } from 'react-hook-form';
import { Form } from 'react-router-dom';
import { Button, TextField, Typography } from '@mui/material';
import { useProduct } from './StorageProductsTable';
import axios from 'axios';
import apiCall from '../../Utils/apiCall';
import { useContext } from 'react';
import AuthContext from '../../Context/AuthContext';
import { productsApi } from '../../api';
function ProductsAddForm() {
    const navigation = useNavigation();
    //  // custom hook for accessing the context value and getting nice typings, recommended by react-router-dom docs:
    const { product } = useProduct();

    const {
        register,
        formState: { errors },
        reset,
        getValues,
        handleSubmit,
    } = useForm({ mode: 'onTouched' });

    const { auth, setAuth } = useContext(AuthContext);
    const navigate = useNavigate();
    const onSubmit = async () => {
        const { id } = product;
        const addamount = getValues('amount');
        console.log(addamount);
        productsApi.productsAddCreate(id, { amount: addamount });
        navigate(`/varasto/tuotteet/${id}/toiminnot`);
        reset();
    };

    return (
        <>
            <Typography variant="subtitle1">Lisättävät tuotteet:</Typography>
            <Form onSubmit={handleSubmit(onSubmit)}>
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

export default ProductsAddForm;
