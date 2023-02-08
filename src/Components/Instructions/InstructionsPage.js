import { Container, Grid, Paper } from '@mui/material';

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

const HelpTopicCards = helpTopics.map((card) => (
    <Grid item key={card.topic_id}>
        <InstructionCard
            topic={card.topic}
            subheader={card.subheader}
            img={card.img}
            imgAlt={card.imgAlt}
            contentheader={card.contentheader}
        />
    </Grid>
));

function InstructionsPage() {
    return (
        <Paper>
            <Container maxWidth="lg">
                <Grid container spacing={2}>
                    {HelpTopicCards}
                </Grid>
            </Container>
        </Paper>
    );
}

export default InstructionsPage;
