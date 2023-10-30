import { useForm } from 'react-hook-form';
import { Form, useActionData, useSubmit } from 'react-router-dom';

import { Container, TextField, Button, FormControl, InputLabel, Select, MenuItem, Grid } from '@mui/material';

import MailIcon from '@mui/icons-material/Mail';

import AlertBox from '../AlertBox';
import HeroHeader from '../HeroHeader';
import HeroText from '../HeroText';

import type { contactAction } from '../../Router/actions';

function ContactForm() {
    const responseStatus = useActionData() as Awaited<ReturnType<typeof contactAction>>;

    const {
        register,
        handleSubmit,
        watch,
        formState: { errors: formStateErrors, isSubmitting },
    } = useForm();

    const submit = useSubmit();

    const subject = watch('subject');

    const onSubmit = (formData) => {
        submit(formData, {
            method: 'post',
            action: '/otayhteytta',
        });
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
                    {...register('name', {
                        required: { value: true, message: 'Elämä on pakollinen' },
                        minLength: { value: 1, message: 'Jee' },
                        maxLength: { value: 50, message: 'jöö' },
                    })}
                    sx={{ mt: 2 }}
                    label="Nimi"
                    placeholder="Nimi"
                    fullWidth
                    required
                />

                <TextField
                    {...register('email', {
                        required: { value: true, message: 'Verojen maksu on pakollinen' },
                        minLength: { value: 1, message: 'Jee' },
                        maxLength: { value: 50, message: 'jöö just joo' },
                    })}
                    sx={{ mt: 2 }}
                    label="Sähköpostisi"
                    fullWidth
                    inputProps={{
                        pattern: '.+@turku\\.fi$|.+@edu\\.turku\\.fi$',
                        title: 'vaatii @turku.fi päätteen (tai @edu.turku.fi)',
                    }}
                    required
                    placeholder="@turku.fi"
                />

                <Grid container>
                    <Grid item xs={12}>
                        <FormControl fullWidth required sx={{ mt: 2 }}>
                            <InputLabel>Viestin aihe</InputLabel>
                            <Select
                                {...register('subject', {
                                    required: { value: true, message: 'No valkkaa ees joku' },
                                })}
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
                                {...register('order_id', {
                                    pattern: { value: /^[0-9]+$/, message: 'Sisällön tulee koostua vain numeroista' },
                                })}
                                sx={{ mt: 2 }}
                                label="Tilausnumero"
                                required
                                type="number"
                            />
                        )}
                    </Grid>
                </Grid>

                <TextField
                    {...register('message', {
                        required: { value: true, message: 'Syötä viesti' },
                        maxLength: { value: 9999, message: 'Maksimipituus' },
                    })}
                    sx={{ mt: 2 }}
                    placeholder="Viesti"
                    label="Viesti"
                    required
                    multiline
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
            </FormControl>

            {responseStatus.status && (
                <AlertBox text="Lähetetty! Kiitos viestistäsi!" timer={3000} status="success" redirectUrl="/" />
            )}
        </Container>
    );
}

function ContactPage() {
    return (
        <>
            <Container maxWidth="lg">
                <HeroHeader Icon={<MailIcon />} />
                <HeroText
                    title="Ota yhteyttä"
                    text="Tällä lomakkeella voit lähettää terveisiä, risuja ja ruusuja, tai selvittää tilaukseenne liittyviä
                mahdollisia kysymyksiä."
                />
                <ContactForm />
            </Container>
        </>
    );
}

export default ContactPage;
