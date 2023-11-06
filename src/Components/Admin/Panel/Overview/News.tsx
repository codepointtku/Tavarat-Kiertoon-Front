import { Box, Typography, Stack } from '@mui/material';

function News() {
    return (
        <Box id="news">
            <Stack gap={2}>
                <Typography sx={{ color: '#000' }} variant="h6">
                    Uutiset
                </Typography>
                ei uutisia
            </Stack>
        </Box>
    );
}

export default News;
