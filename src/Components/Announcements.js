import { Container } from '@mui/material'
// import ArticleCard from './ArticleCard'
import testData from '../TestData/announcement.json'


function Announcements(){
    const cards = testData.map(item => (
        <div style={{borderStyle: "solid", margin: 10}}>
            <p>{item.title} {item.date} {item.time}</p>
        </div>
    ))

    return(
        <Container>
            {cards}
        </Container>
    )
}

// <ArticleCard data={testData} />
export default Announcements