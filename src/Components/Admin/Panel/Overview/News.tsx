import * as React from 'react';

import { Box, List, ListItem, ListItemIcon, ListItemText, Grid, Typography } from '@mui/material';
import FolderIcon from '@mui/icons-material/Folder';

function generate(element: React.ReactElement) {
    return [0, 1, 2].map((value) =>
        React.cloneElement(element, {
            key: value,
        })
    );
}

function News() {
    return (
        <Box id="admin-news" sx={{ border: '1px solid green', padding: '1rem' }}>
            <Box sx={{ flexGrow: 1, maxWidth: 752 }}>
                <Grid container spacing={2}>
                    <Grid item xs={12} md={6}>
                        <Typography sx={{ mt: 1, mb: 1 }} variant="h6" component="div">
                            Uutizet
                        </Typography>

                        <List dense>
                            {generate(
                                <ListItem>
                                    <ListItemIcon>
                                        <FolderIcon />
                                    </ListItemIcon>
                                    <ListItemText primary="Single-line item" />
                                </ListItem>
                            )}
                        </List>
                    </Grid>
                </Grid>
            </Box>
        </Box>
    );
}

export default News;
