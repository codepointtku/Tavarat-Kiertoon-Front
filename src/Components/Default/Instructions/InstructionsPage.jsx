import { Container, Grid } from '@mui/material';
import ChatIcon from '@mui/icons-material/Chat';
import EmojiPeopleIcon from '@mui/icons-material/EmojiPeople';
import ShoppingCartCheckoutIcon from '@mui/icons-material/ShoppingCartCheckout';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import DirectionsBikeIcon from '@mui/icons-material/DirectionsBike';

import InstructionCard from './InstructionCard';

const contents = ['ohje1', 'ohje2', 'ohje3'];

const helpTopics = [
    {
        topic_id: 1,
        topic: 'Yleiset ohjeet',
        subheader: 'Vastauksia yleisimpiin aiheisiin',
        linkURL: 'ukk',
        icon: ChatIcon,
        img: 'common_help.jpg',
        imgAlt: 'alt text yleiset',
        content: contents,
    },
    {
        topic_id: 2,
        topic: 'Käyttäjätili',
        subheader: 'Tilien tarkemmat käyttöohjeet',
        linkURL: 'tili',
        icon: EmojiPeopleIcon,
        img: 'account_help.jpg',
        imgAlt: 'alt text tilit',
        content: contents,
    },
    {
        topic_id: 3,
        topic: 'Tilaaminen',
        subheader: 'Tilaamisen tarkemmat ohjeet',
        linkURL: 'tilaus',
        icon: ShoppingCartCheckoutIcon,
        img: 'ordering_help.jpg',
        imgAlt: 'alt text tilaaminen',
        content: contents,
    },
    {
        topic_id: 4,
        topic: 'Tavaran nouto',
        subheader: 'Ohjeet noutokuljetuksen tilaamiseen',
        linkURL: 'nouto',
        icon: LocalShippingIcon,
        img: 'nouto_help.jpg',
        imgAlt: 'alt text nouto',
        content: contents,
    },
    {
        topic_id: 5,
        topic: 'Pyörävuokraamo',
        subheader: 'Polkupyöriin liittyvät säännöt & ohjeet',
        linkURL: 'pyorat',
        icon: DirectionsBikeIcon,
        img: 'bikes_help.jpg',
        imgAlt: 'alt text nouto',
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
                linkURL={card.linkURL}
                icon={card.icon}
                img={card.img}
                imgAlt={card.imgAlt}
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
