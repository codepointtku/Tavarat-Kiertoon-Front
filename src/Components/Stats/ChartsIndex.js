import { useState } from 'react';
import PropTypes from 'prop-types';

import {
    Container,
    Box,
    Divider,
    Button,
    ButtonGroup,
    Typography,
    Grid,
    // List,
    // ListItem,
    // ListItemText,
} from '@mui/material';

import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
// import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

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

function CustomizedAccordions() {
    const [expanded, setExpanded] = useState('panel1');

    const handleChange = (panel) => (event, newExpanded) => {
        setExpanded(newExpanded ? panel : false);
    };

    const years = [
        { y: '2023', amount: '123' },
        { y: '2022', amount: '842' },
        { y: '2021', amount: '831' },
        { y: '2020', amount: '556' },
        { y: '2019', amount: '123' },
        { y: '2018', amount: '123' },
    ];

    const categories = [
        { prod: 'Hammasharjat', amount: '554' },
        { prod: 'Sandaalit', amount: '887' },
        { prod: 'Sähkölaitteet', amount: '234' },
    ];

    return (
        <div>
            <Accordion expanded={expanded === 'panel1'} onChange={handleChange('panel1')}>
                <AccordionSummary aria-controls="panel1d-content" id="panel1d-header">
                    <Typography>Tilauksia tehty</Typography>
                </AccordionSummary>
                <AccordionDetails>
                    {years.map((year) => (
                        <>
                            <Typography variant="body1">{year.y}</Typography>
                            <Typography variant="body2" color="primary.dark">
                                {year.amount}
                            </Typography>
                        </>
                    ))}

                    <Divider sx={{ marginTop: '0.6rem', marginBottom: '0.6rem' }} />

                    <Typography color="primary.dark">Yhteensä:</Typography>
                    <Typography color="success.dark">4321</Typography>
                </AccordionDetails>
            </Accordion>

            <Accordion expanded={expanded === 'panel2'} onChange={handleChange('panel2')}>
                <AccordionSummary aria-controls="panel2d-content" id="panel2d-header">
                    <Typography>Saatavilla</Typography>
                </AccordionSummary>
                <AccordionDetails>
                    {categories.map((cat) => (
                        <>
                            <Typography variant="body1">{cat.prod}</Typography>
                            <Typography variant="body2" color="primary.dark">
                                {cat.amount}
                            </Typography>
                        </>
                    ))}
                </AccordionDetails>
            </Accordion>
        </div>
    );
}

function SideStats() {
    return (
        <Box>
            <CustomizedAccordions />
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
