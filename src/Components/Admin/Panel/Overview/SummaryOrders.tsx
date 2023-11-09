import { useState, useEffect } from 'react';
import { useLoaderData } from 'react-router-dom';

import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
import { Bar } from 'react-chartjs-2';
import type { ChartData, ChartOptions } from 'chart.js';

import type { gigaLoader } from '../../../../Router/loaders';
import { Box } from '@mui/material';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

interface BarProps {
    options: ChartOptions<'bar'>;
    // data: ChartData<'bar'>;
}

async function getDays() {
    const now = new Date();
    const totalDaysInCurrentMonth = new Date(now.getFullYear(), now.getMonth() + 1, 0).getDate();

    let splitDays = [];
    for (let i = 1; i <= totalDaysInCurrentMonth; i++) {
        splitDays.push(i.toString());
    }

    return splitDays;
}

function OrderAmountsChart() {
    const { ordersList } = useLoaderData() as Awaited<ReturnType<typeof gigaLoader>>;

    const [daysInCurrentMonth, setDaysInCurrentMonth] = useState<string[]>([]);

    useEffect(() => {
        async function fetchDays() {
            const days = await getDays();
            setDaysInCurrentMonth(days);
        }

        fetchDays();
    }, []);

    const currentDate = new Date();
    // Using toISOString() instead of .getMonth() & getDate() because getMonth and getDate() returns a single digit if month =< 10.
    // ISO format returns double digits (for example february is 02) which matches the dateformat @ backend/db.
    const currentMonth = currentDate.toISOString().slice(5, 7);
    const currentDay = currentDate.toISOString().slice(8, 10);

    const ordersCreationDates = ordersList.results?.map((order) =>
        new Date(order.creation_date!).toISOString().slice(0, 10)
    );

    const currentMonthOrders = ordersCreationDates?.filter((orderDate) => orderDate.slice(5, 7) === currentMonth);

    const orderAmounts = new Array(Number(currentDay)).fill(0);
    currentMonthOrders?.forEach((order) => {
        orderAmounts[Number(order.slice(8, 10)) - 1] += 1;
    });

    if (daysInCurrentMonth.length === 0) {
        return null;
    }

    const options: ChartOptions<'bar'> = {
        responsive: true,
        // scales: {
        //     x: {
        //         grid: {
        //             display: true,
        //         },
        //         beginAtZero: false,
        //         ticks: {
        //             color: '#000',
        //         },
        //     },
        //     y: {
        //         grid: {
        //             display: true,
        //         },
        //         beginAtZero: true,
        //         ticks: {
        //             color: '#000',
        //         },
        //     },
        // },
        plugins: {
            legend: {
                position: 'top' as const,
            },
            title: {
                display: false,
                text: 'Kuluvan kuukauden tilausmäärät',
            },
        },
    };

    return (
        <Box sx={{ width: '80vw' }}>
            <Bar
                fallbackContent={<div>vituix man</div>}
                options={options}
                data={{
                    labels: daysInCurrentMonth,
                    datasets: [
                        {
                            label: 'Kuluvan kuukauden tilausmäärät',
                            data: orderAmounts,
                            // borderColor: 'rgb(53, 162, 235)',
                            borderColor: '#000',
                            backgroundColor: 'rgba(53, 162, 235, 0.5)',
                            barThickness: 'flex',
                        },
                    ],
                }}
            />
        </Box>
    );
}

function SummaryOrders() {
    return <OrderAmountsChart />;
}

export default SummaryOrders;
