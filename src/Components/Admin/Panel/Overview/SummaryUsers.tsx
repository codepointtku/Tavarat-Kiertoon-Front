import { Box, Divider, Typography } from '@mui/material';

const kayttajia = [
    {
        teksti: 'Uusia käyttäjiä: 2 kpl',
    },
    {
        teksti: 'Käyttäjiä aktiivisena: 90',
    },
    {
        teksti: 'Käykö käyttäjät käymälässä: true',
    },
];

const kayttajaYhteenveto = kayttajia.map((topic, index) => (
    <Box key={index} sx={{ color: '#000', padding: '1rem 0 0 1rem' }}>
        <Typography sx={{ marginBottom: '0.4rem' }}>{topic.teksti}</Typography>
        <Divider />
    </Box>
));

function SummaryUsers() {
    return (
        <Box id="summary-component-products" sx={{ marginTop: '1rem' }}>
            <Typography variant="subtitle2">Käyttäjät</Typography>
            {kayttajaYhteenveto}
        </Box>
    );
}

export default SummaryUsers;
