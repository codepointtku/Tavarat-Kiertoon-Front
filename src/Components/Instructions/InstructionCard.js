import { Avatar, Card, CardActionArea, CardHeader, CardMedia } from '@mui/material';
import ChatBubbleOutlineIcon from '@mui/icons-material/ChatBubbleOutline';

import PropTypes from 'prop-types';

//

function InstructionCard({ topic, subheader, img, imgAlt }) {
    return (
        <Card sx={{ maxWidth: 300 }}>
            <CardActionArea>
                <CardHeader
                    avatar={
                        <Avatar aria-label="icon" sx={{ bgcolor: 'secondary.main' }}>
                            <ChatBubbleOutlineIcon />
                        </Avatar>
                    }
                    title={topic}
                    titleTypographyProps={{ variant: 'h5' }}
                    subheader={subheader}
                    subheaderTypographyProps={{ variant: 'body1' }}
                />
                <CardMedia component="img" height="200" image={img} alt={imgAlt} />
                {/* <CardContent>
                    <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                        <Typography variant="body2" color="text.secondary">
                            {contentheader}
                        </Typography>
                    </Box>
                </CardContent> */}
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
    // contentheader: PropTypes.string.isRequired,
};
