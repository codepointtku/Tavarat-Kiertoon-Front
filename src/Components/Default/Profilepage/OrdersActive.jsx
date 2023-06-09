import { Box } from '@mui/material';

import TypographyHeading from '../../TypographyHeading';
import CustomizedTimeline from './CustomizedTimeline';

function ProfileInfo({ userOrders }) {
    console.log('ollaan aktiiviset tilaukset', userOrders);
    return (
        <Box sx={{ border: '1px solid red', p: 2 }}>
            <TypographyHeading text="Aktiiviset tilaukset" />
            <CustomizedTimeline />
        </Box>
    );
}

export default ProfileInfo;
