import {
    Autocomplete,
    Box,
    Button,
    Card,
    CardMedia,
    // FormControl,
    Grid,
    // InputLabel,
    // MenuItem,
    // Select,
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
        colors: ColorInterface[]
        brands: NameIdInterface[]
        types: NameIdInterface[]
        sizes: NameIdInterface[]
    };

    // hook form functions and default values
    const { register, handleSubmit, watch } = useForm({
        defaultValues: {
            bikeModelName: bikeModel.name as string,
            bikeModelBrandName: bikeModel.brand.name as string,
            bikeModelColorName: bikeModel.color.name as string,
            bikeModelSizeName: bikeModel.size.name as string,
            bikeModelTypeName: bikeModel.type.name as string,
            bikeModelDescription: bikeModel.description as string,
        },
    });

    // submit the form data
    const submit = useSubmit();
    const onSubmit = (data: FieldValues) => {
        // find correct values based on text fields.
        const color = colors.find((color) => color.name === data.bikeModelColorName) as ColorInterface;
        const brand = brands.find((brand) => brand.name === data.bikeModelBrandName) as NameIdInterface;
        const type = types.find((type) => type.name === data.bikeModelTypeName) as NameIdInterface;
        const size = sizes.find((size) => size.name === data.bikeModelSizeName) as NameIdInterface;

        // collect ids to data to be sent. if value does not exist => new value => needs to be created.
        // use id value -1 to indicate that since -1 can not be an id of an existing value.
        // note that new colors can not be created this way ( => color can not be -1 ).
        const formData: FieldValues = {
            ...data,
            bikeModelColorId: color ? color.id : -1,
            bikeModelBrandId: brand ? brand.id : -1,
            bikeModelTypeId: type ? type.id : -1,
            bikeModelSizeId: size ? size.id : -1,
        };

        console.log('### ModifyBikeModelPage', formData);

        submit(formData, {
            method: 'put',
            action: `/pyorat/pyoravarasto/muokkaapyoramalli/${bikeModel.id}`,
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
                        <CardMedia
                            component="img"
                            sx={{ width: 400, marginRight: '1rem' }}
                            image="/bike.jpg"
                            alt="Bike Model"
                        />
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
                                <Autocomplete
                                    freeSolo
                                    id="bike-model-color-name"
                                    options={colors.map((color) => color.name)}
                                    value={watch('bikeModelColorName')}
                                    renderInput={(params) => (
                                        <TextField {...params} label="Väri" {...register('bikeModelColorName')} />
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
