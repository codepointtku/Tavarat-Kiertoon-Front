import { useLoaderData, useActionData } from 'react-router-dom';
import { useSubmit, Form } from 'react-router-dom';
import { useForm } from 'react-hook-form';

import { Box, Button, Divider, Grid, Stack, TextField, Typography } from '@mui/material';

import HeroText from '../HeroText';
import TypographyHeading from '../TypographyHeading';
import AlertBox from '../AlertBox';

import type { emailRecipientsLoader } from '../../Router/loaders';
import type { adminEmailRecipientsAction } from '../../Router/actions';

interface RecipientProps {
    email: string;
    id: string;
}

function EmailRecipients() {
    const emailRecipients = useLoaderData() as Awaited<ReturnType<typeof emailRecipientsLoader>>;

    return (
        <Box>
            {emailRecipients.map((recipient) => (
                <Box id="email-recipient-component-container" key={recipient.id}>
                    <EmailRecipient email={recipient.email} id={recipient.id.toString()} />
                </Box>
            ))}
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
        <Box>
            <Box>
                <Grid container sx={{ marginLeft: '2rem', padding: '1rem', justifyContent: 'flex-start' }}>
                    <Grid item xs={6} sx={{ display: 'flex', alignItems: 'stretch' }}>
                        <Typography
                            variant="subtitle2"
                            sx={{ marginRight: '1rem', display: 'flex', alignItems: 'center' }}
                        >
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
            </Box>
        </Box>
    );
}

function AddRecipient() {
    const {
        register,
        handleSubmit: createHandleSubmit,
        formState: { isSubmitSuccessful, isDirty, errors: formErrors },
    } = useForm({ mode: 'onTouched' });
    const submit = useSubmit();

    const handleCreate = (data: any) => {
        const formData = { ...data };
        submit(formData, {
            method: 'post',
        });
    };

    return (
        <>
            <TypographyHeading text="Uuden vastaanottajan lisääminen" />
            <Box component={Form} onSubmit={createHandleSubmit(handleCreate)} sx={{ marginTop: '1rem' }}>
                <Stack>
                    <TextField
                        id="input-email"
                        type="text"
                        label="Sähköpostiosoite"
                        {...register('email', {
                            required: { value: true, message: 'Kirjoita lisättävä sähköpostiosoite' },
                            minLength: { value: 5, message: 'Sähköpostiosoitteen on oltava vähintään 5 merkkiä' },
                            pattern: {
                                value: /.+@turku.fi$|.+@edu.turku.fi$/,
                                message: 'Sähköpostin on oltava muotoa @turku.fi tai @edu.turku.fi',
                            },
                        })}
                        error={!!formErrors.email}
                        helperText={formErrors.email?.message?.toString() || ' '}
                        disabled={isSubmitSuccessful}
                        required
                        inputProps={{ required: false }}
                        sx={{ marginRight: '1rem' }}
                        fullWidth
                    />
                    <Button
                        type="submit"
                        disabled={isSubmitSuccessful || !isDirty}
                        sx={{
                            '&:hover': {
                                backgroundColor: 'success.dark',
                            },
                        }}
                    >
                        Lisää uusi
                    </Button>
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
                <AlertBox text="Sähköpostin vastaanottajan tallennus epäonnistui." status="error" />
            )}
            {responseStatus?.type === 'emailrecipient' && responseStatus?.status && (
                <AlertBox text="Sähköpostin vastaanottaja tallennettu onnistuneesti" status="success" />
            )}

            {responseStatus?.type === 'emailrecipient-del' && responseStatus?.status && (
                <AlertBox text="Sähköpostin vastaanottaja poistettu listalta" status="success" />
            )}

            <Stack id="email-recipients-component-stack">
                <HeroText
                    title="Sähköpostilista"
                    subtitle="Lisää ja poista osoitteita, mihin lähetetään sähköposti tilauksen vahvistuksen yhteydessä."
                />
                <TypographyHeading text="Vastaanottajat" />
                <EmailRecipients />
                <Divider sx={{ margin: '2rem 0 2rem 0' }} />
                <AddRecipient />
            </Stack>
        </>
    );
}

export default AdminOrderEmailList;
