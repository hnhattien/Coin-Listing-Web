import React from 'react'
import { Doughnut } from 'react-chartjs-2';

export default function TokenAllocationChart({chartData}) {
    return (
        <div>
            <Doughnut data={{
                labels: labels,
                datasets: [
                    {
                       data: chartData
                    }
                ]
            }}>

            </Doughnut>
        </div>
    )
}
