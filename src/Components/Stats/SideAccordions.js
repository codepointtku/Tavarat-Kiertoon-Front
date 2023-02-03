import { useState, Fragment } from 'react';

import { Divider, Typography, Accordion, AccordionSummary, AccordionDetails } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

function SideAccordions() {
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
                <AccordionSummary aria-controls="panel1d-content" id="panel1d-header" expandIcon={<ExpandMoreIcon />}>
                    <Typography>Tilauksia tehty</Typography>
                </AccordionSummary>
                <AccordionDetails>
                    {years.map((year) => (
                        <Fragment key={year.y}>
                            <Typography variant="body1">{year.y}</Typography>
                            <Typography variant="body2" color="primary.dark">
                                {year.amount}
                            </Typography>
                        </Fragment>
                    ))}

                    <Divider sx={{ marginTop: '0.6rem', marginBottom: '0.6rem' }} />

                    <Typography color="primary.dark">Yhteensä:</Typography>
                    <Typography color="success.dark">4321</Typography>
                </AccordionDetails>
            </Accordion>

            <Accordion expanded={expanded === 'panel2'} onChange={handleChange('panel2')}>
                <AccordionSummary aria-controls="panel2d-content" id="panel2d-header" expandIcon={<ExpandMoreIcon />}>
                    <Typography>Saatavilla</Typography>
                </AccordionSummary>
                <AccordionDetails>
                    {categories.map((cat) => (
                        <Fragment key={cat.prod}>
                            <Typography variant="body1">{cat.prod}</Typography>
                            <Typography variant="body2" color="primary.dark">
                                {cat.amount}
                            </Typography>
                        </Fragment>
                    ))}
                </AccordionDetails>
            </Accordion>
        </div>
    );
}

export default SideAccordions;
