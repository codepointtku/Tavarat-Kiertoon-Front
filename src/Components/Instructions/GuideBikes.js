/* eslint-disable */

import { useParams } from 'react-router';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

import { Avatar, Box, Container, Tabs, Tab, Typography } from '@mui/material';

import DirectionsBikeIcon from '@mui/icons-material/DirectionsBike';
import InfoIcon from '@mui/icons-material/Info';
import RuleIcon from '@mui/icons-material/Rule';

function BikesHelp() {
    return (
        <>
            <Typography variant="h5" color="primary.main" gutterBottom>
                Yleistä pyörävuokraamosta
            </Typography>
            <Typography gutterBottom>Voit vuokrata palvelustamme myös polkupyöriä.</Typography>
            <Typography gutterBottom>Polkupyörille on omat sääntönsä ja ohjeensa.</Typography>
        </>
    );
}

function BikesRules() {
    return (
        <>
            <Typography variant="h5" color="primary.main" gutterBottom>
                Pyörien säännöt
            </Typography>
            <Typography gutterBottom>Sääntöjä</Typography>
            <Typography gutterBottom>Lisää sääntöjä</Typography>
        </>
    );
}

function Hero() {
    return (
        <Box
            sx={{
                mb: 2,
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
            }}
        >
            <Avatar
                sx={{
                    mt: 2,
                    mb: 1,
                    bgcolor: 'secondary.dark',
                    width: 48,
                    height: 48,
                }}
            >
                <DirectionsBikeIcon fontSize="large" />
            </Avatar>

            <Typography variant="h4" color="primary.main">
                Pyörät Kiertoon
            </Typography>
        </Box>
    );
}

function TabPage(props) {
    const { children, value, name, ...other } = props;

    return (
        <Box mt={2} hidden={value !== name} id={`tabpage-${name}`} aria-labelledby={`tab-${name}`} {...other}>
            {value === name && children}
        </Box>
    );
}

TabPage.propTypes = {
    children: PropTypes.node,
    name: PropTypes.string.isRequired,
    value: PropTypes.string.isRequired,
};

function tabProps(value) {
    return {
        id: `tab-${value}`,
        'aria-controls': `tabpanel-${value}`,
        value,
        component: Link,
        to: `/ohjeet/devi/${value}`,
        replace: true,
    };
}

function TitleTabs() {
    const params = useParams();
    const value = params.value ?? 'ohjeet';

    return (
        <Box sx={{ width: '100%' }}>
            <Box>
                <Tabs centered value={value} aria-label="title tabs">
                    <Tab label="Ohjeet" {...tabProps('ohjeet')} icon={<InfoIcon />} />
                    <Tab label="Säännöt" {...tabProps('saannot')} icon={<RuleIcon />} />
                </Tabs>
            </Box>
            <TabPage value={value} name="ohjeet">
                <BikesHelp />
            </TabPage>
            <TabPage value={value} name="saannot">
                <BikesRules />
            </TabPage>
        </Box>
    );
}

function GuideBikes() {
    return (
        <Container maxWidth="lg">
            <Hero />
            <TitleTabs />
        </Container>
    );
}

export default GuideBikes;
