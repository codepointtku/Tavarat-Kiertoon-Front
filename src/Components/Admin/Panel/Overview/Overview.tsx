import { Stack } from '@mui/material';

import News from './News';
import Summary from './Summary';

function Overview() {
    return (
        <Stack id="overview-stack">
            <News />
            <Summary />
        </Stack>
    );
}

export default Overview;
