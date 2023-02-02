import { useEffect, useState } from 'react';
import { useNavigate, generatePath } from 'react-router';
import { useLoaderData } from 'react-router-dom';
import PropTypes from 'prop-types';
import Barcode from 'react-barcode';
import { TextField, Box, MenuItem, Button, Card, CardActions, CardContent } from '@mui/material';
import validator from 'validator';

function AddNewItem({ item, setItem, uploadFile }) {
    const data = useLoaderData();
    const navigate = useNavigate();

    const handleChange = (key, event) => {
        setItem({ ...item, [key]: event.target.value });
    };

    const [validProduct, setValidProduct] = useState(false);

    useEffect(() => {
        if (
            validator.isLength(String(item.name), { min: 3, max: 255 }) &&
            validator.isLength(String(item.barcode), { min: 1 }) &&
            validator.isLength(String(item.location), { min: 1 }) &&
            validator.isLength(String(item.category), { min: 1 }) &&
            validator.isLength(String(item.info), { min: 5 })
        ) {
            setValidProduct(true);
        } else {
            setValidProduct(false);
        }
    });

    return (
        <Card sx={{ maxWidth: '60vw' }}>
            <h2 align="center" style={{ textDecoration: 'underline' }}>
                Uusi tuote
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
                        id="outlined-required"
                        label="Nimi"
                        onChange={(event) => {
                            handleChange('name', event);
                        }}
                        multiline
                        inputProps={{ maxLength: 255 }}
                        helperText={`${item.name.length}/255`}
                        defaultValue={item.name}
                    />
                    <TextField
                        required
                        disabled
                        id="outlined-disabled"
                        label="Viivakoodi"
                        onChange={(event) => {
                            handleChange('barcode', event);
                        }}
                        defaultValue={item.barcode}
                    >
                        {item.barcode}
                    </TextField>
                    <CardActions>
                        <Button
                            size="large"
                            onClick={() => navigate(generatePath('/varasto/koodinlukija'), { state: { ...item } })}
                        >
                            Koodinlukija
                        </Button>
                        {item.barcode.length > 0 && <Barcode value={item.barcode} />}
                    </CardActions>

                    <TextField
                        required
                        id="outlined-select"
                        select
                        label="Sijainti"
                        onChange={(event) => {
                            handleChange('location', event);
                        }}
                    >
                        {data[1].map((location) => (
                            <MenuItem key={location.id} value={location.name}>
                                {location.name}
                            </MenuItem>
                        ))}
                    </TextField>
                    <TextField
                        required
                        id="outlined-select"
                        select
                        label="Kategoria"
                        onChange={(event) => {
                            handleChange('category', event);
                        }}
                    >
                        {data[0].map((category) => (
                            <MenuItem key={category.id} value={category.name}>
                                {category.name}
                            </MenuItem>
                        ))}
                    </TextField>
                    <TextField
                        id="filled-helperText"
                        label="Vapaa Kuvaus"
                        onChange={(event) => {
                            handleChange('info', event);
                        }}
                        multiline
                        inputProps={{ maxLength: 1000 }}
                        helperText={`${item.info.length}/1000`}
                        defaultValue={item.info}
                    />
                    <CardActions>
                        <Button variant="contained" component="label" size="large">
                            Lisää kuvat
                            <input
                                onChange={(event) => {
                                    uploadFile(event.target.files);
                                }}
                                hidden
                                accept="image/*"
                                multiple
                                type="file"
                            />
                        </Button>
                    </CardActions>
                    <CardActions>
                        {validProduct ? (
                            <Button size="large">Lisää tuote</Button>
                        ) : (
                            <Button disabled>Lisää tuote</Button>
                        )}
                    </CardActions>
                </CardContent>
            </Box>
        </Card>
    );
}

AddNewItem.propTypes = {
    item: PropTypes.shape({
        id: PropTypes.number,
        barcode: PropTypes.string,
        name: PropTypes.string,
        category: PropTypes.string,
        location: PropTypes.string,
        info: PropTypes.string,
        isOld: PropTypes.bool,
    }).isRequired,
    setItem: PropTypes.func.isRequired,
    uploadFile: PropTypes.func.isRequired,
};

export default AddNewItem;
