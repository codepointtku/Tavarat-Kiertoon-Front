import { Avatar, Card, CardActionArea, CardContent, CardHeader, CardMedia, Typography } from '@mui/material';
import ChatBubbleOutlineIcon from '@mui/icons-material/ChatBubbleOutline';

import PropTypes from 'prop-types';

//

function InstructionCard({ topic, subheader, img, imgAlt, contentheader }) {
    return (
        <Card sx={{ maxWidth: 345 }}>
            <CardHeader
                avatar={
                    <Avatar sx={{ bgcolor: 'secondary.main' }} aria-label="hi_dad">
                        <ChatBubbleOutlineIcon />
                    </Avatar>
                }
                title={topic}
                subheader={subheader}
            />
            <CardActionArea>
                <CardMedia component="img" height="200" image={img} alt={imgAlt} />
                <CardContent>
                    <Typography variant="body2" color="text.secondary">
                        {contentheader}
                    </Typography>
                </CardContent>
            </CardActionArea>
        </Card>
    );
}

export default InstructionCard;

InstructionCard.propTypes = {
    topic: PropTypes.string.isRequired,
    subheader: PropTypes.string.isRequired,
    img: PropTypes.string.isRequired,
    imgAlt: PropTypes.string.isRequired,
    contentheader: PropTypes.string.isRequired,
};
