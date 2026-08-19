import { useState, Fragment } from 'react';

import { useLoaderData } from 'react-router-dom';
import { Divider, Typography, Accordion, AccordionSummary, AccordionDetails } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

function SideAccordions() {
    const [expanded, setExpanded] = useState({ panel1: true, panel2: true });

    const handleChange = (panel) => (event, newExpanded) => {
        setExpanded(newExpanded ? { ...expanded, [panel]: true } : { ...expanded, [panel]: false });
    };
    const { order_list, price_list } = useLoaderData();
    let order_years = [];
    let order_total = 0;
    let price_years = [];
    let price_total = 0;
    console.log(order_list, price_list);
    Object.entries(order_list).map(([year, values]) => {
        order_years.push({ y: year, amount: values.total });
        order_total += values.total;
    });
    Object.entries(price_list).map(([year, values]) => {
        price_years.push({ y: year, amount: values.total });
        console.log(values.total);
        price_total += values.total;
    });
    /* const categories = [
        { prod: 'Hammasharjat', amount: '554' },
        { prod: 'Sandaalit', amount: '887' },
        { prod: 'Sähkölaitteet', amount: '234' },
    ]; */

    return (
        <div>
            <Accordion expanded={expanded.panel1} onChange={handleChange('panel1')}>
                <AccordionSummary aria-controls="panel1d-content" id="panel1d-header" expandIcon={<ExpandMoreIcon />}>
                    <Typography>Tilauksia tehty</Typography>
                </AccordionSummary>
                <AccordionDetails>
                    {order_years.map((year) => (
                        <Fragment key={year.y}>
                            <Typography variant="body1">{year.y}</Typography>
                            <Typography variant="body2" color="primary.dark">
                                {year.amount}
                            </Typography>
                        </Fragment>
                    ))}

                    <Divider sx={{ marginTop: '0.6rem', marginBottom: '0.6rem' }} />

                    <Typography color="primary.dark">Yhteensä:</Typography>
                    <Typography color="success.dark">{order_total}</Typography>
                </AccordionDetails>
            </Accordion>

            <Accordion expanded={expanded.panel2} onChange={handleChange('panel2')}>
                <AccordionSummary aria-controls="panel2d-content" id="panel2d-header" expandIcon={<ExpandMoreIcon />}>
                    <Typography>Rahaa säästetty</Typography>
                </AccordionSummary>
                <AccordionDetails>
                    {price_years.map((year) => (
                        <Fragment key={year.y}>
                            <Typography variant="body1">{year.y}</Typography>
                            <Typography variant="body2" color="primary.dark">
                                {year.amount}
                            </Typography>
                        </Fragment>
                    ))}
                    <Typography color="primary.dark">Yhteensä:</Typography>
                    <Typography color="success.dark">{price_total}</Typography>
                </AccordionDetails>
            </Accordion>
        </div>
    );
}

export default SideAccordions;
