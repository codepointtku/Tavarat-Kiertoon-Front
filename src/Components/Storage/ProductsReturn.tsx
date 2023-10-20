import { Form, useOutletContext, useSubmit } from 'react-router-dom';
import { Box, Button, TextField } from '@mui/material';
import StyledTableRow from '../StyledTableRow';
// import { useProduct } from './StorageProductsTable';
import { useForm } from 'react-hook-form';

// interface Props {
//     id: number;
// }

function ProductsReturn() {
    //  // custom hook for accessing the context value, recommended by react-router-dom docs:
    // const id = useProduct();
    const id: number = useOutletContext();
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();
    const submit = useSubmit();
    // submit id and returning amount
    // show picture for visual confirmation
    // show shelf info, storage name? "add to same storage/shelf as other products, or create new product" ?

    const onSubmit = () => {
        console.log('submitting');
    };

    return (
        <Box>
            ProductsReturn: {id}
            <Form method="post" onSubmit={handleSubmit(onSubmit)}>
                <input hidden name="addId" type="number" value={id} readOnly />
                <TextField {...register('amount')} type="number" />
                <Button type="submit">Vahvista</Button>
            </Form>
        </Box>
    );
}

export default ProductsReturn;
