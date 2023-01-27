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

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Filler,
    Legend
);

const titletext = "Tuotteita kierrätetty";

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
    'Tammikuu', 'Helmikuu', 'Maaliskuu',
    'Huhtikuu', 'Toukokuu', 'Kesäkuu',
    'Elokuu', 'Syyskuu', 'Lokakuu', 'Marraskuu', 'Joulukuu'
];

export const data = {
    labels,
    datasets: [
        {
            fill: true,
            label: "2023",
            data: labels.map(() => faker.datatype.number({ min: 0, max: 1000 })),
            borderColor: 'rgb(53, 162, 235)',
            backgroundColor: 'rgba(53, 162, 235, 0.5)',
        },
    ],
};

function AreaChart() {
    return <Line options={options} data={data} />;
}

export default AreaChart;