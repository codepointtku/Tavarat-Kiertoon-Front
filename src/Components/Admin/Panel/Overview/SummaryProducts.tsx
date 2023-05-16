import { Box, Divider, Typography } from '@mui/material';

const tuotteita = [
    {
        teksti: 'Uusia tuotteita: 444 kpl',
    },
    {
        teksti: 'Tuotteita maalattavana: 8',
    },
    {
        teksti: 'Tuotteita toimitettu tässä kuussa: 3000',
    },
];

const tuoteYhteenveto = tuotteita.map((topic, index) => (
    <Box key={index} sx={{ color: '#000', padding: '1rem 0 0 1rem' }}>
        <Typography sx={{ marginBottom: '0.4rem' }}>{topic.teksti}</Typography>
        <Divider />
    </Box>
));

function SummaryProducts() {
    return (
        <Box id="summary-component-products" sx={{ marginTop: '1rem' }}>
            <Typography variant="subtitle2">Tuotteet</Typography>
            {tuoteYhteenveto}
        </Box>
    );
}

export default SummaryProducts;
