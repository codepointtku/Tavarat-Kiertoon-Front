import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Form, useSubmit } from 'react-router-dom';

import {
    Container,
    TextField,
    Button,
    FormControl,
    InputLabel,
    Select,
    MenuItem,
    Grid,
    FormHelperText, // import FormHelperText
} from '@mui/material';

import MailIcon from '@mui/icons-material/Mail';

import AlertBox from '../AlertBox';
import HeroHeader from '../HeroHeader';
import HeroText from '../HeroText';

function ContactForm() {
    const {
        register,
        handleSubmit,
        watch,
        formState: { errors }, // add formState and errors
    } = useForm({
        mode: 'onBlur', // set mode to onBlur
    });
    const submit = useSubmit();
    const [success, setSuccess] = useState(false);
    const [isSubmitting] = useState(false);

    const subject = watch('subject');

    const onSubmit = (formData) => {
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
                    {...register('name', {
                        required: 'Nimi on pakollinen', // add required validation and custom error message
                        minLength: {
                            value: 2,
                            message: 'Nimen pituuden tulee olla vähintään 2 merkkiä', // add minLength validation and custom error message
                        },
                        maxLength: {
                            value: 50,
                            message: 'Nimen pituus saa olla enintään 50 merkkiä', // add maxLength validation and custom error message
                        },
                    })}
                    sx={{ mt: 2 }}
                    label="Nimesi"
                    placeholder="Nimi"
                    fullWidth
                    inputProps={{ title: 'Etu- ja sukunimi' }}
                />
                {errors.name ? (
                    <FormHelperText error>{errors.name.message}</FormHelperText>
                ) : (
                    <FormHelperText> </FormHelperText>
                    // add error message for subject field
                )}

                <TextField
                    {...register('email', {
                        required: 'Sähköposti on pakollinen', // add required validation and custom error message
                        minLength: {
                            value: 5,
                            message: 'Sähköpostin pituuden tulee olla vähintään 5 merkkiä', // add minLength validation and custom error message
                        },
                    })}
                    sx={{ mt: 2 }}
                    label="Sähköpostisi"
                    fullWidth
                    placeholder=""
                />
                {errors.email ? (
                    <FormHelperText error variant="outlined">
                        {errors.email.message}
                    </FormHelperText>
                ) : (
                    <FormHelperText> </FormHelperText>
                    // add error message for subject field
                )}

                <Grid container>
                    <Grid item xs={12}>
                        <FormControl fullWidth sx={{ mt: 2 }}>
                            <InputLabel>Viestin aihe</InputLabel>
                            <Select
                                {...register('subject', { required: 'Aihe on pakollinen' })} // add required validation and custom error message
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
                        {errors.subject ? (
                            <FormHelperText error>{errors.subject.message}</FormHelperText>
                        ) : (
                            <FormHelperText> </FormHelperText>
                            // add error message for subject field
                        )}
                    </Grid>
                    <Grid item xs={12}>
                        {subject === 'Tilaukset' && (
                            <TextField
                                {...register('order_id', {
                                    required: 'Tilausnumero on pakollinen', // add required validation and custom error message
                                    min: {
                                        value: 1,
                                        message: 'Tilausnumeron tulee olla vähintään 1', // add min validation and custom error message
                                    },
                                })}
                                sx={{ mt: 2 }}
                                label="Tilausnumero"
                                placeholder="1234"
                                type="number"
                            />
                        )}
                        {errors.order_id && (
                            <FormHelperText error>{errors.order_id.message}</FormHelperText> // add error message for order_id field
                        )}
                    </Grid>
                </Grid>

                <TextField
                    {...register('message', {
                        required: 'Viesti on pakollinen', // add required validation and custom error message
                        minLength: {
                            value: 5,
                            message: 'Viestin pituuden tulee olla vähintään 5 merkkiä', // add minLength validation and custom error message
                        },
                    })}
                    sx={{ mt: 2 }}
                    placeholder="Viesti"
                    label="Viesti"
                    multiline
                    fullWidth
                    rows={6}
                />
                {errors.message && (
                    <FormHelperText error>{errors.message.message}</FormHelperText> // add error message for message field
                )}

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
