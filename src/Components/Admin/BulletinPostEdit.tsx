import { useForm } from 'react-hook-form';
import { Form, useSubmit, Link, useActionData, useLoaderData } from 'react-router-dom';

import { Box, Container, FormControl, Stack, TextField, Button } from '@mui/material';

import FeedIcon from '@mui/icons-material/Feed';

import AlertBox from '../AlertBox';
import HeroHeader from '../HeroHeader';
import HeroText from '../HeroText';

import type { SubmitHandler, FieldValues } from 'react-hook-form/dist/types';
import type { adminBulletinLoader } from '../../Router/loaders';
import type { adminBulletinsAction } from '../../Router/actions';

interface FormData extends SubmitHandler<FieldValues> {
    title: string;
    content: string;
}

function BulletinPostEdit() {
    const { bulletin } = useLoaderData() as Awaited<ReturnType<typeof adminBulletinLoader>>;
    const responseStatus = useActionData() as Awaited<ReturnType<typeof adminBulletinsAction>>;

    const {
        register,
        handleSubmit,
        formState: { errors, isDirty, isValid, isSubmitSuccessful },
    } = useForm({ mode: 'onTouched', defaultValues: { ...bulletin } });

    const submit = useSubmit();

    const onSubmit = (data: { title: string; content: string }) => {
        const formData = { ...data };

        submit(formData, {
            method: 'put',
        });
    };

    return (
        <>
            {responseStatus?.type === 'bulletinedit' && !responseStatus?.status && (
                <AlertBox text="Tiedotteen muokkaus epäonnistui" status="error" />
            )}

            {responseStatus?.type === 'bulletinedit' && responseStatus?.status && (
                <AlertBox text="Tiedote muokattu." status="success" timer={3000} redirectUrl="/admin/tiedotteet" />
            )}

            <Container maxWidth="lg">
                <HeroHeader Icon={<FeedIcon />} hideInAdmin />
                <HeroText title={`Muokkaa tiedotetta ${bulletin.id}`} />
                <Box
                    id="bulletin-modification-form-component"
                    component={Form}
                    onSubmit={handleSubmit(onSubmit as FormData)}
                    autoComplete="off"
                >
                    <Stack id="bulletin-modification-column-stacker">
                        <FormControl id="bulletin-modification-formcontrol">
                            <TextField
                                label="Uusi otsikko"
                                placeholder="Uusi otsikko"
                                {...register('title', {
                                    required: 'Täytä tiedotteen otsikko',
                                    minLength: { value: 1, message: 'Otsikko on pakollinen' },
                                    maxLength: { value: 50, message: 'Maksimipituus 50 merkkiä' },
                                })}
                                required
                                inputProps={{ required: false }}
                                error={!!errors.title}
                                helperText={errors.title?.message?.toString() || ' '}
                                fullWidth
                                color={isDirty ? 'success' : 'primary'}
                            />

                            <TextField
                                label="Uusi sisältö"
                                placeholder="Uusi sisältö"
                                {...register('content', {
                                    required: 'Täytä tiedotteen sisältö',
                                    minLength: { value: 1, message: 'Sisältö on pakollinen' },
                                })}
                                // if content is on 6 rows
                                // https://stackoverflow.com/questions/64837884/material-ui-too-many-re-renders-the-layout-is-unstable-textareaautosize-limit
                                multiline
                                rows={6}
                                required
                                inputProps={{ required: false }}
                                error={!!errors.content}
                                helperText={errors.content?.message?.toString() || ' '}
                                fullWidth
                                color={isDirty ? 'success' : 'primary'}
                            />

                            <Button type="submit" disabled={!isDirty || !isValid || isSubmitSuccessful}>
                                Muokkaa tiedotetta
                            </Button>
                            <Button
                                // color="error"
                                variant="outlined"
                                component={Link}
                                to="/admin/tiedotteet/"
                                sx={{ mt: '1rem' }}
                            >
                                Takaisin
                            </Button>
                        </FormControl>
                    </Stack>
                </Box>
            </Container>
        </>
    );
}

export default BulletinPostEdit;
