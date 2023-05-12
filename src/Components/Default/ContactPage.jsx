import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Form, useSubmit } from 'react-router-dom';

import { Container, TextField, Button, FormControl, InputLabel, Select, MenuItem, Grid } from '@mui/material';

import MailIcon from '@mui/icons-material/Mail';

import AlertBox from '../AlertBox';
import HeroHeader from '../HeroHeader';
import HeroText from '../HeroText';

function ContactForm() {
    const { register, handleSubmit, watch } = useForm();
    const submit = useSubmit();
    const [success, setSuccess] = useState(false);
    const [isSubmitting] = useState(false);

    const subject = watch('subject');

    const onSubmit = (data) => {
        const formData = { ...data, category: 'category' };
        submit(formData, {
            method: 'post',
            action: '/otayhteytta',
        });
        setSuccess(true);
    };

    return (
        <Container
            id="contact-form-container"
            maxWidth="md"
            component={Form}
            onSubmit={handleSubmit(onSubmit)}
            autoComplete="off"
        >
            <FormControl
                id="contact-form-form-controller"
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                }}
            >
                <TextField
                    {...register('name')}
                    sx={{ mt: 2 }}
                    label="Nimesi"
                    placeholder="Nimi"
                    fullWidth
                    inputProps={{ title: 'Etu- ja sukunimi', minLength: '2', maxLength: '50' }}
                    required
                />

                <TextField
                    {...register('email')}
                    sx={{ mt: 2 }}
                    label="Sähköpostisi"
                    fullWidth
                    inputProps={{
                        title: 'vaatii @turku.fi päätteen (tai @edu.turku.fi)',
                        pattern: '.+@turku\\.fi$|.+@edu\\.turku\\.fi$',
                    }}
                    required
                    placeholder="@turku.fi"
                />

                <Grid container>
                    <Grid item xs={12}>
                        <FormControl fullWidth required sx={{ mt: 2 }}>
                            <InputLabel>Viestin aihe</InputLabel>
                            <Select
                                {...register('subject')}
                                labelId="select-label"
                                defaultValue=""
                                label="Viestin aihe"
                            >
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
                    disabled={isSubmitting}
                    type="submit"
                    sx={{
                        mt: 2,
                        mb: 2,
                    }}
                >
                    Lähetä viesti
                </Button>
                {success && (
                    <AlertBox text="Lähetetty! Kiitos viestistäsi!" timer={3000} status="success" redirectUrl="/" />
                )}
            </FormControl>
        </Container>
    );
}

function ContactPage() {
    return (
        <Container maxWidth="lg">
            <HeroHeader Icon={<MailIcon />} />
            <HeroText
                title="Ota yhteyttä"
                text="Tällä lomakkeella voit lähettää terveisiä, risuja ja ruusuja, tai selvittää tilaukseenne liittyviä
                    mahdollisia kysymyksiä."
            />
            <ContactForm />
        </Container>
    );
}

export default ContactPage;
