import TextField from '@mui/material/TextField';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { fi } from 'date-fns/locale';
import PropTypes from 'prop-types';

export default function BasicDatePicker({ label, state, setState }) {
    return (
        <LocalizationProvider dateAdapter={AdapterDateFns} adapterLocale={fi}>
            <DatePicker
                label={label}
                value={state}
                onChange={(newValue) => setState(newValue)}
                // eslint-disable-next-line react/jsx-props-no-spreading
                renderInput={(params) => <TextField {...params} />}
                disableMaskedInput
            />
        </LocalizationProvider>
    );
}

BasicDatePicker.propTypes = {
    label: PropTypes.string.isRequired,
    state: PropTypes.instanceOf(Date),
    setState: PropTypes.func.isRequired,
};

BasicDatePicker.defaultProps = {
    state: null,
};
