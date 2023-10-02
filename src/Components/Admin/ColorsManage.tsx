import { Form, useSubmit, useLoaderData, useActionData } from 'react-router-dom';
import { useForm } from 'react-hook-form';

import { Box, Button, Container, Divider, Stack, TextField, Typography } from '@mui/material';

import HeroText from '../HeroText';
import AlertBox from '../AlertBox';

import type { colorsLoader } from '../../Router/loaders';
import type { colorsManageAction } from '../../Router/actions';

// interface Color {
//     id: number;
//     name: string;
//     default: boolean;
// }

function ColorsManage() {
    const { colors } = useLoaderData() as Awaited<ReturnType<typeof colorsLoader>>;
    const responseStatus = useActionData() as Awaited<ReturnType<typeof colorsManageAction>>;

    const submit = useSubmit();
    const onSubmit = (data: any) => {
        submit(data, { method: 'post' });
    };

    const onDeleteSubmit = (color: any) => {
        submit(color, { method: 'delete' });
    };

    const {
        register,
        handleSubmit,
        formState: { isDirty, isValid, errors },
    } = useForm({
        mode: 'all',
        defaultValues: {
            color: '',
        },
    });

    return (
        <>
            {responseStatus?.type === 'colormanageaction' && !responseStatus?.status && (
                <AlertBox text="Jokin meni pieleen" status="warning" />
            )}

            <Container maxWidth="sm">
                <Stack spacing={2} marginBottom="2rem">
                    <HeroText title="Hallinnoi värejä" />
                    {colors.map((color, i) => {
                        // const searchWatchTitled = color.words.map((word) => {
                        //     return word[0].toUpperCase() + word.toLowerCase().substring(1);
                        // });
                        return (
                            <Stack key={color.id}>
                                <Stack direction="row" justifyContent="space-between">
                                    <Typography alignSelf="center">{color.name}</Typography>
                                    <Button onClick={() => onDeleteSubmit(color)}>Poista</Button>
                                </Stack>
                                {/* {color.length !== i + 1 && <Divider sx={{ margin: '1rem 0 0 0' }} />} */}
                            </Stack>
                        );
                    })}
                </Stack>

                <Box component={Form} onSubmit={handleSubmit(onSubmit)}>
                    <Stack>
                        <TextField
                            id="input-color"
                            type="text"
                            label="Uusi väri"
                            {...register('color', {
                                required: {
                                    value: true,
                                    message: 'Syötä väri',
                                },
                                minLength: {
                                    value: 3,
                                    message: 'Värin tulee olla vähintään kolme merkkiä pitkä',
                                },
                                maxLength: {
                                    value: 50,
                                    message: 'Maksimipituus',
                                },
                                // pattern: {
                                //     value: /(^([a-zA-ZåäöÅÄÖ]{3,}\s){1,}[a-zA-ZåäöÅÄÖ]{3,})|(^[a-zA-ZåäöÅÄÖ]{3,}$)/,
                                //     message:
                                //         'Hakusanat tulee erottaa toisistaan välilyönneillä ja koostua vähintään kolmesta kirjaimesta',
                                // },
                            })}
                            error={!!errors.color}
                            helperText={errors.color?.message?.toString() || ' '}
                        />

                        <Button
                            type="submit"
                            disabled={!isDirty || !isValid}
                            sx={{
                                '&:hover': {
                                    backgroundColor: 'success.dark',
                                },
                            }}
                        >
                            Lisää väri
                        </Button>
                    </Stack>
                </Box>
            </Container>
        </>
    );
}

export default ColorsManage;
