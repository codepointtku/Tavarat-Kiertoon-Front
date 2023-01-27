import {
    Container,
    Box,
    Divider,
    Button,
    // Typography,
    // Grid,
} from '@mui/material'

import BarChart from './BarChart';
import AreaChart from './AreaChart';
import LineChart from './LineChart';
import MultiAxisLineChart from './MultiAxisLineChart';
import PieChart from './PieChart';
import PolarAreaChart from './PolarAreaChart';
import RadarChart from './RadarChart';

const charts = [
    { name: 'Palkki' },
    { name: 'Alue' },
    { name: 'Viiva' },
    { name: 'MultiViiva' },
    { name: 'Piirakka' },
    { name: 'Rullakebab' },
    { name: 'Tutka' },
]

function StatsPage() {
    return (
        // <>
        <Box>
            <Container maxWidth="md">
                {charts.map((chart) => (<Button>{chart.name}</Button>))}
            </Container>
            <Divider />
            <Box>
                <Container>
                    <BarChart />
                </Container>
            </Box>
            <Divider />
            <Box>
                <Container>
                    <AreaChart />
                </Container>
            </Box>
            <Divider />
            <Box>
                <Container>
                    <LineChart />
                </Container>
            </Box>
            <Divider />
            <Box>
                <Container>
                    <MultiAxisLineChart />
                </Container>
            </Box>
            <Divider />
            <Box>
                <Container maxWidth="xs">
                    <PieChart />
                </Container>
            </Box>
            <Divider />
            <Box>
                <Container maxWidth="xs">
                    <PolarAreaChart />
                </Container>
            </Box>
            <Divider />
            <Box>
                <Container maxWidth="xs">
                    <RadarChart />
                </Container>
            </Box>
        </Box>
        // </>
    )
}

export default StatsPage;