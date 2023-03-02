/* eslint-disable react/jsx-props-no-spreading */
// add new item
// import { useEffect, useState } from 'react';
// import { useNavigate, generatePath } from 'react-router';
import { useRouteLoaderData, useLoaderData, useSubmit, Form } from 'react-router-dom';
// import PropTypes from 'prop-types';
// import Barcode from 'react-barcode';
import { TextField, Box, MenuItem, Button, Card, CardActions, CardContent, Typography } from '@mui/material';
import imageCompression from 'browser-image-compression';

import { useForm } from 'react-hook-form';
// import axios from 'axios';

function AddNewItem() {
    const { categories } = useRouteLoaderData('root');
    const { storages } = useLoaderData();
    console.log('categories:', categories, 'storages:', storages);
    if (!storages || !categories) {
        return <>Esinetietojen lataus ei toimi.</>;
    }
    // const navigate = useNavigate();
    const submit = useSubmit();
    const {
        register,
        handleSubmit,
        watch,
        setValue,
        formState: { errors, isValid },
    } = useForm({
        defaultValues: {
            amount: 1,
            available: true,
            price: 99.0,
            group_id: '',
            shelf_id: '',
            measurements: 'wrdrqwf',
            weight: 0.0,
            // category: 1,
            storages: 1,
            color_name: 'Vihreä',
            color: 1,
            // pictures: [1],
        },
    });

    // TODO: validation with react-hook-form
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

    const description = watch('description');

    const onSubmit = (formData) => {
        console.log(errors);
        console.log('onSubmit formData:', formData);

        submit(formData, {
            method: 'post',
            action: '/varasto/tuotteet/luo/',
        });
    };

    const uploadFile = async (files) => {
        const options = {
            maxSizeMB: 1,
            useWebWorker: true,
        };

        const uploads = await Promise.all(Object.values(files).map(async (file) => imageCompression(file, options)));
        // // some code from kuvatestit:
        // // bring images to back-end with a call, then setItems into images brought back.
        // console.log(uploads);
        // const response = await axios.post('http://localhost:8000/pictures/', uploads, {
        //     headers: { 'content-type': 'multipart/form-data' },
        // });
        // console.log('axios pictures post', response.data);
        // setValue('pictures', response.data);
        setValue('pictures', uploads);
    };

    return (
        <Card sx={{ maxWidth: '60vw' }}>
            <h2 align="center" style={{ textDecoration: 'underline' }}>
                Uusi tuote
            </h2>
            <Box
                align="center"
                component={Form}
                onSubmit={handleSubmit(onSubmit)}
                sx={{
                    '& .MuiTextField-root': { m: 1, width: '40ch' },
                }}
                autoComplete="off"
            >
                <CardContent>
                    <TextField
                        type="text"
                        placeholder="name"
                        {...register('name', { required: 'Nimi on pakollinen', max: 255, min: 3 })}
                        label="Nimi"
                        multiline
                        // defaultValue={item.name}
                        defaultValue="testinimi"
                        // error={!!errors.name}
                        // helperText={errors.name?.message || `${name?.length || 0}/255`}
                    />
                    <Typography>{errors.name?.message}</Typography>
                    <TextField
                        type="text"
                        placeholder="barcode"
                        {...register('barcode', { required: true, max: 12, min: 1 })}
                        // disabled
                        // id="outlined-disabled"
                        label="Viivakoodi"
                        // defaultValue={item.barcode}
                        defaultValue="testiviivakoodi"
                    >
                        viivakoodi
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
                        {...register('storage_name', { required: true })}
                        defaultValue="Kahvivarasto"
                    >
                        {storages?.map((location) => (
                            <MenuItem key={location.id} value={location.name}>
                                {location.name}
                            </MenuItem>
                        ))}
                    </TextField>
                    <TextField
                        // required
                        id="outlined-select"
                        select
                        label="Kategoria"
                        {...register('category_name', { required: true })}
                        defaultValue="Keittiökamat"
                    >
                        {categories?.map((category) => (
                            <MenuItem key={category.id} value={category.name}>
                                {category.name}
                            </MenuItem>
                        ))}
                    </TextField>
                    <TextField
                        id="filled-helperText"
                        label="Vapaa Kuvaus"
                        {...register('free_description', { required: false, max: 1000 })}
                        multiline
                        helperText={`${description?.length || '0'}/1000`}
                        // defaultValue={item.free_description}
                        defaultValue="vapaa kuvaus testi"
                    />
                    <CardActions>
                        <Button variant="contained" component="label" size="large">
                            Lisää kuvat
                            <input
                                // {...register('pictures')}
                                // setValue in uploadFile
                                onChange={(event) => {
                                    uploadFile(event.target.files);
                                }}
                                hidden
                                accept="image/*"
                                multiple
                                type="file"
                            />
                        </Button>
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
    // item: PropTypes.shape({
    //     id: PropTypes.number,
    //     barcode: PropTypes.string,
    //     name: PropTypes.string,
    //     category: PropTypes.string,
    //     location: PropTypes.string,
    //     free_description: PropTypes.string,
    //     isOld: PropTypes.bool,
    // }).isRequired,
    // setItem: PropTypes.func.isRequired,
    // uploadFile: PropTypes.func.isRequired,
};

export default AddNewItem;
