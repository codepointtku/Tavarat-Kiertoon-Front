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
            <Typography variant="h3" sx={{textAlign: "center", fontWeight: 500}}>Tiedotteet</Typography>
            {cards}
        </Container>
    )
}

export default Announcements