import {
    Container,
    Box,
    Typography,
    // Grid,
} from '@mui/material'

import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';

import { Bar } from 'react-chartjs-2';
/* eslint-disable-next-line */
import { faker } from '@faker-js/faker';

ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
);

const titletext = "Tuotteita kierrätetty";

export const options = {
    responsive: true,
    plugins: {
        legend: {
            position: 'top',
        },
        title: {
            display: true,
            text: titletext
        },
    },
};

const labels = [
    'Tammikuu', 'Helmikuu', 'Maaliskuu',
    'Huhtikuu', 'Toukokuu', 'Kesäkuu',
    'Elokuu', 'Syyskuu', 'Lokakuu', 'Marraskuu', 'Joulukuu'];

export const data = {
    labels,
    datasets: [
        {
            label: '2023',
            data: labels.map(() => faker.datatype.number({ min: 0, max: 1000 })),
            backgroundColor: 'rgba(255, 99, 132, 0.5)',
        },
        {
            label: '2022',
            data: labels.map(() => faker.datatype.number({ min: 0, max: 1000 })),
            backgroundColor: 'rgba(53, 162, 235, 0.5)',
        },
    ],
};

function StatsPage() {
    return (
        <Box>
            <Container>
                <Bar options={options} data={data} />
            </Container>
        </Box>
    )
}

export default StatsPage;