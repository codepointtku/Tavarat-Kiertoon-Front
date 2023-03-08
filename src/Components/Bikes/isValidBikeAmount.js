import { addDays, differenceInCalendarDays, format } from 'date-fns';

export default function isValidBikeAmount(startDate, endDate, selectedBikes, bikes) {
    const selectedBikesKeys = Object.keys(selectedBikes);
    if (startDate && endDate && selectedBikesKeys.length) {
        const filteredBikes = bikes.filter((bike) => selectedBikesKeys.includes(String(bike.id)));
        const dates = [];
        const days = differenceInCalendarDays(endDate, startDate);
        for (let i = 0; i <= days; i += 1) dates.push(format(addDays(startDate, i), 'dd.MM.yyyy'));
        return filteredBikes.every((bike) =>
            dates.every((date) => {
                const unitsInUse = bike.unavailable[date] ?? 0;
                return bike.max_available - unitsInUse - selectedBikes[bike.id] >= 0;
            })
        );
    }
    return true;
}
