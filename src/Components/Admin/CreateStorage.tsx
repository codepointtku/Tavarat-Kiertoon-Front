import { useForm } from 'react-hook-form';
import { Form, useActionData, useSubmit } from 'react-router-dom';

import { Box, Button, Container, Stack, TextField } from '@mui/material';
import DomainAddIcon from '@mui/icons-material/DomainAdd';

import AlertBox from '../AlertBox';
import HeroHeader from '../HeroHeader';
import HeroText from '../HeroText';

import type { storageCreateAction } from '../../Router/actions';

function CreateStorage() {
    const responseStatus = useActionData() as Awaited<ReturnType<typeof storageCreateAction>>;

    // const choices = ['käytössä', 'ei käytössä'];

    const {
        register,
        handleSubmit,
        formState: { isSubmitting, isSubmitSuccessful, errors: formStateErrors, isDirty, dirtyFields },
    } = useForm();
    const submit = useSubmit();

    const onSubmit = () => {
        console.log('pleis houlderi');
    };

    return (
        <>
            {responseStatus?.type === 'post' && !responseStatus?.status && (
                <AlertBox text="Varaston luominen epäonnistui" status="error" />
            )}

            {responseStatus?.type === 'post' && responseStatus?.status && (
                <AlertBox text="Varasto luotu" status="success" />
            )}

            <Container maxWidth="lg">
                <HeroHeader Icon={<DomainAddIcon />} hideInAdmin />
                <HeroText title="Uusi varasto" subtitle="Uuden varaston luominen tietokantaan" />
                <Box
                    id="storage-creation-form"
                    component={Form}
                    onSubmit={handleSubmit(onSubmit)}
                    autoComplete="off"
                    sx={{ marginTop: '2rem' }}
                >
                    <Stack id="storage-creation-textfields-stacker">
                        <TextField
                            id="textfield-storage-name"
                            type="text"
                            label="Nimi"
                            placeholder="Varaston nimi"
                            {...register('name', {
                                required: { value: true, message: 'Varaston nimi on pakollinen' },
                                maxLength: {
                                    value: 50,
                                    message: 'Maksimipituus 50 merkkiä',
                                },
                            })}
                            // Needs to be 'required: false' to disable browser error message
                            inputProps={{ required: false }}
                            required
                            error={!!formStateErrors.name}
                            helperText={formStateErrors.name?.message?.toString() || ' '}
                            color={dirtyFields.name && 'warning'}
                            fullWidth
                        />

                        <TextField
                            id="textfield-storage-address"
                            label="Osoite"
                            placeholder="Varaston sijainti"
                            {...register('address', {
                                required: { value: true, message: 'Varaston katuosoite on pakollinen' },
                                minLength: {
                                    value: 1,
                                    message: 'Kirjoita edes jotain',
                                },
                            })}
                            inputProps={{ required: false }}
                            required
                            error={!!formStateErrors.address}
                            helperText={formStateErrors.address?.message?.toString() || ' '}
                            color={dirtyFields.address && 'warning'}
                            fullWidth
                        />

                        <Button
                            disabled={!isDirty || isSubmitting || isSubmitSuccessful}
                            type="submit"
                            sx={{ mt: '1rem' }}
                        >
                            Lisää uusi varasto
                        </Button>
                    </Stack>
                </Box>
            </Container>
        </>
    );
}

export default CreateStorage;
