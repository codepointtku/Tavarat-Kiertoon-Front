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

    const onSubmit = (formData: any) => {
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
                    label="Nimi"
                    placeholder="Nimi"
                    {...register('name', {
                        required: { value: true, message: 'Syötä nimi' },
                        maxLength: { value: 50, message: 'Maksimipituus' },
                    })}
                    error={!!formStateErrors.name}
                    helperText={formStateErrors.name?.message?.toString() || ' '}
                    required
                    // to get rid of the browser default message
                    inputProps={{ required: false }}
                    fullWidth
                    // sx={{ mt: 2 }}
                />

                <TextField
                    label="Sähköposti"
                    placeholder="Sähköpostiosoite"
                    {...register('email', {
                        required: { value: true, message: 'Sähköpostiosoite on pakollinen' },
                        minLength: { value: 5, message: 'Sähköpostiosoitteen on oltava vähintään 5 merkkiä' },
                        maxLength: { value: 50, message: 'Maksimipituus' },
                        pattern: {
                            value: /.+@turku.fi$|.+@edu.turku.fi$/,
                            message: 'Sähköpostin on oltava muotoa @turku.fi tai @edu.turku.fi',
                        },
                    })}
                    error={!!formStateErrors.email}
                    helperText={formStateErrors.email?.message?.toString() || ' '}
                    required
                    inputProps={{ required: false }}
                    fullWidth
                    // sx={{ mt: 2 }}
                />

                <Grid container>
                    <Grid item xs={12}>
                        <FormControl fullWidth required /*sx={{ mt: 2 }}*/>
                            <InputLabel>Viestin aihe</InputLabel>
                            <Select
                                label="Viestin aihe"
                                {...register('subject', {
                                    required: { value: true, message: 'Valitse aihe' },
                                })}
                                error={!!formStateErrors.subject}
                                labelId="select-label"
                                defaultValue=""
                                inputProps={{ required: false }}
                            >
                                <MenuItem value="Yleinen palaute">Yleinen palaute</MenuItem>
                                <MenuItem value="Tilaukset">Tilaukset</MenuItem>
                                <MenuItem value="Tekninen ongelma">Tekninen ongelma</MenuItem>
                                <MenuItem value="Kehitysehdotukset">Kehitysehdotukset</MenuItem>
                            </Select>
                        </FormControl>
                    </Grid>
                    <Grid id="amihere" item xs={12}>
                        {subject === 'Tilaukset' && (
                            <TextField
                                label="Tilausnumero"
                                type="number"
                                {...register('order_id', {
                                    pattern: { value: /^[0-9]+$/, message: 'Sisällön tulee koostua vain numeroista' },
                                })}
                                // sx={{ mt: 2 }}
                                required
                            />
                        )}
                    </Grid>
                </Grid>

                <TextField
                    label="Viesti"
                    placeholder="Viesti"
                    {...register('message', {
                        required: { value: true, message: 'Syötä viesti' },
                        maxLength: { value: 9999, message: 'Maksimipituus' },
                    })}
                    error={!!formStateErrors.message}
                    helperText={formStateErrors.message?.message?.toString() || ' '}
                    required
                    inputProps={{ required: false }}
                    multiline
                    rows={6}
                    fullWidth
                    // sx={{ mt: 2 }}
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

            {responseStatus?.status && (
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
