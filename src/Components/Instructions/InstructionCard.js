import { Avatar, Card, CardActionArea, CardHeader, CardMedia } from '@mui/material';

// import ChatIcon from '@mui/icons-material/Chat';
// import EmojiPeopleIcon from '@mui/icons-material/EmojiPeople';
// import ShoppingCartCheckoutIcon from '@mui/icons-material/ShoppingCartCheckout';
// import LocalShippingIcon from '@mui/icons-material/LocalShipping';
// import DirectionsBikeIcon from '@mui/icons-material/DirectionsBike';

import PropTypes from 'prop-types';

//

function InstructionCard({ icon, topic, subheader, img, imgAlt }) {
    return (
        <Card sx={{ maxWidth: 300 }}>
            <CardActionArea>
                <CardHeader
                    avatar={
                        <Avatar aria-label="icon" sx={{ bgcolor: 'secondary.main' }}>
                            {icon}
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
    icon: PropTypes.string.isRequired,
    topic: PropTypes.string.isRequired,
    subheader: PropTypes.string.isRequired,
    img: PropTypes.string.isRequired,
    imgAlt: PropTypes.string.isRequired,
};
