import { Container, Typography } from '@mui/material'
import { useLoaderData } from 'react-router-dom'
import ArticleCard from './ArticleCard'


function Announcements(){
    const testData = useLoaderData()
    const cards = testData.map(item => (
        <ArticleCard title={item.title} date={item.date} content={item.content} />
    ))

    return(
        <Container>
            <Typography variant="h3" align="center" color="primary.main">Tiedotteet</Typography>
            <hr />
            {cards}
        </Container>
    )
}

export default Announcements