import { useState } from 'react';

import {
    Container,
    Box,
    Divider,
    Button,
    ButtonGroup,
    // Typography,
    // Grid,
} from '@mui/material';

import BarChart from './BarChart';
import AreaChart from './AreaChart';
import LineChart from './LineChart';
import MultiAxisLineChart from './MultiAxisLineChart';
import PieChart from './PieChart';
import PolarAreaChart from './PolarAreaChart';
import RadarChart from './RadarChart';

function StatsPage() {
    const [currentVisibleChart, setCurrentVisibleChart] = useState('bar');

    // this horryfying ifelse-statement shall be abolished and refactored in the future.
    const VisibleChart = () => {
        if (currentVisibleChart === 'bar') {
            return <BarChart />;
        } else if (currentVisibleChart === 'area') {
            return <AreaChart />;
        } else if (currentVisibleChart === 'line') {
            return <LineChart />;
        } else if (currentVisibleChart === 'multiline') {
            return <MultiAxisLineChart />;
        } else if (currentVisibleChart === 'pie') {
            return <PieChart />;
        } else if (currentVisibleChart === 'polar') {
            return <PolarAreaChart />;
        } else if (currentVisibleChart === 'radar') {
            return <RadarChart />;
        }
    };

    return (
        <Box>
            <Divider />

            <Box
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
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

            <Container maxWidth="lg" sx={{ height: '70%' }}>
                <VisibleChart />
            </Container>
        </Box>
    );
}

export default StatsPage;
