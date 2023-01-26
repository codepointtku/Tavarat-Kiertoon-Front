import PropTypes from 'prop-types';
import { Card } from '@mui/material'

function ArticleCard({title, date, time}){
    return(
        <Card sx={{margin: 5, textAlign: "center"}}>
            <h1>{title}</h1>
            <hr /> 
            <h4>{date}</h4>
            <h4>{time}</h4>
        </Card>
    )
}

ArticleCard.propTypes = {
    title: PropTypes.string.isRequired,
    date: PropTypes.string.isRequired,
    time: PropTypes.string.isRequired
} 

export default ArticleCard