import { useState } from 'react';
import PropTypes from 'prop-types';

import { Container, Box, Divider, Button, ButtonGroup, Grid } from '@mui/material';

import BarChart from './BarChart';
import AreaChart from './AreaChart';
import LineChart from './LineChart';
import MultiAxisLineChart from './MultiAxisLineChart';
import PieChart from './PieChart';
import PolarAreaChart from './PolarAreaChart';
import RadarChart from './RadarChart';

import SideAccordions from './SideAccordions';

function VisibleChart({ currentVisibleChart }) {
    switch (currentVisibleChart) {
        case 'bar':
            return <BarChart />;
        case 'area':
            return <AreaChart />;
        case 'line':
            return <LineChart />;
        case 'multiline':
            return <MultiAxisLineChart />;
        case 'pie':
            return <PieChart />;
        case 'polar':
            return <PolarAreaChart />;
        case 'radar':
            return <RadarChart />;
        default:
            return <BarChart />;
    }
}

function SideStats() {
    return (
        <Box>
            <SideAccordions />
        </Box>
    );
}

function StatsPage() {
    const [currentVisibleChart, setCurrentVisibleChart] = useState('bar');

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
                            <Button onClick={() => setCurrentVisibleChart('bar')}>Palkki</Button>
                            <Button onClick={() => setCurrentVisibleChart('area')}>Alue</Button>
                            <Button onClick={() => setCurrentVisibleChart('line')}>Viiva</Button>
                            <Button onClick={() => setCurrentVisibleChart('multiline')}>Multiviiva</Button>
                            <Button onClick={() => setCurrentVisibleChart('pie')}>Piirakka</Button>
                            <Button onClick={() => setCurrentVisibleChart('polar')}>Area</Button>
                            <Button onClick={() => setCurrentVisibleChart('radar')}>Tutka</Button>
                        </ButtonGroup>
                    </Box>

                    <Divider />

                    <Container maxWidth="xl" sx={{ height: 'min-content' }}>
                        <VisibleChart currentVisibleChart={currentVisibleChart} />
                    </Container>
                </Grid>
            </Grid>
        </Box>
    );
}

export default StatsPage;

VisibleChart.propTypes = {
    currentVisibleChart: PropTypes.string.isRequired,
};
