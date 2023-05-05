import { Box, Stack, Typography } from '@mui/material';
import TypographyTitle from './TypographyTitle';

interface Props {
    title: string;
    subtitle?: string;
    text?: string;
}

function HeroText({ title, subtitle, text }: Props) {
    return (
        <Box id="hero-texts-wrapper" m="1rem 0 1rem 0">
            <TypographyTitle text={title} />
            <Stack alignItems="center" mt="1rem">
                <Typography textAlign="center" variant="subtitle2" gutterBottom>
                    {subtitle}
                </Typography>
                <Typography textAlign="center">{text}</Typography>
            </Stack>
        </Box>
    );
}

export default HeroText;
