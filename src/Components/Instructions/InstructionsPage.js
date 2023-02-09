import { Container, Grid } from '@mui/material';

import InstructionCard from './InstructionCard';

//

const contents = ['ohje1', 'ohje2', 'ohje3'];

const helpTopics = [
    {
        topic_id: 1,
        topic: 'Yleiset ohjeet',
        subheader: 'Vastauksia yleisimpiin aiheisiin',
        img: 'common_help.jpg',
        imgAlt: 'alt text yleiset',
        contentheader: 'Napauta korttia avataksesi',
        content: contents,
    },
    {
        topic_id: 2,
        topic: 'Käyttäjätili',
        subheader: 'Tilien tarkemmat käyttöohjeet',
        img: 'account_help.jpg',
        imgAlt: 'alt text tilit',
        contentheader: 'Napauta korttia avataksesi',
        content: contents,
    },
    {
        topic_id: 3,
        topic: 'Tilaaminen',
        subheader: 'Tilaamisen tarkemmat ohjeet',
        img: 'ordering_help.jpg',
        imgAlt: 'alt text tilaaminen',
        contentheader: 'Napauta korttia avataksesi',
        content: contents,
    },
    {
        topic_id: 4,
        topic: 'Tavaran nouto',
        subheader: 'Ohjeet noutokuljetuksen tilaamiseen',
        img: 'nouto_help.jpg',
        imgAlt: 'alt text nouto',
        contentheader: 'Napauta korttia avataksesi',
        content: contents,
    },
    {
        topic_id: 5,
        topic: 'Pyörävuokraamo',
        subheader: 'Polkupyöriin liittyvät säännöt & ohjeet',
        img: 'bikes_help.jpg',
        imgAlt: 'alt text nouto',
        contentheader: 'Napauta korttia avataksesi',
        content: contents,
    },
];

function HelpTopicCards() {
    const iconHover = {
        '&:hover .MuiAvatar-root': {
            backgroundColor: 'secondary.dark',
        },
    };
    return helpTopics.map((card) => (
        <Grid item key={card.topic_id} sx={iconHover}>
            <InstructionCard
                topic={card.topic}
                subheader={card.subheader}
                img={card.img}
                imgAlt={card.imgAlt}
                contentheader={card.contentheader}
            />
        </Grid>
    ));
}

function InstructionsPage() {
    return (
        <Container sx={{ marginTop: 2, marginBottom: 2 }}>
            <Grid container spacing={4} sx={{ justifyContent: 'center' }}>
                <HelpTopicCards />
            </Grid>
        </Container>
    );
}

export default InstructionsPage;
