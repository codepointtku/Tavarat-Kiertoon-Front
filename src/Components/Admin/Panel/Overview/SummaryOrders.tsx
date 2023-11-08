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
import { getDay } from 'date-fns';

// import type { ChartData, ChartOptions } from 'chart.js';

// interface LineProps {
//     options: ChartOptions<'line'>;
//     data: ChartData<'line'>;
// }

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Filler, Legend);

// const options: LineProps = {
//     plugins: {
//         legend: {
//             position: 'top',
//             // display: false,
//         },
//         title: {
//             display: true,
//             text: titletext,
//         },
//     },
// };

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

    const [jee, setJee] = useState<string[]>([]);

    useEffect(() => {
        async function fetchDayz() {
            const dayz = await getDayz();
            setJee(dayz);
        }

        fetchDayz();
    }, []);

    const creationDatetMillisekunteina = ordersList.results?.map(
        (order) => new Date(order.creation_date).getTime() /*.toLocaleDateString('fi-FI')*/
    );

    const data = {
        jee,
        datasets: [
            {
                fill: true,
                label: '2023',
                data: creationDatetMillisekunteina?.map((paiva) => paiva),
                borderColor: 'rgb(53, 162, 235)',
                backgroundColor: 'rgba(53, 162, 235, 0.5)',
            },
        ],
    };

    return <Line /* options={options} */ data={data} />;
}

function SummaryOrders() {
    return (
        <Stack alignItems="center" flex={1}>
            <Typography variant="subtitle2">Kuluvan kuukauden tilausmäärät</Typography>
            <LineChartti />
        </Stack>
    );
}

export default SummaryOrders;
