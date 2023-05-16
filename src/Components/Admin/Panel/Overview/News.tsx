import * as React from 'react';

import { Box, List, ListItem, ListItemIcon, ListItemText, Grid, Typography, Stack, Divider } from '@mui/material';

import MailIcon from '@mui/icons-material/Mail';
import FolderIcon from '@mui/icons-material/Folder';

// interface NewsListItems {
//     maara: number;
//     teksti: string;
//     ikoni: React.ReactElement;
// }

const listaItemit = [
    {
        maara: 1,
        teksti: 'Sinulle on 100 uutta viestiä',
        tyyppi: 'mail',
        ikoni: MailIcon,
    },
    {
        maara: 1,
        teksti: 'Varastossa 3000 uutta tuotetta',
        tyyppi: 'varasto',
        ikoni: FolderIcon,
    },
    {
        maara: 1,
        teksti: 'Lounasravintolassa tänään kanaviilokkia',
        tyyppi: 'ruoka',
        ikoni: FolderIcon,
    },
    {
        maara: 1,
        teksti: 'Bensanhinta Essolla 9mk/l',
        tyyppi: 'muu',
        ikoni: FolderIcon,
    },
];

const newsTopics = listaItemit.map((topic, index) => (
    <Box key={index} sx={{ color: '#000', padding: '1rem 0 0 1rem' }}>
        <Stack direction="row" spacing={2} marginBottom="0.4rem">
            <FolderIcon />
            <Typography>{topic.teksti}</Typography>
        </Stack>
        <Divider />
    </Box>
));

function News() {
    return (
        <Box id="admin-news" sx={{ width: '30rem' }}>
            <Stack>
                <Typography sx={{ color: '#000' }} variant="h6" component="div">
                    Uutiset
                </Typography>
                {newsTopics}
            </Stack>
        </Box>
    );
}

export default News;
