// /* eslint-disable react/jsx-props-no-spreading */
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useRouteLoaderData, useLoaderData, useSubmit, Form, useActionData } from 'react-router-dom';

import {
    TextField,
    Box,
    MenuItem,
    Button,
    Card,
    CardActions,
    CardContent,
    Modal,
    Select,
    Checkbox,
    ListItemText,
    Chip,
    FormHelperText,
    FormControl,
    InputLabel,
    type SelectChangeEvent,
} from '@mui/material';

// import imageCompression from 'browser-image-compression';
import Html5QrcodePlugin from '../../Utils/qrcodeScanner';
import Barcode from 'react-barcode';

import TypographyTitle from '../TypographyTitle';
import AlertBox from '../AlertBox';
import type { rootLoader, storageProductsLoader } from '../../Router/loaders';
import type { addProductAction } from '../../Router/actions';

function AddNewItem() {
    const [qrScanOpen, setQrScanOpen] = useState(false);
    const { categories } = useRouteLoaderData('root') as Awaited<ReturnType<typeof rootLoader>>;
    const { storages, colors } = useLoaderData() as Awaited<ReturnType<typeof storageProductsLoader>>;
    // console.log('categories:', categories, 'storages:', storages, 'colors:', colors);
    const submit = useSubmit();
    const actionData = useActionData() as Awaited<ReturnType<typeof addProductAction>>;

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
    } = useForm<{
        available: boolean;
        amount: number;
        price: number;
        shelf_id: string;
        measurements: string;
        weight: number;
        storages: number;
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
            barcode: '',
            // storages: undefined,

            // amount: 1,
            // price: 99.0,
            // shelf_id: '',
            // measurements: 'wrdrqwf',
            // weight: 0.0,
            // storages: 1,
            // name: 'testi',
            // barcode: '1234',
            // free_description: 'testi',
            // category: undefined,
            colors: [],
            // // pictures: [1],
        },
    });

    // TODO:  Add yup / zod / x for validation?

    const description = watch('free_description');
    const barcode = watch('barcode');
    const colorsSelected = watch('colors');

    // QR code scanner
    const onNewScanResult = (decodedText: string, decodedResult: any) => {
        setQrScanOpen(false);
        setValue('barcode', decodedText);
    };

    const handleSelectChange = (event: SelectChangeEvent<number[]>) => {
        setValue('colors', event.target.value as number[]);
    };

    const onSubmit = async (data: any) => {
        const formData = new FormData();

        console.log(data);
        Object.entries(data).forEach(([key, value]) => {
            console.log(key, value);
            if (key !== 'pictures' && key !== 'colors') formData.append(key, data[key]);
        });

        Object.values(data?.colors).forEach((color: any) => formData.append('colors[]', color));
        Object.values(data?.pictures).forEach((pic: any) => formData.append('pictures[]', pic));

        // console.log('pictures AddNewItemissä', formData.get('pictures'));
        // console.log('onSubmit formData:', formData);

        submit(formData, {
            method: 'post',
            action: '/varasto/tuotteet/luo/',
            encType: 'multipart/form-data',
        });
    };

    // // TODO: add image compression
    // // commented code left for future image upload improvements

    // await apiCall(auth, setAuth, '/products/', 'post', formData, {
    //     headers: { 'Content-Type': 'multipart/form-data' },
    // });

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

    // console.log('errors', errors);

    return (
        <Card>
            {actionData?.status === true && (
                <AlertBox
                    status="success"
                    text="Tuotteen luonti onnistui"
                    redirectUrl="/varasto/tuotteet/"
                    timer={1000}
                />
            )}
            {actionData?.status === false && (
                <AlertBox status="error" text="Tuotteen luonti epäonnistui" timer={3000} />
            )}
            <Modal
                open={qrScanOpen}
                onClose={() => {
                    setQrScanOpen(false);
                }}
                // justifyContent="center"
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
                        label="Nimi"
                        placeholder="Tuotteen nimi"
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
                        helperText={errors.name?.message}
                    />
                    <TextField
                        // TODO: Mitä tapahtuu jos viivakoodi löytyy jo järjestelmästä? Ohjataanko vanhan tuotteen editointiin?  Mikä response backista
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
                        helperText={errors.barcode?.message}
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
                        {...register('storages', {
                            required: { value: true, message: 'Varasto on valittava' },
                        })}
                        //  TODO default varastosijainti sama kuin varastokäyttäjätilin sijainti?
                        inputProps={{ required: false }}
                        required
                        error={!!errors.storages}
                        helperText={errors.storages?.message}
                    >
                        {storages?.map((location: any) => (
                            <MenuItem key={location.id} value={location.id}>
                                {location.name}
                            </MenuItem>
                        ))}
                    </TextField>
                    {/* TODO: shelf id -hyllypaikka, joko vapaa kenttä, tai tietyn varaston hyllypaikat valikko */}
                    <TextField
                        id="category-select"
                        select
                        label="Kategoria"
                        {...register('category', {
                            required: { value: true, message: 'Tuotteella on oltava yksi kategoria' },
                        })}
                        inputProps={{ required: false }}
                        required
                        error={!!errors.category}
                        helperText={errors.category?.message}
                    >
                        {/* TODO Uusia kategorioita voi luoda vain admin, huomautus varastokäyttäjälle? */}
                        {/* TODO kategorian valikkoon valittavaksi vain alimmat kategoriat. ylemmät väliotsikoiksi?  */}
                        {categories?.map((category: any) => (
                            <MenuItem
                                onClick={() => setValue('category', category.id)}
                                key={category.id}
                                value={category.id}
                            >
                                {category.name}
                            </MenuItem>
                        ))}
                    </TextField>
                    <FormControl error={!!errors.colors} sx={{ margin: '1rem' }}>
                        <InputLabel htmlFor="component-outlined">Väri</InputLabel>
                        <Select
                            id="color-select"
                            label="Väri"
                            sx={{ minWidth: 300 }}
                            multiple
                            {...register('colors', { required: { value: true, message: 'Tuotteella on oltava väri' } })}
                            required
                            inputProps={{ required: false }}
                            error={!!errors.colors}
                            value={colorsSelected}
                            onChange={handleSelectChange}
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
                                    {/* {color.name} */}
                                    <Checkbox checked={colorsSelected.indexOf(color.id) > -1} />
                                    <ListItemText primary={color.name} />
                                </MenuItem>
                            ))}
                        </Select>
                        <FormHelperText>{errors.colors ? errors.colors.message : ' '}</FormHelperText>
                    </FormControl>
                    {/* <TextField
                        id="color-select"
                        select
                        multiple
                        label="Väri"
                        {...register('colors[]', { required: { value: true, message: 'Tuotteella on oltava väri' } })}
                        inputProps={{ required: false }}
                        required
                        error={!!errors.colors}
                        helperText={errors.colors?.message}
                    >
                        {/* TODO värikenttä, uuden värin lisäys mahdollisuus, backend hyväksyy(?) stringin ja luo uuden ellei ole olemassa. Lisäkenttä lisää uusi väri */}
                    {/* TODO uuden värin lisäyksen yhteydessä rootLoaderin on mahdollisesti lauettava uudelleen, jotta uusi väri näkyy heti valikossa */}

                    {/* <MenuItem
                        // onClick={() => setValue()}
                        // key={color.id}
                        // value={color.name}
                        >
                            {/* TODO värin nimen oltava muotoa iso alkukirjain, ilman välejä, muutettava oikeaksi ennen lähetystä jottei tule "meren sininen" ja "Merensininen" */}
                    {/* <Button variant="contained">Luo uusi</Button>
                        </MenuItem>
                        {colors?.map((color: any) => (
                            <MenuItem
                                // onClick={() => setValue('colors', [getValues('colors'), color.id])}
                                onClick={}
                                key={color.id}
                                value={color.id}
                            >
                                {color.name}
                            </MenuItem>
                        ))}
                    </TextField>  */}
                    <TextField
                        id="amount"
                        type="number"
                        label="Määrä"
                        placeholder="Määrä"
                        {...register('amount', {
                            required: { value: true, message: 'Määrä on pakollinen tieto' },
                            max: { value: 1000, message: '1000 on maksimimäärä' },
                            min: { value: 1, message: '1 on minimimäärä' },
                            // tämä ei toimi, näyttää vain required virheviestin "Määrä on pakollinen"
                            pattern: { value: RegExp('[0-9]*'), message: 'Määrän on oltava numero' },
                        })}
                        inputProps={{
                            // inputMode: 'numeric',
                            // pattern: '[0-9]*',
                            title: 'Määrä',
                            // min: '1',
                            // max: '1000',
                            required: false,
                        }}
                        required
                        error={!!errors.amount}
                        helperText={errors.amount?.message}
                    ></TextField>
                    <TextField
                        id="description"
                        label="Kuvaus"
                        multiline
                        minRows={4}
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
                    <CardActions>
                        {/* TODO preview kuville */}
                        <Button variant="contained" component="label" size="large">
                            Lisää kuvat
                            {/* TODO mui input? */}
                            <input
                                type="file"
                                accept="image/*"
                                multiple
                                hidden
                                {...register('pictures', {
                                    // TODO tarkistettava että kuvatiedostot ovat oikeaa muotoa, ja niitä on 1-6
                                    required: { value: true, message: 'Tuotteella on oltava vähintään yksi kuva' },
                                })}
                                // setValue in uploadFile
                                // onChange={(event) => {
                                //     uploadFile(event.target.files);
                                // }}
                                // inputProps={{ required: false }}
                                required
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
