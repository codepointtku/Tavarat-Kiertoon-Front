import { addDays, differenceInCalendarDays, format, isAfter, isBefore, parseISO } from 'date-fns';

/**
 * Interfaces
 */
// bikePackage
interface bikePackageInterface {
    bikes: { amount: number; bike: number }[];
    brand: string | null;
    color: string | null;
    description: string;
    id: number;
    max_available: number;
    name: string;
    size: string;
    type: string;
}
// bikes
interface bikeInterface {
    brand: string;
    color: string;
    description: string;
    id: number;
    max_available: number;
    name: string;
    package_only_count: number;
    package_only_unavailable: { [key: string]: number };
    size: string;
    type: string;
    unavailable: { [key: string]: number };
}
// selectedBikes
interface selectedBikesInterface {
    [key: string]: number;
}

/**
 *
 * @param startDate
 * @param endDate
 * @param selectedBikes
 * @param bikes
 * @param specificBikes
 * @returns
 */
export default function isValidBikeAmount(
    startDate: Date,
    endDate: Date,
    selectedBikes: selectedBikesInterface,
    bikes: bikeInterface[],
    specificBikes = null
) {
    console.log('### isValidBikeAmount', selectedBikes);
    const selectedBikesKeys = Object.keys(selectedBikes);
    if (startDate && endDate && selectedBikesKeys.length) {
        const filteredBikes = specificBikes || bikes.filter((bike) => selectedBikesKeys.includes(String(bike.id)));
        const dates: string[] = [];
        const days = differenceInCalendarDays(endDate, startDate);
        for (let i = 0; i <= days; i += 1) dates.push(format(addDays(startDate, i), 'dd.MM.yyyy'));
        return filteredBikes.every((bike) =>
            dates.every((date) => {
                const unitsInUse = bike.unavailable[date] ?? 0;
                const packageOnlyCount = bike.package_only_count ?? 0;
                return bike.max_available - packageOnlyCount - unitsInUse - selectedBikes[bike.id] >= 0;
            })
        );
    }
    return true;
}

/**
 * bikePackageUnavailable
 *
 * @param bikePackage
 * @param minDate
 * @param maxDate
 * @param bikes
 * @param selectedBikes
 * @param startDate
 * @param endDate
 * @returns
 */
export const bikePackageUnavailable = (
    bikePackage: bikePackageInterface,
    minDate: Date,
    maxDate: Date,
    bikes: bikeInterface[],
    selectedBikes: selectedBikesInterface,
    startDate: Date,
    endDate: Date
) => {
    const unavailable: { [key: string]: number } = {};
    const dates: string[] = [];
    const days = differenceInCalendarDays(maxDate, minDate);
    for (let i = 0; i <= days; i += 1) dates.push(format(addDays(minDate, i), 'dd.MM.yyyy'));
    bikePackage.bikes.forEach(({ bike: packageBikeId, amount: packageBikeAmount }) => {
        const bike = bikes.find(({ id }) => Number(id) === Number(packageBikeId));
        if (bike) {
            dates.forEach((date) => {
                const unitsInUse = bike.unavailable[date] ?? 0;
                const packageUnitsInUse = bike.package_only_unavailable?.[date] ?? 0;
                const unitsSelected =
                    isBefore(parseISO(date), startDate) || isAfter(parseISO(date), endDate)
                        ? 0
                        : selectedBikes[bike.id] ?? 0;
                const remaining = bike.max_available - unitsInUse - packageUnitsInUse - unitsSelected;
                const packagesInUse = bikePackage.max_available - Math.floor(remaining / packageBikeAmount);
                if (packagesInUse > 0) {
                    if (date in unavailable) {
                        unavailable[date] = Math.max(unavailable[date], packagesInUse);
                    } else {
                        unavailable[date] = packagesInUse;
                    }
                }
            });
        }
    });
    // The following line is useful for debugging. You can see the name in the BikeAvailability unavailable.
    // unavailable[bikePackage.name] = 0;
    return unavailable;
};
