import { useEffect, useState } from 'react';
import { useNavigate, generatePath } from 'react-router';
import { useLoaderData } from 'react-router-dom';
import PropTypes from 'prop-types';
import Barcode from 'react-barcode';
import { TextField, Box, MenuItem, Button, Card, CardActions, CardContent } from '@mui/material';
import validator from 'validator';
import axios from 'axios';

function AddNewItem({ item, setItem, uploadFile }) {
    const data = useLoaderData();
    if (!data) {
        return <>Esinetietojen lataus ei toimi.</>;
    }
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
            validator.isLength(String(item.free_description), { min: 5 })
        ) {
            setValidProduct(true);
        } else {
            setValidProduct(false);
        }
    });

    const productCall = async () => {
        const testItem = {
            ...item,
            available: true,
            price: 999.0,
            shelf_id: 1,
            measurements: 'wrdrqwf',
            weight: 3.0,
            category: 1,
            storages: null,
            color: 1,
            pictures: [1],
        };
        const response = await axios.post('http://localhost:8000/products/', testItem);
        console.log(response.data);
    };

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
                            onClick={() =>
                                navigate(generatePath('/varasto/koodinlukija'), {
                                    state: { ...item, returnpath: '/varasto/luo' },
                                })
                            }
                        >
                            Koodinlukija
                        </Button>
                        {item.barcode.length > 0 && <Barcode value={item.barcode} format="CODE128" />}
                    </CardActions>

                    <TextField
                        required
                        id="outlined-select"
                        select
                        label="Sijainti"
                        onChange={(event) => {
                            handleChange('location', event);
                        }}
                        defaultValue=""
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
                        defaultValue=""
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
                            handleChange('free_description', event);
                        }}
                        multiline
                        inputProps={{ maxLength: 1000 }}
                        helperText={`${item.free_description.length}/1000`}
                        defaultValue={item.free_description}
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
                            <Button
                                size="large"
                                onClick={() => {
                                    productCall();
                                }}
                            >
                                Lisää tuote
                            </Button>
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
        free_description: PropTypes.string,
        isOld: PropTypes.bool,
    }).isRequired,
    setItem: PropTypes.func.isRequired,
    uploadFile: PropTypes.func.isRequired,
};

export default AddNewItem;
