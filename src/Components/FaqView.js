import { useState } from 'react';
import { Link } from 'react-router-dom';
import {
    Grid,
    Box,
    Link as MuiLink,
    AccordionSummary,
    Divider,
    Accordion,
    Typography,
    AccordionDetails,
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

function FAQHero() {
    return (
        <Box sx={{ p: 2 }}>
            <Typography align="center" color="primary.main">
                UKK-FAQ
            </Typography>
            <Typography align="center">
                Alla on usein kysyttyjä kysymyksiä vastauksineen. Jos etsimäsi tietoa ei löydy tästä tai
                <MuiLink
                    href="https://www.youtube.com/watch?v=VcjzHMhBtf0&ab_channel=journeyVEVO"
                    color="primary"
                    underline="hover"
                >
                    {' '}
                    Ohje
                </MuiLink>
                -sivulta voi olla{' '}
                <Link to=" " underline="hover">
                    meihin yhteydessä täältä.
                </Link>
            </Typography>
            <Divider />
        </Box>
    );
}

function FAQAccordions() {
    const [expanded, setExpanded] = useState(false);

    const handleChange = (panel) => (event, isExpanded) => {
        setExpanded(isExpanded ? panel : false);
    };
    return (
        <Grid container spacing={2}>
            <Grid item xs>
                <Accordion expanded={expanded === 'panel1'} onChange={handleChange('panel1')}>
                    <AccordionSummary
                        expandIcon={<ExpandMoreIcon />}
                        aria-controls="panel1a-content"
                        id="panel1a-header"
                    >
                        <Typography gutterBottom aling="center" color="primary.main">
                            Kehen voin olla yhteydessä jos tarvitsen apua?
                        </Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                        <Typography>
                            Voit olla yhteydessä meihin lähettämällä viestin <Link to="/">palaute sivun</Link> kautta.
                            Kuljetusta koskevissa kysymyksissä voit olla yhteydessä suoraan työkeskukseen{' '}
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
                        <Typography gutterBottom aling="center" color="primary.main">
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
                        <Typography gutterBottom aling="center" color="primary.main">
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
                        <Typography gutterBottom aling="center" color="primary.main">
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
                        <Typography gutterBottom aling="center" color="primary.main">
                            Maksaako tuotteiden tilaaminen järjestelmästä?
                        </Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                        <Typography>
                            Mistään tuotteista ei peritä maksua järjestelmässä. Myös{' '}
                            <Link to=" " underline="hover">
                                kuljetuksesta
                            </Link>{' '}
                            ei peritä maksua. Kalustekierron kuljetuksia hoitaa Turun Työkeskus.
                        </Typography>
                    </AccordionDetails>
                </Accordion>
                <Accordion expanded={expanded === 'panel6'} onChange={handleChange('panel6')}>
                    <AccordionSummary
                        expandIcon={<ExpandMoreIcon />}
                        aria-controls="panel1a-content"
                        id="panel1a-header"
                    >
                        <Typography gutterBottom aling="center" color="primary.main">
                            Missä tuotteet ovat?
                        </Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                        <Typography>
                            Tuotteiden sijaintitiedot löytyvät tuotetiedoista. Lisätietoa varastoista löydät{' '}
                            <Link to=" " underline="hover">
                                varastot
                            </Link>{' '}
                            -sivulta.
                        </Typography>
                    </AccordionDetails>
                </Accordion>
            </Grid>
            <Grid zeroMinWidth item xs>
                <Accordion expanded={expanded === 'panel7'} onChange={handleChange('panel7')}>
                    <AccordionSummary
                        expandIcon={<ExpandMoreIcon />}
                        aria-controls="panel1a-content"
                        id="panel1a-header"
                    >
                        <Typography gutterBottom aling="center" color="primary.main">
                            Mitä kuljetus maksaa?
                        </Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                        <Typography>
                            Kuljetushinnaston löydät{' '}
                            <Link to=" " underline="hover">
                                Toimitus
                            </Link>{' '}
                            -välilehdeltä. Lisätietoja kuljetuksen hinnoittelusta{' '}
                            <MuiLink href="mailto:tyokeskus.kierratys@turku.fi">tyokeskus.kierratys@turku.fi.</MuiLink>
                        </Typography>
                    </AccordionDetails>
                </Accordion>
                <Accordion expanded={expanded === 'panel8'} onChange={handleChange('panel8')}>
                    <AccordionSummary
                        expandIcon={<ExpandMoreIcon />}
                        aria-controls="panel1a-content"
                        id="panel1a-header"
                    >
                        <Typography gutterBottom aling="center" color="primary.main">
                            Miten kuljetus on järjestetty?
                        </Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                        <Typography>
                            Tuotteiden kuljetuksesta vastaa Turun työkeskus. Lisätietoa kuljetuksesta löydät{' '}
                            <Link href=" " underline="hover">
                                Toimitus
                            </Link>
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
                        <Typography aling="center" color="primary.main">
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
                        <Typography gutterBottom aling="center" color="primary.main">
                            {' '}
                            Miten voin hakea tarvitsemaani tuotetta?
                        </Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                        <Typography>
                            Tuotteita voi hakea{' '}
                            <Link href=" " underline="hover">
                                tuotteet
                            </Link>{' '}
                            –sivun vasemmasta sivupalkista löytyvien hakuvaihtoehtojen avulla tai suoralla sanahaulla.
                        </Typography>
                    </AccordionDetails>
                </Accordion>
                <Accordion expanded={expanded === 'panel11'} onChange={handleChange('panel11')}>
                    <AccordionSummary
                        expandIcon={<ExpandMoreIcon />}
                        aria-controls="panel1a-content"
                        id="panel1a-header"
                    >
                        <Typography gutterBottom aling="center" color="primary.main">
                            Saako tuotteita mennä katsomaan paikan päälle?
                        </Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                        <Typography>
                            Ensisijaisesti tuotteet tilataan sivustolta löytyvien tietojen perusteella. Sivustolle
                            pyritään tuomaan kaikki tarpeelliset tiedot tuotetta koskien. Mikäli tuotetiedot ovat
                            puutteelliset, niistä voi antaa palautetta tai esittää lisätiedusteluja{' '}
                            <MuiLink href="mailto: tyokeskus.kierratys@turku.fi">tyokeskus.kierratys@turku.fi.</MuiLink>
                        </Typography>
                    </AccordionDetails>
                </Accordion>
                <Accordion expanded={expanded === 'panel12'} onChange={handleChange('panel12')}>
                    <AccordionSummary
                        expandIcon={<ExpandMoreIcon />}
                        aria-controls="panel1a-content"
                        id="panel1a-header"
                    >
                        <Typography aling="center" color="primary.main">
                            Mistä tiedän että järjestelmästä tilatut tuotteet ovat puhtaita ja ehjiä?
                        </Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                        <Typography>
                            Järjestelmään lisätyt tuotteet ovat käyttökelpoisia ja puhtaita. Likaisia tai rikkinäisiä
                            tuotteita ei lisätä järjestelmään. Tuotteen kuntoluokitus mainitaan tarvittaessa
                            tuotetiedoissa.
                        </Typography>
                    </AccordionDetails>
                </Accordion>
            </Grid>
        </Grid>
    );
}

// tää on päähässäkkä mikä returnaa noi ylemmät paskat

function FAQView() {
    return (
        <>
            <FAQHero />
            <FAQAccordions />
        </>
    );
}

export default FAQView;
