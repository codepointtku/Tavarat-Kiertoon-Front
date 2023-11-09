import { Box, Typography, Stack } from '@mui/material';

function News() {
    const now = new Date().toString();
    return (
        <Box id="news">
            <Stack gap={2}>
                <Typography sx={{ color: '#000' }} variant="h6">
                    Uutiset
                </Typography>
                <Typography>Moro! Tänään on {now}</Typography>
            </Stack>
        </Box>
    );
}

export default News;
