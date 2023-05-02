import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Form, useSubmit } from 'react-router-dom';

import { Container, TextField, Typography, Button, FormControl, Box } from '@mui/material';

import AlertBox from '../AlertBox';
import TypographyTitle from '../TypographyTitle';

function CreateBulletinPost() {
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
        <Box
            id="bulletin-creation-form-container"
            component={Form}
            onSubmit={handleSubmit(onSubmit)}
            autoComplete="off"
        >
            <TypographyTitle text="Luo uusi tiedote" />
            <Container sx={{ alignItems: 'center' }} maxWidth="md">
                <FormControl
                    id="bulletin-creation-formcontrol"
                    sx={{
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
                        placeholder="Sisältö"
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
        </Box>
    );
}

export default CreateBulletinPost;
