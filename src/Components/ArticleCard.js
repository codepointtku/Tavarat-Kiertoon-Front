import PropTypes from 'prop-types';
import { Paper, Typography } from '@mui/material';

function ArticleCard({title, date, time, content}){
    return(
        <Paper sx={{margin: 5, textAlign: "center"}}>
            <Typography variant="h4">{title}</Typography> 
            <Typography variant="subtitle1" sx={{color: '#777777'}}>{date} {time}</Typography>
            <Typography variant="body1">{content}</Typography>
        </Paper>
    )
}

ArticleCard.propTypes = {
    title: PropTypes.string.isRequired,
    date: PropTypes.string.isRequired,
    time: PropTypes.string.isRequired,
    content: PropTypes.string.isRequired
} 

export default ArticleCard