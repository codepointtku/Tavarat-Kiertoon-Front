import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { Form, useNavigation, useSubmit } from 'react-router-dom';

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
    type SelectChangeEvent,
    Grid,
    Paper,
    IconButton,
    Typography,
} from '@mui/material';

import { CropFree, Delete } from '@mui/icons-material';
import Html5QrcodePlugin from '../../Utils/qrcodeScanner';
import Barcode from 'react-barcode';
import TypographyTitle from '../TypographyTitle';
import type { ProductDetailResponse, CategoryResponse, Color, StorageResponse } from '../../api';

type PicUpload = {
    file: File;
    url: string;
};

interface Props {
    fileList: PicUpload[];
    setFilelist: React.Dispatch<React.SetStateAction<PicUpload[]>>;
    productData?:
        | ProductDetailResponse
        | {
              name: string;
              pictures: { id: number; picture_address: string }[];
              amount: number;
              price: number;
              free_description: string;
              measurements: string;
              weight: number;
              category?: number;
              product_items: { id: number; barcode: string; storage: { id: string } }[];
              colors: number[];
          };
    storages: StorageResponse[];
    categories: CategoryResponse[];
    colorList: Color[];
}

const defaultProductData = {
    name: '',
    pictures: [],
    amount: 0,
    price: 0,
    free_description: '',
    measurements: '',
    weight: 0,
    category: undefined,
    product_items: [],
    colors: [],
};

