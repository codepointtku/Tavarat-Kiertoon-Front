import * as React from 'react';
import { useForm } from 'react-hook-form';
import { Form, Link, useLoaderData, useActionData, useSubmit } from 'react-router-dom';

import {
    Avatar,
    Box,
    Button,
    Card,
    CardHeader,
    Checkbox,
    Container,
    Divider,
    FormControl,
    FormHelperText,
    Grid,
    List,
    ListItem,
    ListItemIcon,
    ListItemText,
    MenuItem,
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

// NOT USED anywhere CURRENTLY

//

function not(a: readonly number[], b: readonly number[]) {
    return a.filter((value) => b.indexOf(value) === -1);
}

function intersection(a: readonly number[], b: readonly number[]) {
    return a.filter((value) => b.indexOf(value) !== -1);
}

function union(a: readonly number[], b: readonly number[]) {
    return [...a, ...not(b, a)];
}

//

function StorageProductsHandleItemsTransfer() {
    const storageData = useLoaderData() as Awaited<ReturnType<typeof productTransferLoader>>;
    const responseStatus = useActionData() as Awaited<ReturnType<typeof productsTransferAction>>;

    const storagesList = storageData.allStorages;
    // console.log('%c all storages:', 'color: blue', storagesList);
    const storageInfo = storageData.storageInfo;
    const storageAvailableProducts = storageData.hasProducts;
    // console.log('%c products in this storage:', 'color: green', storageAvailableProducts);
    // console.log('%c products count:', 'color: green', storageAvailableProducts.count);
    // const storageAvailableProductsNames = storageAvailableProducts.results?.map((product) => product.product.name);
    // console.log('%c mapped product names:', 'color: cyan', storageAvailableProductsNames);
    const storageAvailableProductsIds = storageAvailableProducts.results?.map((product) => product.id);
    // console.log('%c mapped product ids:', 'color: red', storageAvailableProductsIds);

    const [selectedStorage, setSelectedStorage] = React.useState('');

    const handleStorageSelectChange = (event: SelectChangeEvent) => {
        setSelectedStorage(event.target.value as string);
    };

    // transfer list logics
    const [checked, setChecked] = React.useState<readonly number[]>([]);
    const [left, setLeft] = React.useState<readonly number[]>([0, 1, 2, 3, 666]);
    const [right, setRight] = React.useState<readonly number[]>([]);

    const leftChecked = intersection(checked, left);
    const rightChecked = intersection(checked, right);

    const handleToggle = (value: number) => () => {
        const currentIndex = checked.indexOf(value);
        const newChecked = [...checked];

        if (currentIndex === -1) {
            newChecked.push(value);
        } else {
            newChecked.splice(currentIndex, 1);
        }

        setChecked(newChecked);
    };

    const numberOfChecked = (items: readonly number[]) => intersection(checked, items).length;

    const handleToggleAll = (items: readonly number[]) => () => {
        if (numberOfChecked(items) === items.length) {
            setChecked(not(checked, items));
        } else {
            setChecked(union(checked, items));
        }
    };

    const handleCheckedRight = () => {
        setRight(right.concat(leftChecked));
        setLeft(not(left, leftChecked));
        setChecked(not(checked, leftChecked));
    };

    const handleCheckedLeft = () => {
        setLeft(left.concat(rightChecked));
        setRight(not(right, rightChecked));
        setChecked(not(checked, rightChecked));
    };

    const customList = (title: React.ReactNode, items: readonly number[]) => (
        <Card>
            <CardHeader
                sx={{ px: 2, py: 1 }}
                avatar={
                    <Checkbox
                        onClick={handleToggleAll(items)}
                        checked={numberOfChecked(items) === items.length && items.length !== 0}
                        indeterminate={numberOfChecked(items) !== items.length && numberOfChecked(items) !== 0}
                        disabled={items.length === 0}
                        inputProps={{
                            'aria-label': 'all items selected',
                        }}
                    />
                }
                title={title}
                subheader={`${numberOfChecked(items)}/${items.length} valittu`}
            />
            <Divider />
            <List
                sx={{
                    width: 300,
                    height: 420,
                    bgcolor: 'background.paper',
                    overflow: 'auto',
                }}
                dense
                component="div"
                role="list"
            >
                {items.map((value: any, index) => {
                    const labelId = `transfer-list-item-${value}-label`;

                    return (
                        <ListItem key={index} role="listitem" onClick={handleToggle(value)}>
                            <ListItemIcon>
                                <Checkbox
                                    checked={checked.indexOf(value) !== -1}
                                    tabIndex={-1}
                                    disableRipple
                                    inputProps={{
                                        'aria-labelledby': labelId,
                                    }}
                                />
                            </ListItemIcon>
                            <ListItemText id={labelId} primary={value} />
                        </ListItem>
                    );
                })}
            </List>
        </Card>
    );

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

    // main component return
    return (
        <>
            {responseStatus?.type === 'productstransfer' && !responseStatus?.status && (
                <AlertBox text="Varaston tuotteiden siirto epäonnistui" status="error" />
            )}

            {responseStatus?.type === 'productstransfer' && responseStatus?.status && (
                <AlertBox
                    text="Varaston tuotteet siirretty onnistuneesti"
                    status="success"
                    timer={3000}
                    redirectUrl={`/admin/varastot/${storageInfo.id}`}
                />
            )}

            <Container maxWidth="md">
                <HeroHeader Icon={<ImportExportIcon />} hideInAdmin />
                <HeroText title="Tuotteiden siirto" subtitle="Siirrä tuotteita varastosta toiseen" />

                <Box component={Form} onSubmit={handleSubmit}>
                    <input
                        // type="hidden"
                        value={JSON.stringify(storageAvailableProductsIds)}
                        {...register('product_ids')}
                    />

                    {/* /// */}
                    <Grid container margin="1rem 0 0rem 0">
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

                    {/* TransferList */}
                    <Box sx={{ margin: '2rem 0 2rem 0' }}>
                        <Grid container>
                            <Grid id="product-items-list-select--container" item xs={4} justifyContent="flex-start">
                                {customList('Tuotteet', left)}
                            </Grid>

                            <Grid item xs={4} sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                                <Stack id="transfer-btns-stack">
                                    <Button
                                        id="transfer-btn-move-selected-right"
                                        sx={{ my: '0.5rem' }}
                                        variant="outlined"
                                        size="small"
                                        onClick={handleCheckedRight}
                                        disabled={leftChecked.length === 0}
                                        aria-label="move selected right"
                                    >
                                        &gt;
                                    </Button>
                                    <Button
                                        id="transfer-btn-move-selected-left"
                                        sx={{ my: '0.5rem' }}
                                        variant="outlined"
                                        size="small"
                                        onClick={handleCheckedLeft}
                                        disabled={rightChecked.length === 0}
                                        aria-label="move selected left"
                                    >
                                        &lt;
                                    </Button>
                                </Stack>
                            </Grid>

                            <Grid id="product-items-list-selected-container" item xs={4} justifyContent="flex-end">
                                {customList('Valitut', right)}
                            </Grid>
                        </Grid>
                    </Box>

                    {/* Btns */}
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
                        <Box sx={{ display: 'flex', justifyContent: 'center' }}>
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

export default StorageProductsHandleItemsTransfer;
