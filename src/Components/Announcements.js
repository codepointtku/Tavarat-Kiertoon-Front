import { Container } from '@mui/material'
import ArticleCard from './ArticleCard'
import testData from '../TestData/announcement.json'


function Announcements(){
    const cards = testData.map(item => (
        <ArticleCard title={item.title} date={item.date} time={item.time} />
    ))

    return(
        <Container>
            {cards}
        </Container>
    )
}

export default Announcements