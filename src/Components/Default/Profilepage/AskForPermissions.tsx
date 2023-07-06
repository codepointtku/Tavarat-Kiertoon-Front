import { useForm } from 'react-hook-form';
import { Form, useSubmit } from 'react-router-dom';
import {
    Container,
    Grid,
    Typography,
    FormControl,
    FormLabel,
    RadioGroup,
    FormControlLabel,
    Radio,
    Box,
} from '@mui/material';

function AskForPermissions() {
    const { register, handleSubmit } = useForm();

    const onSubmit = () => {
        console.log('data goes here');
    };
    return (
        <Container sx={{ border: '1px solid red' }}>
            <Typography
                variant="h5"
                color="primary.main"
                sx={{ p: 2, display: 'flex', flexDirection: 'column', alignItems: 'center' }}
            >
                Hae käyttöoikeuksia
            </Typography>
            <Box component={Form} onSubmit={handleSubmit(onSubmit)}>
                <Grid container sx={{ width: '50%' }}></Grid>
                <Grid container sx={{ width: '50%' }}></Grid>
            </Box>
        </Container>
    );
}

export default AskForPermissions;
