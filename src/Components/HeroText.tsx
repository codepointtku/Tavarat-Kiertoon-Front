import { Box, Stack, Typography } from '@mui/material';
import TypographyTitle from './TypographyTitle';

interface Props {
    title: string;
    subtitle?: string;
    secondaryText?: string;
}

function HeroText({ title, subtitle, secondaryText }: Props) {
    return (
        <Box id="hero-texts-wrapper" p="1rem">
            <TypographyTitle text={title} />
            <Stack alignItems="center" mt="1rem">
                <Typography textAlign="center" variant="subtitle2" gutterBottom>
                    {subtitle}
                </Typography>
                <Typography textAlign="center" variant="body2">
                    {secondaryText}
                </Typography>
            </Stack>
        </Box>
    );
}

export default HeroText;
