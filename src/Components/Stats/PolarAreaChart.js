import { Chart as ChartJS, RadialLinearScale, ArcElement, Tooltip, Legend } from 'chart.js';
import { PolarArea } from 'react-chartjs-2';

import { Container } from '@mui/material';

ChartJS.register(RadialLinearScale, ArcElement, Tooltip, Legend);

export const data = {
    labels: ['Jakkarat', 'Pensselit', 'Partahöylät', 'Pöydät', 'Hammasharjat', 'Televisiot'],
    datasets: [
        {
            label: 'Laitettu kiertoon',
            data: [12, 19, 3, 9, 22, 14],
            backgroundColor: [
                'rgba(255, 99, 132, 0.5)',
                'rgba(54, 162, 235, 0.5)',
                'rgba(255, 206, 86, 0.5)',
                'rgba(75, 192, 192, 0.5)',
                'rgba(153, 102, 255, 0.5)',
                'rgba(255, 159, 64, 0.5)',
            ],
            borderWidth: 1,
        },
    ],
};

function PolarAreaChart() {
    return (
        <Container maxWidth="sm">
            <PolarArea data={data} />
        </Container>
    );
}

export default PolarAreaChart;
