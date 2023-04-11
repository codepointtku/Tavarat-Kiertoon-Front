/* eslint-disable react/jsx-props-no-spreading */

import {
    Container,
    TextField,
    Typography,
    Button,
    FormControl,
    InputLabel,
    Select,
    MenuItem,
    Grid,
} from '@mui/material';
import { useForm } from 'react-hook-form';
import { Form, useSubmit } from 'react-router-dom';

function ContactPage() {
    const { register, handleSubmit, watch } = useForm();
    const submit = useSubmit();

    const subject = watch('subject');

    const onSubmit = (data) => {
        const formData = { ...data, category: 'category' };
        submit(formData, {
            method: 'post',
            action: '/otayhteytta',
        });
    };

    return (
        <Grid
            container
            component={Form}
            onSubmit={handleSubmit(onSubmit)}
            autoComplete="off"
            sx={{
                width: 1000,
                marginTop: 4,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
            }}
        >
            <Typography variant="h3" color="primary.main">
                Ota yhteyttä
            </Typography>
            <Container sx={{ alignItems: 'center' }} maxWidth="md">
                <FormControl
                    sx={{
                        marginTop: 4,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                    }}
                >
                    <TextField
                        {...register('name')}
                        sx={{ mt: 2 }}
                        label="Nimesi"
                        placeholder="Etunimi Sukunimi"
                        fullWidth
                        inputProps={{ title: 'Etu ja Sukunimi', minLength: '4', maxLength: '50' }}
                        required
                    />

                    <TextField
                        {...register('email')}
                        sx={{ mt: 2 }}
                        label="Sähköpostisi"
                        fullWidth
                        inputProps={{
                            title: 'vaatii @turku.fi päätteen',
                            pattern: '.+@turku\\.fi$',
                        }}
                        required
                        placeholder="@turku.fi"
                    />

                    <Grid container>
                        <Grid item xs={12}>
                            <FormControl fullWidth required sx={{ mt: 2 }}>
                                <InputLabel>Aihe</InputLabel>
                                <Select {...register('subject')} labelId="select-label" defaultValue="" label="Aihe">
                                    <MenuItem value="Yleinen palaute">Yleinen palaute</MenuItem>
                                    <MenuItem value="Tilaukset">Tilaukset</MenuItem>
                                    <MenuItem value="Tekninen ongelma">Tekninen ongelma</MenuItem>
                                    <MenuItem value="Kehitysehdotukset">Kehitysehdotukset</MenuItem>
                                </Select>
                            </FormControl>
                        </Grid>
                        <Grid item xs={12}>
                            {subject === 'Tilaukset' && (
                                <TextField
                                    {...register('order_id')}
                                    sx={{ mt: 2 }}
                                    label="Tilausnumero"
                                    placeholder="1234"
                                    required
                                    type="number"
                                />
                            )}
                        </Grid>
                    </Grid>

                    <TextField
                        {...register('message')}
                        sx={{ mt: 2 }}
                        placeholder="Viesti"
                        label="Viesti"
                        required
                        multiline
                        inputProps={{ minLength: '5' }}
                        fullWidth
                        rows={6}
                    />
                    <Button
                        type="submit"
                        style={{ width: 200 }}
                        sx={{
                            mt: 2,
                            mb: 2,
                        }}
                    >
                        Lähetä viesti
                    </Button>
                </FormControl>
            </Container>
        </Grid>
    );
}

export default ContactPage;
