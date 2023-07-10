import { useForm } from 'react-hook-form';
import { Form, useSubmit, useRouteLoaderData } from 'react-router-dom';

import { Container, TextField, Button, Box, Stack } from '@mui/material';
import FeedIcon from '@mui/icons-material/Feed';

import AlertBox from '../AlertBox';
import HeroHeader from '../HeroHeader';
import HeroText from '../HeroText';

import type { adminLoader } from '../../Router/loaders';

function CreateBulletinPost() {
    const { user } = useRouteLoaderData('admin') as Awaited<ReturnType<typeof adminLoader>>;

    const {
        register,
        handleSubmit,
        formState: { isSubmitting, isSubmitSuccessful, errors: formStateErrors, isDirty, dirtyFields },
    } = useForm();
    const submit = useSubmit();

    const onSubmit = (data: any) => {
        const formData = { ...data, category: 'category', author: user.id };

        submit(formData, {
            method: 'post',
            action: '/admin/tiedotteet/luo',
        });
    };

    return (
        <>
            {isSubmitSuccessful && (
                <AlertBox
                    text="Tiedote lisätty onnistuneesti"
                    status="success"
                    redirectUrl="/admin/tiedotteet"
                    timer={1500}
                />
            )}

            <Container maxWidth="lg">
                <HeroHeader Icon={<FeedIcon />} hideInAdmin />
                <HeroText title="Luo uusi tiedote" />
                <Box id="bulletin-creation-form" component={Form} onSubmit={handleSubmit(onSubmit)} autoComplete="off">
                    <Stack id="bulletin-creation-textfields-stacker">
                        <TextField
                            id="textfield-bulletin-title"
                            type="text"
                            label="Otsikko"
                            placeholder="Tiedotteen otsikko"
                            {...register('title', {
                                required: { value: true, message: 'Tiedotteen otsikko on pakollinen' },
                                maxLength: {
                                    value: 50,
                                    message: 'Maksimipituus 50 merkkiä',
                                },
                            })}
                            // Needs to be 'required: false' to disable browser error message
                            inputProps={{ required: false }}
                            required
                            error={!!formStateErrors.title}
                            helperText={formStateErrors.title?.message?.toString() || ' '}
                            color={dirtyFields.title && 'warning'}
                            fullWidth
                        />

                        <TextField
                            id="textfield-bulletin-content"
                            label="Sisältö"
                            placeholder="Sisältö"
                            multiline
                            rows={10}
                            {...register('content', {
                                required: { value: true, message: 'Tiedotteen sisältö on pakollinen' },
                                minLength: {
                                    value: 1,
                                    message: 'Kirjoita edes jotain',
                                },
                            })}
                            inputProps={{ required: false }}
                            required
                            error={!!formStateErrors.content}
                            helperText={formStateErrors.content?.message?.toString() || ' '}
                            color={dirtyFields.content && 'warning'}
                            fullWidth
                        />

                        <Button
                            disabled={!isDirty || isSubmitting || isSubmitSuccessful}
                            type="submit"
                            sx={{ mt: '1rem' }}
                        >
                            Lisää tiedote
                        </Button>
                    </Stack>
                </Box>
            </Container>
        </>
    );
}

export default CreateBulletinPost;
