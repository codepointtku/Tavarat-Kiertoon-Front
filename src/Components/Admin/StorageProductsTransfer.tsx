import { Box, Container, Typography } from '@mui/material';
import ImportExportIcon from '@mui/icons-material/ImportExport';

import HeroHeader from '../HeroHeader';
import HeroText from '../HeroText';

function StorageProductsTransfer() {
    return (
        <Container maxWidth="md">
            <HeroHeader Icon={<ImportExportIcon />} hideInAdmin />
            <HeroText title="Tuotteiden siirto" subtitle="Siirrä tuotteita varastosta toiseen" />

            <Typography>Mamma mia macaroni!</Typography>
        </Container>
    );
}

export default StorageProductsTransfer;
