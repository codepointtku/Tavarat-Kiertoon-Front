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
    IconButton,
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
import RefreshIcon from '@mui/icons-material/Refresh';

import AlertBox from '../AlertBox';
import Tooltip from '../Tooltip';
import HeroHeader from '../HeroHeader';
import HeroText from '../HeroText';

import type { SelectChangeEvent } from '@mui/material/Select';
import type { productTransferLoader } from '../../Router/loaders';
import type { productsTransferAction } from '../../Router/actions';

interface ListItemType {
    itemName: string;
    itemId: number;
}

function not(a: ListItemType[], b: ListItemType[]): ListItemType[] {
    return a.filter((item) => !b.find((selectedItem) => selectedItem.itemId === item.itemId));
}
// Function: not(a, b)
// This function takes two arrays, a and b, as input parameters and returns a new array containing elements that are present in array a but not in array b.

// Explanation:
//  - The filter() method is used on the a array to iterate over its elements and create a new array based on a condition.
//  - For each element in array a, the arrow function (item) => !b.find((selectedItem) => selectedItem.itemId === item.itemId) is used to determine if the element is present in array b.
//  - The find() method is used to search for an element in array b that matches the condition selectedItem.itemId === item.itemId.
//  - If the find() method does not find a matching element in array b, it returns undefined.
//  - The arrow function item => !b.find(...) returns true, indicating that the element is not present in array b (since find() returned undefined).
//  - The filter() method will include the current item in the new array only if the condition !b.find(...) is true, i.e., the element is not in array b.
//  - The resulting new array contains only those elements that are not present in array b.

function intersection(a: ListItemType[], b: ListItemType[]): ListItemType[] {
    return a.filter((item) => b.find((selectedItem) => selectedItem.itemId === item.itemId));
}
// Function: intersection(a, b)
// This function takes two arrays, a and b, as input parameters and returns a new array containing elements that are common to both a and b.

// Explanation:
//  - The filter() method is used on the a array to iterate over its elements and create a new array based on a condition.
//  - For each element in array a, the arrow function (item) => b.find((selectedItem) => selectedItem.itemId === item.itemId) is used to determine if the element is present in array b.
//  - The find() method is used to search for an element in array b that matches the condition selectedItem.itemId === item.itemId.
//  - If the find() method finds a matching element in array b, it returns that element.
//  - The arrow function item => b.find(...) returns true, indicating that the element is present in array b (since find() returned a truthy value, i.e., the matching element).
//  - The filter() method will include the current item in the new array only if the condition b.find(...) is true, i.e., the element is present in both arrays a and b.
//  - The resulting new array contains only those elements that are common to both arrays a and b.

//

function StorageProductsHandleItemsTransfer() {
    const storageData = useLoaderData() as Awaited<ReturnType<typeof productTransferLoader>>;
    const responseStatus = useActionData() as Awaited<ReturnType<typeof productsTransferAction>>;

    const storagesList = storageData.allStorages;
    const storageInfo = storageData.storageInfo;

    //// main ingredient:
    const storageAvailableProductItems =
        storageData.hasProducts.results?.map((productItem) => ({
            itemName: productItem.product.name,
            itemId: productItem.id,
        })) ?? [];
    // console.log('%c mapped out product items:', 'color: blue ; font-weight: bold', storageAvailableProductItems);

    // select
    const [selectedStorage, setSelectedStorage] = React.useState('');

    const handleStorageSelectChange = (event: SelectChangeEvent) => {
        setSelectedStorage(event.target.value as string);
    };

    //
    ///
    ////  transfer list
    const [checked, setChecked] = React.useState<ListItemType[]>([]);
    const [left, setLeft] = React.useState<ListItemType[]>(storageAvailableProductItems);
    const [right, setRight] = React.useState<ListItemType[]>([]);
    console.log('right:', right);

    const rightCopy = [...right];
    console.log('rightCopy:', rightCopy);

    const leftChecked = intersection(checked, left);
    const rightChecked = intersection(checked, right);

    const handleToggle = (item: ListItemType) => () => {
        const currentIndex = checked.findIndex((checkedItem) => checkedItem.itemId === item.itemId);
        const newChecked = [...checked];

        if (currentIndex === -1) {
            newChecked.push(item);
        } else {
            newChecked.splice(currentIndex, 1);
        }

        setChecked(newChecked);
    };

    const numberOfChecked = (items: ListItemType[]) => intersection(checked, items).length;

    const handleToggleAll = (items: ListItemType[]) => () => {
        if (numberOfChecked(items) === items.length) {
            setChecked(not(checked, items));
        } else {
            setChecked(checked.concat(items));
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

    const customList = (title: React.ReactNode, items: ListItemType[]) => (
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
                disablePadding
            >
                {items.map((item: ListItemType) => {
                    const labelId = `transfer-list-item-${item}-label`;

                    return (
                        <ListItem key={item.itemId} role="listitem" onClick={handleToggle(item)}>
                            <ListItemIcon>
                                <Checkbox
                                    checked={
                                        checked.findIndex((checkedItem) => checkedItem.itemId === item.itemId) !== -1
                                    }
                                    tabIndex={-1}
                                    disableRipple
                                    inputProps={{
                                        'aria-labelledby': labelId,
                                    }}
                                    size="small"
                                />
                            </ListItemIcon>
                            <ListItemText id={labelId} primary={`${item.itemName} (${item.itemId})`} />
                        </ListItem>
                    );
                })}
            </List>
        </Card>
    );

    // form
    const {
        register,
        setValue,
        reset,
        handleSubmit: createHandleSubmit,
        formState: { isSubmitting, isSubmitSuccessful, errors: formStateErrors },
    } = useForm({
        mode: 'all',
        // defaultValues: {
        //     storage_to: null,
        //     product_ids: [],
        // },
    });

    // submit
    const submit = useSubmit();

    const handleSubmit = createHandleSubmit((data: any) => {
        setValue('product_ids', JSON.stringify(rightCopy.map((item) => item.itemId)));

        console.log('%c Submitissa menevä tieto', 'color: cyan; font-weight: bold', data);

        // reset();

        submit(data, {
            method: 'put',
        });
    });

    const formReset = () => {
        reset();
    };

    // main component return
    return (
        <>
            {responseStatus?.type === 'productstransfer' && !responseStatus?.status && (
                <AlertBox text="Varaston tuotteiden siirto epäonnistui" status="error" />
            )}

            {responseStatus?.type === 'productstransferempty' && responseStatus?.status && (
                <AlertBox
                    text="Varaston tuotteiden siirto epäonnistui, mutta mikään ei mennyt rikki O_o"
                    status="warning"
                />
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
                    {/* /// */}
                    <input
                        // type="hidden"
                        {...register('product_ids')}
                        // readOnly
                        value={JSON.stringify(right.map((item) => item.itemId))}
                        // value={right.map((item) => item.itemId).toString()}
                    />
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
                                    <Typography variant="body2">{`Kokonaistuotemäärä: ${storageData.hasProducts.count}`}</Typography>
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
                                {customList('Siirrettävät tuotteet', right)}
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
                        <Box sx={{ display: 'flex', justifyContent: 'center', margin: '2rem 0 0 0' }}>
                            <Tooltip title="Tyhjennä lomake">
                                <IconButton id="reset-form-btn" onClick={() => formReset()}>
                                    <RefreshIcon />
                                </IconButton>
                            </Tooltip>
                        </Box>
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
