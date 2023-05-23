import { Typography } from '@mui/material';

interface Props {
    text: string;
}

function TypographyTitle({ text }: Props) {
    return (
        <Typography variant="h4" color="primary.main" textAlign="center">
            {text}
        </Typography>
    );
}

export default TypographyTitle;
