import { useState } from 'react';
import PropTypes from 'prop-types';

import { Container, Box, Divider, Button, ButtonGroup, Typography, Grid } from '@mui/material';

import BarChart from './BarChart';
import AreaChart from './AreaChart';
import LineChart from './LineChart';
import MultiAxisLineChart from './MultiAxisLineChart';
import PieChart from './PieChart';
import PolarAreaChart from './PolarAreaChart';
import RadarChart from './RadarChart';

// this horryfying ifelse-statement shall be abolished and refactored in the future.
function VisibleChart({ currentVisibleChart }) {
    if (currentVisibleChart === 'bar') {
        return <BarChart />;
    }
    if (currentVisibleChart === 'area') {
        return <AreaChart />;
    }
    if (currentVisibleChart === 'line') {
        return <LineChart />;
    }
    if (currentVisibleChart === 'multiline') {
        return <MultiAxisLineChart />;
    }
    if (currentVisibleChart === 'pie') {
        return <PieChart />;
    }
    if (currentVisibleChart === 'polar') {
        return <PolarAreaChart />;
    }
    if (currentVisibleChart === 'radar') {
        return <RadarChart />;
    }
}

function SideStats() {
    return (
        <Box>
            {/* prettier-ignore */}
            <Typography>
                Tilauksia tehty
                2016 11 kpl
                2017 199 kpl
                2018 276 kpl
                2019 501 kpl
                2020 556 kpl
                2021 831 kpl
                2022 842 kpl
                2023 29 kpl
                Yhteensä 3245 kpl
                Saatavilla
                Huonekalu 635 203
                Laite 64 38
                Sekalaiset 6 6
            </Typography>
        </Box>
    );
}

function StatsPage() {
    const [currentVisibleChart, setCurrentVisibleChart] = useState('bar');

    return (
        <Box
        // maxWidth="xl"
        // sx={{
        //     display: 'flex',
        //     flexDirection: 'row',
        //     alignItems: 'center',
        //     justifyContent: 'center',
        // }}
        >
            <Box>
                <Divider />
            </Box>

            <Grid container>
                <Grid item xs={2}>
                    <SideStats />
                </Grid>

                <Grid item xs={10}>
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

                    <Container maxWidth="xl" sx={{ height: '70%' }}>
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
