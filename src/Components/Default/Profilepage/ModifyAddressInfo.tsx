import { useLocation } from 'react-router-dom';

import { Box } from '@mui/material';
import HeroHeader from '../../HeroHeader';
import HeroText from '../../HeroText';
import BusinessIcon from '@mui/icons-material/Business';

function ModifyAddressInfo() {
    const { state } = useLocation();

    console.log(state);

    return (
        <Box sx={{ p: 2 }}>
            <HeroHeader Icon={<BusinessIcon />} />
            <HeroText title="Muokkaa osoitetietoja" />
        </Box>
    );
}

export default ModifyAddressInfo;
