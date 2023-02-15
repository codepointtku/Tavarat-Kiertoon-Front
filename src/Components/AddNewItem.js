/* eslint-disable react/jsx-props-no-spreading */
// import { useEffect, useState } from 'react';
// import { useNavigate, generatePath } from 'react-router';
import { useRouteLoaderData, useSubmit } from 'react-router-dom';
import PropTypes from 'prop-types';
// import Barcode from 'react-barcode';
import { TextField, Box, MenuItem, Button, Card, CardActions, CardContent } from '@mui/material';

import { useForm } from 'react-hook-form';

function AddNewItem({
    item,
    // uploadFile
}) {
    const data = useRouteLoaderData('storage');
    // const navigate = useNavigate();
    const submit = useSubmit();
    const {
        register,
        handleSubmit,
        watch,
        formState: { errors, isValid },
    } = useForm();
    // const onSubmit = (postData) => console.log(postData);

    // const handleChange = (key, event) => {
    //     setItem({ ...item, [key]: event.target.value });
    // };

    // const [validProduct, setValidProduct] = useState(false);

    // useEffect(() => {
    //     if (
    //         validator.isLength(String(item.name), { min: 3, max: 255 }) &&
    //         validator.isLength(String(item.barcode), { min: 1 }) &&
    //         validator.isLength(String(item.location), { min: 1 }) &&
    //         validator.isLength(String(item.category), { min: 1 }) &&
    //         validator.isLength(String(item.free_description), { min: 5 })
    //     ) {
    //         setValidProduct(true);
    //     } else {
    //         setValidProduct(false);
    //     }
    // });

    // const productCall = async () => {
    //     const testItem = {
    //         ...item,
    //         available: true,
    //         price: 999.0,
    //         shelf_id: 1,
    //         measurements: 'wrdrqwf',
    //         weight: 3.0,
    //         category: 1,
    //         storages: null,
    //         color: 1,
    //         pictures: [1],
    //     };
    //     const response = await axios.post('http://localhost:8000/products/', testItem);
    //     console.log(response.data);
    // };

    const description = watch('description');
    const name = watch('name');

    const onSubmit = (postData) => {
        console.log(errors);
        console.log(postData);

        const formData = {
            ...postData,
            available: true,
            price: 999.0,
            shelf_id: 1,
            measurements: 'wrdrqwf',
            weight: 3.0,
            category: 1,
            storages: 1,
            color: 1,
            pictures: [1],
        };
        submit(formData, {
            method: 'post',
            action: '/varasto/luo',
        });
    };

    return (
        <Card sx={{ maxWidth: '60vw' }}>
            <h2 align="center" style={{ textDecoration: 'underline' }}>
                Uusi tuote
            </h2>
            <Box
                align="center"
                component="form"
                onSubmit={handleSubmit(onSubmit)}
                sx={{
                    '& .MuiTextField-root': { m: 1, width: '40ch' },
                }}
                autoComplete="off"
            >
                <CardContent>
                    <TextField
                        // eslint-disable-next-line react/jsx-props-no-spreading
                        type="text"
                        placeholder="name"
                        {...register('name', { required: true, max: 255, min: 3 })}
                        required
                        label="Nimi"
                        multiline
                        helperText={`${name?.length || 0}/255`}
                        defaultValue={item.name}
                    />
                    <TextField
                        type="text"
                        placeholder="barcode"
                        {...register('barcode', { required: true, max: 12, min: 1 })}
                        required
                        // disabled
                        // id="outlined-disabled"
                        label="Viivakoodi"
                        defaultValue={item.barcode}
                    >
                        {item.barcode}
                    </TextField>
                    {/* <CardActions>
                        <Button
                            size="large"
                            onClick={() =>
                                navigate(generatePath('/varasto/koodinlukija'), {
                                    state: { ...item, returnpath: '/varasto/luo' },
                                })
                            }
                        >
                            Koodinlukija
                        </Button>
                        {item.barcode.length > 0 && <Barcode value={item.barcode} format="CODE39" />}
                    </CardActions> */}

                    <TextField
                        // required
                        id="outlined-select"
                        select
                        label="Sijainti"
                        {...register('location', { required: true })}
                        defaultValue=""
                    >
                        {data[1].map((location) => (
                            <MenuItem key={location.id} value={location.name}>
                                {location.name}
                            </MenuItem>
                        ))}
                    </TextField>
                    <TextField
                        required
                        id="outlined-select"
                        select
                        label="Kategoria"
                        {...register('category', { required: true })}
                        defaultValue=""
                    >
                        {data[0].map((category) => (
                            <MenuItem key={category.id} value={category.name}>
                                {category.name}
                            </MenuItem>
                        ))}
                    </TextField>
                    <TextField
                        id="filled-helperText"
                        label="Vapaa Kuvaus"
                        {...register('description', { required: true, max: 1000, min: 6 })}
                        multiline
                        helperText={`${description?.length || 0}/1000`}
                        defaultValue={item.free_description}
                    />
                    <CardActions>
                        {/* <Button variant="contained" component="label" size="large">
                            Lisää kuvat
                            <input
                                onChange={(event) => {
                                    uploadFile(event.target.files);
                                }}
                                hidden
                                accept="image/*"
                                multiple
                                type="file"
                            />
                        </Button> */}
                    </CardActions>
                    <CardActions>
                        <Button size="large" type="submit" disabled={!isValid}>
                            Lisää tuote
                        </Button>
                    </CardActions>
                </CardContent>
            </Box>
        </Card>
    );
}

AddNewItem.propTypes = {
    item: PropTypes.shape({
        id: PropTypes.number,
        barcode: PropTypes.string,
        name: PropTypes.string,
        category: PropTypes.string,
        location: PropTypes.string,
        free_description: PropTypes.string,
        isOld: PropTypes.bool,
    }).isRequired,
    // setItem: PropTypes.func.isRequired,
    uploadFile: PropTypes.func.isRequired,
};

export default AddNewItem;
