import { useLoaderData, useActionData } from 'react-router-dom';
import { useSubmit, Form } from 'react-router-dom';
import { useForm } from 'react-hook-form';

import { Box, Button, Container, Divider, Grid, IconButton, Stack, TextField, Typography } from '@mui/material';
import RefreshIcon from '@mui/icons-material/Refresh';
import ListIcon from '@mui/icons-material/List';

import HeroHeader from '../HeroHeader';
import HeroText from '../HeroText';
import TypographyHeading from '../TypographyHeading';
import Tooltip from '../Tooltip';
import AlertBox from '../AlertBox';

import type { emailRecipientsLoader } from '../../Router/loaders';
import type { adminEmailRecipientsAction } from '../../Router/actions';

interface RecipientProps {
    email: string;
    id: string;
}

interface RecipientsEmails {
    recipientsEmails: string[];
}

function EmailRecipients() {
    const emailRecipients = useLoaderData() as Awaited<ReturnType<typeof emailRecipientsLoader>>;

    const recipientsEmails = emailRecipients.map((r) => r.email);

    return (
        <Box>
            {emailRecipients.length === 0 ? (
                <Typography marginTop={'1rem'} marginBottom={'2rem'}>
                    Ei lisättyjä osoitteita
                </Typography>
            ) : (
                emailRecipients.map((recipient) => (
                    <EmailRecipient key={recipient.id} email={recipient.email} id={recipient.id.toString()} />
                ))
            )}
            <Divider sx={{ margin: '1rem 0 2rem 0' }} />
            <AddRecipient recipientsEmails={recipientsEmails} />
        </Box>
    );
}

function EmailRecipient({ email, id }: RecipientProps) {
    const submit = useSubmit();
    const { handleSubmit } = useForm();

    const handleDel = () => {
        submit({ id }, { method: 'delete' });
    };

    return (
        <Grid container sx={{ marginLeft: '2rem', padding: '1rem', justifyContent: 'flex-start' }}>
            <Grid item xs={6} sx={{ display: 'flex', alignItems: 'stretch' }}>
                <Typography variant="subtitle2" sx={{ display: 'flex', alignItems: 'center' }}>
                    {email}
                </Typography>
            </Grid>
            <Grid item xs={6}>
                <Box component={Form} onSubmit={handleSubmit(handleDel)}>
                    <Button id="bulletin-del-btn" color="error" type="submit" value={id}>
                        Poista
                    </Button>
                </Box>
            </Grid>
        </Grid>
    );
}

function AddRecipient({ recipientsEmails }: RecipientsEmails) {
    const {
        register,
        reset,
        handleSubmit: createHandleSubmit,
        formState: { isSubmitSuccessful, isDirty, errors: formErrors, isValid },
    } = useForm({ mode: 'all' });

    const submit = useSubmit();

    const handleCreate = (data: any) => {
        const formData = { ...data };
        submit(formData, {
            method: 'post',
        });
    };

    const formReset = () => {
        reset();
    };

    return (
        <>
            <TypographyHeading text="Uuden vastaanottajan lisääminen" />
            <Box component={Form} onSubmit={createHandleSubmit(handleCreate)} sx={{ margin: '1rem 0 1rem 0' }}>
                <Stack>
                    <TextField
                        id="input-email"
                        type="text"
                        label="Sähköpostiosoite"
                        {...register('email', {
                            required: { value: true, message: 'Kirjoita listaan lisättävä sähköpostiosoite' },
                            minLength: { value: 5, message: 'Sähköpostiosoitteen on oltava vähintään 5 merkkiä' },
                            pattern: {
                                value: /^[\w\-\.åÅäÄöÖ]+@(edu\.)?turku\.fi$/,
                                message: 'Sähköpostin on oltava muotoa @turku.fi tai @edu.turku.fi',
                            },
                            validate: (val: string) => {
                                if (recipientsEmails.includes(val)) {
                                    return 'Sähköposti on jo listalla';
                                }
                            },
                        })}
                        error={!!formErrors.email}
                        helperText={formErrors.email?.message?.toString() || ' '}
                        disabled={isSubmitSuccessful}
                        required
                        inputProps={{ required: false }}
                        fullWidth
                    />

                    <Grid container id="submit-reset-btns">
                        <Grid item xs={11}>
                            <Button
                                type="submit"
                                disabled={isSubmitSuccessful || !isDirty || !isValid}
                                sx={{
                                    '&:hover': {
                                        backgroundColor: 'success.dark',
                                    },
                                }}
                            >
                                Lisää
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
                </Stack>
            </Box>
        </>
    );
}

function AdminOrderEmailList() {
    const responseStatus = useActionData() as Awaited<ReturnType<typeof adminEmailRecipientsAction>>;

    return (
        <>
            {responseStatus?.type === 'emailrecipient' && !responseStatus?.status && (
                <AlertBox text="Sähköpostin vastaanottajan tallennus epäonnistui" status="error" timer={5000} />
            )}
            {responseStatus?.type === 'emailrecipient' && responseStatus?.status && (
                <AlertBox text="Sähköpostin vastaanottaja tallennettu" status="success" timer={5000} />
            )}

            {responseStatus?.type === 'emailrecipient-del' && responseStatus?.status && (
                <AlertBox text="Sähköpostin vastaanottaja poistettu listalta" status="success" timer={5000} />
            )}

            <Container maxWidth="md">
                <Stack id="email-recipients-component-stack">
                    <HeroHeader Icon={<ListIcon />} hideInAdmin />
                    <HeroText
                        title="Sähköpostilista"
                        subtext="Lisää ja poista osoitteita, mihin lähetetään sähköposti tilauksen vahvistuksen yhteydessä."
                    />
                    <TypographyHeading text="Vastaanottajat" />
                    <EmailRecipients />
                </Stack>
            </Container>
        </>
    );
}

export default AdminOrderEmailList;