function ProductForm({
    fileList,
    setFilelist,
    productData = defaultProductData,
    storages,
    categories,
    colorList,
}: Props) {
    const { name, pictures, amount, price, free_description, measurements, weight, category, product_items, colors } =
        productData;
    const {
        register,
        handleSubmit,
        watch,
        setValue,
        getValues,
        formState: {
            errors,
            // isSubmitting,
            isSubmitSuccessful,
        },
    } = useForm<{
        available: boolean;
        amount: number;
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
            // defaultValues for faster testing
            available: true,
            shelf_id: '',
            barcode: product_items[0]?.barcode,
            storages: product_items[0]?.storage.id.toString() ?? '',

            amount: amount ?? 0,
            price: price,
            // shelf_id: '',
            measurements: measurements,
            weight: weight,
            name: name,
            free_description: free_description,
            category: category ?? undefined,
            colors: colors,
            // pictures: [1],
        },
    });

    const [imageList, setImageList] = useState<string[]>(
        pictures.map(
            (pic: { id: number; picture_address: string }) =>
                `${window.location.protocol}//${window.location.hostname}:8000/media/${pic.picture_address}`
        )
    );

    const navigation = useNavigation();
    const [qrScanOpen, setQrScanOpen] = useState(false);
    const [oldPictures, setOldPictures] = useState(pictures);
    const description = watch('free_description');
    const barcode = watch('barcode');
    const colorsSelected = watch('colors');
    const categorySelected = watch('category');
    const storagesSelected = watch('storages');

    const isSubmitting = navigation.state === 'submitting';
    const isLoading = navigation.state === 'loading';

    // QR code scanner
    const onNewScanResult = (decodedText: string, decodedResult: any) => {
        setQrScanOpen(false);
        setValue('barcode', decodedText);
    };

    const handleColorSelectChange = (event: SelectChangeEvent<number[]>) => {
        setValue('colors', event.target.value as number[]);
    };
    const RemoveImage = (id: number) => {
        setFilelist((prevFileList) => prevFileList.filter((file, index) => index !== id));
        setImageList((prevImageList) => prevImageList.filter((file, index) => index !== id));
        console.log(oldPictures);
        setOldPictures((prevOldPictures) => prevOldPictures.filter((value, index) => index !== id));
        //setValue('pictures', []);
        // setValue('pictures', getValues('pictures') ? getValues('pictures').filter((file, index) => index !== id) : []);
    };
    const handlePictureChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
        const pictureFileList = getValues('pictures');
        // TODO: check if there are already 6 pictures, if so, don't add more
        console.log('pictureFileList:', pictureFileList);
        console.log(fileList);

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

        // // Simple image add alternative
        // Array.from(files).map((file) => {
        //     // TODO clean up objectURLs from memory ???
        //     setImgUrls([...imgUrls, URL.createObjectURL(file)]);
        // });
    };
    const submit = useSubmit();
    const onSubmit = async (data: any) => {
        const formData = new FormData();

        console.log(pictures);
        Object.entries(data).forEach(([key, value]) => {
            // console.log(key, value);
            if (key !== 'pictures' && key !== 'colors') formData.append(key, data[key]);
        });

        Object.values(data?.colors).forEach((color: any) => formData.append('colors[]', color));

        Object.values(oldPictures).forEach((pic) => formData.append('old_pictures[]', pic.id.toString()));

        Object.values(fileList).forEach((pic: PicUpload) => formData.append('new_pictures[]', pic.file));

        submit(formData, {
            method: name !== '' ? 'post' : 'PUT',
            encType: 'multipart/form-data',
        });
    };

    return (
        <>
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
            >
                <Grid item xs={12}>
                    <TypographyTitle text={name !== '' ? 'Muokkaa tuotetta' : 'Luo uusi tuote'} />
                </Grid>
                <Grid item xs={12} md={6}>
                    <TextField
                        fullWidth
                        id="name"
                        type="text"
                        label="Nimi"
                        placeholder="Tuotteen nimi"
                        //defaultValue={name}
                        multiline
                        {...register('name', {
                            required: { value: true, message: 'Tuotteen nimi on pakollinen' },
                            maxLength: { value: 255, message: 'Nimi on liian pitkä, maksimi 255 merkkiä' },
                            minLength: { value: 3, message: 'Nimi on liian lyhyt, minimi 3 merkkiä' },
                        })}
                        // Needs to be required: false to disable browser error message
                        inputProps={{ required: false }}
                        required
                        error={!!errors.name}
                        helperText={errors.name?.message || ' '}
                    />
                    <TextField
                        // fullWidth
                        id="amount"
                        type="number"
                        label="Määrä"
                        placeholder="Määrä"
                        //defaultValue={amount}
                        {...register('amount', {
                            required: { value: true, message: 'Määrä on pakollinen tieto' },
                            max: { value: 100, message: '100 on maksimimäärä' },
                            min: { value: 1, message: '1 on minimimäärä' },
                            pattern: { value: RegExp('[0-9]*'), message: 'Määrän on oltava numero' },
                        })}
                        inputProps={{
                            // test if numeric works on tablet
                            inputMode: 'numeric',
                            // pattern: '[0-9]*',
                            title: 'Määrä',
                            // min: '1',
                            // max: '1000',
                            required: false,
                        }}
                        required
                        error={!!errors.amount}
                        helperText={errors.amount?.message || ' '}
                    />
                    {/* <Grid container spacing={2}>
                            <Grid item xs={12} sm={6}> */}
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

                {/* TODO: change all select fields to use Controller to fix issues with MUI: https://react-hook-form.com/docs/usecontroller/controller  */}
                <Grid item xs={12} md={6}>
                    <TextField
                        fullWidth
                        id="storage-select"
                        select
                        label="Varastosijainti"
                        // TODO productin edittiin: miten toteutetaan tuotteen lisääminen eri varastoon kuin olemassaolevat tuotteet? Halutaanko tätä välttää?
                        // defaultvalue set to fix this MUI warning:
                        // MUI: You have provided an out-of-range value `undefined` for the select (name="storages") component. Consider providing a value that matches one of the available options or ''.
                        {...register('storages', {
                            required: { value: true, message: 'Varasto on valittava' },
                        })}
                        //  TODO default varastosijainti sama kuin varastokäyttäjätilin sijainti? - Ei tarvetta aluksi
                        inputProps={{ required: false }}
                        required
                        value={storagesSelected}
                        error={!!errors.storages}
                        helperText={errors.storages?.message || ' '}
                    >
                        {storages.map((location: any) => (
                            <MenuItem key={location.id} value={location.id}>
                                {location.name}
                            </MenuItem>
                        ))}
                    </TextField>
                    {/* TODO: shelf id -hyllypaikka, joko vapaa kenttä, tai tietyn varaston hyllypaikat valikko */}
                    <TextField
                        fullWidth
                        id="category-select"
                        select
                        label="Kategoria"
                        //defaultValue={getValues('category') || ''}
                        //value={category}
                        value={categorySelected}
                        {...register('category', {
                            required: { value: true, message: 'Tuotteella on oltava yksi kategoria' },
                        })}
                        inputProps={{ required: false }}
                        required
                        error={!!errors.category}
                        helperText={errors.category?.message || ' '}
                    >
                        {/* TODO Uusia kategorioita voi luoda vain admin, huomautus varastokäyttäjälle? "ota yhteyttä adminiin kun tarvitaan uusi kategoria" */}
                        {/* TODO kategorian valikkoon valittavaksi vain alimmat kategoriat. ylemmät väliotsikoiksi? "valitse alakategoria tai "muut tuolit" "  */}
                        {categories?.map((category) => (
                            <MenuItem key={category.id} value={category.id} disabled={category.level !== 2}>
                                {category.name}
                            </MenuItem>
                        ))}
                    </TextField>
                    {/* TODO Värin luonti modaali tms */}
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
                                    {selected.map((value: number) => (
                                        <Chip key={value} label={colorList.find((color) => color.id === value)?.name} />
                                    ))}
                                </Box>
                            )}
                        >
                            {/* TODO värikenttä, uuden värin lisäys mahdollisuus, backend hyväksyy(?) stringin ja luo uuden ellei ole olemassa. Lisäkenttä lisää uusi väri */}
                            {/* TODO uuden värin lisäyksen yhteydessä rootLoaderin on mahdollisesti lauettava uudelleen, jotta uusi väri näkyy heti valikossa */}
                            {/* TODO värin nimen oltava muotoa iso alkukirjain, ilman välejä, muutettava oikeaksi ennen lähetystä jottei tule "meren sininen" ja "Merensininen" */}
                            {colorList?.map((color) => (
                                <MenuItem key={color.id} value={color.id}>
                                    {/* {color.name} */}
                                    <Checkbox checked={colorsSelected.indexOf(color.id) > -1} />
                                    <ListItemText primary={color.name} />
                                </MenuItem>
                            ))}
                        </Select>
                        <FormHelperText>{errors.colors ? errors.colors.message : ' '}</FormHelperText>
                    </FormControl>

                    <TextField
                        fullWidth
                        id="description"
                        label="Kuvaus"
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
                        {/* TODO mui input? */}
                        <input
                            type="file"
                            accept="image/*"
                            multiple
                            hidden
                            {...register('pictures', {
                                // TODO tarkistettava että kuvatiedostot ovat oikeaa muotoa, ja niitä on 1-6
                                // TODO: validaatio ei toimi jos kuvia on jo lisätty(ja poistettu), vaikka kuvia olisi 0
                                required: { value: name == '', message: 'Tuotteella on oltava vähintään yksi kuva' },
                                // minLength: { value: 1, message: 'Tuotteella on oltava vähintään yksi kuva' },
                                // maxLength: { value: 6, message: 'Kuvia voi olla enintään 6' },
                                onChange: handlePictureChange,
                                validate: {
                                    amount: (value) => {
                                        console.log(value.length + oldPictures.length);
                                        if (value.length + oldPictures.length > 6) {
                                            return 'Kuvia voi olla enintään 6';
                                        }
                                        if (value.length + oldPictures.length < 1) {
                                            return 'Tuotteella on oltava vähintään yksi kuva';
                                        }

                                        return true;
                                    },
                                },
                            })}

                            // setValue in uploadFile
                            // onChange={(event) => {
                            //     uploadFile(event.target.files);
                            // }}
                            // inputProps={{ required: false }}
                        />
                    </Button>
                    <FormHelperText>{imageList.length} / 6</FormHelperText>
                    <FormHelperText>{errors.pictures ? errors.pictures.message : ' '}</FormHelperText>
                    <Grid container spacing={2}>
                        {imageList.map((pic, index) => (
                            <Grid item xs={12} sm={6} md={4} key={index}>
                                {/* <Box sx={{ display: 'flex', flexDirection: 'column', width: '100%' }}> */}
                                <Paper elevation={3} sx={{ position: 'relative', width: '200px', paddingTop: '200px' }}>
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
                                    {/* <Button
                                            id="image_del_btn"
                                            color="error"
                                            type="button"
                                            sx={{ height: 30, width: 30, alignSelf: 'center' }}
                                            onClick={() => {
                                                RemoveImage(index);
                                            }}
                                        >
                                            Poista
                                        </Button> */}
                                    <IconButton
                                        id="image_del_btn"
                                        color="error"
                                        sx={{ position: 'absolute', top: 0, right: 0 }}
                                        onClick={() => {
                                            RemoveImage(index);
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
                        {name !== '' ? 'Tallenna' : 'Lisää'} tuote
                    </Button>
                </Grid>
            </Grid>
            ;
        </>
    );
}
export default ProductForm;
