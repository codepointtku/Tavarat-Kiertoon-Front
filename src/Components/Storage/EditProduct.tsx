// /* eslint-disable react/jsx-props-no-spreading */
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useRouteLoaderData, useLoaderData, useSubmit, Form, useActionData, useNavigation } from 'react-router-dom';
import {
    TextField,
    Box,
    MenuItem,
    Button,
    Modal,
    Select,
    Checkbox,
    ListItemText,
    Chip,
    FormHelperText,
    FormControl,
    InputLabel,
    Grid,
    Paper,
    IconButton,
    Typography,
    InputAdornment,
    type SelectChangeEvent,
} from '@mui/material';

import { CropFree, Delete } from '@mui/icons-material';

// import imageCompression from 'browser-image-compression';
import Html5QrcodePlugin from '../../Utils/qrcodeScanner';
import Barcode from 'react-barcode';

import TypographyTitle from '../TypographyTitle';
import AlertBox from '../AlertBox';

import type { productEditLoader, rootLoader, storageProductsLoader } from '../../Router/loaders';
import { productsTransferAction, type addProductAction } from '../../Router/actions';

type PicUpload = {
    file: File;
    url: string;
};

function EditProduct() {
    const [qrScanOpen, setQrScanOpen] = useState(false);

    // const { categories } = useRouteLoaderData('root') as Awaited<ReturnType<typeof rootLoader>>;
    // const { storages, colors } = useLoaderData() as Awaited<ReturnType<typeof storageProductsLoader>>;
    const submit = useSubmit();
    const { product, storages, categories, colors } = useLoaderData() as Awaited<ReturnType<typeof productEditLoader>>;

    const actionData = useActionData() as Awaited<ReturnType<typeof addProductAction>>;
    const navigation = useNavigation();
    const isSubmitting = navigation.state === 'submitting';
    const isLoading = navigation.state === 'loading';

    const {
        name,
        pictures,
        //amount,
        price,
        free_description,
        measurements,
        weight,
        category,
        product_items,
        colors: product_colors,
    } = product;
    const [oldPictures, setOldPictures] = useState(pictures);
    const [fileList, setFilelist] = useState<PicUpload[]>([]);

    const {
        register,
        handleSubmit,
        watch,
        setValue,
        getValues,
        formState: { errors, isSubmitSuccessful },
    } = useForm<{
        available: boolean;
        // amount: number;
        price: number;
        shelf_id: string;
        measurements: string;
        weight: number;
        storages: string;
        name: string;
        barcode: string;
        free_description: string;
        category: number;
        colors: number[];
        pictures: number[];
    }>({
        // validates and shows errors when fields have been touched and lost focus
        // after first error, shows errors on every change
        mode: 'onTouched',
        defaultValues: {
            available: true,
            shelf_id: product_items[0]?.shelf_id ?? '',
            barcode: product_items[0]?.barcode,
            storages: product_items[0]?.storage.id.toString() ?? '',

            //amount: amount ?? 0,
            price: price,
            // shelf_id: '',
            measurements: measurements,
            weight: weight,
            name: name,
            free_description: free_description,
            category: category ?? undefined,
            colors: product_colors,
        },
    });
    const [imageList, setImageList] = useState<string[]>(
        pictures.map(
            (pic: { id: number; picture_address: string }) =>
                `${window.location.protocol}//${window.location.hostname}:8000/media/${pic.picture_address}`
        )
    );

    // TODO:  Add yup / zod / x for validation?

    const description = watch('free_description');
    const barcode = watch('barcode');
    const colorsSelected = watch('colors');

    // QR code scanner
    const onNewScanResult = (decodedText: string, decodedResult: any) => {
        setQrScanOpen(false);
        setValue('barcode', decodedText);
    };

    const handleColorSelectChange = (event: SelectChangeEvent<number[]>) => {
        setValue('colors', event.target.value as number[]);
    };
    const RemoveImage = (pic: string, id: number) => {
        setFilelist((prevFileList) => prevFileList.filter((file: PicUpload, index) => file.url !== pic));
        setImageList((prevImageList) => prevImageList.filter((file, index) => index !== id));
        setOldPictures((prevOldPictures) =>
            prevOldPictures.filter(
                (value, index) =>
                    `${window.location.protocol}//${window.location.hostname}:8000/media/${value.picture_address}` !==
                    pic
            )
        );
        setValue('pictures', []);
    };
    const handlePictureChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
        const pictureFileList = getValues('pictures');

        // // Image preview with base 64 encoding

        if (pictureFileList) {
            Array.from(pictureFileList).map((pic: any) => {
                const reader = new FileReader();
                reader.onload = () => {
                    if (typeof reader.result === 'string') {
                        const url = reader.result;
                        setFilelist((prevFileList) => [...prevFileList, { file: pic, url: url }]);
                        setImageList((prevImageList) => [...prevImageList, url]);
                    }
                };
                reader.readAsDataURL(pic);
                return null;
            });
        }
    };

    const onSubmit = async (data: any) => {
        const formData = new FormData();

        Object.entries(data).forEach(([key, value]) => {
            if (key !== 'pictures' && key !== 'colors') formData.append(key, data[key]);
        });
        Object.values(data?.colors).forEach((color: any) => formData.append('colors[]', color));
        Object.values(oldPictures).forEach((pic) => formData.append('old_pictures[]', pic.id.toString()));
        Object.values(fileList).forEach((pic: PicUpload) => formData.append('pictures[]', pic.file));

        console.log(formData.forEach((item, key) => console.log(key, item)));
        submit(formData, {
            method: 'PUT',
            encType: 'multipart/form-data',
        });
    };

    return (
        <>
            {actionData?.status === true && (
                <AlertBox
                    status="success"
                    text="Tuotteen luonti onnistui"
                    redirectUrl={location.pathname.includes('admin') ? '/admin/tuotteet/' : '/varasto/tuotteet/'}
                    timer={1000}
                />
            )}
            {actionData?.status === false && (
                <AlertBox status="error" text="Tuotteen luonti epäonnistui" timer={3000} />
            )}
            <Modal
                component={Box}
                open={qrScanOpen}
                onClose={() => {
                    setQrScanOpen(false);
                }}
            >
                <Box
                    width="75%"
                    sx={{
                        position: 'absolute',
                        left: '12.5%',
                    }}
                >
                    <Html5QrcodePlugin
                        fps={10}
                        qrbox={300}
                        disableFlip={false}
                        qrCodeSuccessCallback={onNewScanResult}
                    />
                </Box>
            </Modal>
            <Grid
                component={Form}
                onSubmit={handleSubmit(onSubmit)}
                container
                spacing={2}
                padding={3}
                autoComplete="off"
                spellCheck="false"
            >
                <Grid item xs={12}>
                    <TypographyTitle text="Muokkaa tuotetta" />
                </Grid>
                <Grid item xs={12} md={6}>
                    <TextField
                        fullWidth
                        id="name"
                        type="text"
                        label="Nimi"
                        placeholder="Tuotteen nimi"
                        multiline
                        {...register('name', {
                            required: { value: true, message: 'Tuotteen nimi on pakollinen tieto' },
                            maxLength: { value: 255, message: 'Nimi on liian pitkä, maksimi 255 merkkiä' },
                            minLength: { value: 3, message: 'Nimi on liian lyhyt, minimi 3 merkkiä' },
                        })}
                        // Needs to be required: false to disable browser error message
                        inputProps={{ required: false }}
                        required
                        error={!!errors.name}
                        helperText={errors.name?.message || ' '}
                    />
                    {/* <TextField
                        // fullWidth
                        id="amount"
                        type="number"
                        label="Määrä"
                        placeholder="Määrä"
                        {...register('amount', {
                            required: { value: true, message: 'Määrä on pakollinen tieto' },
                            max: { value: 100, message: '100 on maksimimäärä' },
                            min: { value: 1, message: '1 on minimimäärä' },
                            pattern: { value: RegExp('[0-9]*'), message: 'Määrän on oltava numero' },
                        })}
                        // inputProps for underlying html input
                        inputProps={{
                            inputMode: 'numeric',
                            title: 'Määrä',
                            required: false,
                        }}
                        // InputProps for MUI input
                        InputProps={{
                            endAdornment: <InputAdornment position="end">kpl</InputAdornment>,
                        }}
                        required
                        error={!!errors.amount}
                        helperText={errors.amount?.message || ' '}
                    /> */}
                    <TextField
                        fullWidth
                        id="storage-select"
                        select
                        label="Varasto"
                        defaultValue={getValues('storages') || ''}
                        {...register('storages', {
                            required: { value: true, message: 'Varasto on valittava' },
                        })}
                        inputProps={{ required: false }}
                        required
                        error={!!errors.storages}
                        helperText={errors.storages?.message || ' '}
                    >
                        {storages?.map((location: any) => (
                            <MenuItem key={location.id} value={location.id.toString()}>
                                {location.name}
                            </MenuItem>
                        ))}
                    </TextField>
                    <TextField
                        fullWidth
                        id="shelf_id"
                        type="text"
                        label="Hyllypaikka"
                        placeholder="Esim. Tuolikulma 1"
                        multiline
                        {...register('shelf_id', {
                            maxLength: { value: 255, message: 'Nimi on liian pitkä, maksimi 255 merkkiä' },
                        })}
                        // Needs to be required: false to disable browser error message
                        inputProps={{ required: false }}
                        error={!!errors.shelf_id}
                        helperText={errors.shelf_id?.message || ' '}
                    />

                    <TextField
                        // TODO: Mitä tapahtuu jos viivakoodi löytyy jo järjestelmästä (userin virhe)? Ohjataanko vanhan tuotteen editointiin?  Mikä response backista?
                        fullWidth
                        id="barcode"
                        type="text"
                        label="Viivakoodi"
                        placeholder="viivakoodi"
                        {...register('barcode', {
                            required: {
                                value: true,
                                message: 'Viivakoodi on pakollinen tieto',
                            },
                            minLength: 1,
                            maxLength: { value: 12, message: 'Viivakoodi on liian pitkä, maksimi 12 merkkiä' },
                            pattern: {
                                value: /^[A-Za-z0-9\-.*$/+%\s]+$/gu,
                                message:
                                    'Viivakoodityypin CODE39 sallitut kirjaimet: Numerot, Englanninkieliset aakkoset, merkit -  .  *  /  +  %  sekä välilyönti',
                            },
                        })}
                        inputProps={{ required: false }}
                        required
                        error={!!errors.barcode}
                        helperText={errors.barcode?.message || ' '}
                    >
                        Viivakoodi
                    </TextField>

                    {/* TODO: mahdollisuus printata viivakoodeja kappalemäärän verran? */}
                    <Paper
                        elevation={3}
                        sx={{
                            border: '1px solid black',
                            borderRadius: 1,
                            minHeight: '7rem',
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                        }}
                        onClick={() => setQrScanOpen(true)}
                    >
                        {barcode?.length > 0 && !errors.barcode ? (
                            <Barcode value={barcode} format="CODE39" height={64} fontSize={14} />
                        ) : (
                            <IconButton
                                // remove hover effect
                                sx={{ '&:hover': { backgroundColor: 'transparent' } }}
                            >
                                <Typography fontSize={20}> Lue viivakoodi </Typography> <CropFree />
                            </IconButton>
                        )}
                    </Paper>
                </Grid>
                <Grid item xs={12} md={6}>
                    <TextField
                        fullWidth
                        id="category-select"
                        select
                        label="Kategoria"
                        defaultValue={getValues('category') || ''}
                        {...register('category', {
                            required: { value: true, message: 'Tuotteella on oltava yksi kategoria' },
                        })}
                        inputProps={{ required: false }}
                        required
                        error={!!errors.category}
                        helperText={errors.category?.message || ' '}
                    >
                        {categories?.map((category) => (
                            <MenuItem key={category.id} value={category.id} disabled={category.level !== 2}>
                                {/* 2 spaces for each category level */}
                                {category.level === 1 && '-- '}
                                {category.level === 2 && '---- '}
                                {category.name}
                            </MenuItem>
                        ))}
                    </TextField>
                    <FormControl error={!!errors.colors} fullWidth>
                        <InputLabel htmlFor="component-outlined">Väri</InputLabel>
                        <Select
                            sx={{ height: '3.5rem' }}
                            id="color-select"
                            label="Väri"
                            multiple
                            {...register('colors', {
                                required: { value: true, message: 'Tuotteella on oltava väri' },
                                onChange: handleColorSelectChange,
                            })}
                            inputProps={{ required: false }}
                            required
                            error={!!errors.colors}
                            value={colorsSelected}
                            renderValue={(selected) => (
                                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                                    {selected.map((value) => (
                                        <Chip key={value} label={colors.find((color) => color.id === value)?.name} />
                                    ))}
                                </Box>
                            )}
                        >
                            {colors?.map((color) => (
                                <MenuItem key={color.id} value={color.id}>
                                    <Checkbox checked={colorsSelected.indexOf(color.id) > -1} />
                                    <ListItemText primary={color.name} />
                                </MenuItem>
                            ))}
                        </Select>
                        <FormHelperText>{errors.colors ? errors.colors.message : ' '}</FormHelperText>
                    </FormControl>
                    <TextField
                        fullWidth
                        id="measurements"
                        type="text"
                        label="Mitat"
                        placeholder="Korkeus cm, Leveys cm, Syvyys cm"
                        multiline
                        {...register('measurements', {
                            maxLength: { value: 255, message: 'Nimi on liian pitkä, maksimi 255 merkkiä' },
                        })}
                        // Needs to be required: false to disable browser error message
                        inputProps={{ required: false }}
                        error={!!errors.measurements}
                        helperText={errors.measurements?.message || ' '}
                    />
                    <TextField
                        fullWidth
                        id="weight"
                        type="number"
                        label="Paino"
                        multiline
                        {...register('weight', {
                            pattern: { value: RegExp('[0-9]*'), message: 'Painon on oltava numero' },
                        })}
                        inputProps={{
                            inputMode: 'numeric',
                            title: 'Paino',
                            required: false,
                        }}
                        // InputProps for MUI input
                        InputProps={{
                            endAdornment: <InputAdornment position="end">kg</InputAdornment>,
                        }}
                        // required
                        error={!!errors.weight}
                        helperText={errors.weight?.message || ' '}
                    />
                    <TextField
                        id="hinta"
                        type="number"
                        label="Hinta-arvio"
                        {...register('price', {
                            pattern: { value: RegExp('[0-9]*'), message: 'Hinnan on oltava numero' },
                        })}
                        // inputprops for underlying html input
                        inputProps={{
                            inputMode: 'numeric',
                            title: 'Hinta',
                            required: false,
                        }}
                        // InputProps for MUI input
                        InputProps={{
                            endAdornment: <InputAdornment position="end">€</InputAdornment>,
                        }}
                        error={!!errors.weight}
                        helperText={errors.weight?.message || ' '}
                    />
                    <TextField
                        fullWidth
                        id="description"
                        label="Tuotekuvaus"
                        multiline
                        minRows={3}
                        {...register('free_description', {
                            required: { value: true, message: 'Tuotteella on oltava kuvaus' },
                            minLength: { value: 6, message: 'Vähintään 6 merkkiä' },
                            maxLength: { value: 1000, message: 'Enintään 1000 merkkiä' },
                        })}
                        inputProps={{ required: false }}
                        required
                        error={!!errors.free_description}
                        helperText={errors.free_description?.message || `${description?.length || 0}/1000`}
                    />
                </Grid>
                <Grid item xs={12}>
                    <Button
                        id="add-pictures"
                        variant="contained"
                        component="label"
                        size="large"
                        sx={{ marginTop: 2, marginBottom: 2 }}
                    >
                        Lisää kuvat
                        <input
                            type="file"
                            accept="image/*"
                            multiple
                            hidden
                            {...register('pictures', {
                                // required: { value: true, message: 'Tuotteella on oltava vähintään yksi kuva' },
                                onChange: handlePictureChange,
                                validate: {
                                    amount: (value) => {
                                        // TODO / known issue: validation shows error if user adds 4 or more pics at the same time
                                        if (imageList.length > 6) {
                                            return 'Kuvia voi olla enintään 6';
                                        }
                                        if (imageList.length < 1) {
                                            return 'Tuotteella on oltava vähintään yksi kuva';
                                        }

                                        return true;
                                    },
                                },
                            })}
                        />
                    </Button>
                    <FormHelperText>{imageList.length} / 6</FormHelperText>
                    <FormHelperText>{errors.pictures ? errors.pictures.message : ' '}</FormHelperText>
                    <Grid container spacing={2}>
                        {imageList.map((pic, index) => (
                            <Grid item xs={12} sm={6} md={4} key={index}>
                                <Paper elevation={3} sx={{ position: 'relative', width: '100%', paddingTop: '100%' }}>
                                    <img
                                        src={pic}
                                        alt="preview_image"
                                        style={{
                                            position: 'absolute',
                                            top: 0,
                                            left: 0,
                                            width: '100%',
                                            height: '100%',
                                            objectFit: 'cover',
                                        }}
                                    />
                                    <IconButton
                                        id="image_del_btn"
                                        color="error"
                                        sx={{ position: 'absolute', top: 0, right: 0 }}
                                        onClick={() => {
                                            RemoveImage(pic, index);
                                        }}
                                    >
                                        <Delete />
                                    </IconButton>
                                </Paper>
                            </Grid>
                        ))}
                    </Grid>
                </Grid>
                <Grid item xs={12}>
                    <Button
                        fullWidth
                        size="large"
                        type="submit"
                        disabled={isLoading || isSubmitting || isSubmitSuccessful}
                    >
                        Muokkaa tuote
                    </Button>
                </Grid>
            </Grid>
        </>
    );
}

export default EditProduct;
