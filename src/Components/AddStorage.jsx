import { useState, useEffect } from 'react';
import { useSubmit, useActionData } from 'react-router-dom';
import { Box, Button, Card, CardActions, CardContent, MenuItem, TextField } from '@mui/material';
import validator from 'validator';
import AlertBox from './AlertBox';

function AddStorage() {
    const initialState = { name: '', address: '', in_use: false };
    const [storage, setStorage] = useState(initialState);
    const [validStorage, setValidStorage] = useState(false);
    const submit = useSubmit();
    const responseStatus = useActionData();

    const handleChange = (key, event) => {
        if (key === 'in_use') {
            if (event.target.value === 'käytössä') {
                setStorage({ ...storage, [key]: true });
            } else {
                setStorage({ ...storage, [key]: false });
            }
        } else {
            setStorage({ ...storage, [key]: event.target.value });
        }
    };

    const choices = ['käytössä', 'ei käytössä'];

    useEffect(() => {
        if (
            validator.isLength(String(storage.name), { min: 3, max: 255 }) &&
            validator.isLength(String(storage.address), { min: 3, max: 255 })
        ) {
            setValidStorage(true);
        } else {
            setValidStorage(false);
        }
    });

    return (
        <Box sx={{ padding: '24px' }}>
            {responseStatus?.type === 'post' && !responseStatus?.status && (
                <>
                    <AlertBox text="Varaston luominen epäonnistui! Lataa sivu uudestaan." status="error" />
                    <br />
                </>
            )}
            {responseStatus?.type === 'post' && responseStatus?.status && (
                <>
                    <AlertBox text="Varaston luominen onnistui" status="success" />
                    <br />
                </>
            )}
            <Card sx={{ maxWidth: '60vw' }}>
                <h2 align="center" style={{ textDecoration: 'underline' }}>
                    Uusi varasto
                </h2>
                <Box
                    align="center"
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
                            value={storage.in_use ? 'käytössä' : 'ei käytössä'}
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
