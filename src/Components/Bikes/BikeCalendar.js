import { TextField } from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { addDays, isWeekend, max, min, subDays } from 'date-fns';
import { fi } from 'date-fns/locale';
import PropTypes from 'prop-types';

export default function BikeCalendar({ onChange, onBlur, startDate, endDate, minDate, maxDate, isStartDate }) {
    const handleMinDate = () => {
        if (isStartDate) {
            return endDate ? max([minDate, subDays(endDate, 14)]) : minDate;
        }
        return startDate ? max([minDate, startDate]) : minDate;
    };

    const handleMaxDate = () => {
        if (isStartDate) {
            return endDate ? min([maxDate, endDate]) : maxDate;
        }
        return startDate ? min([maxDate, addDays(startDate, 14)]) : maxDate;
    };

    return (
        <LocalizationProvider dateAdapter={AdapterDateFns} adapterLocale={fi}>
            <DatePicker
                label={isStartDate ? 'Aloituspäivä *' : 'Loppumispäivä *'}
                value={isStartDate ? startDate : endDate}
                onChange={onChange}
                onBlur={onBlur}
                inputProps={{
                    placeholder: 'pv.kk.v',
                }}
                // eslint-disable-next-line react/jsx-props-no-spreading
                renderInput={(params) => <TextField {...params} />}
                disableMaskedInput
                shouldDisableDate={(day) => isWeekend(day)}
                minDate={handleMinDate()}
                maxDate={handleMaxDate()}
                sx={{ '& .Mui-disabled': { backgroundColor: 'black' } }}
                views={['month', 'day']}
                openTo="month"
            />
        </LocalizationProvider>
    );
}

BikeCalendar.propTypes = {
    minDate: PropTypes.instanceOf(Date).isRequired,
    maxDate: PropTypes.instanceOf(Date).isRequired,
    onBlur: PropTypes.func.isRequired,
    startDate: PropTypes.instanceOf(Date),
    endDate: PropTypes.instanceOf(Date),
    onChange: PropTypes.func.isRequired,
    isStartDate: PropTypes.bool,
};

BikeCalendar.defaultProps = {
    startDate: null,
    endDate: null,
    isStartDate: true,
};
