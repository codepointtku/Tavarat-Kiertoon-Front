import { useForm } from 'react-hook-form';
import { Form, useSubmit } from 'react-router-dom';
import {
    Container,
    Grid,
    Typography,
    FormControl,
    FormLabel,
    FormControlLabel,
    Checkbox,
    Box,
    FormGroup,
    Button,
} from '@mui/material';
import { SubmitHandler, FieldValues } from 'react-hook-form/dist/types';

interface SubmitData extends SubmitHandler<FieldValues> {
    admin: boolean;
    storage: boolean;
    bikestorage: boolean;
}

function AskForPermissions() {
    const { register, handleSubmit } = useForm();

    const onSubmit = (data: SubmitData) => {
        console.log(data);
    };
    return (
        <Container>
            <Typography
                variant="h5"
                color="primary.main"
                sx={{ p: 2, display: 'flex', flexDirection: 'column', alignItems: 'center' }}
            >
                Hae käyttöoikeuksia
            </Typography>
            <Box component={Form} onSubmit={handleSubmit(onSubmit as SubmitData)}>
                <Grid container sx={{ width: '50%' }} justifyContent="center">
                    <Grid item>
                        <FormControl component="fieldset">
                            <FormLabel>Käyttöoikeudet</FormLabel>
                            <FormGroup>
                                <FormControlLabel
                                    control={<Checkbox {...register('admin')} />}
                                    label="Admin"
                                ></FormControlLabel>
                                <FormControlLabel
                                    control={<Checkbox {...register('storage')} />}
                                    label="Varasto"
                                ></FormControlLabel>
                                <FormControlLabel
                                    control={<Checkbox {...register('bikestorage')} />}
                                    label="Pyörävarasto"
                                ></FormControlLabel>
                            </FormGroup>
                        </FormControl>
                    </Grid>
                </Grid>
                <Grid container sx={{ width: '50%' }}></Grid>
                <Grid container justifyContent="center">
                    <Button sx={{ width: 200, p: 2 }} type="submit">
                        Lähetä tiedot
                    </Button>
                </Grid>
            </Box>
        </Container>
    );
}

export default AskForPermissions;
