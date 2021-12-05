import React, { useEffect } from 'react'
import _ from 'lodash';
import Chart from 'chart.js/auto';
import {  } from 'chart.js';
import * as d3 from 'd3';
export default function LineChart({chartData}) {
    const draw = () => {
        
       const chartEl = document.getElementById("chart");
       const xLabels = [];
       chartData.prices.forEach(v => {
           xLabels.push(d3.timeFormat("%d-%b-%y")(new Date(v[0])));

       })


       const chart = new Chart(chartEl, 
        {
            type: "line",
            data: {
                labels: xLabels,
                datasets: [
                    {
                        label: "Price",
                        data : chartData.prices.map((v, index) => {
                          return Number(v[1]);
                        }),
                        borderColor: 'rgb(75, 192, 192)'
                    }
                ],
                
            },
            options: {
              plugins: {
                legend: {
                  onHover: (ev, legendItem, legend) => {
                    console.log(legendItem, legend)
                  }
                }
              },
              scales: {
                y: {
                  ticks: {
                    callback: (value, index) => {
                       return Intl.NumberFormat("en-uk", {style: "currency", currency: "usd", maximumFractionDigits: 18}).format(value);
                  }

                  }                }
              }
            }
        }    );
chart.draw()
    }
    useEffect(() => {
        draw();
    })
    return (
        <div>
            <canvas id="chart">

            </canvas>
        </div>
    )
}
