import { Link } from 'react-router-dom';

import { Avatar, Card, CardActionArea, CardHeader, CardMedia } from '@mui/material';

import PropTypes from 'prop-types';

function InstructionCard({ topic, subheader, linkURL, icon: Icon, img, imgAlt }) {
    return (
        <Card sx={{ maxWidth: 300 }}>
            <CardActionArea component={Link} to={linkURL}>
                <CardHeader
                    avatar={
                        <Avatar aria-label="icon" sx={{ bgcolor: 'secondary.main' }}>
                            <Icon />
                        </Avatar>
                    }
                    title={topic}
                    titleTypographyProps={{ variant: 'h5' }}
                    subheader={subheader}
                    subheaderTypographyProps={{ variant: 'body1', maxWidth: 205 }}
                />
                <CardMedia component="img" height="200" image={img} alt={imgAlt} />
            </CardActionArea>
        </Card>
    );
}

export default InstructionCard;

InstructionCard.propTypes = {
    topic: PropTypes.string.isRequired,
    subheader: PropTypes.string.isRequired,
    linkURL: PropTypes.string.isRequired,
    icon: PropTypes.elementType.isRequired,
    img: PropTypes.string.isRequired,
    imgAlt: PropTypes.string.isRequired,
};
