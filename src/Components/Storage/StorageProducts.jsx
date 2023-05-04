import { useState } from 'react';
import { Link, useLoaderData, useRouteLoaderData, useSearchParams } from 'react-router-dom';

import { Box, Grid, IconButton, Modal, Typography, styled } from '@mui/material';
import HorizontalSplitIcon from '@mui/icons-material/HorizontalSplit';

import StorageProductsTable from './StorageProductsTable';
import AddCircle from '@mui/icons-material/AddCircle';
import Html5QrcodePlugin from '../../Utils/qrcodeScanner';

const StyledGrid = styled(Grid)(({ theme }) => ({
    display: 'flex',
    borderRadius: 20,
    margin: 4,
    justifyContent: 'center',
    padding: 4,
}));

function StorageProducts() {
    const [searchParams, setSearchParams] = useSearchParams();
    const { categories } = useRouteLoaderData('root');
    const { storages, products } = useLoaderData();
    const [qrSearchOpen, setQrSearchOpen] = useState(false);

    console.log('categories:', categories);
    console.log('storages:', storages);
    console.log('products:', products);
    console.log('products.results:', products.results);

    const onNewScanResult = (decodedText, decodedResult) => {
        setQrSearchOpen(false);
        setSearchParams({ search: decodedText });
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
            <Grid container spacing={4} sx={{ margin: 2 }} justifyContent={'space-evenly'}>
                <StyledGrid
                    item
                    component={Link}
                    to="/varasto/tuotteet/luo"
                    xs={3}
                    sx={{
                        textDecoration: 'none',
                    }}
                >
                    <IconButton fontSize="large" color="primary" variant="contained" aria-label="add new item">
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
                    <IconButton fontSize="large" color="primary" variant="contained" aria-label="barcode search">
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

            <StorageProductsTable
            // page={usedParams.page} rowsPerPage={usedParams.rows} setUsedParams={setUsedParams}
            />
        </>
    );
}

export default StorageProducts;
