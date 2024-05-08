/* eslint-disable react/jsx-props-no-spreading */
import ClearIcon from '@mui/icons-material/Clear';
import { Box, IconButton, TextField } from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { addDays, isWeekend, max, min, subDays } from 'date-fns';
import Holidays from 'date-holidays';
import { fi } from 'date-fns/locale';
import PropTypes from 'prop-types';

export default function BikeCalendar({
    onChange,
    onBlur,
    startDate,
    endDate,
    minDate,
    maxDate,
    isStartDate,
    setCalendarError,
}) {
    const hd = new Holidays('FI');
    const holidaysCurrentYear = hd.getHolidays();
    const holidaysNextYear = hd.getHolidays(new Date().getFullYear() + 1);

    const handleMinDate = () => {
        if (isStartDate) {
            return endDate ? max([minDate, subDays(endDate, 13)]) : minDate;
        }
        return startDate ? max([minDate, startDate]) : minDate;
    };

    const handleMaxDate = () => {
        if (isStartDate) {
            return endDate ? min([maxDate, endDate]) : maxDate;
        }
        return startDate ? min([maxDate, addDays(startDate, 13)]) : maxDate;
    };

    function disableDate(day) {
        // Check for dates that should be disabled in the calendar.
        // Checking holidays of current year and next year(for rarer scenarios), and weekend dates

        const dateIsHoliday =
            holidaysCurrentYear.some((holiday) => String(holiday.start) === String(day)) ||
            holidaysNextYear.some((holiday) => String(holiday.start) === String(day));
        if (isWeekend(day) === true) {
            return true;
        } else if (dateIsHoliday === true) {
            return true;
        } else {
            return false;
        }
    }

    return (
        <LocalizationProvider dateAdapter={AdapterDateFns} adapterLocale={fi}>
            <DatePicker
                label={
                    isStartDate ? 'Aloituspäivä valitse pvm kalenterista*' : 'Loppumispäivä valitse pvm kalenterista*'
                }
                value={isStartDate ? startDate : endDate}
                onChange={onChange}
                onBlur={onBlur}
                inputProps={{ placeholder: 'pv.kk.v', readOnly: true }}
                renderInput={(params) => (
                    <Box sx={{ position: 'relative', display: 'inline-block', width: 'max-content' }}>
                        <TextField {...params} />
                        <IconButton
                            style={{ position: 'absolute', top: '.5rem', margin: 'auto', right: '30px' }}
                            onClick={() => onChange(null)}
                        >
                            <ClearIcon />
                        </IconButton>
                    </Box>
                )}
                onError={(newError) => setCalendarError(newError)}
                disableMaskedInput
                shouldDisableDate={(day) => disableDate(day)}
                minDate={handleMinDate()}
                maxDate={handleMaxDate()}
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
