import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';
import { Line } from 'react-chartjs-2';
/* eslint-disable-next-line */
import { faker } from '@faker-js/faker';

import { Container } from '@mui/material';

import { useLoaderData } from 'react-router-dom';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

export const options = {
    responsive: true,
    plugins: {
        legend: {
            position: 'top',
        },
        title: {
            display: true,
            text: 'Tavaroita kierrätetty',
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

//Get data from somewhere else
/* export const data = {
    labels,
    datasets: [
        {
            label: '2023',
            data: labels.map(() => faker.datatype.number({ min: -1000, max: 1000 })),
            borderColor: 'rgb(255, 99, 132)',
            backgroundColor: 'rgba(255, 99, 132, 0.5)',
        },
        {
            label: '2022',
            data: labels.map(() => faker.datatype.number({ min: -1000, max: 1000 })),
            borderColor: 'rgb(53, 162, 235)',
            backgroundColor: 'rgba(53, 162, 235, 0.5)',
        },
    ],
}; */

function LineChart() {
    const statdata = useLoaderData();
    const first = Object.keys(statdata).length - 2;
    const last = Object.keys(statdata).length;
    const data = {
        labels,
        datasets: [],
    };
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
                borderColor: `rgb(${index == first ? 255 : 53}, ${index == first ? 99 : 162}, ${
                    index == first ? 132 : 235
                })`,
                backgroundColor: `rgba(${index == first ? 255 : 53}, ${index == first ? 99 : 162}, ${
                    index == first ? 132 : 235
                }, 0.5)`,
            });
            /* {
                label: '2023',
                data: labels.map((value, index) => {
                    console.log(value, index);
                }),
                backgroundColor: 'rgba(255, 99, 132, 0.5)',
            } */
        });
    return (
        <Container maxWidth="lg">
            <Line options={options} data={data} />
        </Container>
    );
}

export default LineChart;
