import NavigateBeforeIcon from '@mui/icons-material/NavigateBefore';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import { Box, Grid, IconButton, Stack, Typography } from '@mui/material';
import {
    addDays,
    addWeeks,
    format,
    isAfter,
    isBefore,
    isMonday,
    isSameDay,
    isWeekend,
    nextMonday,
    parseISO,
    previousMonday,
    subWeeks,
} from 'date-fns';
import PropTypes from 'prop-types';
import { useEffect, useReducer } from 'react';

const firstMondayOfValidWeek = (startDateObject) => {
    if (isMonday(startDateObject)) {
        return startDateObject;
    }
    if (isWeekend(startDateObject)) {
        return nextMonday(startDateObject);
    }
    return previousMonday(startDateObject);
};

function createDates(startDate, rows, unavailable, maxAvailable) {
    const startDateObject = new Date(startDate);
    const monday = firstMondayOfValidWeek(startDateObject);
    const weeks = [];
    for (let row = 0; row < rows; row += 1) {
        const week = [];
        for (let day = 0; day < 5; day += 1) {
            const date = addDays(monday, day + row * 7);
            const dateString = `${date.getDate()}.${date.getMonth() + 1}`;
            const unitsInUse = unavailable[format(date, 'dd.MM.yyyy')] ?? 0;
            week.push({ date, dateString, available: maxAvailable - unitsInUse });
        }
        weeks.push(week);
    }
    return weeks;
}

function createInitialState({ dateInfo, rows, unavailable, maxAvailable }) {
    return {
        rows,
        unavailable,
        maxAvailable,
        availableFrom: dateInfo.available_from,
        availableTo: dateInfo.available_to,
        dates: createDates(dateInfo.available_from, rows, unavailable, maxAvailable),
        isForwardDisabled: false,
        isBackwardDisabled: isBefore(
            firstMondayOfValidWeek(parseISO(dateInfo.available_from)),
            parseISO(dateInfo.available_from)
        ),
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
                    state.unavailable,
                    state.maxAvailable
                ),
                isForwardDisabled: !isBefore(
                    addWeeks(state.dates[0][0].date, state.rows * 2),
                    parseISO(state.availableTo)
                ),
                isBackwardDisabled: false,
            };
        }
        case 'navigate_backward': {
            return {
                ...state,
                dates: createDates(
                    subWeeks(state.dates[0][0].date, state.rows),
                    state.rows,
                    state.unavailable,
                    state.maxAvailable
                ),
                isForwardDisabled: false,
                isBackwardDisabled: isBefore(
                    subWeeks(state.dates[0][0].date, state.rows),
                    parseISO(state.availableFrom)
                ),
            };
        }
        case 'jump_to_date': {
            return {
                ...state,
                dates: createDates(action.date, state.rows, state.unavailable, state.maxAvailable),
                isForwardDisabled: !isBefore(
                    addWeeks(firstMondayOfValidWeek(action.date), state.rows),
                    parseISO(state.availableTo)
                ),
                isBackwardDisabled: isBefore(firstMondayOfValidWeek(action.date), parseISO(state.availableFrom)),
            };
        }
        case 'update_unavailable': {
            return {
                ...state,
                unavailable: action.unavailable,
                dates: createDates(state.dates[0][0].date, state.rows, action.unavailable, state.maxAvailable),
            };
        }
        default: {
            throw Error(`Unknown action: ${action.type}`);
        }
    }
}

export default function BikeAvailability({
    dateInfo,
    rows,
    unavailable,
    maxAvailable,
    selectedStartDate,
    selectedEndDate,
    amountSelected,
}) {
    const [state, dispatch] = useReducer(reducer, { dateInfo, rows, unavailable, maxAvailable }, createInitialState);

    useEffect(() => {
        dispatch({ type: 'update_unavailable', unavailable });
    }, [unavailable]);

    useEffect(() => {
        if (selectedStartDate) dispatch({ type: 'jump_to_date', date: selectedStartDate });
    }, [selectedStartDate]);

    return (
        <Box>
            <Typography align="center">Saatavuus</Typography>
            <Stack direction="row" justifyContent="space-between" alignItems="center">
                <IconButton
                    aria-label="takaisin"
                    onClick={() => dispatch({ type: 'navigate_backward' })}
                    disabled={state.isBackwardDisabled}
                >
                    <NavigateBeforeIcon />
                </IconButton>
                <Box mb={1}>
                    {state.dates.map((week) => (
                        <Grid container spacing={1} key={`week-${week[0].dateString}`}>
                            {week.map((day) => {
                                const isSelectedDate =
                                    (isAfter(day.date, selectedStartDate) && isBefore(day.date, selectedEndDate)) ||
                                    isSameDay(day.date, selectedStartDate) ||
                                    isSameDay(day.date, selectedEndDate);
                                const available = isSelectedDate ? day.available - amountSelected : day.available;
                                return (
                                    <Grid item key={day.dateString} width="50px" mt={1}>
                                        <Box
                                            borderRadius={1}
                                            sx={
                                                isSelectedDate ? { backgroundColor: 'primary.light', boxShadow: 1 } : {}
                                            }
                                        >
                                            <Typography variant="body2" align="center">
                                                {day.dateString}
                                            </Typography>

                                            {isBefore(day.date, parseISO(dateInfo.available_from)) ||
                                            isAfter(day.date, parseISO(dateInfo.available_to)) ? (
                                                <Box borderRadius={1} boxShadow={1} backgroundColor="text.secondary">
                                                    <Typography sx={{ color: 'white', fontSize: 14 }} align="center">
                                                        X
                                                    </Typography>
                                                </Box>
                                            ) : (
                                                <Box
                                                    borderRadius={1}
                                                    boxShadow={1}
                                                    sx={
                                                        available >= 1
                                                            ? {
                                                                  backgroundColor: 'green',
                                                              }
                                                            : {
                                                                  backgroundColor: 'red',
                                                              }
                                                    }
                                                >
                                                    <Typography sx={{ color: 'white', fontSize: 14 }} align="center">
                                                        {available}
                                                    </Typography>
                                                </Box>
                                            )}
                                        </Box>
                                    </Grid>
                                );
                            })}
                        </Grid>
                    ))}
                </Box>
                <IconButton
                    aria-label="eteenpäin"
                    onClick={() => dispatch({ type: 'navigate_forward' })}
                    disabled={state.isForwardDisabled}
                >
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
    unavailable: PropTypes.objectOf(PropTypes.number).isRequired,
    rows: PropTypes.number,
    selectedStartDate: PropTypes.instanceOf(Date),
    selectedEndDate: PropTypes.instanceOf(Date),
    amountSelected: PropTypes.number.isRequired,
};

BikeAvailability.defaultProps = {
    rows: 2,
    selectedStartDate: null,
    selectedEndDate: null,
};
