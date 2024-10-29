import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
import { Bar } from 'react-chartjs-2';
/* eslint-disable-next-line */
import { faker } from '@faker-js/faker';

import { Container } from '@mui/material';

import { useLoaderData } from 'react-router-dom';
import { randomNumberBetween } from '@mui/x-data-grid/utils/utils';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const titletext = 'Tuotteita kierrätetty';

export const options = {
    responsive: true,
    plugins: {
        legend: {
            position: 'top',
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

function BarChart() {
    const statdata = useLoaderData();
    console.log(statdata);
    const data = {
        labels,
        datasets: [],
    };

    const first = Object.keys(statdata).length - 2;
    const last = Object.keys(statdata).length;
    console.log('eeee', first, last);
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
    console.log(data);
    return (
        <Container maxWidth="lg">
            <Bar options={options} data={data} />
        </Container>
    );
}

export default BarChart;
