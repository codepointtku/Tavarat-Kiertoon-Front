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

const now = new Date();
const totalDaysInCurrentMonth = new Date(now.getFullYear(), now.getMonth() + 1, 0).getDate();

let splitDays: string[] = [];
for (let i = 1; i <= totalDaysInCurrentMonth; i++) {
    splitDays.push(i.toString());
}

// async function getDayz() {
//     const now = new Date();
//     const totalDaysInCurrentMonth = new Date(now.getFullYear(), now.getMonth() + 1, 0).getDate();

//     // console.log(totalDaysInCurrentMonth);

//     let splitDays = [];
//     for (let i = 1; i <= totalDaysInCurrentMonth; i++) {
//         splitDays.push(i.toString());
//     }

//     // console.log(splitDays);

//     return splitDays
// }

/* async */ function SummaryOrders() {
    // await getDayz();

    const { ordersList } = useLoaderData() as Awaited<ReturnType<typeof gigaLoader>>;

    // const vainPaivat = ordersList.results?.map((order) => {
    //     return order.creation_date.slice(0, 10);
    // });

    const vainPaivat = ordersList.results?.map((order) => {
        return new Date(order.creation_date).getTime() /*.toLocaleDateString('fi-FI')*/;
    });

    // const vainPaivatNumeroina = vainPaivat?.map((paiva) => paiva.getTime());

    // console.log(vainPaivatNumeroina);

    // console.log(vainPaivat);

    const data = {
        // labels,
        splitDays,
        datasets: [
            {
                fill: true,
                label: '2023',
                data: vainPaivat?.map((paiva) => paiva),
                borderColor: 'rgb(53, 162, 235)',
                backgroundColor: 'rgba(53, 162, 235, 0.5)',
            },
        ],
    };

    return (
        <Stack alignItems="center">
            <Typography variant="subtitle2">Kuluvan kuukauden tilausmäärät</Typography>
            <Line /* options={options} */ data={data} />
        </Stack>
    );
}

export default SummaryOrders;
