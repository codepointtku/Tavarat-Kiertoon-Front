import { useForm } from 'react-hook-form';
import { Form, useSubmit, useLocation } from 'react-router-dom';

import { Box, Container, FormControl, Stack, TextField, Button, Grid, IconButton } from '@mui/material';
import TypographyTitle from '../TypographyTitle';
import AlertBox from '../AlertBox';
import Tooltip from '../Tooltip';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import { SubmitHandler, FieldValues } from 'react-hook-form/dist/types';

interface FormData extends SubmitHandler<FieldValues> {
    title: string;
    content: string;
    category: string;
}

function ModifyBulletinPost() {
    const submit = useSubmit();
    const location = useLocation();
    const {
        register,
        handleSubmit,
        formState: { isDirty, isSubmitted },
    } = useForm({ mode: 'onTouched', defaultValues: { title: location.state.title, content: location.state.content } });

    console.log(isDirty);

    const onSubmit = (data: { title: string; content: string }) => {
        const formData = { ...data, category: 'category', id: location.state.id };

        submit(formData, {
            method: 'put',
            action: '/admin/tiedotteet/',
        });
    };

    return (
        <Stack sx={{ p: 5 }}>
            <Grid sx={{ ml: 3 }} container>
                <TypographyTitle text={`Muokkaa tiedotetta ${location.state.id}`} />
                <Tooltip title="Vain yhden kentän muokkaaminen on myös mahdollista" position="right">
                    <IconButton>
                        <InfoOutlinedIcon fontSize="inherit" color="primary" />
                    </IconButton>
                </Tooltip>
            </Grid>
            <Box
                id="bulletin-modification-form-component"
                component={Form}
                onSubmit={handleSubmit(onSubmit as FormData)}
                autoComplete="off"
            >
                <Container maxWidth="md">
                    <Stack id="bulletin-modification-column-stacker">
                        <FormControl id="bulletin-modification-formcontrol">
                            <TextField
                                {...register('title')}
                                sx={{ mt: 2 }}
                                label="Uusi otsikko"
                                placeholder="Uusi otsikko"
                                color={isDirty ? 'success' : 'primary'}
                                fullWidth
                                inputProps={{ title: 'Otsikko', minLength: '4', maxLength: '50' }}
                                required
                            />

                            <TextField
                                {...register('content')}
                                sx={{ mt: 2 }}
                                label="Uusi sisältö"
                                placeholder="Uusi sisältö"
                                color={isDirty ? 'success' : 'primary'}
                                multiline
                                rows={6}
                                fullWidth
                                inputProps={{ minLength: '5' }}
                                required
                            />

                            <Button disabled={!isDirty} type="submit" sx={{ mt: 2 }}>
                                Muokkaa tiedotetta
                            </Button>
                            <Button color="error" type="submit" sx={{ mt: 2 }}>
                                Poistu tallentamatta
                            </Button>
                        </FormControl>
                    </Stack>
                </Container>
            </Box>
            {isSubmitted && (
                <AlertBox
                    text="Tiedote lisätty onnistuneesti"
                    status="success"
                    redirectUrl="/admin/tiedotteet/"
                    timer={2000}
                />
            )}
        </Stack>
    );
}

export default ModifyBulletinPost;
