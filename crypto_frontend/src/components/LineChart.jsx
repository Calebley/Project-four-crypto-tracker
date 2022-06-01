import React from "react"
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
import { Line } from "react-chartjs-2"

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
);

const LineChart = ({ coinHistory }) => {

    console.log(coinHistory)

    const coinPrice = []
    const coinTimestamp = []

    for (let i = 0; i < coinHistory?.data?.history?.length; i += 1) {
        coinPrice.push(coinHistory?.data?.history[i].price);
    }


    for (let i = 0; i < coinHistory?.data?.history?.length; i += 1) {
        let unixTime = coinHistory.data.history[i].timestamp
        let milliseconds = unixTime * 1000
        let dateObject = new Date(milliseconds)
        coinTimestamp.push(dateObject.toLocaleString());
    }

    console.log(coinPrice)
    console.log(coinTimestamp)

    const data = {
        labels: coinTimestamp,
        datasets: [
            {
                label: "Price in USD",
                data: coinPrice,
                fill: false,
                backgroundColor: "#0071bd",
                borderColor: "#0071bd"
            },
        ],
    }

    const options = {
        scales: {
            xAxes: [{
                gridLines: {
                    display:false
                }
            }],
            yAxes: [{
                gridLines: {
                    display:false
                },
                ticks: {
                    beginAtZero: true
                }   
            }]
        }
    }

    return (
        <div>
            <Line data={data} options={options} />
        </div>
    )
}

export default LineChart