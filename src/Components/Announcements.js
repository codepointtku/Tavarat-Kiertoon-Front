import { Container } from '@mui/material'
import { useLoaderData } from 'react-router-dom'
import ArticleCard from './ArticleCard'


function Announcements(){
    const testData = useLoaderData()
    const cards = testData.map(item => (
        <ArticleCard title={item.title} date={item.date} content={item.content} />
    ))

    return(
        <Container>
            {cards}
        </Container>
    )
}

export default Announcements