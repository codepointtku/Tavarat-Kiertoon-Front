import { Container, TextField, Typography, Button, FormControl, Paper } from '@mui/material';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Form, useSubmit } from 'react-router-dom';
import AlertBox from './AlertBox';

function ContactPage() {
    const { register, handleSubmit } = useForm();
    const submit = useSubmit();
    const [success, setSuccess] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);

    const onSubmit = (data) => {
        const formData = { ...data, category: 'category' };

        setIsSubmitting(true);

        submit(formData, {
            method: 'post',
            action: '/admin/tiedotteet/luo',
        });

        setSuccess(true);
    };

    return (
        <Paper
            elevation="3"
            container="true"
            component={Form}
            onSubmit={handleSubmit(onSubmit)}
            autoComplete="off"
            sx={{
                ml: 14,
                mb: 4,
                width: 1000,
                marginTop: 4,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                alingSelf: 'center',
            }}
        >
            <Typography sx={{ mt: 4 }} variant="h2" color="primary.main">
                Uusi tiedote
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

                    <Button disabled={isSubmitting} type="submit" style={{ width: 200 }} sx={{ mt: 2, mb: 2 }}>
                        LISÄÄ TIEDOTE
                    </Button>
                    {success && (
                        <AlertBox
                            text="Tiedote lisätty onnistuneesti"
                            status="success"
                            redirectUrl="/admin"
                            timer={1500}
                        />
                    )}
                </FormControl>
            </Container>
        </Paper>
    );
}

export default ContactPage;
