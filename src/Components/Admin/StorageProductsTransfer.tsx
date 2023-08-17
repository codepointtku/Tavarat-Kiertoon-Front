import * as React from 'react';
import { useForm } from 'react-hook-form';
import { Form, Link, useLoaderData, useActionData, useSubmit } from 'react-router-dom';

import {
    Avatar,
    Box,
    Button,
    Container,
    FormHelperText,
    Grid,
    ListItemText,
    MenuItem,
    FormControl,
    Select,
    Stack,
    Typography,
} from '@mui/material';

import ImportExportIcon from '@mui/icons-material/ImportExport';
import ArrowRightAltIcon from '@mui/icons-material/ArrowRightAlt';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

import AlertBox from '../AlertBox';
import Tooltip from '../Tooltip';
import HeroHeader from '../HeroHeader';
import HeroText from '../HeroText';

import type { SelectChangeEvent } from '@mui/material/Select';
import type { productTransferLoader } from '../../Router/loaders';
import type { productsTransferAction } from '../../Router/actions';

//

function StorageProductsTransfer() {
    const storageData = useLoaderData() as Awaited<ReturnType<typeof productTransferLoader>>;
    const responseStatus = useActionData() as Awaited<ReturnType<typeof productsTransferAction>>;

    const storagesList = storageData.allStorages;
    const storageInfo = storageData.storageInfo;
    const storageAvailableProducts = storageData.hasProducts;
    // console.log('%c products in this storage:', 'color: green', storageAvailableProducts);
    // console.log('%c products count:', 'color: green', storageAvailableProducts.count);

    const storageAvailableProductsIds = storageAvailableProducts.results?.map((product) => product.id);
    // console.log('%c mapped product ids:', 'color: red', storageAvailableProductsIds);

    const [selectedStorage, setSelectedStorage] = React.useState('');

    const handleStorageSelectChange = (event: SelectChangeEvent) => {
        setSelectedStorage(event.target.value as string);
    };

    const {
        register,
        handleSubmit: createHandleSubmit,
        formState: { isSubmitting, isSubmitSuccessful, errors: formStateErrors },
    } = useForm({
        mode: 'all',
    });

    const submit = useSubmit();

    const handleSubmit = createHandleSubmit((data: any) => {
        // console.log('%c Submitissa menevä tieto', 'color: blue', data);
        submit(data, {
            method: 'put',
        });
    });

    return (
        <>
            {responseStatus?.type === 'productstransfer' && !responseStatus?.status && (
                <AlertBox
                    text="Varaston tuotteiden siirto epäonnistui"
                    status="error"
                    timer={3000}
                    redirectUrl={`/admin/varastot/${storageInfo.id}`}
                />
            )}

            {responseStatus?.type === 'productstransfer' && responseStatus?.status && (
                <AlertBox
                    text="Varaston tuotteet siirretty onnistuneesti. Uudelleenohjataan..."
                    status="success"
                    timer={3000}
                    redirectUrl={`/admin/varastot/${storageInfo.id}`}
                />
            )}

            <Container maxWidth="md">
                <HeroHeader Icon={<ImportExportIcon />} hideInAdmin />
                <HeroText title="Tuotteiden siirto" subtitle="Siirrä kaikki tuotteet varastosta toiseen" />

                <Box component={Form} onSubmit={handleSubmit}>
                    <input
                        type="hidden"
                        value={JSON.stringify(storageAvailableProductsIds)}
                        {...register('product_ids')}
                    />

                    <Grid container margin="1rem 0 1rem 0">
                        <Grid
                            item
                            xs={4}
                            sx={{
                                display: 'flex',
                                justifyContent: 'flex-start',
                                alignItems: 'center',
                            }}
                        >
                            <Box id="storage-info-box">
                                <Typography variant="h5" gutterBottom>
                                    Varastosta:
                                </Typography>
                                <Stack id="storage-info-data" gap={1} paddingLeft="2rem">
                                    <Typography variant="body2">{`Varaston nimi: ${storageInfo.name}`}</Typography>
                                    <Typography variant="body2">{`Varaston tunnistenumero: ${storageInfo.id}`}</Typography>
                                    <Typography variant="body2">{`Tuotemäärä: ${storageAvailableProducts.count}`}</Typography>
                                </Stack>
                            </Box>
                        </Grid>
                        <Grid
                            item
                            xs={4}
                            sx={{
                                display: 'flex',
                                justifyContent: 'center',
                                alignItems: 'center',
                            }}
                        >
                            <Avatar sx={{ bgcolor: 'secondary.main' }}>
                                <ArrowRightAltIcon fontSize="large" />
                            </Avatar>
                        </Grid>
                        <Grid
                            item
                            xs={4}
                            sx={{
                                display: 'flex',
                                justifyContent: 'flex-end',
                                alignItems: 'center',
                            }}
                        >
                            <Stack id="storage-to-stack" gap={2}>
                                <Typography variant="h5" gutterBottom align="right">
                                    Varastoon:
                                </Typography>

                                <Box id="storage-to-select-wrapper" sx={{ minWidth: 256 }}>
                                    <FormControl fullWidth error={!!formStateErrors.storage_to}>
                                        <Select
                                            id="storage-select"
                                            value={selectedStorage}
                                            {...register('storage_to', {
                                                required: { value: true, message: 'Valitse varasto' },
                                            })}
                                            required
                                            inputProps={{ required: false }}
                                            error={!!formStateErrors.storage_to}
                                            onChange={handleStorageSelectChange}
                                        >
                                            {storagesList.map((storage) => (
                                                <MenuItem key={storage.id} value={storage.id}>
                                                    <ListItemText primary={storage.name} />
                                                </MenuItem>
                                            ))}
                                        </Select>
                                        <FormHelperText>
                                            {formStateErrors.storage_to ? 'Valitse varasto' : ' '}
                                        </FormHelperText>
                                    </FormControl>
                                </Box>
                            </Stack>
                        </Grid>
                    </Grid>

                    <Stack id="submit-reset-btns">
                        <Button
                            id="submit-btn"
                            type="submit"
                            disabled={isSubmitting || isSubmitSuccessful}
                            sx={{
                                '&:hover': {
                                    backgroundColor: 'success.dark',
                                },
                            }}
                        >
                            Suorita siirto
                        </Button>
                        <Box sx={{ display: 'flex', justifyContent: 'flex-start' }}>
                            <Tooltip title="Palaa takaisin">
                                <Button
                                    id="cancel-btn"
                                    size="small"
                                    variant="outlined"
                                    color="error"
                                    component={Link}
                                    to={`/admin/varastot/${storageInfo.id}`}
                                    startIcon={<ArrowBackIcon />}
                                    sx={{ margin: '2rem 0 1rem 0' }}
                                >
                                    Poistu tallentamatta
                                </Button>
                            </Tooltip>
                        </Box>
                    </Stack>
                </Box>
            </Container>
        </>
    );
}

export default StorageProductsTransfer;
