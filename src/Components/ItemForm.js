import { useNavigate, useLoaderData } from 'react-router';
import { TextField, Box, MenuItem } from '@mui/material';

function ItemForm() {
    const navigate = useNavigate();
    const categories = useLoaderData();

    return (
        <>
            <h1 align="center">ItemForm</h1>
            <Box
                align="center"
                component="form"
                sx={{
                    '& .MuiTextField-root': { m: 1, width: '25ch' },
                }}
                noValidate
                autoComplete="off"
            >
                <div>
                    <h5>
                        <TextField required id="outlined-required" label="Nimi" />
                    </h5>
                    <h5>
                        <TextField disabled id="outlined-disabled" label="Viivakoodi" />
                    </h5>
                    <h5>
                        <TextField required id="outlined-select" select label="Kategoria">
                            {categories.map((category) => (
                                <MenuItem key={category.id} value={category.name}>
                                    {category.name}
                                </MenuItem>
                            ))}
                        </TextField>
                    </h5>
                    <h5>
                        <TextField required id="outlined-required" label="Sijainti" />
                    </h5>
                    <h5>
                        <TextField id="filled-helperText" label="Vapaa Kuvaus" />
                    </h5>
                </div>
            </Box>
            <button type="button" onClick={() => navigate('/koodinlukija')}>
                Koodinlukija
            </button>
        </>
    );
}

export default ItemForm;
