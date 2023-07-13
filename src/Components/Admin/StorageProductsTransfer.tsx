import * as React from 'react';
import { useForm } from 'react-hook-form';
import { Form, useLoaderData, useActionData, useSubmit } from 'react-router-dom';

import List from '@mui/material/List';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemIcon from '@mui/material/ListItemIcon';
import Checkbox from '@mui/material/Checkbox';
import Divider from '@mui/material/Divider';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';

import { Avatar, Box, Button, Container, Grid, IconButton, Stack, Typography } from '@mui/material';
import ImportExportIcon from '@mui/icons-material/ImportExport';
import ArrowCircleRightIcon from '@mui/icons-material/ArrowCircleRight';

import AlertBox from '../AlertBox';
import HeroHeader from '../HeroHeader';
import HeroText from '../HeroText';

import type { storageEditLoader } from '../../Router/loaders';
import type { productsTransferAction } from '../../Router/actions';

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

function StorageProductsTransfer() {
    const storageData = useLoaderData() as Awaited<ReturnType<typeof storageEditLoader>>;
    const responseStatus = useActionData() as Awaited<ReturnType<typeof productsTransferAction>>;

    const storagesList = storageData.allStorages;
    // console.log('%c all storages:', 'color: blue', storagesList);

    const [selectedStorage, setSelectedStorage] = React.useState('');

    const handleStorageSelectChange = (event: SelectChangeEvent) => {
        setSelectedStorage(event.target.value as string);
    };

    //

    const storageInfo = storageData.storageInfo;
    const storageAvailableProducts = storageData.hasProducts;
    // console.log('%c products in this storage:', 'color: green', storageAvailableProducts);
    // console.log('%c products count:', 'color: green', storageAvailableProducts.count);

    // const storageAvailableProductsNames = storageAvailableProducts.results?.map((product) => product.product.name);
    // console.log('%c mapped product names:', 'color: cyan', storageAvailableProductsNames);
    const storageAvailableProductsIds = storageAvailableProducts.results?.map((product) => product.id);
    // console.log('%c mapped product ids:', 'color: red', storageAvailableProductsIds);

    //

    const {
        register,
        handleSubmit: createHandleSubmit,
        formState: { isSubmitting, isSubmitSuccessful },
    } = useForm({
        mode: 'all',
    });

    const submit = useSubmit();

    const handleSubmit = createHandleSubmit((data: any) => {
        console.log('%c Submitissa menevä tieto', 'color: blue', data);
        submit(data, {
            method: 'put',
        });
    });

    //

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
                    const labelId = `transfer-list-all-item-${value}-label`;

                    return (
                        <ListItem key={index} role="listitem" button onClick={handleToggle(value)}>
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

    // main component return
    return (
        <>
            {responseStatus?.type === 'productstransfer' && !responseStatus?.status && (
                <AlertBox text="Varaston tuotteiden siirto epäonnistui" status="error" />
            )}

            {responseStatus?.type === 'productstransfer' && responseStatus?.status && (
                <AlertBox text="Varaston tuotteet siirretty uuteen sijaintiin" status="success" />
            )}
            <Container maxWidth="md">
                <HeroHeader Icon={<ImportExportIcon />} hideInAdmin />
                <HeroText
                    title="Tuotteiden siirto"
                    subtitle="Siirrä tuotteita varastosta toiseen"
                    // text="Täst näi siirrät kato tuotteet toisest paikast toisee"
                    // subtext="ainaki tällee näi tikitaalisesti tiiäksä"
                    // subtext2="Se oikee fyysine tavaroire siirto on sit jonku muun homma! Mut ainaki sää oot tehny ny hommas ku painat tost noi! Hyvä"
                />

                <Box component={Form} onSubmit={handleSubmit}>
                    <Typography>Tuotteita valitussa varastossa:</Typography>
                    <Typography>{storageAvailableProducts.count}</Typography>
                    <Typography>Tuotteiden id't:</Typography>
                    {/* <Typography {...register('product_ids')}>{storageAvailableProductsIds}</Typography> */}
                    <input value={JSON.stringify(storageAvailableProductsIds)} {...register('product_ids')} />

                    <Grid container margin="1rem 0 1rem 0">
                        <Grid
                            item
                            xs={4}
                            sx={{
                                border: '1px solid blue',
                                display: 'flex',
                                justifyContent: 'center',
                                alignItems: 'center',
                            }}
                        >
                            <Typography>Varastosta:</Typography>
                            <Typography>{storageInfo.name}</Typography>
                        </Grid>
                        <Grid
                            item
                            xs={4}
                            sx={{
                                border: '1px solid blue',
                                display: 'flex',
                                justifyContent: 'center',
                                alignItems: 'center',
                            }}
                        >
                            <IconButton>
                                <Avatar sx={{ bgcolor: 'secondary.main' }}>
                                    <ArrowCircleRightIcon fontSize="large" />
                                </Avatar>
                            </IconButton>
                        </Grid>
                        <Grid
                            item
                            xs={4}
                            sx={{
                                border: '1px solid blue',
                                display: 'flex',
                                justifyContent: 'center',
                                alignItems: 'center',
                            }}
                        >
                            <Stack direction="row">
                                <Typography>Varastoon:</Typography>

                                <Box sx={{ minWidth: 120 }}>
                                    <FormControl fullWidth>
                                        <InputLabel id="demo-simple-select-label">Valitse</InputLabel>
                                        <Select
                                            labelId="demo-simple-select-label"
                                            id="storage-select"
                                            value={selectedStorage}
                                            {...register('storage_to')}
                                            onChange={handleStorageSelectChange}
                                        >
                                            {storagesList.map((storage) => (
                                                <MenuItem key={storage.id} value={storage.id}>
                                                    <ListItemText primary={storage.name} />
                                                </MenuItem>
                                            ))}
                                        </Select>
                                    </FormControl>
                                </Box>
                            </Stack>
                        </Grid>
                    </Grid>

                    {/* <Button type="submit" disabled={isSubmitting || isSubmitSuccessful}> */}
                    <Button type="submit">Suorita siirto</Button>
                </Box>

                <Box sx={{ marginTop: '6rem' }}>
                    <Grid container spacing={2} justifyContent="center" alignItems="center">
                        <Grid item>{customList('Tuotteet', left)}</Grid>

                        <Grid item>
                            <Grid container direction="column" alignItems="center">
                                <Button
                                    sx={{ my: 0.5 }}
                                    variant="outlined"
                                    size="small"
                                    onClick={handleCheckedRight}
                                    disabled={leftChecked.length === 0}
                                    aria-label="move selected right"
                                >
                                    &gt;
                                </Button>
                                <Button
                                    sx={{ my: 0.5 }}
                                    variant="outlined"
                                    size="small"
                                    onClick={handleCheckedLeft}
                                    disabled={rightChecked.length === 0}
                                    aria-label="move selected left"
                                >
                                    &lt;
                                </Button>
                            </Grid>
                        </Grid>

                        <Grid item>{customList('Valitut', right)}</Grid>
                    </Grid>
                </Box>
            </Container>
        </>
    );
}

export default StorageProductsTransfer;
