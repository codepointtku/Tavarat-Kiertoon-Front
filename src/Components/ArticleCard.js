import PropTypes from 'prop-types';
import { Card } from '@mui/material'

function ArticleCard({title, date, time, content}){
    return(
        <Card sx={{margin: 5, textAlign: "center"}}>
            <h1>{title}</h1>
            <hr /> 
            <h5 style={{color: '#777777'}}>{date} {time}</h5>
            <p>{content}</p>
        </Card>
    )
}

ArticleCard.propTypes = {
    title: PropTypes.string.isRequired,
    date: PropTypes.string.isRequired,
    time: PropTypes.string.isRequired,
    content: PropTypes.string.isRequired
} 

export default ArticleCard