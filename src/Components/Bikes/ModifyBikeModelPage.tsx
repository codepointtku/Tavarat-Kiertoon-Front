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

/**
 * Modify a single Bike Model.
 * Note! This feature is propably rarely (or never) used
 *
 * @returns
 */
function ModifyBikeModelPage() {
    const { bikeModel, colors } = useLoaderData() as { bikeModel: BikeModelInterface; colors: ColorInterface[] };

    // hook form functions and default values
    const { register, handleSubmit, watch } = useForm({
        defaultValues: {
            bikeModelName: bikeModel.name as string,
            bikeModelBrandName: bikeModel.brand.name as string,
            // bikeModelColorId: bikeModel.color.id as number,
            bikeModelColorName: bikeModel.color.name as string,
            bikeModelSizeName: bikeModel.size.name as string,
            bikeModelTypeName: bikeModel.type.name as string,
            bikeModelDescription: bikeModel.description as string,
            // bikeModelNewColor: '' as string,
        },
    });

    // submit the form data
    const submit = useSubmit();
    const onSubmit = (data: FieldValues) => {
        const color = colors.find((color) => color.name === data.bikeModelColorName) as ColorInterface;
        console.log('### ModifyBikeModelPage', data, color.id);
        const formData: FieldValues = { ...data, bikeModelColorId: color.id };

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
                        {/*
                        "name" is generated automatically from other values
                        "brand.name" is a text field
                        "color.name" is a <Select> field allowing all colors with default set to "true"
                        "size.name" is a number field. inch mark (") needs to be added later
                        "type.name" is a text field
                        "description" is a text field
                        */}
                        <Grid container flexDirection="row" spacing={2} paddingTop="1rem">
                            <Grid item xs={6}>
                                <TextField
                                    label="Nimi"
                                    value={watch('bikeModelName')}
                                    {...register('bikeModelName')}
                                    fullWidth
                                />
                            </Grid>
                            <Grid item xs={6}>
                                {/* Testi start */}
                                Test
                                {/* Testi end */}
                            </Grid>
                            <Grid item xs={6}>
                                <TextField
                                    label="Merkki"
                                    value={watch('bikeModelBrandName')}
                                    {...register('bikeModelBrandName')}
                                    fullWidth
                                />
                            </Grid>
                            <Grid item xs={6}>
                                <Autocomplete
                                    freeSolo
                                    id="autocomplete-test"
                                    options={colors.map((color) => color.name)}
                                    value={watch('bikeModelColorName')}
                                    renderInput={(params) => (
                                        <TextField {...params} label="Väri" {...register('bikeModelColorName')} />
                                    )}
                                    sx={{ width: '100%' }}
                                />

                                {/* <FormControl fullWidth>
                                    <InputLabel id="bike-model-color">Väri</InputLabel>
                                    <Select
                                        id="bike-model-color"
                                        label="Color"
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
                                        <MenuItem value={0}>
                                            <Button>Luo uusi väri</Button>
                                        </MenuItem>
                                    </Select>
                                </FormControl> */}
                            </Grid>
                            <Grid item xs={6}>
                                <TextField
                                    label="Koko"
                                    value={watch('bikeModelSizeName')}
                                    {...register('bikeModelSizeName')}
                                    fullWidth
                                />
                            </Grid>
                            <Grid item xs={6}>
                                <TextField
                                    label="Tyyppi"
                                    value={watch('bikeModelTypeName')}
                                    {...register('bikeModelTypeName')}
                                    fullWidth
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
