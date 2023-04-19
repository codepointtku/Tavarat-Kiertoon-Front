import { Box } from '@mui/material';

function PanelHeader() {
    return (
        <Box id="admin-panel-header" sx={{ border: '1px solid grey' }}>
            <Box
                id="header-items-wrapper"
                sx={{
                    border: '1px solid pink',
                    display: 'flex',
                    flexDirection: 'row',
                    justifyContent: 'space-evenly',
                }}
            >
                <p>asd</p>
                <p>asd</p>
                <p>asd</p>
                <p>asd</p>
                <p>asd</p>
                <p>asd</p>
                <p>asd</p>
                <p>asd</p>
            </Box>
        </Box>
    );
}

export default PanelHeader;
