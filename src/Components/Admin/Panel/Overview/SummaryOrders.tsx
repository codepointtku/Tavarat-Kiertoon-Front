import { useState, useEffect } from 'react';
import { useLoaderData } from 'react-router-dom';

import { Stack, Typography } from '@mui/material';

import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Filler,
    Legend,
} from 'chart.js';

import { Line } from 'react-chartjs-2';

import type { gigaLoader } from '../../../../Router/loaders';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Filler, Legend);

async function getDayz() {
    const now = new Date();
    const totalDaysInCurrentMonth = new Date(now.getFullYear(), now.getMonth() + 1, 0).getDate();

    let splitDays = [];
    for (let i = 1; i <= totalDaysInCurrentMonth; i++) {
        splitDays.push(i.toString());
    }

    return splitDays;
}

function LineChartti() {
    const { ordersList } = useLoaderData() as Awaited<ReturnType<typeof gigaLoader>>;

    // console.log(ordersList.results);

    const [daysInCurrentMonth, setDaysInCurrentMonth] = useState<string[]>([]);

    useEffect(() => {
        async function fetchDayz() {
            const dayz = await getDayz();
            setDaysInCurrentMonth(dayz);
        }

        fetchDayz();
    }, []);

    const currentDate = new Date();
    const currentMonth = currentDate.toISOString().slice(5, 7);
    const currentDay = currentDate.toISOString().slice(8, 10);
    console.log(currentMonth);
    console.log(currentDay);

    // const creationDatetMillisekunteina = ordersList.results?.map((order) => new Date(order.creation_date).getTime());
    const ordersCreationDates = ordersList.results?.map((order) =>
        new Date(order.creation_date).toISOString().slice(0, 10)
    );

    console.log(ordersCreationDates);

    // const creationDatet = ordersList.results?.map((order) => order.creation_date.slice(0, 10));
    // console.log(creationDatet);

    const currentMonthOrders = ordersCreationDates?.filter((order) => order.slice(5, 7) === currentMonth);
    // console.log('curry orders:', currentMonthOrders);

    // const curryOrdersAsTime = currentMonthOrders?.map((orderDate) => new Date(orderDate).getTime());
    // console.log('curryOrdersAsTime:', curryOrdersAsTime);

    const orderAmounts = new Array(Number(currentDay)).fill(0);
    currentMonthOrders?.forEach((order) => {
        orderAmounts[Number(order.slice(8, 10)) - 1] += 1;
    });
    console.log(orderAmounts);

    if (daysInCurrentMonth.length === 0) {
        return null;
    }

    return (
        <Line
            data={{
                labels: daysInCurrentMonth,
                datasets: [
                    {
                        // fill: true,
                        label: 'Kuluvan kuukauden tilausmäärät',
                        data: orderAmounts,
                        // data: curryOrdersAsTime,
                        borderColor: 'rgb(53, 162, 235)',
                        backgroundColor: 'rgba(53, 162, 235, 0.5)',
                    },
                    {
                        // fill: true,
                        label: 'Jeesus',
                        data: [1, 2, 43, 45, 6, 7, 54, 3, 3],
                        // data: curryOrdersAsTime,
                        borderColor: 'rgb(0, 62, 135)',
                        backgroundColor: 'rgba(53, 162, 235, 0.5)',
                    },
                ],
            }}
        />
    );
}

function SummaryOrders() {
    return (
        <Stack alignItems="center" flex={1}>
            {/* <Typography variant="subtitle2">Kuluvan kuukauden tilausmäärät</Typography> */}
            <LineChartti />
        </Stack>
    );
}

export default SummaryOrders;
