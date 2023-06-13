import { useLocation } from 'react-router-dom';

import { Box, TextField, Grid } from '@mui/material';
import HeroHeader from '../../HeroHeader';
import HeroText from '../../HeroText';
import BusinessIcon from '@mui/icons-material/Business';

function ModifyAddressInfo() {
    const { state: addressInfo } = useLocation();

    console.log(addressInfo);

    return (
        <Box sx={{ p: 2 }}>
            <HeroHeader Icon={<BusinessIcon />} />
            <HeroText title="Luo uusi osoite" />
            <Grid container direction="column" alignContent="center" gap={2}>
                <Grid item>
                    <TextField label="Osoite" placeholder="Osoite" sx={{ width: '150%' }} />
                </Grid>
                <Grid item>
                    <TextField label="Kaupunki" placeholder="Kaupunki" sx={{ width: '150%' }} />
                </Grid>
                <Grid item>
                    <TextField label="Postinumero" placeholder="Postinumero" sx={{ width: '150%' }} />
                </Grid>
            </Grid>
        </Box>
    );
}

export default ModifyAddressInfo;
