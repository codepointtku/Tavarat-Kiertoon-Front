import PropTypes from 'prop-types';
// import { Card } from '@mui/material'

function ArticleCard({data}){
    return(
        <h1 style={{textAlign: "center"}}>{data[2].title}</h1>
        /* <Card>
            <h1>{data.title}</h1>
        </Card> */ 
    )
}

ArticleCard.propTypes = {
    data: PropTypes.arrayOf(PropTypes.any)
} 

ArticleCard.defaultProps = {
    data: ""
}

export default ArticleCard