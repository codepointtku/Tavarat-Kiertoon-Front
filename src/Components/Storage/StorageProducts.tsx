import { useState } from 'react';
import { Form, Link, createSearchParams, useSearchParams } from 'react-router-dom';

import { Box, Button, Grid, IconButton, Modal, TextField, styled } from '@mui/material';
import HorizontalSplitIcon from '@mui/icons-material/HorizontalSplit';

import StorageProductsTable from './StorageProductsTable';
import AddCircle from '@mui/icons-material/AddCircle';
import Html5QrcodePlugin from '../../Utils/qrcodeScanner';

import ClearIcon from '@mui/icons-material/Clear';
import { useForm } from 'react-hook-form';

const StyledGrid = styled(Grid)(({ theme }) => ({
    display: 'flex',
    borderRadius: 20,
    margin: 4,
    justifyContent: 'center',
    padding: 4,
}));

// TODO: convert to typescipt
interface Search {
    searchString: string | null;
}
function StorageProducts() {
    const [searchParams, setSearchParams] = useSearchParams();
    const [qrSearchOpen, setQrSearchOpen] = useState(false);
    const { register, handleSubmit } = useForm({
        defaultValues: { searchString: searchParams.get('search'), search: searchParams.get('search') },
    });
    const onNewScanResult = (decodedText: string, _decodedResult: any) => {
        setQrSearchOpen(false);
        setSearchParams((prevParams) => {
            return createSearchParams({
                ...Object.fromEntries(prevParams.entries()),
                viivakoodi: decodedText,
                sivu: '1',
                // show unavailable products in storage
                // TODO: show also unavailable products in storage
                // all: true,
            });
        });
    };
    const handleBarcodeSearch = (formData: Search) => {
        setSearchParams((prevParams) => {
            return createSearchParams({
                ...Object.fromEntries(prevParams.entries()),
                viivakoodi: formData.searchString as string,
                sivu: '1',
                // TODO: show also unavailable products in storage
                // all: true,
            });
        });
    };
    const handleSearch = (formData: Search) => {
        setSearchParams((prevParams) => {
            return createSearchParams({
                ...Object.fromEntries(prevParams.entries()),
                search: formData.searchString as string,
                sivu: '1',
                // TODO: show also unavailable products in storage
                // all: true,
            });
        });
    };
    return (
        <>
            <Modal
                open={qrSearchOpen}
                onClose={() => {
                    setQrSearchOpen(false);
                }}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box width={700}>
                    <Html5QrcodePlugin
                        fps={10}
                        qrbox={250}
                        disableFlip={false}
                        qrCodeSuccessCallback={onNewScanResult}
                    />
                </Box>
            </Modal>
            <Grid container spacing={4} sx={{ marginTop: 2, marginBottom: 2 }} justifyContent={'space-evenly'}>
                <StyledGrid
                    item
                    xs={3}
                    sx={{
                        textDecoration: 'none',
                    }}
                >
                    <IconButton
                        size="large"
                        color="primary"
                        /* variant="contained" */ aria-label="add new item"
                        component={Link}
                        to="/varasto/tuotteet/luo"
                    >
                        <AddCircle sx={{ color: 'primary' }} fontSize="large" />
                        Lisää uusi tuote
                    </IconButton>
                </StyledGrid>
                <StyledGrid
                    onClick={() => {
                        setQrSearchOpen(true);
                    }}
                    item
                    xs={3}
                >
                    <IconButton size="large" color="primary" /* variant="contained" */ aria-label="barcode search">
                        <HorizontalSplitIcon
                            sx={{
                                color: 'primary',
                                transform: 'rotate(90deg)',
                            }}
                            fontSize="large"
                        />
                        <HorizontalSplitIcon
                            sx={{ color: 'primary', transform: 'rotate(90deg)', marginLeft: -1.6 }}
                            fontSize="large"
                        />
                        Skannaa ja hae
                    </IconButton>
                </StyledGrid>
                {/* <StyledGrid item xs={3} sx={{ borderColor: 'primary', border: 1 }}>
                    <IconButton fontSize="large" color="primary" variant="contained" aria-label="search">
                        <SearchIcon sx={{ color: 'primary' }} fontSize="large" />
                        Hae tuotteita
                    </IconButton>
                </StyledGrid> */}
            </Grid>
            <Form onSubmit={handleSubmit(handleSearch)}>
                {/* todo: näytä vain hakuikoni kunnes painetaan, jolloin tekstikenttä laajenee/aktivoituu? */}
                <TextField
                    type="search"
                    {...register('searchString')}
                    placeholder="haku"
                    sx={{ backgroundColor: 'white' }}
                    size="medium"
                >
                    <IconButton children={<ClearIcon />} />
                </TextField>
                <Button
                    type="submit"
                    variant="contained"
                    color="primary"
                    size="large"
                    sx={{ marginLeft: 1, padding: 1.5 }}
                >
                    Hae
                </Button>
            </Form>
            <StorageProductsTable />
        </>
    );
}

export default StorageProducts;
