import { useState } from 'react';
import { Link } from 'react-router-dom';

import {
    Accordion,
    AccordionDetails,
    AccordionSummary,
    Avatar,
    Box,
    Container,
    Grid,
    Link as MuiLink,
    Typography,
} from '@mui/material';

import ChatIcon from '@mui/icons-material/Chat';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

import BackButton from '../../BackButton';

function Hero() {
    return (
        <>
            <Grid container>
                <Grid item xs={6} md={6} mt={2} mb={2}>
                    <BackButton />
                </Grid>
                <Grid item xs={6} md={6} mt={2} mb={2}>
                    <Avatar
                        sx={{
                            bgcolor: 'secondary.dark',
                            width: 48,
                            height: 48,
                        }}
                    >
                        <ChatIcon fontSize="large" />
                    </Avatar>
                </Grid>
            </Grid>

            <Box
                sx={{
                    mb: 2,
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    alignItems: 'center',
                }}
            >
                <Typography variant="h4" color="primary.main" mb={2}>
                    Yleiset ohjeet
                </Typography>

                <Typography variant="subtitle2" mb={2}>
                    Alla on usein kysyttyjä kysymyksiä vastauksineen. Jos etsimäsi tietoa ei löydy tästä tai{' '}
                    <MuiLink component={Link} to="/ohjeet">
                        Ohje
                    </MuiLink>
                    -sivulta, voit olla meihin yhteydessä{' '}
                    <MuiLink component={Link} to="/otayhteytta">
                        täältä.
                    </MuiLink>
                </Typography>
            </Box>
        </>
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
                            Koska tilatut tuotteet toimitetaan?
                        </Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                        <Typography>
                            Tuotteiden toimitusaika riippuu toimitusjonon pituudesta. Tuotteet pyritään toimittamaan
                            kahden viikon kuluessa, mutta ruuhkaisina aikoina toimituksessa voi mennä pidempään.
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
                            Kuka saa tilata tuotteita järjestelmästä?
                        </Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                        <Typography>
                            Tilataksesi tuotteita sinun tulee rekisteröityä järjestelmään. Rekisteröityminen on sallittu
                            vain hankintaoikeudet omaaville henkilöille.
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
                            Työkeskuksen kuljetus, nouto varastosta tai sisäinen posti (Vain askartelumateriaalit).
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
                            Maksaako tuotteiden tilaaminen järjestelmästä?
                        </Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                        <Typography>
                            Mistään tuotteista ei peritä maksua järjestelmässä. Kuljetuksesta ei peritä maksua.
                            Kalustekierron kuljetuksia hoitaa Turun Työkeskus.
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
                            Tuotteiden sijaintitiedot löytyvät tuotetiedoista. Lisätietoa varastoista et löydä{' '}
                            <Link to=" " underline="hover">
                                varastot
                            </Link>{' '}
                            -sivulta, koska sellaista ei ole olemassa enää.
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
                            <MuiLink component={Link} to="/ohjeet/devi/tilaus" underline="hover">
                                Tilaus
                            </MuiLink>{' '}
                            -välilehdeltä löytyy lisää tietoa myös kuljetuksesta.
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
                            Tuotteiden kuljetuksesta vastaa Turun työkeskus. Lisätietoa kuljetuksesta löydät{' '}
                            <MuiLink component={Link} to="/ohjeet/devi/tilaus">
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
                            Miten tilaan tuotteita järjestelmästä?
                        </Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                        <Typography>
                            Etsi tarvitsemasi tuote ja lisää se ostoskoriin. Kun olet lisännyt kaikki haluamasi tuotteet
                            mene omaan ostoskoriisi sivuston yläpalkista löytyvästä painikkeesta ja siirry kassalle.
                            Täytä kaikki pyydetyt kentät ja vahvista tilaus. Tilaamasi tuotteet toimitetaan antamaasi
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
                            Miten voin etsiä tarvitsemaani tuotetta?
                        </Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                        <Typography>
                            Tuotteita voi hakea{' '}
                            <MuiLink component={Link} to="/">
                                Etusivulta,{' '}
                            </MuiLink>
                            vasemmasta sivupalkista löytyvien kategorioiden avulla tai suoralla sanahaulla.
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
                            Saako tuotteita mennä katsomaan paikan päälle?
                        </Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                        <Typography>
                            Ensisijaisesti tuotteet tilataan sivustolta löytyvien tietojen perusteella. Sivustolle
                            pyritään tuomaan kaikki tarpeelliset tiedot tuotetta koskien. Mikäli tuotetiedot ovat
                            puutteelliset, niistä voi antaa palautetta tai esittää lisätiedusteluja{' '}
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
                            Ovatko järjestelmän tuotteet puhtaita ja ehjiä?
                        </Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                        <Typography>
                            Järjestelmään lisätyt tuotteet ovat aina käyttökelpoisia ja puhtaita. Likaisia tai
                            rikkinäisiä tuotteita ei lisätä järjestelmään. Tuotteen tarkempi kuntoluokitus mainitaan
                            tarvittaessa tuotetiedoissa.
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
            <Hero />
            <FAQAccordions />
        </Container>
    );
}

export default FAQView;
