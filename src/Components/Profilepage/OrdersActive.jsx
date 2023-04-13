import { Box } from '@mui/material';
import TypographyHeading from '../TypographyHeading';

function ProfileInfo({ userOrders }) {
    // console.log('ollaan aktiiviset tilaukset', userOrders);
    return (
        <Box sx={{ border: '1px solid red' }}>
            <TypographyHeading text="Aktiiviset tilaukset" />
            <p>hello tässä on aktiiviset tilaukset komponentti</p>
        </Box>
    );
}

export default ProfileInfo;
