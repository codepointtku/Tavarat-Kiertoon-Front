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

    const [jee, setJee] = useState<string[]>([]);

    useEffect(() => {
        async function fetchDayz() {
            const dayz = await getDayz();
            setJee(dayz);
        }

        fetchDayz();
    }, []);

    // const currentMonth = (new Date().getMonth() + 1).toString();
    const currentMonth = new Date().toISOString().slice(0, 7);
    // console.log(currentMonth);

    // const creationDatetMillisekunteina = ordersList.results?.map((order) => new Date(order.creation_date).getTime());
    const ordersCreationDates = ordersList.results?.map((order) =>
        new Date(order.creation_date).toISOString().slice(0, 10)
    );

    // console.log(ordersCreationDates);

    // const creationDatet = ordersList.results?.map((order) => order.creation_date.slice(0, 10));
    // console.log(creationDatet);

    const currentMonthOrders = ordersCreationDates?.filter((order) => order.includes(currentMonth));
    // console.log('curry orders:', currentMonthOrders);

    const curryOrdersAsTime = currentMonthOrders?.map((orderDate) => new Date(orderDate).getTime());
    // console.log('curryOrdersAsTime:', curryOrdersAsTime);

    if (jee.length === 0) {
        return null;
    }

    // console.log('jee ennen returnia', jee);
    // console.log('data ennen returnia', creationDatetMillisekunteina);

    return (
        <Line
            data={{
                labels: jee,
                datasets: [
                    {
                        fill: true,
                        label: 'Kuluvan kuukauden tilausmäärät',
                        // data: [2, 4, 54, 6, 7, 5, 3, 2],
                        data: curryOrdersAsTime,
                        borderColor: 'rgb(53, 162, 235)',
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
