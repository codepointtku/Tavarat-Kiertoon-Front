import { useState } from 'react';

import { Container, Box, Divider, Button, ButtonGroup, Grid } from '@mui/material';

import BarChart from './BarChart';
import AreaChart from './AreaChart';
import LineChart from './LineChart';
/* import MultiAxisLineChart from './MultiAxisLineChart';
import PieChart from './PieChart';
import PolarAreaChart from './PolarAreaChart';
import RadarChart from './RadarChart'; */

import SideAccordions from './SideAccordions';

function SideStats() {
    return (
        <Box>
            <SideAccordions />
        </Box>
    );
}

const chartTypes = [
    {
        label: 'Palkki',
        type: 'bar',
        component: BarChart,
    },
    {
        label: 'Alue',
        type: 'area',
        component: AreaChart,
    },
    {
        label: 'Viiva',
        type: 'line',
        component: LineChart,
    },
    /*    {
        label: 'Multiviiva',
        type: 'multiline',
        component: MultiAxisLineChart,
    },
    {
        label: 'Piirakka',
        type: 'pie',
        component: PieChart,
    },
    {
        label: 'Area',
        type: 'polar',
        component: PolarAreaChart,
    },
    {
        label: 'Tutka',
        type: 'radar',
        component: RadarChart,
    }, */
];

function StatsPage() {
    const [visibleChart, setVisibleChart] = useState('bar');

    const chartType = chartTypes.find(({ type }) => type === visibleChart);
    const VisibleChart = chartType.component;

    return (
        <Box mb={2}>
            <Divider />
            <Grid container>
                <Grid item xs={2}>
                    <SideStats />
                </Grid>
                <Grid item xs={10}>
                    <Box
                        sx={{
                            display: 'flex',
                            flexDirection: 'row',
                            justifyContent: 'center',
                            alignItems: 'center',
                            '& > *': {
                                m: 1,
                            },
                        }}
                    >
                        <ButtonGroup variant="text" aria-label="text button group">
                            {chartTypes.map(({ label, type }) => (
                                <Button key={type} onClick={() => setVisibleChart(type)}>
                                    {label}
                                </Button>
                            ))}
                        </ButtonGroup>
                    </Box>
                    <Divider />
                    <Container maxWidth="xl" sx={{ height: 'min-content' }}>
                        <VisibleChart />
                    </Container>
                </Grid>
            </Grid>
        </Box>
    );
}

export default StatsPage;
