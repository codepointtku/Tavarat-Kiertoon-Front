import { useMemo, useState } from 'react';
import {
    Autocomplete,
    Box,
    Button,
    Card,
    CardMedia,
    Grid,
    // MenuItem,
    // Select,
    TextField,
    Typography,
} from '@mui/material';
import { useLoaderData } from 'react-router';
import { Form, Link, useSubmit } from 'react-router-dom';
import { type FieldValues, useForm } from 'react-hook-form';
import DeleteBikeModelModal from './DeleteBikeModelModal';

// interface(s)
import type { BikeModelInterface } from './Bikes';
// interface ColorInterface {
//     id: number;
//     name: string;
//     default: boolean;
// }
interface NameIdInterface {
    id: number;
    name: string;
}
interface ModifyBikeModelInterface {
    createNewBikeModel: boolean;
}

/**
 * Modify a single Bike Model.
 * Note! This feature is propably rarely (or never) used
 *
 * @returns
 */
function ModifyBikeModelPage({ createNewBikeModel }: ModifyBikeModelInterface) {
    // state for controlling the Delete confirmation modal
    const [renderDeleteBikeModelModal, setRenderDeleteBikeModelModal] = useState(false);

    // input data
    // const { bikeModel, colors, brands, types, sizes } = useLoaderData() as {
    const { bikeModel, brands, types, sizes } = useLoaderData() as {
        bikeModel: BikeModelInterface;
        // colors: ColorInterface[];
        brands: NameIdInterface[];
        types: NameIdInterface[];
        sizes: NameIdInterface[];
    };

    // hook form functions and default values
    const { register, handleSubmit, watch, formState } = useForm({
        mode: 'onTouched',
        defaultValues: {
            // bikeModelName: createNewBikeModel ? '' : (bikeModel.name as string),
            bikeModelBrandName: createNewBikeModel ? '' : (bikeModel.brand.name as string),
            // bikeModelColorId: createNewBikeModel ? '' : (bikeModel.color.id as number),
            bikeModelSizeName: createNewBikeModel ? '' : (bikeModel.size.name as string),
            bikeModelTypeName: createNewBikeModel ? '' : (bikeModel.type.name as string),
            bikeModelDescription: createNewBikeModel ? '' : (bikeModel.description as string),
            pictures: createNewBikeModel ? '' : (bikeModel.picture.picture_address as string),
        },
    });

    // const tmpName = watch('bikeModelSizeName') + watch('bikeModelBrandName') + watch('bikeModelTypeName');

    // error messages
    const { errors } = formState;

    // submit the form data
    const submit = useSubmit();
    const onSubmit = (data: FieldValues) => {
        // find correct values based on text fields.
        const brand = brands.find((brand) => brand.name === data.bikeModelBrandName) as NameIdInterface;
        const type = types.find((type) => type.name === data.bikeModelTypeName) as NameIdInterface;
        const size = sizes.find((size) => size.name === data.bikeModelSizeName) as NameIdInterface;

        // collect formData to be sent.
        // everything except image blob is sent as key-value pairs.
        const formData = new FormData();
        Object.keys(data).forEach((key) => {
            if (key !== 'pictures') formData.append(key, data[key]);
        });
        Object.values(data.pictures).forEach((value: any) => {
            formData.append('pictures[]', value);
        });

        // check brand, type and size values
        // if value does not exist => new value => needs to be created.
        // use id value -1 to indicate that since -1 can not be an id of an existing value.
        // note that new colors can not be created this way so color is handeled differently.
        formData.append('bikeModelBrandId', (brand ? brand.id : -1).toString());
        formData.append('bikeModelTypeId', (type ? type.id : -1).toString());
        formData.append('bikeModelSizeId', (size ? size.id : -1).toString());

        // send the data
        submit(
            formData,
            createNewBikeModel
                ? {
                      method: 'post',
                      action: `/pyorat/pyoravarasto/lisaapyoramalli/`,
                      encType: 'multipart/form-data',
                  }
                : {
                      method: 'put',
                      action: `/pyorat/pyoravarasto/muokkaapyoramalli/${bikeModel.id}`,
                      encType: 'multipart/form-data',
                  }
        );
    };

    // if image has not changed return original image path. else return new FileList
    const image = watch('pictures');
    const imageToShow = useMemo(() => {
        if (createNewBikeModel) {
            return typeof image === 'string' ? '' : URL.createObjectURL(image[0]);
        }
        return typeof image === 'string'
            ? `${window.location.protocol}//${window.location.hostname}:8000/media/${bikeModel.picture.picture_address}` // TODO: Fix pic path
            : URL.createObjectURL(image[0]);
    }, [image, bikeModel.picture.picture_address, createNewBikeModel]);

    // RENDER
    return (
        <>
            <Typography variant="h3" align="center" color="primary.main" mb="2rem" width="100%">
                {createNewBikeModel ? 'Lisää uusi pyörämalli' : 'Muokkaa pyörämallia'}
            </Typography>

            <Box
                display="flex"
                width="100%"
                alignItems="center"
                flexDirection="column"
                component={Form}
                onSubmit={handleSubmit(onSubmit)}
            >
                <Card
                    sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        border: '0px solid black',
                        padding: '1rem',
                        maxWidth: '1000px',
                        marginBottom: '2rem',
                    }}
                >
                    <Box sx={{ display: 'flex', flexDirection: 'row' }}>
                        <Box
                            sx={{
                                display: 'flex',
                                flexDirection: 'column',
                                alignItems: 'center',
                                justifyContent: 'space-around',
                                width: 600,
                            }}
                        >
                            <CardMedia
                                component="img"
                                height="250"
                                sx={{
                                    marginRight: '1rem',
                                    marginBottom: '1rem',
                                    objectFit: 'contain',
                                }}
                                image={imageToShow}
                                alt="Lisää kuva"
                            />
                            <Button
                                variant="outlined"
                                color={errors.pictures ? 'error' : 'primary'}
                                component="label"
                                sx={{ width: 200 }}
                            >
                                {createNewBikeModel ? 'Lisää kuva' : 'Vaihda kuva'}
                                <input
                                    type="file"
                                    accept="image/*"
                                    {...register('pictures', {
                                        required: createNewBikeModel ? 'Kuva puuttuu' : false,
                                    })}
                                    hidden
                                />
                            </Button>
                            {
                                <p style={{ color: 'red', fontSize: '0.8rem', marginTop: 0, height: '1rem' }}>
                                    {errors.pictures ? errors.pictures.message : ' '}
                                </p>
                            }
                        </Box>
                        <Grid container flexDirection="row" spacing={2} paddingTop="1rem">
                            {/* <Grid item xs={6}>
                                <TextField
                                    label="Nimi"
                                    value={watch('bikeModelName')}
                                    // value={tmpName}
                                    {...register('bikeModelName', { required: 'Pakollinen tieto puuttuu' })}
                                    fullWidth
                                    color={errors.bikeModelName ? 'error' : 'primary'}
                                    error={!!errors.bikeModelName}
                                    helperText={errors.bikeModelName?.message?.toString() || ' '}
                                    required
                                    sx={{ marginBottom: '-1rem' }}
                                />
                            </Grid>
                            <Grid item xs={6}></Grid> */}
                            <Grid item xs={6}>
                                {/*  */}
                                <Autocomplete
                                    freeSolo
                                    id="bike-model-brand-name"
                                    options={brands.map((brand) => brand.name)}
                                    value={watch('bikeModelBrandName')}
                                    renderInput={(params) => (
                                        <TextField
                                            {...params}
                                            label="Merkki"
                                            {...register('bikeModelBrandName', {
                                                required: 'Pakollinen tieto puuttuu',
                                            })}
                                            color={errors.bikeModelBrandName ? 'error' : 'primary'}
                                            error={!!errors.bikeModelBrandName}
                                            helperText={errors.bikeModelBrandName?.message?.toString() || ' '}
                                            required
                                            sx={{ marginBottom: '-1rem' }}
                                        />
                                    )}
                                    sx={{ width: '100%' }}
                                />
                                {/*  */}
                            </Grid>
                            <Grid item xs={6}>
                                {/* <FormControl fullWidth>
                                    <InputLabel id="bike-model-color-name-label">Väri</InputLabel>
                                    <Select
                                        labelId="bike-model-color-name-label"
                                        id="bike-model-color-name"
                                        label="Väri"
                                        {...register('bikeModelColorId', {
                                            required: 'Pakollinen tieto puuttuu',
                                        })}
                                        value={watch('bikeModelColorId')}
                                        color={errors.bikeModelColorId ? 'error' : 'primary'}
                                        error={!!errors.bikeModelColorId}
                                        // helperText={errors.bikeModelColorId?.message?.toString() || ' '}
                                        required
                                        sx={{ marginBottom: '-1rem' }}
                                    >
                                        {colors.map((color) => {
                                            return (
                                                <MenuItem key={color.id} value={color.id}>
                                                    {color.name}
                                                </MenuItem>
                                            );
                                        })}
                                    </Select>
                                </FormControl> */}
                                {/* <TextField
                                    id="bike-model-color-name"
                                    select
                                    label="Väri"
                                    {...register('bikeModelColorId', {
                                        required: 'Pakollinen tieto puuttuu',
                                    })}
                                    value={watch('bikeModelColorId')}
                                    fullWidth
                                    inputProps={{ required: false }}
                                    required
                                    color={errors.bikeModelColorId ? 'error' : 'primary'}
                                    error={!!errors.bikeModelColorId}
                                    helperText={errors.bikeModelColorId?.message || ' '}
                                    sx={{ marginBottom: '-1rem' }}
                                >
                                    {colors?.map((color) => {
                                        return (
                                            <MenuItem key={color.id} value={color.id}>
                                                {color.name}
                                            </MenuItem>
                                        );
                                    })}
                                </TextField> */}
                                <Autocomplete
                                    freeSolo
                                    id="bike-model-type-name"
                                    options={types.map((type) => type.name)}
                                    value={watch('bikeModelTypeName')}
                                    renderInput={(params) => (
                                        <TextField
                                            {...params}
                                            label="Tyyppi"
                                            {...register('bikeModelTypeName', {
                                                required: 'Pakollinen tieto puuttuu',
                                            })}
                                            color={errors.bikeModelTypeName ? 'error' : 'primary'}
                                            error={!!errors.bikeModelTypeName}
                                            helperText={errors.bikeModelTypeName?.message?.toString() || ' '}
                                            required
                                            sx={{ marginBottom: '-1rem' }}
                                        />
                                    )}
                                    sx={{ width: '100%' }}
                                />
                            </Grid>
                            <Grid item xs={6}>
                                <Autocomplete
                                    freeSolo
                                    id="bike-model-size-name"
                                    options={sizes.map((size) => size.name)}
                                    value={watch('bikeModelSizeName')}
                                    renderInput={(params) => (
                                        <TextField
                                            {...params}
                                            label="Koko"
                                            {...register('bikeModelSizeName', {
                                                required: 'Pakollinen tieto puuttuu',
                                            })}
                                            color={errors.bikeModelSizeName ? 'error' : 'primary'}
                                            error={!!errors.bikeModelSizeName}
                                            helperText={errors.bikeModelSizeName?.message?.toString() || ' '}
                                            required
                                            sx={{ marginBottom: '-1rem' }}
                                        />
                                    )}
                                    sx={{ width: '100%' }}
                                />
                            </Grid>
                            <Grid item xs={6}>
                                {/* <Autocomplete
                                    freeSolo
                                    id="bike-model-type-name"
                                    options={types.map((type) => type.name)}
                                    value={watch('bikeModelTypeName')}
                                    renderInput={(params) => (
                                        <TextField
                                            {...params}
                                            label="Tyyppi"
                                            {...register('bikeModelTypeName', {
                                                required: 'Pakollinen tieto puuttuu',
                                            })}
                                            color={errors.bikeModelTypeName ? 'error' : 'primary'}
                                            error={!!errors.bikeModelTypeName}
                                            helperText={errors.bikeModelTypeName?.message?.toString() || ' '}
                                            required
                                            sx={{ marginBottom: '-1rem' }}
                                        />
                                    )}
                                    sx={{ width: '100%' }}
                                /> */}
                            </Grid>
                            <Grid item xs={12}>
                                {/*  */}
                                <TextField
                                    label="Kuvaus"
                                    value={watch('bikeModelDescription')}
                                    {...register('bikeModelDescription', { required: 'Pakollinen tieto puuttuu' })}
                                    fullWidth
                                    color={errors.bikeModelDescription ? 'error' : 'primary'}
                                    error={!!errors.bikeModelDescription}
                                    helperText={errors.bikeModelDescription?.message?.toString() || ' '}
                                    required
                                    sx={{ marginBottom: '-1rem' }}
                                />
                                {/*  */}
                            </Grid>
                        </Grid>
                    </Box>
                </Card>
                <Box display="flex" width="100%" justifyContent="center">
                    <Button
                        to="/pyorat/pyoravarasto/pyoramallit"
                        component={Link}
                        sx={{ width: '12rem', padding: '1rem', marginRight: '3rem' }}
                    >
                        Palaa Tallentamatta
                    </Button>
                    {!createNewBikeModel && (
                        <Button
                            color="error"
                            onClick={() => setRenderDeleteBikeModelModal(true)}
                            sx={{ width: '12rem', padding: '1rem' }}
                            type="button"
                        >
                            Poista
                        </Button>
                    )}

                    <Button type="submit" sx={{ width: '12rem', padding: '1rem', marginLeft: '3rem' }}>
                        Tallenna ja palaa
                    </Button>
                </Box>
            </Box>
            <DeleteBikeModelModal
                renderModal={renderDeleteBikeModelModal}
                setRenderModal={setRenderDeleteBikeModelModal}
                modelId={bikeModel.id}
            />
        </>
    );
}

export default ModifyBikeModelPage;
