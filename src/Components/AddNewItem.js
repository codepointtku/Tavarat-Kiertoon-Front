import { useNavigate, generatePath } from 'react-router';
import { useLoaderData } from 'react-router-dom';
import PropTypes from 'prop-types';
import { TextField, Box, MenuItem, Button } from '@mui/material';

function AddNewItem({ item, setItem }) {
    const data = useLoaderData();
    const navigate = useNavigate();

    const handleChange = (key, event) => {
        setItem({ ...item, [key]: event.target.value });
    };

    return (
        <>
            <h1 align="center">ItemForm</h1>
            <Box
                align="center"
                component="form"
                sx={{
                    '& .MuiTextField-root': { m: 1, width: '25ch' },
                }}
                autoComplete="off"
            >
                <div>
                    <h5>
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
                    </h5>
                    <h5>
                        <TextField
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
                        <Button onClick={() => navigate(generatePath('/varasto/koodinlukija'), { state: { ...item } })}>
                            Koodinlukija
                        </Button>
                    </h5>
                    <h5>
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
                    </h5>
                    <h5>
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
                    </h5>
                </div>
            </Box>
        </>
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
};

export default AddNewItem;
