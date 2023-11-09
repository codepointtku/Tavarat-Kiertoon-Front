import { Stack } from '@mui/material';

import News from './News';
import Summary from './Summary';

function Overview() {
    return (
        <Stack id="overview-stack" flex={1}>
            {/* <News /> */}
            <Summary />
        </Stack>
    );
}

export default Overview;
