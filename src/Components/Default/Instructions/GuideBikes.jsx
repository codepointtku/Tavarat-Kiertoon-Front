import { useParams } from 'react-router';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

import { Box, Container, Tabs, Tab, Typography, Link as MuiLink } from '@mui/material';

import DirectionsBikeIcon from '@mui/icons-material/DirectionsBike';
import InfoIcon from '@mui/icons-material/Info';
import RuleIcon from '@mui/icons-material/Rule';

import HeroHeader from '../../HeroHeader';
import HeroText from '../../HeroText';

function BikesHelp() {
    return (
        <>
            <Typography variant="h5" color="primary.main" gutterBottom>
                Yleistä pyörälainaamosta
            </Typography>
            <Typography gutterBottom>
                Turun kaupungin kasvatuksen ja opetuksen yksiköt voivat lainata maksutta käyttöönsä potkupyöriä, lasten
                polkupyöriä sekä sähköavusteisia muksubusseja, jotka mahdollistavat jopa 8 lapsen samanaikaisen
                kuljetuksen. Pyöräilytavarat hankittiin osana EU-rahoitteista{' '}
                <MuiLink href="https://www.turku.fi/asuminen-ja-ymparisto/projektit-ja-hankkeet/muut-kaupunkiymparistoon-liittyvat-projektit-ja-6">
                    Scale-up-hanketta.
                </MuiLink>{' '}
                Työllisyyspalvelut huoltavat ja kuljettavat tuotteet kohteisiin.{' '}
            </Typography>
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
        to: `/ohjeet/pyorat/${value}`,
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
            <HeroHeader Icon={<DirectionsBikeIcon />} />
            <HeroText title="Pyörät kiertoon" />
            <TitleTabs />
        </Container>
    );
}

export default GuideBikes;
