import { useForm } from 'react-hook-form';
import { Form, useSubmit, useLocation, Link } from 'react-router-dom';

import { Box, Container, FormControl, Stack, TextField, Button } from '@mui/material';
import TypographyTitle from '../TypographyTitle';
import AlertBox from '../AlertBox';
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
        formState: { errors, isDirty, isSubmitSuccessful },
    } = useForm({ mode: 'onTouched', defaultValues: { title: location.state.title, content: location.state.content } });

    const onSubmit = (data: { title: string; content: string }) => {
        const formData = { ...data, category: 'category', id: location.state.id };

        submit(formData, {
            method: 'put',
            action: '/admin/tiedotteet/',
        });
    };

    return (
        <Stack sx={{ p: 5 }}>
            <TypographyTitle text={`Muokkaa tiedotetta ${location.state.id}`} />
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
                                {...register('title', {
                                    required: 'Tämä kenttä on täytettävä',
                                    minLength: { value: 5, message: 'Sisältö on liian lyhyt' },
                                    maxLength: { value: 100, message: 'Otsikko on liian pitkä' },
                                })}
                                sx={{ mt: 2 }}
                                label="Uusi otsikko"
                                placeholder="Uusi otsikko"
                                color={isDirty ? 'success' : 'primary'}
                                fullWidth
                                inputProps={{ required: false }}
                                error={!!errors.title}
                                helperText={errors.title?.message?.toString() || ' '}
                                required
                            />

                            <TextField
                                {...register('content', {
                                    required: 'Tämä kenttä on täytettävä',
                                    minLength: { value: 5, message: 'Sisältö on liian lyhyt' },
                                    maxLength: { value: 400, message: 'Sisältö on liian pitkä' },
                                })}
                                sx={{ mt: 2 }}
                                label="Uusi sisältö"
                                placeholder="Uusi sisältö"
                                color={isDirty ? 'success' : 'primary'}
                                // if content is on 6 rows https://stackoverflow.com/questions/64837884/material-ui-too-many-re-renders-the-layout-is-unstable-textareaautosize-limit error comes
                                multiline
                                rows={6}
                                fullWidth
                                inputProps={{ required: false }}
                                error={!!errors.content}
                                helperText={errors.content?.message?.toString() || ' '}
                                required
                            />

                            <Button disabled={!isDirty} type="submit" sx={{ mt: 2 }}>
                                Muokkaa tiedotetta
                            </Button>
                            <Button color="error" component={Link} to="/admin/tiedotteet/" sx={{ mt: 2 }}>
                                Poistu tallentamatta
                            </Button>
                        </FormControl>
                    </Stack>
                </Container>
            </Box>
            {isSubmitSuccessful && (
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
