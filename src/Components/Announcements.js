import { Container, Typography } from '@mui/material';
import { useLoaderData } from 'react-router-dom';
import ArticleCard from './ArticleCard';

function Announcements() {
    const data = useLoaderData();
    if (!data) {
        return <>Ilmoituksia ei voitu ladata</>;
    }

    const cards = data.map((item) => (
        <ArticleCard key={item.title} title={item.title} date={item.date} content={item.content} />
    ));

    return (
        <Container>
            <Typography variant="h3" align="center" color="primary.main">
                Tiedotteet
            </Typography>
            <hr />
            {cards}
        </Container>
    );
}

export default Announcements;
