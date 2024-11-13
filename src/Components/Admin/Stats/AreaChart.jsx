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
/* eslint-disable-next-line */
import { faker } from '@faker-js/faker';

import { Container } from '@mui/material';

import { useLoaderData } from 'react-router-dom';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Filler, Legend);

const titletext = 'Tuotteita kierrätetty';

export const options = {
    responsive: true,
    plugins: {
        legend: {
            position: 'top',
            // display: false,
        },
        title: {
            display: true,
            text: titletext,
        },
    },
};

const labels = [
    'Tammikuu',
    'Helmikuu',
    'Maaliskuu',
    'Huhtikuu',
    'Toukokuu',
    'Kesäkuu',
    'Heinäkuu',
    'Elokuu',
    'Syyskuu',
    'Lokakuu',
    'Marraskuu',
    'Joulukuu',
];

export const data = {
    labels,
    datasets: [
        {
            fill: true,
            label: '2023',
            data: labels.map(() => faker.datatype.number({ min: 0, max: 1000 })),
            borderColor: 'rgb(53, 162, 235)',
            backgroundColor: 'rgba(53, 162, 235, 0.5)',
        },
    ],
};

function AreaChart() {
    const statdata = useLoaderData();
    const data = {
        labels,
        datasets: [],
    };

    const first = Object.keys(statdata).length - 1;
    const last = Object.keys(statdata).length;
    Object.entries(statdata)
        .slice(first, last)
        .forEach(([year, monthly_value], index) => {
            let data_month = labels.map(() => 0);
            Object.entries(monthly_value).forEach(([month, value]) => {
                data_month[month - 1] = value;
            });
            console.log(Math.floor(Math.random() * 256));
            data.datasets.push({
                label: year,
                data: data_month,
                borderColor: 'rgb(53, 162, 235)',
                backgroundColor: 'rgba(53, 162, 235, 0.5)',
            });
        });
    return (
        <Container maxWidth="lg">
            <Line options={options} data={data} />
        </Container>
    );
}

export default AreaChart;
