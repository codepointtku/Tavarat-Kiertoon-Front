import { useState } from 'react';
import { Form, useSubmit, useLoaderData, useActionData } from 'react-router-dom';
import { useForm } from 'react-hook-form';

import {
    Accordion,
    AccordionSummary,
    AccordionDetails,
    Box,
    Button,
    Container,
    Divider,
    Grid,
    ListItem,
    ListItemButton,
    Popover,
    Stack,
    TextField,
    Typography,
    List,
} from '@mui/material';

import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ColorLensIcon from '@mui/icons-material/ColorLens';

import HeroText from '../HeroText';
import HeroHeader from '../HeroHeader';
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

    let colorNamesMap = colors.map((color) => color.name);
    const [isOpen, setIsOpen] = useState<number>();

    const {
        register,
        handleSubmit,
        reset,
        getValues,
        formState: { isValid, errors },
    } = useForm({
        mode: 'all',
        defaultValues: {
            color: '',
            colormutate: '',
        },
    });

    const submit = useSubmit();
    const onSubmit = (data: any) => {
        submit(data, { method: 'post' });
        reset();
    };

    const onDeleteSubmit = (color: any) => {
        submit(color, { method: 'delete' });
    };

    const onPutSubmit = (color: any) => {
        const mutatedColor = {
            id: color.id,
            name: getValues('colormutate'),
        };

        submit(mutatedColor, { method: 'put' });

        reset();
        setIsOpen(undefined);
    };

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

            {responseStatus?.type === 'colorupdate' && responseStatus?.status === true && (
                <AlertBox text="Tämä väri jeejee." status="success" timer={3000} />
            )}

            <Container maxWidth="xl">
                <HeroHeader Icon={<ColorLensIcon />} hideInAdmin />
                <HeroText title="Värien hallinta" subtext2="Lisää, muokkaa ja poista käytettävissä olevia värejä" />

                <Box component={Form} onSubmit={handleSubmit(onSubmit)}>
                    <Grid container spacing={8} marginBottom="1rem">
                        <Grid item xs={6}>
                            <Stack id="main-spacer" spacing={2}>
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
                                                value: 30,
                                                message: 'Maksimipituus',
                                            },
                                            validate: (val: string) => {
                                                if (colorNamesMap.includes(val)) {
                                                    return 'Väri on jo järjestelmässä';
                                                }
                                            },
                                        })}
                                        error={!!errors.color}
                                        helperText={errors.color?.message?.toString() || ' '}
                                    />
                                </Stack>
                                <Button
                                    type="submit"
                                    disabled={!isValid}
                                    fullWidth
                                    sx={{
                                        '&:hover': {
                                            backgroundColor: 'success.dark',
                                        },
                                    }}
                                >
                                    Lisää väri
                                </Button>

                                <Box id="accordion-wrapper" py="2rem">
                                    <Accordion>
                                        <AccordionSummary
                                            aria-controls="panel1d-content"
                                            id="panel1d-header"
                                            expandIcon={<ExpandMoreIcon />}
                                        >
                                            <Typography>Järjestelmän perusvärit</Typography>
                                        </AccordionSummary>

                                        <AccordionDetails>
                                            {colors
                                                .filter((color) => color.default === true)
                                                .map((color) => {
                                                    return (
                                                        <Typography key={color.id} variant="body2">
                                                            {color.name}
                                                        </Typography>
                                                    );
                                                })}

                                            <Divider sx={{ my: '1rem' }} />

                                            <Typography color="primary.dark">
                                                Perusvärien muokkaus- ja poisto-toiminnot ovat estetty järjestelmän
                                                toiminnan turvaamiseksi.
                                            </Typography>
                                        </AccordionDetails>
                                    </Accordion>
                                </Box>
                            </Stack>
                        </Grid>

                        <Grid item xs={6} justifyContent="center">
                            <Stack spacing={2}>
                                <Typography>Lisätyt värit</Typography>
                                <Divider />
                                <List>
                                    {colors
                                        .filter((color) => color.default === false)
                                        .map((color, index) => {
                                            return (
                                                <Stack key={color.id} direction="row" justifyContent="space-between">
                                                    <ListItem disablePadding>
                                                        <ListItemButton
                                                            onClick={() => {
                                                                isOpen === index ? null : setIsOpen(index);
                                                            }}
                                                        >
                                                            {isOpen === index ? (
                                                                <Stack
                                                                    flex="1"
                                                                    direction="row"
                                                                    justifyContent="space-between"
                                                                    alignItems="center"
                                                                >
                                                                    <TextField
                                                                        id="input-mutate-color"
                                                                        type="text"
                                                                        placeholder={color.name}
                                                                        {...register('colormutate', {
                                                                            minLength: {
                                                                                value: 3,
                                                                                message:
                                                                                    'Värin tulee olla vähintään kolme merkkiä pitkä',
                                                                            },
                                                                            maxLength: {
                                                                                value: 30,
                                                                                message: 'Maksimipituus',
                                                                            },
                                                                        })}
                                                                        error={!!errors.colormutate}
                                                                        helperText={errors.colormutate?.message?.toString()}
                                                                    />
                                                                    <Stack
                                                                        direction="row"
                                                                        spacing={2}
                                                                        alignItems="center"
                                                                        justifyContent="space-between"
                                                                    >
                                                                        <Button
                                                                            size="small"
                                                                            variant="outlined"
                                                                            disabled={!!errors.colormutate}
                                                                            onClick={() => onPutSubmit(color)}
                                                                            sx={{
                                                                                '&:hover': {
                                                                                    backgroundColor: 'success.main',
                                                                                },
                                                                            }}
                                                                        >
                                                                            Vahvista
                                                                        </Button>
                                                                        <Button
                                                                            size="small"
                                                                            variant="outlined"
                                                                            onClick={() => {
                                                                                setIsOpen(undefined);
                                                                                reset();
                                                                            }}
                                                                            sx={{
                                                                                '&:hover': {
                                                                                    backgroundColor: 'warning.main',
                                                                                },
                                                                            }}
                                                                        >
                                                                            Peruuta
                                                                        </Button>
                                                                    </Stack>
                                                                </Stack>
                                                            ) : (
                                                                color.name
                                                            )}
                                                        </ListItemButton>
                                                    </ListItem>

                                                    {isOpen !== index && (
                                                        <Stack
                                                            direction="row"
                                                            spacing={2}
                                                            justifyContent="space-between"
                                                        >
                                                            <Button
                                                                onClick={() => setIsOpen(index)}
                                                                size="small"
                                                                variant="text"
                                                                sx={{
                                                                    '&:hover': {
                                                                        backgroundColor: 'success.main',
                                                                    },
                                                                }}
                                                            >
                                                                Muokkaa
                                                            </Button>
                                                            <Button
                                                                onClick={() => onDeleteSubmit(color)}
                                                                size="small"
                                                                variant="text"
                                                                sx={{
                                                                    '&:hover': {
                                                                        backgroundColor: 'error.main',
                                                                    },
                                                                }}
                                                                disabled={!!isOpen}
                                                            >
                                                                Poista
                                                            </Button>
                                                        </Stack>
                                                    )}
                                                    {/* {color.name.length !== i + 1 && <Divider sx={{ margin: '1rem 0 0 0' }} />} */}
                                                </Stack>
                                            );
                                        })}
                                </List>
                            </Stack>
                        </Grid>
                    </Grid>
                </Box>
            </Container>
        </>
    );
}

export default ColorsManage;
