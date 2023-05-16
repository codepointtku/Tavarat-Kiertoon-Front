/* eslint-disable react/jsx-props-no-spreading */
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import {
    useRouteLoaderData,
    useLoaderData,
    useSubmit,
    Form,
    useNavigate,
    // useActionData,
} from 'react-router-dom';

import { TextField, Box, MenuItem, Button, Card, CardActions, CardContent, Modal } from '@mui/material';

// import imageCompression from 'browser-image-compression';
import Html5QrcodePlugin from '../../Utils/qrcodeScanner';
import Barcode from 'react-barcode';

import TypographyTitle from '../TypographyTitle';

function AddNewItem() {
    const [qrScanOpen, setQrScanOpen] = useState(false);
    const { categories } = useRouteLoaderData('root');
    const { storages, colors } = useLoaderData();
    console.log('categories:', categories, 'storages:', storages, 'colors:', colors);
    const submit = useSubmit();
    const navigate = useNavigate();
    // const actionData = useActionData();

    const {
        register,
        handleSubmit,
        watch,
        setValue,
        formState: {
            errors,
            // isValid can be used in disabling submit button
            // isValid,
        },
    } = useForm({
        // validates and shows errors when fields have been touched and lost focus
        mode: 'onTouched',
        defaultValues: {
            amount: 1,
            available: true,
            price: 99.0,
            shelf_id: '',
            measurements: 'wrdrqwf',
            weight: 0.0,
            // storages: 1,
            // pictures: [1],
            // name: '',
            // barcode: '',
            // location: 'testi',
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

    const description = watch('free_description');
    const barcode = watch('barcode');

    const onSubmit = async (data) => {
        const formData = new FormData();
        Object.keys(data).forEach((key) => {
            if (key !== 'pictures') formData.append(key, data[key]);
        });
        Object.values(data.pictures).forEach((value) => formData.append('pictures[]', value));

        console.log('pictures AddNewItemissä', formData.get('pictures'));
        console.log('onSubmit formData:', formData);

        /* await apiCall(auth, setAuth, '/products/', 'post', formData, {
            headers: { 'Content-Type': 'multipart/form-data' },
        }); */

        await submit(formData, {
            method: 'post',
            action: '/varasto/tuotteet/luo/',
            encType: 'multipart/form-data',
        });
        // todo change redirect to useActionData
        navigate('/varasto/tuotteet/');
    };

    // // TODO: add image compression

    // const uploadFile = async (files) => {
    //     const options = {
    //         maxSizeMB: 1,
    //         useWebWorker: true,
    //     };

    //     const uploads = await Promise.all(Object.values(files).map(async (file) => imageCompression(file, options)));
    //     // // some code from kuvatestit branch, could be reused if pictures need to be sent before sending whole form:
    //     // // bring images to back-end with a call, then setItems into images brought back.
    //     // console.log(uploads);
    //     // const response = await axios.post('http://localhost:8000/pictures/', uploads, {
    //     //     headers: { 'content-type': 'multipart/form-data' },
    //     // });
    //     // console.log('axios pictures post', response.data);
    //     // setValue('pictures', response.data);
    //     setValue('pictures', uploads);
    // };

    // QR code scanner
    const onNewScanResult = (decodedText, decodedResult) => {
        setQrScanOpen(false);
        setValue('barcode', decodedText);
    };

    console.log('errors', errors);

    return (
        <Card>
            <Modal
                open={qrScanOpen}
                onClose={() => {
                    setQrScanOpen(false);
                }}
                justifyContent="center"
            >
                <Box width={700}>
                    <Html5QrcodePlugin
                        fps={10}
                        qrbox={250}
                        disableFlip={false}
                        qrCodeSuccessCallback={onNewScanResult}
                    />
                </Box>
            </Modal>
            <Box padding={2}>
                <TypographyTitle text="Uusi tuote" />
            </Box>

            <Box
                component={Form}
                onSubmit={handleSubmit(onSubmit)}
                sx={{
                    '& .MuiTextField-root': { m: 1, width: '40ch' },
                }}
                autoComplete="off"
            >
                <CardContent>
                    <TextField
                        id="name"
                        type="text"
                        label="Nimi *"
                        placeholder="Nimi *"
                        multiline
                        {...register('name', {
                            required: { value: true, message: 'Nimi on pakollinen' },
                            maxLength: { value: 255, message: 'Nimi on liian pitkä, maksimi 255 merkkiä' },
                            minLength: { value: 3, message: 'Nimi on liian lyhyt, minimi 3 merkkiä' },
                        })}
                        // Needs to be required: false to disable browser error message
                        inputProps={{ required: true }}
                        required
                        error={!!errors.name}
                        helperText={errors.name?.message}
                    />
                    <TextField
                        id="barcode"
                        type="text"
                        label="Viivakoodi"
                        placeholder="viivakoodi *"
                        {...register('barcode', {
                            required: {
                                value: true,
                                message: 'Viivakoodi on pakollinen',
                            },
                            minLength: 1,
                            maxLength: { value: 12, message: 'Viivakoodi on liian pitkä, maksimi 12 merkkiä' },
                            pattern: {
                                value: /^[A-Za-z0-9\-.*$/+%\s]+$/gu,
                                message:
                                    'Viivakoodityypin CODE39 sallitut kirjaimet: Numerot, Englanninkieliset aakkoset, merkit -  .  *  /  +  %  sekä välilyönti',
                            },
                        })}
                        error={!!errors.barcode}
                        helperText={errors.barcode?.message}
                        inputProps={{ required: true }}
                        required
                    >
                        Viivakoodi
                    </TextField>
                    <CardActions>
                        <Button size="large" onClick={() => setQrScanOpen(true)}>
                            Viivakoodinlukija
                        </Button>
                        {barcode?.length > 0 && <Barcode value={barcode} format="CODE39" height={32} fontSize={14} />}
                    </CardActions>
                    <TextField
                        id="storage-select"
                        select
                        label="Sijainti"
                        {...register('storages', { required: true })}
                        //  TODO default varastosijainti sama kuin varastokäyttäjätilin sijainti?
                        // defaultValue={}
                        inputProps={{ required: true }}
                        required
                    >
                        {storages?.map((location) => (
                            <MenuItem key={location.id} value={location.id}>
                                {location.name}
                            </MenuItem>
                        ))}
                    </TextField>
                    <TextField
                        id="category-select"
                        select
                        label="Kategoria"
                        {...register('category', { required: true })}
                        inputProps={{ required: true }}
                        required
                    >
                        {/* TODO Uusia kategorioita voi luoda vain admin, huomautus varastokäyttäjälle? */}
                        {categories?.map((category) => (
                            <MenuItem
                                onClick={() => setValue('category', category.id)}
                                key={category.id}
                                value={category.id}
                            >
                                {category.name}
                            </MenuItem>
                        ))}
                    </TextField>
                    {/* TODO värikenttä, uuden värin lisäys mahdollisuus, backend hyväksyy(?) stringin ja luo uuden ellei ole olemassa. Lisäkenttä lisää uusi väri */}
                    <TextField
                        id="color-select"
                        select
                        label="Väri"
                        {...register('color', { required: true })}
                        inputProps={{ required: true }}
                        required
                    >
                        <MenuItem
                        // onClick={() => setValue()}
                        // key={color.id}
                        // value={color.name}
                        >
                            {/* TODO värin nimen oltava muotoa iso alkukirjain, ilman välejä, muutettava oikeaksi ennen lähetystä jottei tule "meren sininen" ja "Merensininen" */}
                            <Button variant="contained">Luo uusi</Button>
                        </MenuItem>
                        {colors?.map((color) => (
                            <MenuItem onClick={() => setValue('color', color.id)} key={color.id} value={color.name}>
                                {color.name}
                            </MenuItem>
                        ))}
                    </TextField>
                    <TextField
                        id="amount"
                        type="number"
                        label="Määrä"
                        placeholder="Määrä"
                        {...register('amount', {
                            required: { value: true, message: 'Määrä on pakollinen' },
                            max: { value: 1000, message: '1000 on maksimimäärä' },
                            min: { value: 1, message: '1 on minimimäärä' },
                            pattern: { value: '[0-9]*', message: 'Määrä on numero' },
                        })}
                        inputProps={{
                            inputMode: 'numeric',
                            pattern: '[0-9]*',
                            title: 'Määrä',
                            min: '1',
                            max: '1000',
                            required: true,
                        }}
                        error={!!errors.amount}
                        helperText={errors.amount?.message}
                    ></TextField>
                    <TextField
                        id="description"
                        label="Vapaa Kuvaus"
                        multiline
                        minRows={4}
                        {...register('free_description', { required: true, minLength: 2, maxLength: 1000 })}
                        helperText={`${description?.length || 0}/1000`}
                        inputProps={{ title: 'Vapaa kuvaus', minLength: '2', maxLength: '1000' }}
                        required
                        error={!!errors.free_description}
                    />
                    <CardActions>
                        <Button variant="contained" component="label" size="large">
                            Lisää kuvat
                            <input
                                {...register('pictures', { required: true })}
                                // setValue in uploadFile
                                // onChange={(event) => {
                                //     uploadFile(event.target.files);
                                // }}
                                hidden
                                accept="image/*"
                                multiple
                                type="file"
                            />
                        </Button>
                    </CardActions>
                    <CardActions>
                        <Button
                            size="large"
                            type="submit"
                            // disabled={!isValid}
                        >
                            Lisää tuote
                        </Button>
                    </CardActions>
                </CardContent>
            </Box>
        </Card>
    );
}

export default AddNewItem;
