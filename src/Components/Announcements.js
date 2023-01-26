import { Container } from '@mui/material'
import ArticleCard from './ArticleCard'
import testData from '../TestData/announcement.json'


function Announcements(){

    return(
        <Container>
            <ArticleCard data={testData} />
        </Container>
    )
}


export default Announcements