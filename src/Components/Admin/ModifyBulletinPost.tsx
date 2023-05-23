import { useState } from 'react';
import { Box, Container, FormControl, Stack, TextField, Button } from '@mui/material';
import TypographyTitle from '../TypographyTitle';
import AlertBox from '../AlertBox';
import { Form } from 'react-router-dom';

function ModifyBulletinPost() {
    const [success, setSuccess] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    return (
        <Stack sx={{ p: 5 }}>
            <TypographyTitle text="Muokkaa tiedotetta" />
            <Box
                id="bulletin-modification-form-component"
                component={Form}
                // onSubmit={handleSubmit(onSubmit)}
                autoComplete="off"
            >
                <Container maxWidth="md">
                    <Stack id="bulletin-modification-column-stacker">
                        <FormControl id="bulletin-modification-formcontrol">
                            <TextField
                                // {...register('title')}
                                sx={{ mt: 2 }}
                                label="Otsikko"
                                placeholder="Otsikko"
                                fullWidth
                                inputProps={{ title: 'Otsikko', minLength: '4', maxLength: '50' }}
                                required
                            />

                            <TextField
                                // {...register('content')}
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
                                Muokkaa tiedotetta
                            </Button>
                        </FormControl>
                    </Stack>
                </Container>
            </Box>
            {success && (
                <AlertBox text="Tiedote lisätty onnistuneesti" status="success" redirectUrl="/admin" timer={1500} />
            )}
        </Stack>
    );
}

export default ModifyBulletinPost;
