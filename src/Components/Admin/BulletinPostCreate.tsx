import { useForm } from 'react-hook-form';
import { Form, useSubmit, useLoaderData, useActionData, Link } from 'react-router-dom';

import { Container, TextField, Button, Box, Stack, Grid, IconButton } from '@mui/material';
import FeedIcon from '@mui/icons-material/Feed';
import RefreshIcon from '@mui/icons-material/Refresh';

import AlertBox from '../AlertBox';
import Tooltip from '../Tooltip';
import HeroHeader from '../HeroHeader';
import HeroText from '../HeroText';

import type { createBulletinLoader } from '../../Router/loaders';
import type { createBulletinAction } from '../../Router/actions';

function BulletinPostCreate() {
    const { user } = useLoaderData() as Awaited<ReturnType<typeof createBulletinLoader>>;
    const responseStatus = useActionData() as Awaited<ReturnType<typeof createBulletinAction>>;

    const {
        register,
        reset,
        handleSubmit,
        formState: { isSubmitting, isSubmitSuccessful, errors: formStateErrors, isDirty, dirtyFields },
    } = useForm({
        mode: 'all',
    });
    const submit = useSubmit();

    const onSubmit = (data: any) => {
        const formData = { ...data, author: user.id };

        submit(formData, {
            method: 'post',
        });
    };

    const formReset = () => {
        reset();
    };

    return (
        <>
            {responseStatus?.type === 'bulletincreate' && !responseStatus?.status && (
                <AlertBox text="Tiedotteen lisääminen epäonnistui" status="error" />
            )}

            {responseStatus?.type === 'bulletincreate' && responseStatus?.status && (
                <AlertBox text="Tiedote lisätty." status="success" timer={3000} redirectUrl="/admin/tiedotteet" />
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
                                    message: 'Kirjoita tiedotteen sisältö',
                                },
                            })}
                            inputProps={{ required: false }}
                            required
                            error={!!formStateErrors.content}
                            helperText={formStateErrors.content?.message?.toString() || ' '}
                            color={dirtyFields.content && 'warning'}
                            fullWidth
                        />

                        <Grid container id="submit-reset-btns">
                            <Grid item xs={11}>
                                <Button
                                    id="submit-btn"
                                    type="submit"
                                    disabled={!isDirty || isSubmitting || isSubmitSuccessful}
                                    fullWidth
                                    sx={{
                                        '&:hover': {
                                            backgroundColor: 'success.dark',
                                        },
                                    }}
                                >
                                    Lisää uusi tiedote
                                </Button>
                            </Grid>
                            <Grid item xs={1} sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                <Tooltip title="Tyhjennä lomake">
                                    <IconButton id="reset-form-btn" onClick={() => formReset()}>
                                        <RefreshIcon />
                                    </IconButton>
                                </Tooltip>
                            </Grid>
                        </Grid>
                        <Button
                            // color="error"
                            variant="outlined"
                            component={Link}
                            to="/admin/tiedotteet/"
                            sx={{ mt: '1rem' }}
                        >
                            Takaisin
                        </Button>
                    </Stack>
                </Box>
            </Container>
        </>
    );
}

export default BulletinPostCreate;
