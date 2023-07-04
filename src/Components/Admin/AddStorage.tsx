import { Box, Button, Card, CardActions, CardContent, MenuItem, TextField } from '@mui/material';
import { useState } from 'react';
import { useActionData, useSubmit } from 'react-router-dom';
import validator from 'validator';
import type { storageCreateAction } from '../../Router/actions';
import AlertBox from '../AlertBox';

function AddStorage() {
    const initialState = { name: '', address: '', in_use: 'ei käytössä' };
    const [storage, setStorage] = useState(initialState);
    const submit = useSubmit();
    const responseStatus = useActionData() as Awaited<ReturnType<typeof storageCreateAction>>;

    const handleChange = (key: string, event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setStorage({ ...storage, [key]: event.target.value });
    };

    const choices = ['käytössä', 'ei käytössä'];

    const validStorage =
        validator.isLength(String(storage.name), { min: 3, max: 255 }) &&
        validator.isLength(String(storage.address), { min: 3, max: 255 });
    return (
        <Box id="laatikko">
            {responseStatus?.type === 'post' && !responseStatus?.status && (
                <AlertBox text="Varaston luominen epäonnistui! Lataa sivu uudestaan." status="error" />
            )}

            {responseStatus?.type === 'post' && responseStatus?.status && (
                <AlertBox text="Varasto luotu" status="success" />
            )}

            <Card sx={{ maxWidth: '60vw' }}>
                <h2 style={{ textDecoration: 'underline' }}>Uusi varasto</h2>
                <Box
                    component="form"
                    sx={{
                        '& .MuiTextField-root': { m: 1, width: '40ch' },
                    }}
                    autoComplete="off"
                >
                    <CardContent>
                        <TextField
                            required
                            multiline
                            label="Varaston nimi"
                            onChange={(event) => {
                                handleChange('name', event);
                            }}
                            defaultValue={storage.name}
                            inputProps={{ maxLength: 255 }}
                            helperText={`${storage.name.length}/255`}
                        />
                        <TextField
                            required
                            multiline
                            label="Varaston osoite"
                            onChange={(event) => {
                                handleChange('address', event);
                            }}
                            defaultValue={storage.address}
                            inputProps={{ maxLength: 255 }}
                            helperText={`${storage.address.length}/255`}
                        />
                        <TextField
                            required
                            select
                            label="Käyttötila"
                            onChange={(event) => {
                                handleChange('in_use', event);
                            }}
                            defaultValue=""
                            value={storage.in_use}
                        >
                            {choices.map((choice) => (
                                <MenuItem key={choice} value={choice}>
                                    {choice}
                                </MenuItem>
                            ))}
                        </TextField>

                        <CardActions>
                            {validStorage ? (
                                <Button
                                    size="large"
                                    onClick={() => {
                                        submit({ type: 'post', ...storage }, { method: 'post' });
                                    }}
                                >
                                    Luo varasto
                                </Button>
                            ) : (
                                <Button disabled>Luo varasto</Button>
                            )}
                        </CardActions>
                    </CardContent>
                </Box>
            </Card>
        </Box>
    );
}

export default AddStorage;
