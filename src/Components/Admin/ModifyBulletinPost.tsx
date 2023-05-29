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
    const {
        register,
        handleSubmit,
        formState: { dirtyFields, isSubmitting, isSubmitted },
    } = useForm({ defaultValues: { title: '', content: '' } });
    const submit = useSubmit();
    const location = useLocation();

    const onSubmit = (data: { title: string; content: string }) => {
        if (data.title === '') {
            data.title = location.state.title;
        } else if (data.content === '') {
            data.content = location.state.content;
        }
        const formData = { ...data, category: 'category', id: location.state.id };

        submit(formData, {
            method: 'put',
            action: '/admin/tiedotteet/',
        });
    };

    return (
        <Stack sx={{ p: 5 }}>
            <Grid container>
                <Grid item>
                    <TypographyTitle text="Muokkaa tiedotetta" />
                </Grid>
                <Grid sx={{ pt: 0.5 }} item>
                    <Tooltip title="Vain yhden kentän muokkaaminen on myös mahdollista" position="right">
                        <IconButton>
                            <InfoOutlinedIcon fontSize="inherit" color="primary" />
                        </IconButton>
                    </Tooltip>
                </Grid>
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
                                fullWidth
                                inputProps={{ title: 'Otsikko', minLength: '4', maxLength: '50' }}
                                required={!dirtyFields.content}
                            />

                            <TextField
                                {...register('content')}
                                sx={{ mt: 2 }}
                                label="Uusi sisältö"
                                placeholder="Uusi sisältö"
                                multiline
                                rows={6}
                                fullWidth
                                inputProps={{ minLength: '5' }}
                                required={!dirtyFields.title}
                            />

                            <Button disabled={isSubmitting} type="submit" sx={{ mt: 2 }}>
                                Muokkaa tiedotetta
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
