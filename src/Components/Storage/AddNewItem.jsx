/* eslint-disable react/jsx-props-no-spreading */
import { useState } from 'react';
import {
    useRouteLoaderData,
    useLoaderData,
    useSubmit,
    Form,
    useNavigate,
    useActionData,
    useLocation,
} from 'react-router-dom';
// import Barcode from 'react-barcode';
import { TextField, Box, MenuItem, Button, Card, CardActions, CardContent, Modal, Typography } from '@mui/material';
import imageCompression from 'browser-image-compression';

import { useForm } from 'react-hook-form';
import Html5QrcodePlugin from '../../Utils/qrcodeScanner';
import Barcode from 'react-barcode';
import TypographyTitle from '../TypographyTitle';

function AddNewItem() {
    const { categories } = useRouteLoaderData('root');
    const { storages, colors } = useLoaderData();
    console.log('categories:', categories, 'storages:', storages, 'colors:', colors);
    const submit = useSubmit();
    const actionData = useActionData();
    const location = useLocation();
    const navigate = useNavigate();

    const [qrSearchOpen, setQrSearchOpen] = useState(false);

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
            shelf_id: '',
            measurements: 'wrdrqwf',
            weight: 0.0,
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
    const barcode = watch('barcode');

    const onSubmit = async (data) => {
        const formData = new FormData();
        Object.keys(data).forEach((key) => {
            if (key !== 'pictures') formData.append(key, data[key]);
        });
        Object.values(data.pictures).forEach((value) => formData.append('pictures[]', value));

        console.log(formData.get('pictures'));
        console.log('onSubmit formData:', formData);

        /* await apiCall(auth, setAuth, '/products/', 'post', formData, {
            headers: { 'Content-Type': 'multipart/form-data' },
        }); */

        await submit(formData, {
            method: 'post',
            action: '/varasto/tuotteet/luo/',
            encType: 'multipart/form-data',
        });
        navigate('/varasto/tuotteet/');
    };

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
        setQrSearchOpen(false);
        setValue('barcode', decodedText);
    };

    return (
        <Card>
            <Modal
                open={qrSearchOpen}
                onClose={() => {
                    setQrSearchOpen(false);
                }}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
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
                        type="text"
                        placeholder="name"
                        {...register('name', { required: 'Nimi on pakollinen', max: 255, min: 3 })}
                        label="Nimi"
                        multiline
                        defaultValue="testinimi"
                        // error={!!errors.name}
                        // helperText={errors.name?.message || `${name?.length || 0}/255`}
                    />
                    {/* <Typography>{errors.name?.message}</Typography> */}
                    <TextField
                        type="text"
                        placeholder="barcode"
                        {...register('barcode', {
                            required: true,
                            maxLength: 12,
                            minLength: 1,
                        })}
                        // disabled
                        // id="outlined-disabled"
                        label="Viivakoodi"
                        defaultValue="1234"
                    >
                        Viivakoodi
                    </TextField>
                    <CardActions>
                        <Button size="large" onClick={() => setQrSearchOpen(true)}>
                            Viivakoodinlukija
                        </Button>
                        {barcode?.length > 0 && <Barcode value={barcode} format="CODE39" height={32} fontSize={14} />}
                    </CardActions>

                    <TextField
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
                        id="outlined-select"
                        select
                        label="Kategoria"
                        {...register('category_name', { required: true })}
                        defaultValue=""
                    >
                        {categories?.map((category) => (
                            <MenuItem
                                onClick={() => setValue('category', category.id)}
                                key={category.id}
                                value={category.name}
                            >
                                {category.name}
                            </MenuItem>
                        ))}
                    </TextField>
                    <TextField
                        type="number"
                        label="Määrä"
                        placeholder="Määrä"
                        {...register('amount', { required: true, max: 1000, min: 1 })}
                    ></TextField>
                    {/* todo värikenttä, uuden värin lisäys mahdollisuus, backend hyväksyy stringin ja luo uuden ellei ole olemassa. Lisäkenttä lisää uusi väri */}
                    <TextField
                        id="filled-helperText"
                        label="Vapaa Kuvaus"
                        {...register('free_description', { required: false, max: 1000 })}
                        multiline
                        minRows={4}
                        helperText={`${description?.length || '0'}/1000`}
                        defaultValue="vapaa kuvaus testi"
                    />
                    <CardActions>
                        <Button variant="contained" component="label" size="large">
                            Lisää kuvat
                            <input
                                {...register('pictures')}
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
