import { useLoaderData, useActionData } from 'react-router-dom';
import { useSubmit, Form } from 'react-router-dom';
import { useForm } from 'react-hook-form';

import { Box, Button, Divider, Grid, Stack, TextField, Typography } from '@mui/material';

import HeroText from '../HeroText';
import TypographyHeading from '../TypographyHeading';
import AlertBox from '../AlertBox';

import type { emailRecipientsLoader } from '../../Router/loaders';
import type { adminEmailRecipientsAction } from '../../Router/actions';

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
    const emailRecipients = useLoaderData() as Awaited<ReturnType<typeof emailRecipientsLoader>>;

    const submit = useSubmit();
    // const { handleSubmit, register } = useForm();

    const klik = (id: any) => {
        console.log(id);
        submit(id, { method: 'delete' });
    };

    return (
        <>
            {responseStatus?.type === 'emailrecipient' && !responseStatus?.status && (
                <AlertBox text="Sähköpostin vastaanottajan tallennus epäonnistui." status="error" />
            )}
            {responseStatus?.type === 'emailrecipient' && responseStatus?.status && (
                <AlertBox text="Sähköpostin vastaanottaja tallennettu onnistuneesti" status="success" />
            )}

            <Stack>
                <HeroText
                    title="Sähköpostilista"
                    subtitle="Lisää ja poista osoitteita, mihin lähetetään sähköposti tilauksen vahvistuksen yhteydessä."
                />
                <TypographyHeading text="Vastaanottajat" />

                {emailRecipients.map((recipient) => (
                    <Box key={recipient.id} component={Form}>
                        <Grid
                            // key={recipient.id}
                            container
                            sx={{ marginLeft: '2rem', padding: '1rem', justifyContent: 'flex-start' }}
                        >
                            <Grid item xs={6} sx={{ display: 'flex', alignItems: 'stretch' }}>
                                <Typography
                                    variant="subtitle2"
                                    sx={{ marginRight: '1rem', display: 'flex', alignItems: 'center' }}
                                >
                                    {recipient.email}
                                </Typography>
                            </Grid>
                            <Grid item xs={6}>
                                <Button
                                    id="bulletin-del-btn"
                                    color="error"
                                    type="submit"
                                    value={recipient.id}
                                    onClick={() => klik(recipient.id)}
                                >
                                    Poista
                                </Button>
                            </Grid>
                        </Grid>
                    </Box>
                ))}

                <Divider sx={{ margin: '2rem 0 2rem 0' }} />
                <AddRecipient />
            </Stack>
        </>
    );
}

export default AdminOrderEmailList;
