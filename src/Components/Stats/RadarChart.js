import {
    Chart as ChartJS,
    RadialLinearScale,
    PointElement,
    LineElement,
    Filler,
    Tooltip,
    Legend,
} from 'chart.js';
import { Radar } from 'react-chartjs-2';

ChartJS.register(
    RadialLinearScale,
    PointElement,
    LineElement,
    Filler,
    Tooltip,
    Legend
);

export const data = {
    labels: ['Konversio', 'Puuhöylä', 'Varat', 'Säästöt', 'Kierrätetyt', 'Käyttökelvottomat'],
    datasets: [
        {
            label: 'Tuotto',
            data: [99, 9, 38, 50, 20, 11],
            backgroundColor: 'rgba(255, 99, 132, 0.2)',
            borderColor: 'rgba(255, 99, 132, 1)',
            borderWidth: 1,
        },
    ],
};

function RadarChart() {
    return <Radar data={data} />;
}

export default RadarChart;