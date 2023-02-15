import { Avatar, Card, CardActionArea, CardHeader, CardMedia } from '@mui/material';

import PropTypes from 'prop-types';

function InstructionCard({ icon: Icon, topic, subheader, img, imgAlt }) {
    return (
        <Card sx={{ maxWidth: 300 }}>
            <CardActionArea>
                <CardHeader
                    avatar={
                        <Avatar aria-label="icon" sx={{ bgcolor: 'secondary.main' }}>
                            <Icon />
                        </Avatar>
                    }
                    title={topic}
                    titleTypographyProps={{ variant: 'h5' }}
                    subheader={subheader}
                    subheaderTypographyProps={{ variant: 'body1' }}
                />
                <CardMedia component="img" height="200" image={img} alt={imgAlt} />
            </CardActionArea>
        </Card>
    );
}

export default InstructionCard;

InstructionCard.propTypes = {
    icon: PropTypes.node.isRequired,
    topic: PropTypes.string.isRequired,
    subheader: PropTypes.string.isRequired,
    img: PropTypes.string.isRequired,
    imgAlt: PropTypes.string.isRequired,
};
