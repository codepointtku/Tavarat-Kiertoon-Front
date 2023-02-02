import PropTypes from 'prop-types';
import { Paper, Typography } from '@mui/material';

function ArticleCard({title, date, content}){
    return(
        <Paper sx={{margin: 5, p: 5}}>
            <Typography variant="h5">{title}</Typography> 
            <Typography variant="subtitle1" sx={{color: '#777777'}}>{date}</Typography>
            <Typography variant="body1">{content}</Typography>
        </Paper>
    )
}

ArticleCard.propTypes = {
    title: PropTypes.string.isRequired,
    date: PropTypes.string.isRequired,
    content: PropTypes.string.isRequired
} 

export default ArticleCard