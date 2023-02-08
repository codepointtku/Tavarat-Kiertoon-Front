import {
    Avatar,
    Card,
    CardHeader,
    CardMedia,
    CardActionArea,
    Container,
    Grid,
    Paper,
    Typography,
    CardContent,
} from '@mui/material';

import ChatBubbleOutlineIcon from '@mui/icons-material/ChatBubbleOutline';

//

const contents = ['ohje1', 'ohje2', 'ohje3'];

const helpTopics = [
    {
        topic: 'Yleiset ohjeet',
        subheader: 'Vastauksia yleisimpiin aiheisiin',
        img: 'common_help.jpg',
        img_alt: 'alt text yleiset',
        contentheader: 'Napauta korttia avataksesi',
        content: contents,
    },
    {
        topic: 'Käyttäjätili',
        subheader: 'Tilien tarkemmat käyttöohjeet',
        img: 'common_help.jpg',
        img_alt: 'alt text tilit',
        contentheader: 'Napauta korttia avataksesi',
        content: contents,
    },
    {
        topic: 'Tilaaminen',
        subheader: 'Tilaamisen tarkemmat ohjeet',
        img: 'common_help.jpg',
        img_alt: 'alt text tilaaminen',
        contentheader: 'Napauta korttia avataksesi',
        content: contents,
    },
    {
        topic: 'Tavaran nouto',
        subheader: 'Ohjeet noutokuljetuksen tilaamiseen',
        img: 'common_help.jpg',
        img_alt: 'alt text nouto',
        contentheader: 'Napauta korttia avataksesi',
        content: contents,
    },
    {
        topic: 'Pyörävuokraamo',
        subheader: 'Polkupyöriin liittyvät säännöt & ohjeet',
        img: 'common_help.jpg',
        img_alt: 'alt text nouto',
        contentheader: 'Napauta korttia avataksesi',
        content: contents,
    },
];

const HelpTopicCards = helpTopics.map((card) => card);

console.log(HelpTopicCards);

function HelpTopicCard() {
    return (
        <Card sx={{ maxWidth: 345 }}>
            <CardHeader
                avatar={
                    <Avatar sx={{ bgcolor: 'secondary.main' }} aria-label="hi_dad">
                        <ChatBubbleOutlineIcon />
                    </Avatar>
                }
                title="Shrimp and Chorizo Paella"
                subheader="September 14, 2016"
            />
            <CardActionArea>
                <CardMedia
                    component="img"
                    height="200"
                    image="/static/images/cards/paella.jpg"
                    alt="dads_favourite_food"
                />
                <CardContent>
                    <Typography variant="body2" color="text.secondary">
                        Tähän teksti muuttujasta
                    </Typography>
                </CardContent>
            </CardActionArea>
        </Card>
    );
}

function InstructionsPage() {
    return (
        <Paper>
            <Container maxWidth="lg">
                <Grid container spacing={2}>
                    <Grid item>
                        <HelpTopicCard />
                    </Grid>
                    <Grid item>
                        <HelpTopicCard />
                    </Grid>
                    <Grid item>
                        <HelpTopicCard />
                    </Grid>
                </Grid>
            </Container>
        </Paper>
    );
}

export default InstructionsPage;
