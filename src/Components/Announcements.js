import { Container, Typography } from '@mui/material';
import { useRouteLoaderData } from 'react-router-dom';
import ArticleCard from './ArticleCard';

function Announcements() {
    const { bulletins } = useRouteLoaderData('root');

    const cards = bulletins.map((item) => (
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
