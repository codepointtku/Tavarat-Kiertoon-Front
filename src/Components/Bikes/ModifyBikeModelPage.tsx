import {
    Autocomplete,
    Box,
    Button,
    Card,
    CardMedia,
    FormControl,
    Grid,
    InputLabel,
    MenuItem,
    Select,
    TextField,
    Typography,
} from '@mui/material';
import { useLoaderData } from 'react-router';
import { Form, Link, useSubmit } from 'react-router-dom';
import { type FieldValues, useForm } from 'react-hook-form';

// interface(s)
import type { BikeModelInterface } from './Bikes';
interface ColorInterface {
    id: number;
    name: string;
    default: boolean;
}
interface NameIdInterface {
    id: number;
    name: string;
}

/**
 * Modify a single Bike Model.
 * Note! This feature is propably rarely (or never) used
 *
 * @returns
 */
function ModifyBikeModelPage() {
    const { bikeModel, colors, brands, types, sizes } = useLoaderData() as {
        bikeModel: BikeModelInterface;
        colors: ColorInterface[];
        brands: NameIdInterface[];
        types: NameIdInterface[];
        sizes: NameIdInterface[];
    };

    console.log('### bikeModel', bikeModel);

    // hook form functions and default values
    const { register, handleSubmit, watch } = useForm({
        defaultValues: {
            bikeModelName: bikeModel.name as string,
            bikeModelBrandName: bikeModel.brand.name as string,
            bikeModelColorId: bikeModel.color.id as number,
            bikeModelSizeName: bikeModel.size.name as string,
            bikeModelTypeName: bikeModel.type.name as string,
            bikeModelDescription: bikeModel.description as string,
            pictures: bikeModel.picture.picture_address as string,
        },
    });

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
        submit(formData, {
            method: 'put',
            action: `/pyorat/pyoravarasto/muokkaapyoramalli/${bikeModel.id}`,
            encType: 'multipart/form-data',
        });
    };

    // RENDER
    return (
        <>
            <Typography variant="h3" align="center" color="primary.main" mb="2rem" width="100%">
                Muokkaa pyörämallia
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
                                sx={{ marginRight: '1rem', marginBottom: '1rem', objectFit: 'contain' }}
                                image={`${window.location.protocol}//${window.location.hostname}:8000/media/${bikeModel.picture.picture_address}`} // TODO: Fix pic path
                                alt="Bike Model"
                            />
                            <Button variant="outlined" component="label" sx={{ width: 200 }}>
                                Vaihda kuva
                                <input type="file" accept="image/*" {...register('pictures')} hidden />
                            </Button>
                        </Box>
                        <Grid container flexDirection="row" spacing={2} paddingTop="1rem">
                            <Grid item xs={6}>
                                <TextField
                                    label="Nimi"
                                    value={watch('bikeModelName')}
                                    {...register('bikeModelName')}
                                    fullWidth
                                />
                            </Grid>
                            <Grid item xs={6}></Grid>
                            <Grid item xs={6}>
                                <Autocomplete
                                    freeSolo
                                    id="bike-model-brand-name"
                                    options={brands.map((brand) => brand.name)}
                                    value={watch('bikeModelBrandName')}
                                    renderInput={(params) => (
                                        <TextField {...params} label="Merkki" {...register('bikeModelBrandName')} />
                                    )}
                                    sx={{ width: '100%' }}
                                />
                            </Grid>
                            <Grid item xs={6}>
                                <FormControl fullWidth>
                                    <InputLabel id="bike-model-color-name-label">Väri</InputLabel>
                                    <Select
                                        labelId="bike-model-color-name-label"
                                        id="bike-model-color-name"
                                        label="Väri"
                                        {...register('bikeModelColorId')}
                                        value={watch('bikeModelColorId')}
                                    >
                                        {colors.map((color) => {
                                            return (
                                                <MenuItem key={color.id} value={color.id}>
                                                    {color.name}
                                                </MenuItem>
                                            );
                                        })}
                                    </Select>
                                </FormControl>
                            </Grid>
                            <Grid item xs={6}>
                                <Autocomplete
                                    freeSolo
                                    id="bike-model-size-name"
                                    options={sizes.map((size) => size.name)}
                                    value={watch('bikeModelSizeName')}
                                    renderInput={(params) => (
                                        <TextField {...params} label="Koko" {...register('bikeModelSizeName')} />
                                    )}
                                    sx={{ width: '100%' }}
                                />
                            </Grid>
                            <Grid item xs={6}>
                                <Autocomplete
                                    freeSolo
                                    id="bike-model-type-name"
                                    options={types.map((type) => type.name)}
                                    value={watch('bikeModelTypeName')}
                                    renderInput={(params) => (
                                        <TextField {...params} label="Tyyppi" {...register('bikeModelTypeName')} />
                                    )}
                                    sx={{ width: '100%' }}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    label="Kuvaus"
                                    value={watch('bikeModelDescription')}
                                    {...register('bikeModelDescription')}
                                    fullWidth
                                />
                            </Grid>
                        </Grid>
                    </Box>
                </Card>
                <Box display="flex" width="100%" justifyContent="center">
                    <Button
                        to="/pyorat/pyoravarasto/pyoramallit"
                        component={Link}
                        sx={{ width: '12rem', padding: '1rem' }}
                    >
                        Palaa Tallentamatta
                    </Button>
                    <Button
                        color="error"
                        onClick={() => console.log('### ModifyBikeModelPage: Painoit POISTA nappia')}
                        sx={{ width: '12rem', marginX: '3rem', padding: '1rem' }}
                    >
                        Poista
                    </Button>
                    <Button type="submit" sx={{ width: '12rem', padding: '1rem' }}>
                        Tallenna ja palaa
                    </Button>
                </Box>
            </Box>
        </>
    );
}

export default ModifyBikeModelPage;
