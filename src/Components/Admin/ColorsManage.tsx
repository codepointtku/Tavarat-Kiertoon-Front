import { useState } from 'react';
import { Form, useSubmit, useLoaderData, useActionData } from 'react-router-dom';
import { useForm } from 'react-hook-form';

import { Box, Button, Container, Divider, Grid, Popover, Stack, TextField, Typography } from '@mui/material';

import ColorLensIcon from '@mui/icons-material/ColorLens';

import HeroText from '../HeroText';
import HeroHeader from '../HeroHeader';
import AlertBox from '../AlertBox';
import Tooltip from '../Tooltip';

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

    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const openPopover = Boolean(anchorEl);

    function handlePopOverOpen(event: React.MouseEvent<HTMLElement>) {
        setAnchorEl(event.currentTarget);
    }

    const submit = useSubmit();
    const onSubmit = (data: any) => {
        submit(data, { method: 'post' });
        reset();
    };

    const onDeleteSubmit = (color: any) => {
        submit(color, { method: 'delete' });
    };

    const onPutSubmit = (color: any) => {
        submit(color, { method: 'put' });
    };

    const {
        register,
        handleSubmit,
        reset,
        formState: { isDirty, isValid, errors },
    } = useForm({
        mode: 'all',
        defaultValues: {
            color: '',
            mutatecolor: '',
        },
    });

    return (
        <>
            {responseStatus?.type === 'colormanageaction' && responseStatus?.status === false && (
                <AlertBox text="Jokin meni pieleen" status="error" />
            )}

            {responseStatus?.type === 'colordelete' && responseStatus?.status === false && (
                <AlertBox
                    text="Tämä väri kuuluu järjestelmän perusväreihin. Sen poistaminen on estetty."
                    status="warning"
                    timer={3000}
                />
            )}

            <Container maxWidth="xl">
                <HeroHeader Icon={<ColorLensIcon />} hideInAdmin />
                <HeroText title="Hallinnoi värejä" subtext2="Lisää ja poista käytettävissä olevia värejä" />

                <Grid container spacing={8} marginBottom="1rem">
                    <Grid item xs={4} justifyContent="center">
                        <Tooltip title="Järjestelmän perusvärien poistaminen on estetty">
                            <Stack spacing={2}>
                                <Typography variant="body1">Järjestelmän perusvärit</Typography>
                                <Divider />
                                {colors
                                    .filter((color) => color.default === true)
                                    .map((color, i) => {
                                        return (
                                            <Typography key={color.id} variant="body2">
                                                {color.name}
                                            </Typography>
                                        );
                                    })}
                            </Stack>
                        </Tooltip>
                    </Grid>

                    <Grid item xs={4} justifyContent="center">
                        <Box component={Form} onSubmit={handleSubmit(onSubmit)}>
                            <Stack spacing={2}>
                                <Typography>Uuden värin lisäys</Typography>
                                <Divider />
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
                    </Grid>

                    <Grid item xs={4} justifyContent="center">
                        <Stack spacing={2}>
                            <Typography>Lisätyt värit</Typography>
                            <Divider />
                            {colors
                                .filter((color) => color.default === false)
                                .map((color, i) => {
                                    // const searchWatchTitled = color.words.map((word) => {
                                    //     return word[0].toUpperCase() + word.toLowerCase().substring(1);
                                    // });
                                    return (
                                        <Stack key={color.id}>
                                            <Stack direction="row" spacing={2} justifyContent="space-between">
                                                <Typography variant="body2" alignSelf="center">
                                                    {color.name}
                                                </Typography>
                                                <Button onClick={handlePopOverOpen} size="small">
                                                    Muokkaa
                                                </Button>
                                                <Button onClick={() => onDeleteSubmit(color)} size="small">
                                                    Poista
                                                </Button>
                                            </Stack>

                                            <Popover
                                                open={openPopover}
                                                anchorEl={anchorEl}
                                                anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
                                                onClose={() => setAnchorEl(null)}
                                                sx={{ mt: 1 }}
                                            >
                                                <TextField
                                                    id="input-mutate-color"
                                                    type="text"
                                                    defaultValue={color.name}
                                                    {...register('mutatecolor', {
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
                                                    error={!!errors.mutatecolor}
                                                    helperText={errors.mutatecolor?.message?.toString() || ' '}
                                                    sx={{ padding: '1rem 1rem 0 1rem' }}
                                                />
                                                <Stack
                                                    direction="row"
                                                    justifyContent="space-between"
                                                    alignItems="center"
                                                    sx={{ padding: '0 1rem 1rem 1rem' }}
                                                    spacing="1rem"
                                                >
                                                    <Button size="small" variant="outlined" onClick={onPutSubmit}>
                                                        Vahvista
                                                    </Button>
                                                    <Button
                                                        size="small"
                                                        variant="outlined"
                                                        onClick={() => setAnchorEl(null)}
                                                    >
                                                        Peruuta
                                                    </Button>
                                                </Stack>
                                            </Popover>
                                            {/* {color.name.length !== i + 1 && <Divider sx={{ margin: '1rem 0 0 0' }} />} */}
                                        </Stack>
                                    );
                                })}
                        </Stack>
                    </Grid>
                </Grid>
            </Container>
        </>
    );
}

export default ColorsManage;
