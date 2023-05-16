import { Box, Divider, Typography } from '@mui/material';

const tilauksia = [
    {
        teksti: 'Uusia tilauksia: 28 kpl',
    },
    {
        teksti: 'Tilauksia käsittelyssä: 5',
    },
    {
        teksti: 'Tilauksia toimitettu tässä kuussa: 1000',
    },
];

const tilausYhteenveto = tilauksia.map((topic, index) => (
    <Box key={index} sx={{ color: '#000', padding: '1rem 0 0 1rem' }}>
        <Typography sx={{ marginBottom: '0.4rem' }}>{topic.teksti}</Typography>
        <Divider />
    </Box>
));

function SummaryOrders() {
    return (
        <Box id="summary-component-orders" sx={{ marginTop: '1rem' }}>
            <Typography variant="subtitle2">Tilaukset</Typography>
            {tilausYhteenveto}
        </Box>
    );
}

export default SummaryOrders;
