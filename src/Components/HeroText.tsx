import { Box, Stack, Typography } from '@mui/material';
import TypographyTitle from './TypographyTitle';

interface Props {
    title: string;
    subtitle?: string;
    text?: string;
    subtext?: string;
    subtext2?: string;
    footer?: JSX.Element | null;
}

function HeroText({ title, subtitle, text, subtext, subtext2, footer }: Props) {
    return (
        <Box id="hero-texts-wrapper" m="1rem 0 1rem 0">
            <TypographyTitle text={title} />

            <Stack id="hero-texts-stack" alignItems="center" mt="1rem">
                {subtitle && (
                    <Typography textAlign="center" variant="subtitle2">
                        {subtitle}
                    </Typography>
                )}

                {text && <Typography textAlign="center">{text}</Typography>}

                {subtext && (
                    <Typography textAlign="center" variant="body2" paragraph sx={{ mt: '1rem' }}>
                        {subtext}
                    </Typography>
                )}

                {subtext2 && (
                    <Typography textAlign="center" variant="body2" paragraph>
                        {subtext2}
                    </Typography>
                )}

                {footer}
            </Stack>
        </Box>
    );
}

export default HeroText;
