import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Form, useSubmit } from 'react-router-dom';

import { Container, TextField, Button, FormControl, Box, Stack } from '@mui/material';

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
        <>
            <TypographyTitle text="Luo uusi tiedote" />
            <Box
                id="bulletin-creation-form-component"
                component={Form}
                onSubmit={handleSubmit(onSubmit)}
                autoComplete="off"
            >
                <Container maxWidth="md">
                    <Stack id="bulletin-creation-column-stacker">
                        <FormControl id="bulletin-creation-formcontrol">
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
                                label="Sisältö"
                                placeholder="Sisältö"
                                multiline
                                rows={6}
                                fullWidth
                                inputProps={{ minLength: '5' }}
                                required
                            />

                            <Button disabled={isSubmitting} type="submit" sx={{ mt: 2 }}>
                                Lisää tiedote
                            </Button>
                        </FormControl>
                    </Stack>
                </Container>
            </Box>
            {success && (
                <AlertBox text="Tiedote lisätty onnistuneesti" status="success" redirectUrl="/admin" timer={1500} />
            )}
        </>
    );
}

export default CreateBulletinPost;
