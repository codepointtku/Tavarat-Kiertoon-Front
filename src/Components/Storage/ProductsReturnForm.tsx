import { useLoaderData, useNavigation } from 'react-router';
import { type productItemsReturnLoader } from '../../Router/loaders';
import { useForm, type FieldValues } from 'react-hook-form';
import { Form, useSubmit } from 'react-router-dom';
import { Button, TextField, Typography } from '@mui/material';

function ProductsReturnForm() {
    const { amount } = useLoaderData() as Awaited<ReturnType<typeof productItemsReturnLoader>>;
    // const { categories } = useRouteLoaderData('storageProducts') as Awaited<ReturnType<typeof storageProductsLoader>>;
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
    // console.log(name, free_description, amount, measurements, weight, colors, product_items, pictures, price, category);
    // console.log(product);
    console.log('amount', amount);

    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
    } = useForm({ mode: 'onTouched' });
    const submit = useSubmit();
    // show shelf info, storage name? "add to same storage/shelf as other products, or create new product" ?

    const onSubmit = (formData: FieldValues) => {
        // const {id} = product
        console.log('submitting');
        submit(formData, { method: 'post' });
        reset();
    };

    return (
        <>
            <Typography variant="subtitle1">Palautettavissa: {amount.amount || '0'} kpl</Typography>
            <Form onSubmit={handleSubmit(onSubmit)}>
                <TextField
                    {...register('amount', {
                        required: { value: true, message: 'Syötä määrä' },
                        min: { value: 1, message: 'Vähintään 1 kpl' },
                        // TODO: show only those that are not in shopping cart, retired, or in storage?

                        max: { value: amount.amount, message: `Palautettavissa ${amount.amount} kpl` },
                        // valueAsNumber: true,
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
