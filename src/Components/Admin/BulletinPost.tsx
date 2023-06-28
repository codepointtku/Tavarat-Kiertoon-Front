import { useSubmit, useNavigate, Form } from 'react-router-dom';
import { useForm } from 'react-hook-form';

import { Box, Paper, Typography, Grid, Button, Stack } from '@mui/material';

import TypographyHeading from '../TypographyHeading';

interface Props {
    title: string;
    date: string[];
    content: string;
    id: string;
}

function BulletinPost({ title, date, content, id }: Props) {
    const submit = useSubmit();
    const { handleSubmit } = useForm();
    const navigate = useNavigate();

    const handleBulletinDel = () => {
        submit({ id }, { method: 'delete', action: '/admin/tiedotteet/' });
    };

    return (
        <Paper id="bulletin-card-paper-backdrop" elevation={6} sx={{ mb: '2rem', p: '2rem' }}>
            <Grid container justifyContent="space-between">
                <Grid item>
                    <TypographyHeading text={title} />
                </Grid>
                <Grid item>
                    <Stack direction="row">
                        <Button
                            sx={{ mr: 1 }}
                            onClick={() => navigate(`${id}/muokkaa`, { state: { id, title, content } })}
                        >
                            Muokkaa
                        </Button>
                        <Box component={Form} onSubmit={handleSubmit(handleBulletinDel)}>
                            <Button color="error" type="submit">
                                Poista
                            </Button>
                        </Box>
                    </Stack>
                </Grid>
            </Grid>
            <Typography variant="caption" sx={{ color: 'text.hintContrast', mt: '0.5rem' }}>
                {date[0]} {date[1]}
            </Typography>
            <Box id="bulletin-content-text-indent-container" sx={{ m: '1rem 2rem 1rem 2rem' }}>
                <Typography id="bulletin-content-text-typography" variant="body1" sx={{ wordWrap: 'break-word' }}>
                    {content}
                </Typography>
            </Box>
            <Typography variant="caption" sx={{ fontStyle: 'italic' }}>
                ID: {id}
            </Typography>
        </Paper>
    );
}

export default BulletinPost;
