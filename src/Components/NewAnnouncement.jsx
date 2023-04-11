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
import { Form, useLoaderData, useSubmit } from 'react-router-dom';

function ContactPage() {
    const { register, handleSubmit } = useForm();
    const submit = useSubmit();

    const subjects = useLoaderData();
    console.log(subjects);

    const onSubmit = (data) => {
        const formData = { ...data, category: 'category' };
        submit(formData, {
            method: 'post',
            action: '/admin/tiedotteet/luo',
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
                Uusi ilmoitus
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
                        {...register('title')}
                        sx={{ mt: 2 }}
                        label="Otsikko"
                        placeholder="Otsikko"
                        fullWidth
                        inputProps={{ title: 'Otsikko', minLength: '4', maxLength: '50' }}
                        required
                    />

                    <Grid container>
                        <Grid item xs={12}>
                            <FormControl fullWidth required sx={{ mt: 2 }}>
                                <InputLabel>Aihe</InputLabel>
                                <Select {...register('subject')} labelId="select-label" defaultValue="" label="Aihe">
                                    {subjects.map((subject) => (
                                        <MenuItem key={subject.id} value={subject.id}>
                                            {subject.name}
                                        </MenuItem>
                                    ))}
                                </Select>
                            </FormControl>
                        </Grid>
                    </Grid>

                    <TextField
                        {...register('content')}
                        sx={{ mt: 2 }}
                        placeholder="Sisältö   "
                        label="Sisältö"
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
