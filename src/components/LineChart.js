import React, {useState} from 'react'
import { Line } from 'react-chartjs-2';

import 'chartjs-adapter-moment';
import styled from 'styled-components';
import ZoomPlugin from 'chartjs-plugin-zoom';
import { 
  Chart, 
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  TimeSeriesScale,
  Ticks,
  LogarithmicScale

} from 'chart.js';
import { Radio } from 'antd';
Chart.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  TimeSeriesScale,
  ZoomPlugin,
  LogarithmicScale
 
)
const ChartWrap = styled.div`
    background-color: ${props => props.theme.blockBg};
    border-radius: 10px;
    padding: 2em;
    position: relative;
    width: 100%;
    .toolsbar{
      display: flex;

      justify-content: space-between;
      margin-bottom: 40px;
      div.ant-radio-group{
        
        .ant-radio-button-wrapper{
          background-color: #E6E6E6;
          outline: 0 !important;
          border: 0 !important;

        }
        .ant-radio-button-wrapper:hover{
          color: black;
        }
        .ant-radio-button-wrapper-checked{
          background-color: #545A62 !important;
          color: white;
        }
        .ant-radio-button-wrapper:first-child{
          border-top-left-radius: 12px;
          border-bottom-left-radius: 12px;
        }
        .ant-radio-button-wrapper:last-child{
          border-bottom-right-radius: 12px;
          border-top-right-radius: 12px;
        }
      }
    }
`
export default function LineChart({chartData, getCoinChart}) {
  const formatCoinPrice = (price, decimal = 18) => {
    return Intl.NumberFormat("en-us", {
        currency: "USD",
        style: "currency",
        maximumFractionDigits: decimal,
        compactDisplay: "short"
    }).format(price);
  
}
  const [chartDays, setChartDays] = useState(1);
  const margins = {
    top: 30,
    right: 20,
    left: 20,
    bottom: 30
  }
  const width = 580;
  const height = 570;
  const formatedData = chartData.map((value => {
    return {price: value[1], time: value[0]};
  }));
  const xLabels = [];
  formatedData.forEach(v => {
    xLabels.push(new Date(v.time));
  })
  const mouseMoveHandle = (ev) => {
    console.log(Chart)
    console.log(ev.target)
  }
  const boundedHeight = height - margins.top - margins.bottom;
  const boundedWidth = width - margins.left - margins.right;
  return (
    <ChartWrap className="chart-wrapper">
      
      <div className="toolsbar">
      <h1>Coin Chart</h1>
      <Radio.Group onChange={(ev) => {getCoinChart(ev.target.value); setChartDays(ev.target.value)}} defaultValue="1" buttonStyle="solid">
          <Radio.Button value="1">1d</Radio.Button>
          <Radio.Button value="7">7d</Radio.Button>
          <Radio.Button value="30">30d</Radio.Button>
      </Radio.Group>
      </div>
      <Line width={538} height={450} options={{
        maintainAspectRatio: true,
        responsive: true,
        scales: {
          x: {
            grid: {
               display: false,
            },
            type: 'time',
            position: 'bottom',
            time: {
              displayFormats: {
                millisecond: 'SSS [ms]',
                second: 'h:mm:ss a',
                minute: 'h:mm:ss a',
                hour: 'HH:MM',
                day: 'll',
                week: 	'dddd',
                month: 	'DD MMM YYYY',
                quarter: '[Q]Q - YYYY',
                year: 'YYYY'
              },
              tooltipFormat: 'DD/MMM/YYYY',
              unit: Number(chartDays) === 1 ? "hour" : (Number(chartDays) === 7 ? "day" : "day") ,
              
             },
          },
          y: {
            
            ticks: {
               callback: (tickValue, index, ticks) => {
                const price = formatCoinPrice(tickValue);
                if(Number(tickValue) < 0.0000001){
                  return "<" + "0.0000001";
                }
                
                if(Number(tickValue < 1)){
                  return `$${Number(tickValue).toFixed(8)}`;
                }
                return `$${Number(tickValue)}`;
                
               }
            },
            grid: {
              display: false,
           },
            title: {
              text: "Price",
              align: "center",
              color: "#000000",
              display: true,
              font: "Roboto",
              padding: {
                bottom: "25%"
              }
            },
          },
        },
        plugins: {
          legend: {
            display: false
          },
          filler: {
            propagate: false,
          },
          tooltip: {
            mode: 'nearest',
            intersect: false,
            enabled: true,
            
            
            callbacks: {
              label(item){
                const price = formatCoinPrice(item.raw);
                return `Price: ${price}`;
              }
            }
          },
          zoom: {
            limits: {
              x: {
                
                min: xLabels[0],
                max: xLabels[xLabels.length - 1]
                
              }
            },
            zoom: {
              mode: "x",
              wheel: {
                enabled: true
              },
              pinch: {
                enabled: true
              },
              drag: {
                enabled: true
              }
            }
          }
        }
      }} data={
        {
          labels: xLabels,
          datasets: [
            {
              label: "Price",
              data: formatedData.map(value => {
                return value.price;
              }),
              backgroundColor: "#fce3f0",
              fill: true,
              borderColor: "#E50078",
              pointRadius: 0,
              pointBorderWidth: 0,
              
            }
          ]
        }
      }>

        </Line>
    </ChartWrap>
  )
}
