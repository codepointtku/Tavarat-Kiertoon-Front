import { useState } from 'react';
import { useNavigate, generatePath, useLocation } from 'react-router';
import PropTypes from 'prop-types';
import { Button, TextField, Box } from '@mui/material';

function AddExistingItem({ item, setTab }) {
    const navigate = useNavigate();
    const location = useLocation();
    const [barCode, setBarCode] = useState(false);
    const [itemId, setItemId] = useState(false);

    return (
        <>
            <h3>Lisää Esine viivakoodin lukemisen perusteella</h3>
            <Button
                onClick={() =>
                    navigate(generatePath('/varasto/koodinlukija'), {
                        state: { ...item, oldItem: true, returnpath: '/varasto/tuotteet/luo' },
                    })
                }
            >
                Lue Viivakoodi
            </Button>
            <h3>Lisää esine kirjoitetun viivakoodin tai TuoteID:n perusteella</h3>
            <Box
                component="form"
                sx={{
                    '& > :not(style)': { m: 1, width: '25ch' },
                }}
                noValidate
                autoComplete="off"
            >
                <TextField
                    id="outlined-basic"
                    label="TuoteID"
                    variant="outlined"
                    onChange={(event) => {
                        setItemId(event.target.value);
                    }}
                />
                <TextField
                    id="outlined-basic"
                    label="Viivakoodi"
                    variant="outlined"
                    onChange={(event) => {
                        setBarCode(event.target.value);
                    }}
                />
            </Box>
            <Button
                onClick={() => {
                    setTab(1);
                    navigate(generatePath('/varasto/tuotteet/luo'), {
                        replace: true,
                        state: { ...location.state, barcode: barCode, id: itemId, oldItem: true },
                    });
                }}
            >
                Lisää Esine
            </Button>
        </>
    );
}

AddExistingItem.propTypes = {
    item: PropTypes.shape({
        id: PropTypes.number,
        barcode: PropTypes.string,
        name: PropTypes.string,
        category: PropTypes.string,
        location: PropTypes.string,
        info: PropTypes.string,
        isOld: PropTypes.bool,
    }).isRequired,
    setTab: PropTypes.func.isRequired,
};

export default AddExistingItem;
