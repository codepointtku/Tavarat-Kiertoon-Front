import { useState } from 'react';
import { Link, createSearchParams, useLoaderData, useRouteLoaderData, useSearchParams } from 'react-router-dom';

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

// TODO: convert to typescipt

function StorageProducts() {
    const [searchParams, setSearchParams] = useSearchParams();
    const [qrSearchOpen, setQrSearchOpen] = useState(false);

    const onNewScanResult = (decodedText, decodedResult) => {
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

            <StorageProductsTable />
        </>
    );
}

export default StorageProducts;
