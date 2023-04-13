import { Typography } from '@mui/material';

interface Props {
    text: string;
}

function TypographyHeading({ text }: Props) {
    return (
        <Typography variant="h5" color="primary.main" gutterBottom>
            {text}
        </Typography>
    );
}

export default TypographyHeading;
