import NavigateBeforeIcon from '@mui/icons-material/NavigateBefore';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import { Box, Grid, IconButton, Paper, Stack, Typography } from '@mui/material';
import { addDays, addWeeks, isAfter, isBefore, isMonday, parseISO, previousMonday, subWeeks } from 'date-fns';
import PropTypes from 'prop-types';
import { useReducer } from 'react';

function createDates(availableFrom, rows, taken, maxAvailable) {
    const availableFromDateObject = new Date(availableFrom);
    const startDateObject = isMonday(availableFromDateObject)
        ? availableFromDateObject
        : previousMonday(availableFromDateObject);
    const weeks = [];
    for (let row = 0; row < rows; row += 1) {
        const week = [];
        for (let day = 0; day < 5; day += 1) {
            const date = addDays(startDateObject, day + row * 7);
            const dateString = `${date.getDate()}.${date.getMonth() + 1}`;
            // week.push({ date, dateString, available: taken[dateString] ?? maxAvailable });
            week.push({ date, dateString, available: maxAvailable });
        }
        weeks.push(week);
    }
    return weeks;
}

function createInitialState({ dateInfo, rows, taken, maxAvailable }) {
    return {
        rows,
        taken: dateInfo.taken,
        maxAvailable,
        availableFrom: dateInfo.available_from,
        availableTo: dateInfo.available_to,
        dates: createDates(dateInfo.available_from, rows, taken, maxAvailable), // [[week],[week]] and week is day[] and day is {date, dateString, available} f.e. {dateObject, 13.2, 4}
        // TODO: Add these?
        // selectedStartDate: state.selectedStartDate,
        // selectedEndDate: state.selectedEndDate,
    };
}

function reducer(state, action) {
    switch (action.type) {
        case 'navigate_forward': {
            return {
                ...state,
                dates: createDates(
                    addWeeks(state.dates[0][0].date, state.rows),
                    state.rows,
                    state.taken,
                    state.maxAvailable
                ),
            };
        }
        case 'navigate_back': {
            return {
                ...state,
                dates: createDates(
                    subWeeks(state.dates[0][0].date, state.rows),
                    state.rows,
                    state.taken,
                    state.maxAvailable
                ),
            };
        }
        default: {
            throw Error(`Unknown action: ${action.type}`);
        }
    }
}

export default function BikeAvailability({ dateInfo, rows, taken, maxAvailable }) {
    const [state, dispatch] = useReducer(reducer, { dateInfo, rows, taken, maxAvailable }, createInitialState);

    return (
        <Box>
            <Typography my={1} align="center">
                Saatavuus
            </Typography>
            <Stack direction="row" justifyContent="space-between" alignItems="center">
                <IconButton aria-label="takaisin" onClick={() => dispatch({ type: 'navigate_back' })}>
                    <NavigateBeforeIcon />
                </IconButton>
                <Box mb={1}>
                    {state.dates.map((week) => (
                        <Grid container spacing={1} key={`week-${week[0].dateString}`}>
                            {week.map((day) => (
                                <Grid item key={day.dateString} width="50px">
                                    <Typography variant="body2" align="center">
                                        {day.dateString}
                                    </Typography>
                                    {isBefore(day.date, parseISO(dateInfo.available_from)) ||
                                    isAfter(day.date, parseISO(dateInfo.available_to)) ? (
                                        <Paper
                                            elevation={3}
                                            sx={{
                                                backgroundColor: 'grey',
                                            }}
                                        >
                                            <Typography sx={{ color: 'white', fontSize: 14 }} align="center">
                                                X
                                            </Typography>
                                        </Paper>
                                    ) : (
                                        <Paper
                                            elevation={3}
                                            sx={
                                                day.available
                                                    ? {
                                                          //   width: '20px',
                                                          //   height: '20px',
                                                          backgroundColor: 'green',
                                                      }
                                                    : {
                                                          //   width: '20px',
                                                          //   height: '20px',
                                                          backgroundColor: 'red',
                                                      }
                                            }
                                        >
                                            <Typography sx={{ color: 'white', fontSize: 14 }} align="center">
                                                {day.available}
                                            </Typography>
                                        </Paper>
                                    )}
                                </Grid>
                            ))}
                        </Grid>
                    ))}
                </Box>
                <IconButton aria-label="eteenpäin" onClick={() => dispatch({ type: 'navigate_forward' })}>
                    <NavigateNextIcon />
                </IconButton>
            </Stack>
        </Box>
    );
}

BikeAvailability.propTypes = {
    dateInfo: PropTypes.shape({
        today: PropTypes.string,
        available_from: PropTypes.string,
        available_to: PropTypes.string,
        monday: PropTypes.string,
    }).isRequired,
    maxAvailable: PropTypes.number.isRequired,
    taken: PropTypes.objectOf(PropTypes.number).isRequired,
    rows: PropTypes.number,
};

BikeAvailability.defaultProps = {
    rows: 2,
};
