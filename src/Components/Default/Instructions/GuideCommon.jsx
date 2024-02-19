import { useState } from 'react';
import { Link } from 'react-router-dom';

import {
    Accordion,
    AccordionDetails,
    AccordionSummary,
    Container,
    Grid,
    Link as MuiLink,
    Typography,
} from '@mui/material';

import ChatIcon from '@mui/icons-material/Chat';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

import HeroHeader from '../../HeroHeader';
import HeroText from '../../HeroText';

function CustomHeroText() {
    return (
        <Typography variant="subtitle2" textAlign="center" mb="2rem">
            Jos etsimäsi tietoa ei löydy tästä tai{' '}
            <MuiLink component={Link} to="/ohjeet">
                Ohje
            </MuiLink>
            -sivulta, voit olla meihin yhteydessä{' '}
            <MuiLink component={Link} to="/otayhteytta">
                täältä
            </MuiLink>
            .
        </Typography>
    );
}

function FAQAccordions() {
    const [expanded, setExpanded] = useState(false);

    const handleChange = (panel) => (event, isExpanded) => {
        setExpanded(isExpanded ? panel : false);
    };
    return (
        <Grid container spacing={2} mb={2}>
            <Grid item xs>
                <Accordion expanded={expanded === 'panel1'} onChange={handleChange('panel1')}>
                    <AccordionSummary
                        expandIcon={<ExpandMoreIcon />}
                        aria-controls="panel1a-content"
                        id="panel1a-header"
                    >
                        <Typography gutterBottom align="center" color="primary.main">
                            Kehen voin olla yhteydessä jos tarvitsen apua?
                        </Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                        <Typography>
                            Voit olla yhteydessä meihin lähettämällä viestin{' '}
                            <MuiLink component={Link} to="/otayhteytta">
                                yhteydenotto-lomakkeen
                            </MuiLink>{' '}
                            kautta. Kuljetusta koskevissa kysymyksissä voit olla yhteydessä suoraan työkeskukseen{' '}
                            <MuiLink href="mailto: tyokeskus.kierratys@turku.fi">tyokeskus.kierratys@turku.fi</MuiLink>
                        </Typography>
                    </AccordionDetails>
                </Accordion>
                <Accordion expanded={expanded === 'panel2'} onChange={handleChange('panel2')}>
                    <AccordionSummary
                        expandIcon={<ExpandMoreIcon />}
                        aria-controls="panel2a-content"
                        id="panel2a-header"
                    >
                        <Typography gutterBottom align="center" color="primary.main">
                            Mikä on tuotteiden toimitusaika?
                        </Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                        <Typography>
                            Tuotteiden toimitusaika riippuu tilausten määrästä. Tuotteet pyritään toimittamaan kahden
                            viikon kuluessa tilauksesta, mutta ruuhkaisina aikoina toimitus voi kestää pidempään.
                        </Typography>
                    </AccordionDetails>
                </Accordion>

                <Accordion expanded={expanded === 'panel3'} onChange={handleChange('panel3')}>
                    <AccordionSummary
                        expandIcon={<ExpandMoreIcon />}
                        aria-controls="panel1a-content"
                        id="panel1a-header"
                    >
                        <Typography gutterBottom align="center" color="primary.main">
                            Kuka saa tilata tuotteita?
                        </Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                        <Typography>
                            Jotta voit tilata tuotteita sinun tulee rekisteröityä järjestelmään. Rekisteröityminen on
                            sallittua vain henkilöille joilla on tuotteiden hankintaoikeudet.
                        </Typography>
                    </AccordionDetails>
                </Accordion>
                <Accordion expanded={expanded === 'panel4'} onChange={handleChange('panel4')}>
                    <AccordionSummary
                        expandIcon={<ExpandMoreIcon />}
                        aria-controls="panel1a-content"
                        id="panel1a-header"
                    >
                        <Typography gutterBottom align="center" color="primary.main">
                            Kuka tilaa kuljetuksen?
                        </Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                        <Typography>
                            Kuljetuksen tilaa tuotteen tilaaja. Tilauksen yhteydessä valitaan kuljetusmuodoksi joko
                            Työpisteen kuljetus tai nouto varastosta.
                        </Typography>
                    </AccordionDetails>
                </Accordion>
                <Accordion expanded={expanded === 'panel5'} onChange={handleChange('panel5')}>
                    <AccordionSummary
                        expandIcon={<ExpandMoreIcon />}
                        aria-controls="panel1a-content"
                        id="panel1a-header"
                    >
                        <Typography gutterBottom align="center" color="primary.main">
                            Maksaako tuotteiden tilaaminen?
                        </Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                        <Typography>
                            Mistään tuotteesta tai kuljetuksesta ei peritä maksua. Kalustekierron kuljetukset hoitaa
                            Turun Työpisteen tuotanto.
                        </Typography>
                    </AccordionDetails>
                </Accordion>
                <Accordion expanded={expanded === 'panel6'} onChange={handleChange('panel6')}>
                    <AccordionSummary
                        expandIcon={<ExpandMoreIcon />}
                        aria-controls="panel1a-content"
                        id="panel1a-header"
                    >
                        <Typography gutterBottom color="primary.main">
                            Missä tuotteet ovat?
                        </Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                        <Typography>
                            Tuotteiden sijaintitiedot löytyvät tuotetiedoista. Varastot -sivu on poistunut käytöstä.
                        </Typography>
                    </AccordionDetails>
                </Accordion>
            </Grid>
            <Grid item xs>
                <Accordion expanded={expanded === 'panel7'} onChange={handleChange('panel7')}>
                    <AccordionSummary
                        expandIcon={<ExpandMoreIcon />}
                        aria-controls="panel1a-content"
                        id="panel1a-header"
                    >
                        <Typography gutterBottom align="center" color="primary.main">
                            Mitä kuljetus maksaa?
                        </Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                        <Typography>
                            Kuljetus on aina ilmainen.{' '}
                            <MuiLink component={Link} to="/ohjeet/tilaus/kuljetus" underline="hover">
                                Tilaus
                            </MuiLink>{' '}
                            -välilehdeltä löytyy lisää tietoa kuljetuksista.
                        </Typography>
                    </AccordionDetails>
                </Accordion>
                <Accordion expanded={expanded === 'panel8'} onChange={handleChange('panel8')}>
                    <AccordionSummary
                        expandIcon={<ExpandMoreIcon />}
                        aria-controls="panel1a-content"
                        id="panel1a-header"
                    >
                        <Typography gutterBottom align="center" color="primary.main">
                            Miten kuljetus on järjestetty?
                        </Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                        <Typography>
                            Tuotteiden kuljetuksesta vastaa Turun Työpiste. Lisätietoa kuljetuksesta löydät{' '}
                            <MuiLink component={Link} to="/ohjeet/tilaus/kuljetus">
                                Tilaus
                            </MuiLink>
                            -välilehdeltä.
                        </Typography>
                    </AccordionDetails>
                </Accordion>
                <Accordion expanded={expanded === 'panel9'} onChange={handleChange('panel9')}>
                    <AccordionSummary
                        expandIcon={<ExpandMoreIcon />}
                        aria-controls="panel1a-content"
                        id="panel1a-header"
                    >
                        <Typography gutterBottom align="center" color="primary.main">
                            Miten tilaan tuotteita?
                        </Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                        <Typography>
                            Etsi tarvitsemasi tuote ja lisää se ostoskoriin. Kun olet lisännyt kaikki haluamasi tuotteet
                            mene omaan ostoskoriisi sivuston yläpalkista löytyvästä painikkeesta ja siirry kassalle.
                            Täytä kaikki tarvittavat kentät ja vahvista tilaus. Tilaamasi tuotteet toimitetaan antamaasi
                            toimitusosoitteeseen.
                        </Typography>
                    </AccordionDetails>
                </Accordion>
                <Accordion expanded={expanded === 'panel10'} onChange={handleChange('panel10')}>
                    <AccordionSummary
                        expandIcon={<ExpandMoreIcon />}
                        aria-controls="panel1a-content"
                        id="panel1a-header"
                    >
                        <Typography gutterBottom align="center" color="primary.main">
                            Miten löydän tarvitsemani tuotteen?
                        </Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                        <Typography>
                            Tuotteita voi hakea{' '}
                            <MuiLink component={Link} to="/">
                                Etusivulta,{' '}
                            </MuiLink>
                            vasemmasta sivupalkista löytyvästä valikosta tai suoralla sanahaulla.
                        </Typography>
                    </AccordionDetails>
                </Accordion>
                <Accordion expanded={expanded === 'panel11'} onChange={handleChange('panel11')}>
                    <AccordionSummary
                        expandIcon={<ExpandMoreIcon />}
                        aria-controls="panel1a-content"
                        id="panel1a-header"
                    >
                        <Typography gutterBottom align="center" color="primary.main">
                            Saako tuotteita tulla katsomaan paikan päälle?
                        </Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                        <Typography>
                            Ensisijaisesti tuotteet tilataan sivustolta löytyvien tietojen perusteella. Sivustolle
                            pyritään lisäämään kaikki tarpeelliset tiedot tuotteesta. Mikäli tiedot ovat puutteelliset,
                            siitä voi antaa palautetta tai pyytää lisätietoja{' '}
                            <MuiLink component={Link} to="/otayhteytta">
                                yhteydenotto-lomakkeen
                            </MuiLink>{' '}
                            kautta.
                        </Typography>
                    </AccordionDetails>
                </Accordion>
                <Accordion expanded={expanded === 'panel12'} onChange={handleChange('panel12')}>
                    <AccordionSummary
                        expandIcon={<ExpandMoreIcon />}
                        aria-controls="panel1a-content"
                        id="panel1a-header"
                    >
                        <Typography gutterBottom align="center" color="primary.main">
                            Ovatko tuotteet puhtaita ja ehjiä?
                        </Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                        <Typography>
                            Kaikki tuotteet ovat toimivia ja puhtaita. Likaisia tai rikkinäisiä tuotteita ei lisätä
                            järjestelmään. Tarvittaessa tuotteen tarkka kuntoluokitus mainitaan tuotetiedoissa.
                        </Typography>
                    </AccordionDetails>
                </Accordion>
            </Grid>
        </Grid>
    );
}

function FAQView() {
    return (
        <Container maxWidth="lg">
            <HeroHeader Icon={<ChatIcon />} />
            <HeroText title="Yleiset ohjeet" subtitle="Alle on koottu usein kysyttyjä kysymyksiä vastauksineen." />
            <CustomHeroText />
            <FAQAccordions />
        </Container>
    );
}

export default FAQView;
